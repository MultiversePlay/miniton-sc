import "@stdlib/deploy";

// Game info: name of game
struct Game {
    id: Int as uint32;
    name: String;
}

// Player info
struct PlayerInfo {
    telegramId: String;
    walletAddress: Address?;
    entryType: String;
    entryFee: Int as coins;
}

// Rule of allocating the prize
struct RuleInfo {
    name: String;
    value: String;
}

// Winner info
struct WinnerInfo {
    telegramId: String;
    walletAddress: Address?;
    score: String;
    ranking: Int as uint8;
    prizeWon: Int as coins;
    prizeSentStatus: Int as uint8;
}

// Match info
struct MatchInfo {
    matchId: Int as uint64;
    game: Game;
    players: map<Int, PlayerInfo>;
    playerCount: Int as uint32;
    coin: String;
    prizePool: Int as coins;
    prizeShare: String;
    commissionFee: Int;
    rules: map<Int, RuleInfo>;
    ruleCount: Int as uint32;
    status: Int as uint8;
    winners: map<Int, WinnerInfo>;
    winnerCount: Int as uint32;
}

// Winners of the match
struct MatchResults {
    winners: map<Int, WinnerInfo>;
    winnerCount: Int as uint32;
}

/**
 * Master action request
 * id:      unique id
 * action:
 *      0 => None
 *      1 => Withdraw (Toncoin)
 *      2 => Withdraw (USDT)
 * status:
 *      0 => Waiting for voting
 *      1 => Accepted
 *      2 => Timeout
 * weight:  Current or final weight
 * amount:  amount of nanoton
 * address: Address of target wallet
*/
struct MasterActionRequest {
    id: Int;
    action: Int as uint8;
    timeout: Int as uint32;
    status: Int as uint8;
    weight: Int as uint32;
    amount: Int;
    address: Address;
    voters: map<Address, Bool>;
}

// Message for submit a master action request
message MasterActionRequestMsg {
    seqno: Int;
    usdtBalance: Int? as coins;
    request: MasterActionRequest;
}

// Message for vote
message VoteMsg {
    seqno: Int;
    requestId: Int;
    queryIdPrefix: Int as uint64;
}

// Message for recording match info
message MatchInfoMsg {
    seqno: Int;
    usdtBalance: Int? as coins;
    matchInfo: MatchInfo;
}

// Message for sending prize
message SendPrizeMsg {
    seqno: Int;
    usdtBalance: Int? as coins;
    queryIdPrefix: Int as uint64;
    matchId: Int as uint64;
    telegramId: String;
    walletAddress: Address?;
    matchResults: MatchResults?;
    commissionWalletAddress: Address?;
}

// Message for removing match dump
message RemoveMatchDumpMsg {
    seqno: Int;
    matchIds: map<Int, Int as uint64>;
}

// Message for setting mininum balance
message MinBalanceMsg {
    seqno: Int;
    value: Int as coins;
}

message SetJettonWalletAddressMsg {
    seqno: Int;
    value: Address;
}

message SetGasValueForJettonTransferMsg {
    seqno: Int;
    value: Int as coins;
}

message SetUSDTBalanceMsg {
    seqno: Int;
    value: Int as coins;
}

message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0xd53276db) Excesses {
    queryId: Int as uint64;
}

// Defining a new extension function for type String that returns value of type Int
// Caution: produces unexpected results when String contains non-numeric characters!
extends fun toInt(self: String): Int {
    // Cast the String as a Slice for parsing
    let string: Slice = self.asSlice();

    // A variable to store the accumulated number
    let acc: Int = 0;

    // Loop until the String is empty
    while (!string.empty()) {
        let char: Int = string.loadUint(8); // load 8 bits (1 byte) from the Slice
        acc = (acc * 10) + (char - 48);     // using ASCII table to get numeric value
        // Note, that this approach would produce unexpected results
        //   when the starting String contains non-numeric characters!
    }

    // Produce the resulting number
    return acc;
}

