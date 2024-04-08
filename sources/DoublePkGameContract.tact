import "@stdlib/deploy";

struct MatchInfo {
    id1: Int as uint32 = 0;
    uid1: Int as uint64;
    address1: Address;
    status1: Int as uint8 = 0;
    id2: Int as uint32 = 0;
    uid2: Int as uint64;
    address2: Address;
    status2: Int as uint8 = 0;
    amount: Int as coins;
    rewards: Int as coins;
    time: Int as uint32 = 0;
}

message MatchInfoMessage {
    id: Int;
    match_info: MatchInfo;
}

message MatchResult {
    id: Int as uint32;
    victory_uid: Int as uint32 = 0;
    defeat_uid: String;
    score: String;
    total_amount: Int as coins;
    rewards: Int as coins;
    time: Int as uint32 = 0;
}

message MatchResultMessage {
    matchResult: MatchResult;
    msg1: String;
    msg2: String;
    delete: MatchDeleteMessage;
}

message MatchDeleteMessage {
    arr: map<Int, Int>;
    length: Int as uint8 = 0;
    start: Int as uint8 = 0;
}

message Withdraw {
    amount: Int as coins;
}

message MinTonForStorage {
    minTon: Int as coins;
}

contract DoublePkGameContract with Deployable {

    minTonForStorage: Int as coins;
    owner: Address;
    matches: map<Int, MatchInfo>;
    matchesResults: map<Int, MatchResult>;
    matchesCount: Int as uint32;
    matchesResultsCount: Int as uint32;

    init() {
        self.minTonForStorage = ton("0.05");
        self.owner = sender();
        self.matches = emptyMap();
        self.matchesResults = emptyMap();
        self.matchesCount = 0;
        self.matchesResultsCount = 0;
    }

    fun getMatchInfo(id: Int): MatchInfo {
        if (self.matches.get(id) == null) {
            return MatchInfo{id1: 0, uid1: 0, address1: sender(), status1: 0, id2: 0, uid2: 0, address2: sender(), status2: 0, amount: ton("0"), rewards: ton("0"), time: 0};
        } else {
            return self.matches.get(id)!!;
        }
    }

    fun joinMatch(v: MatchInfoMessage) {
        let match_info: MatchInfo = self.getMatchInfo(v.id);
        if (match_info.id1 == 0 && match_info.id2 == 0) {
            require(sender() == self.owner, "Only deployer is allowed to Init Match");
            self.matches.set(v.id, v.match_info);
            self.matchesCount = self.matchesCount + 1;
        } else {
            if (sender() == self.owner) {
                if (v.match_info.id1 > 0) {
                    match_info.id1 = v.match_info.id1;
                    match_info.uid1 = v.match_info.uid1;
                    match_info.address1 = v.match_info.address1;
                    match_info.status1 = v.match_info.status1;
                }
                if (v.match_info.id2 > 0) {
                    match_info.id2 = v.match_info.id2;
                    match_info.uid2 = v.match_info.uid2;
                    match_info.address2 = v.match_info.address2;
                    match_info.status2 = v.match_info.status2;
                }
                match_info.amount = v.match_info.amount;
                match_info.rewards = v.match_info.rewards;
                match_info.time = v.match_info.time;
                self.matches.set(v.id, v.match_info);
            } else {
                require(((match_info.id1 != 0 && match_info.status1 != 1) || (match_info.id2 != 0 && match_info.status2 != 1)), "The players are full");
                let status: Int = 0;
                if (match_info.id1 == v.match_info.id1 && match_info.status1 == 0
                    && match_info.address1 == sender()) {
                    match_info.status1 = v.match_info.status1;
                    status = match_info.status1;
                } else if (match_info.id2 == v.match_info.id1 && match_info.status2 == 0
                    && match_info.address2 == sender()) {
                    match_info.status2 = v.match_info.status1;
                    status = match_info.status2;
                }
                if (status == 1) {
                    if (context().value < match_info.amount) {
                        self.reply("The amount paid is less than the entry fee".asComment());
                    } else {
                        self.matches.set(v.id, v.match_info);
                    }
                } else {
                    self.reply("Join the match fails, refund the remaining amount.".asComment());
                }
            }
        }
    }

    fun deleteMatchInfo(id: Int) {
        if (self.matches.get(id) != null) {
            self.matches.set(id, null);
            self.matchesCount = self.matchesCount - 1;
        }
        if (self.matchesResults.get(id) != null) {
            self.matchesResults.set(id, null);
            self.matchesResultsCount = self.matchesResultsCount - 1;
        }
    }

    fun sendRewards(address: Address, mr: MatchResult, msg1: String, msg2: String) {
        let winnerRewards: Int = mr.rewards;
        let matchBalance: Int = mr.total_amount - mr.rewards;
        if (mr.total_amount < myBalance() - context().value - self.minTonForStorage) {
            send(SendParameters{
                to: address,
                bounce: true,
                value: winnerRewards,
                mode: SendIgnoreErrors,
                body: msg1.asComment()
            });
            matchBalance = min(mr.total_amount - mr.rewards, myBalance() - context().value - self.minTonForStorage - mr.rewards);
            send(SendParameters{
                to: sender(),
                bounce: true,
                value: matchBalance,
                mode: SendIgnoreErrors,
                body: msg2.asComment()
            });
            self.matchesResults.set(mr.id, mr);
            self.matches.set(mr.id, null);
        }
    }

    fun giveRewards(v: MatchResultMessage) {
        let mr: MatchResult = v.matchResult;
        let delete: MatchDeleteMessage = v.delete;
        let match_info: MatchInfo = self.getMatchInfo(mr.id);
        if (match_info.id1 > 0 && match_info.id2 > 0) {
            if (mr.victory_uid == match_info.uid1) {
                self.sendRewards(match_info.address1, mr, v.msg1, v.msg2);
            } else if (mr.victory_uid == match_info.uid2) {
                self.sendRewards(match_info.address2, mr, v.msg1, v.msg2);
            }
        }
    }

    fun deleteMatches(v: MatchDeleteMessage) {
        if (v.length > 0) {
            let i: Int = v.start;
            repeat (v.length) {
                self.deleteMatchInfo(v.arr.get(i)!!);
                i = i + 1;
            }
        }
    }

    receive(msg: MatchInfoMessage) {
        self.joinMatch(msg);
    }

    receive(msg: MatchResultMessage) {
        require(sender() == self.owner, "Only deployer is allowed to withdraw");
        self.giveRewards(msg);
    }

    receive(msg: MatchDeleteMessage) {
        require(sender() == self.owner, "Only deployer is allowed to withdraw");
        self.deleteMatches(msg);
        self.reply("increment refund".asComment());
    }

    receive("withdraw all") {
        require(sender() == self.owner, "Only deployer is allowed to withdraw");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    receive("withdraw safe") {
        require(sender() == self.owner, "Only deployer is allowed to withdraw");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: myBalance() - context().value - self.minTonForStorage,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    receive(msg: Withdraw) {
        require(sender() == self.owner, "Only deployer is allowed to withdraw");
        let amount: Int = min(msg.amount, myBalance() - context().value - self.minTonForStorage);
        require(amount > 0, "Insufficient balance");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amount,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    receive(msg: MinTonForStorage) {
        self.minTonForStorage = msg.minTon;
        self.reply("Setting MinTonForStorage successfully".asComment());
    }

    get fun matchInfo(match_id: Int): MatchInfo {
        return self.matches.get(match_id)!!;
    }

    get fun matchResult(match_id: Int): MatchResult {
        return self.matchesResults.get(match_id)!!;
    }

    get fun matchesCount(): Int {
        return self.matchesCount;
    }

    get fun matchesResultsCount(): Int {
        return self.matchesResultsCount;
    }

    get fun balance(): Int {
        return myBalance();
    }

    get fun minTonForStorage(): Int {
        return self.minTonForStorage;
    }
}