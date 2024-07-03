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
    totalEntryFee: Int as coins;
    prizeShare: Int as uint8;
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

// Message for recording match info
message MatchInfoMsg {
    matchInfo: MatchInfo;
}

// Message for sending prize
message SendPrizeMsg {
    seqno: Int;
    matchId: Int as uint64;
    telegramId: String;
    walletAddress: Address;
    matchResults: MatchResults?;
    commissionWalletAddress: Address?;
}

// Message for removing match dump
message RemoveMatchDumpMsg {
    matchIds: map<Int, Int as uint64>;
}

// Message for withdrawing balance
message WithdrawMsg {
    seqno: Int;
    amount: Int as coins;
}

// Message for setting mininum balance
message MinBalanceMsg {
    value: Int as coins;
}

contract MiniTonMatchContract with Deployable {
    owner: Address;
    currentSeqno: Int;
    matches: map<Int, MatchInfo>; // all matches 
    matchCount: Int;
    minBalance: Int as coins;

    init() {
        self.owner = sender();
        self.minBalance = ton("0.05"); // default mininum = 0.05
        self.currentSeqno = 0;

        self.matches = emptyMap();
        self.matchCount = 0;
    }

    receive() {
    }
    
    // Record match info and receive entry fee
    receive(msg: MatchInfoMsg) {
        require(sender() == self.owner, "Only owner can call this function");

        let exist: Bool = self.matches.get(msg.matchInfo.matchId) != null;
        self.matches.set(msg.matchInfo.matchId, msg.matchInfo);
        if (exist == false) {
            self.matchCount += 1;
        }
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
    
    fun sendToncoin(target: Address, value: Int, body: Cell) {
        send(SendParameters{to: target, bounce: false, value: value, mode: SendPayGasSeparately | SendIgnoreErrors, body: body});
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
        let commissionFee = match.totalEntryFee - totalPrize;
        require(commissionFee > 0, "totalPrize cannot be greater than or equal to totalEntryFee");

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
            if (match.commissionFee > 0 && 
                myBalance() - match.commissionFee > self.minBalance)
            {
                let bodyMsg: StringBuilder = beginString();
                bodyMsg.append("Match CommissionFee (");
                bodyMsg.append(match.matchId.toString());
                bodyMsg.append(")");
                self.sendToncoin(msg.commissionWalletAddress!!, match.commissionFee, bodyMsg.toCell());
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
                    if (myBalance() - winner.prizeWon > self.minBalance) {
                        if (winner.prizeWon > 0) {
                            let bodyMsg = beginString();
                            bodyMsg.append("Match Prize (");
                            bodyMsg.append(match.matchId.toString());
                            bodyMsg.append(",");
                            bodyMsg.append(winner.telegramId);
                            bodyMsg.append(")");
                            self.sendToncoin(msg.walletAddress, winner.prizeWon, bodyMsg.toCell());
                        }
                        winner.walletAddress = msg.walletAddress;
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
        
        if (match.status == 0) {   
            match = self.recordMatchResults(match, msg);
        }

        if (match.status == 1) {
            match = self.sendMatchCommission(match, msg);
        }
        
        // send prize to winner even though commission not been paid
        if (match.status > 0) {
            self.sendMatchPrize(match, msg);
        }

        self.incSeqno();
        self.reply("".asComment());
    }

    receive(msg: RemoveMatchDumpMsg) {
        require(sender() == self.owner, "Only owner can call this function");

        foreach(key, value in msg.matchIds) {
            if (self.matches.del(value) == true) {
                self.matchCount -= 1;
            }
        }

        self.reply("".asComment());
    }
    
    // withdraw balance
    receive(msg: WithdrawMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        require(msg.seqno == self.currentSeqno, "Invalid seqno");
        require(myBalance() - self.minBalance >= msg.amount, "Insufficient contract balance");

        send(SendParameters{
            to: sender(),
            bounce: true,
            value: msg.amount,
            mode: SendPayGasSeparately | SendIgnoreErrors
        });

        self.incSeqno();
        self.reply("".asComment());
    }

    // withdraw all balance
    receive("Withdraw all") {
        require(sender() == self.owner, "Only owner can call this function");

        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            mode: SendRemainingBalance | SendIgnoreErrors
        });
        self.reply("".asComment());
    }

    // set mininum balance
    receive(msg: MinBalanceMsg) {
        require(sender() == self.owner, "Only owner can call this function");
        self.minBalance = msg.value;
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