contract MiniTonMatchUSDTContract with Deployable {
    owner: Address;
    voters: map<Address, Bool>;
    voterCount: Int;
    weightRequired: Int;
    masterActionRequests: map<Int, MasterActionRequest>;
    masterActionRequestCount: Int;
    currentSeqno: Int;
    matches: map<Int, MatchInfo>; // all matches 
    matchCount: Int;
    minBalance: Int as coins;
    myJettonWalletAddress: Address;
    usdtBalance: Int as coins;
    gasValueForJettonTransfer: Int as coins;

    init(owner: Address, weightRequired: Int, voters: map<Address, Bool>) {
        self.owner = owner;
        self.minBalance = ton("0.05"); // default mininum = 0.05
        self.currentSeqno = 0;
        // newAddress(0, 0) will throw exception 'Error: Invalid address hash length: 0' in @ton/core 0.56.3
        // so be it
        self.myJettonWalletAddress = newAddress(0, 0x1234567812345678123456781234567812345678123456781234567812345678);
        self.usdtBalance = 0;

        self.voters = emptyMap();
        self.voterCount = 0;
        foreach(key, value in voters) {
            self.voters.set(key, value);
            self.voterCount += 1;
        }
        if (weightRequired > self.voterCount) {
            weightRequired = self.voterCount;
        }
        self.weightRequired = weightRequired;

        self.masterActionRequests = emptyMap();
        self.masterActionRequestCount = 0;

        self.matches = emptyMap();
        self.matchCount = 0;

        self.gasValueForJettonTransfer = ton("0.1");
    }

    fun setUSDTBalance(value: Int) {
        self.usdtBalance = value;
    }

    receive() {
    }

    receive(msg: Excesses) {
    }
    
    // Record match info and receive entry fee
    receive(msg: MatchInfoMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");

        if (msg.usdtBalance != null) {
            self.setUSDTBalance(msg.usdtBalance!!);
        }

        let exist: Bool = self.matches.get(msg.matchInfo.matchId) != null;
        self.matches.set(msg.matchInfo.matchId, msg.matchInfo);
        if (exist == false) {
            self.matchCount += 1;
        }

        self.incSeqno();
        self.reply("".asComment());
    }

    fun incSeqno() {
        if (self.currentSeqno >= 1000000000) {
            self.currentSeqno = 0;
        }
        self.currentSeqno += 1;
    }

    get fun seqno(): Int {
        return self.currentSeqno;
    }
    
    receive(msg: MasterActionRequestMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");
        require(self.masterActionRequests.get(msg.request.id) == null, "This id is already exists");

        if (msg.usdtBalance != null) {
            self.setUSDTBalance(msg.usdtBalance!!);
        }

        msg.request.status = 0;
        msg.request.weight = 0;
        msg.request.voters = emptyMap();
        self.masterActionRequests.set(msg.request.id, msg.request);
        self.masterActionRequestCount += 1;

        let sbuilder = beginString();
        sbuilder.append("Withdraw Request(");
        sbuilder.append(msg.request.id.toString());
        sbuilder.append("): ");
        sbuilder.append(msg.request.amount.toCoinsString());
        sbuilder.append(" -> ");
        sbuilder.append(msg.request.address.toString());
        emit(sbuilder.toString().asComment());

        self.incSeqno();
        self.reply("".asComment());
    }

    receive(msg: VoteMsg) {
        require(self.voters.get(sender()) == true, "Only voter can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");
        require(self.masterActionRequests.get(msg.requestId) != null, "Can not found this request");

        let request = self.masterActionRequests.get(msg.requestId)!!;
        if (request.action >= 1 && request.action <= 2 && request.status == 0 && request.amount > 0) {
            if (request.timeout > now()) {
                let sender = sender();
                if (request.voters.get(sender) != true) {
                    request.voters.set(sender, true);
                    request.weight += 1;
                }

                if (request.weight >= self.weightRequired) {
                    let bodyMsg = beginString();
                    bodyMsg.append("Withdaw Quest Id: ");
                    bodyMsg.append(request.id.toString());
                    let sbuilder = beginString();

                    if (request.action == 1) {  // withdraw toncoin
                        require(myBalance() - self.minBalance > request.amount, "Balance is not enough");

                        send(SendParameters{
                            to: request.address,
                            bounce: true,
                            value: request.amount, 
                            mode: SendPayGasSeparately | SendIgnoreErrors,
                            body: bodyMsg.toCell()
                        });

                        sbuilder.append("Execute Withdraw (");
                    } else if (request.action == 2) { // withdraw usdt
                        require(self.usdtBalance >= request.amount, "USDT Balance is not enough");

                        let queryIdString = beginString();
                        queryIdString.append(msg.queryIdPrefix.toString());
                        queryIdString.append(1.toString()); //prefix of withdraw usdt
                        queryIdString.append(request.id.toString());
                        self.sendUSDT(request.address, request.amount, queryIdString.toString().toInt(), bodyMsg.toString());

                        sbuilder.append("Execute Withdraw USDT (");
                    }

                    sbuilder.append(request.id.toString());
                    sbuilder.append("): ");
                    sbuilder.append(request.amount.toCoinsString());
                    sbuilder.append(" -> ");
                    sbuilder.append(request.address.toString());
                    emit(sbuilder.toString().asComment());

                    request.status = 1;
                }
            }
            else { // timeout
                request.status = 2;
            }

            self.masterActionRequests.set(request.id, request);
        }

        self.incSeqno();
        self.reply("".asComment());
    }

    get fun masterRequest(id: Int): MasterActionRequest? {
        return self.masterActionRequests.get(id);
    }

    get fun masterActionRequestCount(): Int {
        return self.masterActionRequestCount;
    }

    fun sendUSDT(target: Address, amount: Int, queryId: Int, comment: String) {
        require(self.myJettonWalletAddress != newAddress(0, 0x1234567812345678123456781234567812345678123456781234567812345678), "myJettonWalletAddress is not be set");

        let commentCell = comment.asComment();

        send(SendParameters{
            to: self.myJettonWalletAddress,
            bounce: false,
            // value: 0,
            // mode: SendRemainingValue,
            value: self.gasValueForJettonTransfer,
            mode: SendIgnoreErrors,
            body: TokenTransfer{
                queryId: queryId,
                amount: amount,
                destination: target,
                // response_destination: sender(),
                response_destination: myAddress(),
                custom_payload: null,
                forward_ton_amount: 1,
                // forward_payload: beginCell().storeBool(false).endCell().asSlice()
                forward_payload: beginCell().storeBool(true).storeRef(commentCell).endCell().asSlice()
            }.toCell()
        });

        self.usdtBalance -= amount;
        if (self.usdtBalance < 0) {
            self.usdtBalance = 0;
        }
    }

    receive(msg: SetJettonWalletAddressMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");

        self.myJettonWalletAddress = msg.value;

        let comment = beginString();
        comment.append("Set JettonWalletAddress => ");
        comment.append(self.myJettonWalletAddress.toString());
        emit(comment.toString().asComment());

        self.incSeqno();
        self.reply("".asComment());
    }

    get fun jettonWalletAddress(): Address {
        return self.myJettonWalletAddress;
    }

    receive(msg: SetGasValueForJettonTransferMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");

        self.gasValueForJettonTransfer = msg.value;

        let comment = beginString();
        comment.append("Set gasValueForJettonTransfer => ");
        comment.append(self.gasValueForJettonTransfer.toString());
        emit(comment.toString().asComment());

        self.incSeqno();
        self.reply("".asComment());
    }

    get fun gasValueForJettonTransfer(): Int {
        return self.gasValueForJettonTransfer;
    }

    receive(msg: SetUSDTBalanceMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");

        self.usdtBalance = msg.value;

        self.incSeqno();
        self.reply("".asComment());
    }

    get fun recordedUSDTBalance(): Int {
        return self.usdtBalance;
    }

   /* Match status 
   * 0 --> created: match info on chain 
   * 1 --> compeleted: match result on chain
   * 2 --> compeleted and commission has been paid: commission on chain
   */
   // Record Match Result: 0 -> 1
    fun recordMatchResults(match: MatchInfo, msg: SendPrizeMsg): MatchInfo {
        require(msg.matchResults != null, "matchResults is invalid");
        let matchResult = msg.matchResults!!;

        // check if prize > entryfee
        let totalPrize: Int = 0;
        foreach(key, value in matchResult.winners) {
            totalPrize += value.prizeWon;
        }
        let commissionFee = match.prizePool - totalPrize;
        require(commissionFee >= 0, "totalPrize cannot be greater than prizePool");

        match.winners = matchResult.winners;
        match.winnerCount = matchResult.winnerCount;
        match.commissionFee = commissionFee;
        match.status = 1; // match compeleted

        self.matches.set(match.matchId, match);
        return match
    }

    // Send Match Commission: 1 -> 2
    fun sendMatchCommission(match: MatchInfo, msg: SendPrizeMsg): MatchInfo {
        if (msg.commissionWalletAddress != null) {
            if (match.commissionFee == 0) {
                match.status = 2;
                self.matches.set(match.matchId, match);
            } else if (match.commissionFee > 0 && 
                self.usdtBalance >= match.commissionFee)
            {
                let bodyMsg: StringBuilder = beginString();
                bodyMsg.append("Match CommissionFee (");
                bodyMsg.append(match.matchId.toString());
                bodyMsg.append(")");

                let queryIdString = beginString();
                queryIdString.append(msg.queryIdPrefix.toString());
                queryIdString.append(2.toString()); //prefix of commission transaction
                queryIdString.append(match.matchId.toString());

                self.sendUSDT(msg.commissionWalletAddress!!, match.commissionFee, queryIdString.toString().toInt(), bodyMsg.toString());

                match.status = 2;
                self.matches.set(match.matchId, match);
            }
        }
        return match
    }

    // Send prize to winner
    fun sendMatchPrize(match: MatchInfo, msg: SendPrizeMsg) {
        require(msg.telegramId != "" && msg.walletAddress != null, "Invalid playerInfo");
        let modified: Bool = false;
        foreach(key, value in match.winners) {
            if (value.telegramId == msg.telegramId) {
                /* winner prize sent status 
                * 0 --> Not send prize yet
                * 1 --> Prize sent
                * 2 --> Fraud player(No need to send) 
                * 3 --> Other reason not send prize yet
                */
                let winner = value;
                if (winner.prizeSentStatus == 0 || winner.prizeSentStatus == 3) { 
                    if (self.usdtBalance >= winner.prizeWon) {
                        if (winner.prizeWon > 0) {
                            let bodyMsg = beginString();
                            bodyMsg.append("Match Prize (");
                            bodyMsg.append(match.matchId.toString());
                            bodyMsg.append(",");
                            bodyMsg.append(key.toString());
                            bodyMsg.append(")");

                            let queryIdString = beginString();
                            queryIdString.append(msg.queryIdPrefix.toString());
                            queryIdString.append(3.toString()); //prefix of prize transaction
                            queryIdString.append(match.matchId.toString());
                            queryIdString.append(winner.ranking.toString());

                            self.sendUSDT(msg.walletAddress!!, winner.prizeWon, queryIdString.toString().toInt(), bodyMsg.toString());
                        }
                        winner.walletAddress = msg.walletAddress!!;
                        winner.prizeSentStatus = 1; // Prize sent
                        match.winners.set(key, winner);
                        modified = true;
                    } else if (winner.prizeSentStatus == 0) { // Other reason not send prize yet
                        winner.prizeSentStatus = 3; 
                        match.winners.set(key, winner);
                        modified = true;
                    }
                }
            }
        }

        if (modified == true) {
            self.matches.set(match.matchId, match);
        }
    }

    receive(msg: SendPrizeMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");
        require(self.matches.get(msg.matchId) != null, "This match was not found");
        let match = self.matches.get(msg.matchId)!!;

        if (msg.usdtBalance != null) {
            self.setUSDTBalance(msg.usdtBalance!!);
        }
        
        if (match.status == 0) {   
            match = self.recordMatchResults(match, msg);
        }

        if (match.status == 1) {
            match = self.sendMatchCommission(match, msg);
        }
        
        // send prize to winner only after commissions are paid
        if (match.status > 1) {
            self.sendMatchPrize(match, msg);
        }

        self.incSeqno();
        self.reply("".asComment());
    }

    receive(msg: RemoveMatchDumpMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");

        let ori = self.matchCount;
        foreach(key, value in msg.matchIds) {
            if (self.matches.del(value) == true) {
                self.matchCount -= 1;
            }
        }

        let removedCount = ori - self.matchCount;
        let comment = beginString();
        comment.append("Removed ");
        comment.append(removedCount.toString());
        comment.append(" MatchDumps");
        emit(comment.toString().asComment());
        self.incSeqno();
        self.reply("".asComment());
    }

    // set mininum balance
    receive(msg: MinBalanceMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid sequence number");

        self.minBalance = msg.value;

        let comment = beginString();
        comment.append("Set MinBalance to ");
        comment.append(self.minBalance.toCoinsString());
        emit(comment.toString().asComment());
        self.incSeqno();
        self.reply("".asComment());
    }

    get fun minBalance(): Int {
        return self.minBalance;
    }

    get fun balance(): Int {
        return myBalance();
    }

    get fun matchInfo(matchId: Int): MatchInfo? {
        return self.matches.get(matchId);
    }

    get fun matchCount(): Int {
        return self.matchCount;
    }
}
