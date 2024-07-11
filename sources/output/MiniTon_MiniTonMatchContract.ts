import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Game = {
    $$type: 'Game';
    id: bigint;
    name: string;
}

export function storeGame(src: Game) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeStringRefTail(src.name);
    };
}

export function loadGame(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _name = sc_0.loadStringRefTail();
    return { $$type: 'Game' as const, id: _id, name: _name };
}

function loadTupleGame(source: TupleReader) {
    let _id = source.readBigNumber();
    let _name = source.readString();
    return { $$type: 'Game' as const, id: _id, name: _name };
}

function storeTupleGame(source: Game) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeString(source.name);
    return builder.build();
}

function dictValueParserGame(): DictionaryValue<Game> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGame(src)).endCell());
        },
        parse: (src) => {
            return loadGame(src.loadRef().beginParse());
        }
    }
}

export type PlayerInfo = {
    $$type: 'PlayerInfo';
    telegramId: string;
    walletAddress: Address | null;
}

export function storePlayerInfo(src: PlayerInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.telegramId);
        b_0.storeAddress(src.walletAddress);
    };
}

export function loadPlayerInfo(slice: Slice) {
    let sc_0 = slice;
    let _telegramId = sc_0.loadStringRefTail();
    let _walletAddress = sc_0.loadMaybeAddress();
    return { $$type: 'PlayerInfo' as const, telegramId: _telegramId, walletAddress: _walletAddress };
}

function loadTuplePlayerInfo(source: TupleReader) {
    let _telegramId = source.readString();
    let _walletAddress = source.readAddressOpt();
    return { $$type: 'PlayerInfo' as const, telegramId: _telegramId, walletAddress: _walletAddress };
}

function storeTuplePlayerInfo(source: PlayerInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.telegramId);
    builder.writeAddress(source.walletAddress);
    return builder.build();
}

function dictValueParserPlayerInfo(): DictionaryValue<PlayerInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePlayerInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPlayerInfo(src.loadRef().beginParse());
        }
    }
}

export type RuleInfo = {
    $$type: 'RuleInfo';
    name: string;
    value: string;
}

export function storeRuleInfo(src: RuleInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.value);
    };
}

export function loadRuleInfo(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _value = sc_0.loadStringRefTail();
    return { $$type: 'RuleInfo' as const, name: _name, value: _value };
}

function loadTupleRuleInfo(source: TupleReader) {
    let _name = source.readString();
    let _value = source.readString();
    return { $$type: 'RuleInfo' as const, name: _name, value: _value };
}

function storeTupleRuleInfo(source: RuleInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.value);
    return builder.build();
}

function dictValueParserRuleInfo(): DictionaryValue<RuleInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRuleInfo(src)).endCell());
        },
        parse: (src) => {
            return loadRuleInfo(src.loadRef().beginParse());
        }
    }
}

export type WinnerInfo = {
    $$type: 'WinnerInfo';
    telegramId: string;
    walletAddress: Address | null;
    score: string;
    ranking: bigint;
    prizeWon: bigint;
    prizeSentStatus: bigint;
}

export function storeWinnerInfo(src: WinnerInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.telegramId);
        b_0.storeAddress(src.walletAddress);
        b_0.storeStringRefTail(src.score);
        b_0.storeUint(src.ranking, 8);
        b_0.storeCoins(src.prizeWon);
        b_0.storeUint(src.prizeSentStatus, 8);
    };
}

export function loadWinnerInfo(slice: Slice) {
    let sc_0 = slice;
    let _telegramId = sc_0.loadStringRefTail();
    let _walletAddress = sc_0.loadMaybeAddress();
    let _score = sc_0.loadStringRefTail();
    let _ranking = sc_0.loadUintBig(8);
    let _prizeWon = sc_0.loadCoins();
    let _prizeSentStatus = sc_0.loadUintBig(8);
    return { $$type: 'WinnerInfo' as const, telegramId: _telegramId, walletAddress: _walletAddress, score: _score, ranking: _ranking, prizeWon: _prizeWon, prizeSentStatus: _prizeSentStatus };
}

function loadTupleWinnerInfo(source: TupleReader) {
    let _telegramId = source.readString();
    let _walletAddress = source.readAddressOpt();
    let _score = source.readString();
    let _ranking = source.readBigNumber();
    let _prizeWon = source.readBigNumber();
    let _prizeSentStatus = source.readBigNumber();
    return { $$type: 'WinnerInfo' as const, telegramId: _telegramId, walletAddress: _walletAddress, score: _score, ranking: _ranking, prizeWon: _prizeWon, prizeSentStatus: _prizeSentStatus };
}

function storeTupleWinnerInfo(source: WinnerInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.telegramId);
    builder.writeAddress(source.walletAddress);
    builder.writeString(source.score);
    builder.writeNumber(source.ranking);
    builder.writeNumber(source.prizeWon);
    builder.writeNumber(source.prizeSentStatus);
    return builder.build();
}

function dictValueParserWinnerInfo(): DictionaryValue<WinnerInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWinnerInfo(src)).endCell());
        },
        parse: (src) => {
            return loadWinnerInfo(src.loadRef().beginParse());
        }
    }
}

export type MatchInfo = {
    $$type: 'MatchInfo';
    matchId: bigint;
    game: Game;
    players: Dictionary<bigint, PlayerInfo>;
    playerCount: bigint;
    coin: string;
    totalEntryFee: bigint;
    prizeShare: string;
    commissionFee: bigint;
    rules: Dictionary<bigint, RuleInfo>;
    ruleCount: bigint;
    status: bigint;
    winners: Dictionary<bigint, WinnerInfo>;
    winnerCount: bigint;
}

export function storeMatchInfo(src: MatchInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.matchId, 64);
        b_0.store(storeGame(src.game));
        b_0.storeDict(src.players, Dictionary.Keys.BigInt(257), dictValueParserPlayerInfo());
        b_0.storeUint(src.playerCount, 32);
        b_0.storeStringRefTail(src.coin);
        b_0.storeCoins(src.totalEntryFee);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.prizeShare);
        b_1.storeInt(src.commissionFee, 257);
        b_1.storeDict(src.rules, Dictionary.Keys.BigInt(257), dictValueParserRuleInfo());
        b_1.storeUint(src.ruleCount, 32);
        b_1.storeUint(src.status, 8);
        b_1.storeDict(src.winners, Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo());
        b_1.storeUint(src.winnerCount, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMatchInfo(slice: Slice) {
    let sc_0 = slice;
    let _matchId = sc_0.loadUintBig(64);
    let _game = loadGame(sc_0);
    let _players = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPlayerInfo(), sc_0);
    let _playerCount = sc_0.loadUintBig(32);
    let _coin = sc_0.loadStringRefTail();
    let _totalEntryFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _prizeShare = sc_1.loadStringRefTail();
    let _commissionFee = sc_1.loadIntBig(257);
    let _rules = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserRuleInfo(), sc_1);
    let _ruleCount = sc_1.loadUintBig(32);
    let _status = sc_1.loadUintBig(8);
    let _winners = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo(), sc_1);
    let _winnerCount = sc_1.loadUintBig(32);
    return { $$type: 'MatchInfo' as const, matchId: _matchId, game: _game, players: _players, playerCount: _playerCount, coin: _coin, totalEntryFee: _totalEntryFee, prizeShare: _prizeShare, commissionFee: _commissionFee, rules: _rules, ruleCount: _ruleCount, status: _status, winners: _winners, winnerCount: _winnerCount };
}

function loadTupleMatchInfo(source: TupleReader) {
    let _matchId = source.readBigNumber();
    const _game = loadTupleGame(source.readTuple());
    let _players = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPlayerInfo(), source.readCellOpt());
    let _playerCount = source.readBigNumber();
    let _coin = source.readString();
    let _totalEntryFee = source.readBigNumber();
    let _prizeShare = source.readString();
    let _commissionFee = source.readBigNumber();
    let _rules = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserRuleInfo(), source.readCellOpt());
    let _ruleCount = source.readBigNumber();
    let _status = source.readBigNumber();
    let _winners = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo(), source.readCellOpt());
    let _winnerCount = source.readBigNumber();
    return { $$type: 'MatchInfo' as const, matchId: _matchId, game: _game, players: _players, playerCount: _playerCount, coin: _coin, totalEntryFee: _totalEntryFee, prizeShare: _prizeShare, commissionFee: _commissionFee, rules: _rules, ruleCount: _ruleCount, status: _status, winners: _winners, winnerCount: _winnerCount };
}

function storeTupleMatchInfo(source: MatchInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.matchId);
    builder.writeTuple(storeTupleGame(source.game));
    builder.writeCell(source.players.size > 0 ? beginCell().storeDictDirect(source.players, Dictionary.Keys.BigInt(257), dictValueParserPlayerInfo()).endCell() : null);
    builder.writeNumber(source.playerCount);
    builder.writeString(source.coin);
    builder.writeNumber(source.totalEntryFee);
    builder.writeString(source.prizeShare);
    builder.writeNumber(source.commissionFee);
    builder.writeCell(source.rules.size > 0 ? beginCell().storeDictDirect(source.rules, Dictionary.Keys.BigInt(257), dictValueParserRuleInfo()).endCell() : null);
    builder.writeNumber(source.ruleCount);
    builder.writeNumber(source.status);
    builder.writeCell(source.winners.size > 0 ? beginCell().storeDictDirect(source.winners, Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo()).endCell() : null);
    builder.writeNumber(source.winnerCount);
    return builder.build();
}

function dictValueParserMatchInfo(): DictionaryValue<MatchInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMatchInfo(src)).endCell());
        },
        parse: (src) => {
            return loadMatchInfo(src.loadRef().beginParse());
        }
    }
}

export type MatchResults = {
    $$type: 'MatchResults';
    winners: Dictionary<bigint, WinnerInfo>;
    winnerCount: bigint;
}

export function storeMatchResults(src: MatchResults) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.winners, Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo());
        b_0.storeUint(src.winnerCount, 32);
    };
}

export function loadMatchResults(slice: Slice) {
    let sc_0 = slice;
    let _winners = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo(), sc_0);
    let _winnerCount = sc_0.loadUintBig(32);
    return { $$type: 'MatchResults' as const, winners: _winners, winnerCount: _winnerCount };
}

function loadTupleMatchResults(source: TupleReader) {
    let _winners = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo(), source.readCellOpt());
    let _winnerCount = source.readBigNumber();
    return { $$type: 'MatchResults' as const, winners: _winners, winnerCount: _winnerCount };
}

function storeTupleMatchResults(source: MatchResults) {
    let builder = new TupleBuilder();
    builder.writeCell(source.winners.size > 0 ? beginCell().storeDictDirect(source.winners, Dictionary.Keys.BigInt(257), dictValueParserWinnerInfo()).endCell() : null);
    builder.writeNumber(source.winnerCount);
    return builder.build();
}

function dictValueParserMatchResults(): DictionaryValue<MatchResults> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMatchResults(src)).endCell());
        },
        parse: (src) => {
            return loadMatchResults(src.loadRef().beginParse());
        }
    }
}

export type MasterActionRequest = {
    $$type: 'MasterActionRequest';
    id: bigint;
    action: bigint;
    timeout: bigint;
    status: bigint;
    weight: bigint;
    amount: bigint;
    address: Address;
    voters: Dictionary<Address, boolean>;
}

export function storeMasterActionRequest(src: MasterActionRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeUint(src.action, 8);
        b_0.storeUint(src.timeout, 32);
        b_0.storeUint(src.status, 8);
        b_0.storeUint(src.weight, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.address);
        b_0.storeDict(src.voters, Dictionary.Keys.Address(), Dictionary.Values.Bool());
    };
}

export function loadMasterActionRequest(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    let _action = sc_0.loadUintBig(8);
    let _timeout = sc_0.loadUintBig(32);
    let _status = sc_0.loadUintBig(8);
    let _weight = sc_0.loadUintBig(32);
    let _amount = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    let _voters = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    return { $$type: 'MasterActionRequest' as const, id: _id, action: _action, timeout: _timeout, status: _status, weight: _weight, amount: _amount, address: _address, voters: _voters };
}

function loadTupleMasterActionRequest(source: TupleReader) {
    let _id = source.readBigNumber();
    let _action = source.readBigNumber();
    let _timeout = source.readBigNumber();
    let _status = source.readBigNumber();
    let _weight = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _address = source.readAddress();
    let _voters = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'MasterActionRequest' as const, id: _id, action: _action, timeout: _timeout, status: _status, weight: _weight, amount: _amount, address: _address, voters: _voters };
}

function storeTupleMasterActionRequest(source: MasterActionRequest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.action);
    builder.writeNumber(source.timeout);
    builder.writeNumber(source.status);
    builder.writeNumber(source.weight);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.address);
    builder.writeCell(source.voters.size > 0 ? beginCell().storeDictDirect(source.voters, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    return builder.build();
}

function dictValueParserMasterActionRequest(): DictionaryValue<MasterActionRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMasterActionRequest(src)).endCell());
        },
        parse: (src) => {
            return loadMasterActionRequest(src.loadRef().beginParse());
        }
    }
}

export type MasterActionRequestMsg = {
    $$type: 'MasterActionRequestMsg';
    seqno: bigint;
    request: MasterActionRequest;
}

export function storeMasterActionRequestMsg(src: MasterActionRequestMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2781662770, 32);
        b_0.storeInt(src.seqno, 257);
        let b_1 = new Builder();
        b_1.store(storeMasterActionRequest(src.request));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMasterActionRequestMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2781662770) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _request = loadMasterActionRequest(sc_1);
    return { $$type: 'MasterActionRequestMsg' as const, seqno: _seqno, request: _request };
}

function loadTupleMasterActionRequestMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    const _request = loadTupleMasterActionRequest(source.readTuple());
    return { $$type: 'MasterActionRequestMsg' as const, seqno: _seqno, request: _request };
}

function storeTupleMasterActionRequestMsg(source: MasterActionRequestMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeTuple(storeTupleMasterActionRequest(source.request));
    return builder.build();
}

function dictValueParserMasterActionRequestMsg(): DictionaryValue<MasterActionRequestMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMasterActionRequestMsg(src)).endCell());
        },
        parse: (src) => {
            return loadMasterActionRequestMsg(src.loadRef().beginParse());
        }
    }
}

export type VoteMsg = {
    $$type: 'VoteMsg';
    seqno: bigint;
    requestId: bigint;
}

export function storeVoteMsg(src: VoteMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1409092501, 32);
        b_0.storeInt(src.seqno, 257);
        b_0.storeInt(src.requestId, 257);
    };
}

export function loadVoteMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1409092501) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let _requestId = sc_0.loadIntBig(257);
    return { $$type: 'VoteMsg' as const, seqno: _seqno, requestId: _requestId };
}

function loadTupleVoteMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _requestId = source.readBigNumber();
    return { $$type: 'VoteMsg' as const, seqno: _seqno, requestId: _requestId };
}

function storeTupleVoteMsg(source: VoteMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.requestId);
    return builder.build();
}

function dictValueParserVoteMsg(): DictionaryValue<VoteMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVoteMsg(src)).endCell());
        },
        parse: (src) => {
            return loadVoteMsg(src.loadRef().beginParse());
        }
    }
}

export type MatchInfoMsg = {
    $$type: 'MatchInfoMsg';
    seqno: bigint;
    matchInfo: MatchInfo;
}

export function storeMatchInfoMsg(src: MatchInfoMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(317852652, 32);
        b_0.storeInt(src.seqno, 257);
        b_0.store(storeMatchInfo(src.matchInfo));
    };
}

export function loadMatchInfoMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 317852652) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let _matchInfo = loadMatchInfo(sc_0);
    return { $$type: 'MatchInfoMsg' as const, seqno: _seqno, matchInfo: _matchInfo };
}

function loadTupleMatchInfoMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    const _matchInfo = loadTupleMatchInfo(source.readTuple());
    return { $$type: 'MatchInfoMsg' as const, seqno: _seqno, matchInfo: _matchInfo };
}

function storeTupleMatchInfoMsg(source: MatchInfoMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeTuple(storeTupleMatchInfo(source.matchInfo));
    return builder.build();
}

function dictValueParserMatchInfoMsg(): DictionaryValue<MatchInfoMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMatchInfoMsg(src)).endCell());
        },
        parse: (src) => {
            return loadMatchInfoMsg(src.loadRef().beginParse());
        }
    }
}

export type SendPrizeMsg = {
    $$type: 'SendPrizeMsg';
    seqno: bigint;
    matchId: bigint;
    telegramId: string;
    walletAddress: Address | null;
    matchResults: MatchResults | null;
    commissionWalletAddress: Address | null;
}

export function storeSendPrizeMsg(src: SendPrizeMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2551490520, 32);
        b_0.storeInt(src.seqno, 257);
        b_0.storeUint(src.matchId, 64);
        b_0.storeStringRefTail(src.telegramId);
        b_0.storeAddress(src.walletAddress);
        if (src.matchResults !== null && src.matchResults !== undefined) { b_0.storeBit(true); b_0.store(storeMatchResults(src.matchResults)); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.commissionWalletAddress);
    };
}

export function loadSendPrizeMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2551490520) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let _matchId = sc_0.loadUintBig(64);
    let _telegramId = sc_0.loadStringRefTail();
    let _walletAddress = sc_0.loadMaybeAddress();
    let _matchResults = sc_0.loadBit() ? loadMatchResults(sc_0) : null;
    let _commissionWalletAddress = sc_0.loadMaybeAddress();
    return { $$type: 'SendPrizeMsg' as const, seqno: _seqno, matchId: _matchId, telegramId: _telegramId, walletAddress: _walletAddress, matchResults: _matchResults, commissionWalletAddress: _commissionWalletAddress };
}

function loadTupleSendPrizeMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _matchId = source.readBigNumber();
    let _telegramId = source.readString();
    let _walletAddress = source.readAddressOpt();
    const _matchResults_p = source.readTupleOpt();
    const _matchResults = _matchResults_p ? loadTupleMatchResults(_matchResults_p) : null;
    let _commissionWalletAddress = source.readAddressOpt();
    return { $$type: 'SendPrizeMsg' as const, seqno: _seqno, matchId: _matchId, telegramId: _telegramId, walletAddress: _walletAddress, matchResults: _matchResults, commissionWalletAddress: _commissionWalletAddress };
}

function storeTupleSendPrizeMsg(source: SendPrizeMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.matchId);
    builder.writeString(source.telegramId);
    builder.writeAddress(source.walletAddress);
    if (source.matchResults !== null && source.matchResults !== undefined) {
        builder.writeTuple(storeTupleMatchResults(source.matchResults));
    } else {
        builder.writeTuple(null);
    }
    builder.writeAddress(source.commissionWalletAddress);
    return builder.build();
}

function dictValueParserSendPrizeMsg(): DictionaryValue<SendPrizeMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendPrizeMsg(src)).endCell());
        },
        parse: (src) => {
            return loadSendPrizeMsg(src.loadRef().beginParse());
        }
    }
}

export type RemoveMatchDumpMsg = {
    $$type: 'RemoveMatchDumpMsg';
    seqno: bigint;
    matchIds: Dictionary<bigint, bigint>;
}

export function storeRemoveMatchDumpMsg(src: RemoveMatchDumpMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2257659986, 32);
        b_0.storeInt(src.seqno, 257);
        b_0.storeDict(src.matchIds, Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64));
    };
}

export function loadRemoveMatchDumpMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2257659986) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let _matchIds = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64), sc_0);
    return { $$type: 'RemoveMatchDumpMsg' as const, seqno: _seqno, matchIds: _matchIds };
}

function loadTupleRemoveMatchDumpMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _matchIds = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64), source.readCellOpt());
    return { $$type: 'RemoveMatchDumpMsg' as const, seqno: _seqno, matchIds: _matchIds };
}

function storeTupleRemoveMatchDumpMsg(source: RemoveMatchDumpMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeCell(source.matchIds.size > 0 ? beginCell().storeDictDirect(source.matchIds, Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64)).endCell() : null);
    return builder.build();
}

function dictValueParserRemoveMatchDumpMsg(): DictionaryValue<RemoveMatchDumpMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveMatchDumpMsg(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveMatchDumpMsg(src.loadRef().beginParse());
        }
    }
}

export type WithdrawMsg = {
    $$type: 'WithdrawMsg';
    seqno: bigint;
    amount: bigint;
}

export function storeWithdrawMsg(src: WithdrawMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(504816758, 32);
        b_0.storeInt(src.seqno, 257);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 504816758) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawMsg' as const, seqno: _seqno, amount: _amount };
}

function loadTupleWithdrawMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawMsg' as const, seqno: _seqno, amount: _amount };
}

function storeTupleWithdrawMsg(source: WithdrawMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawMsg(): DictionaryValue<WithdrawMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawMsg(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawMsg(src.loadRef().beginParse());
        }
    }
}

export type MinBalanceMsg = {
    $$type: 'MinBalanceMsg';
    seqno: bigint;
    value: bigint;
}

export function storeMinBalanceMsg(src: MinBalanceMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(76781397, 32);
        b_0.storeInt(src.seqno, 257);
        b_0.storeCoins(src.value);
    };
}

export function loadMinBalanceMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 76781397) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let _value = sc_0.loadCoins();
    return { $$type: 'MinBalanceMsg' as const, seqno: _seqno, value: _value };
}

function loadTupleMinBalanceMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _value = source.readBigNumber();
    return { $$type: 'MinBalanceMsg' as const, seqno: _seqno, value: _value };
}

function storeTupleMinBalanceMsg(source: MinBalanceMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserMinBalanceMsg(): DictionaryValue<MinBalanceMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMinBalanceMsg(src)).endCell());
        },
        parse: (src) => {
            return loadMinBalanceMsg(src.loadRef().beginParse());
        }
    }
}

 type MiniTonMatchContract_init_args = {
    $$type: 'MiniTonMatchContract_init_args';
    weightRequired: bigint;
    voters: Dictionary<Address, boolean>;
}

function initMiniTonMatchContract_init_args(src: MiniTonMatchContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.weightRequired, 257);
        b_0.storeDict(src.voters, Dictionary.Keys.Address(), Dictionary.Values.Bool());
    };
}

async function MiniTonMatchContract_init(weightRequired: bigint, voters: Dictionary<Address, boolean>) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMiniTonMatchContract_init_args({ $$type: 'MiniTonMatchContract_init_args', weightRequired, voters })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MiniTonMatchContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    5370: { message: `Balance is not enough` },
    6331: { message: `Can not found this request` },
    11749: { message: `Invalid sequence number` },
    15596: { message: `totalPrize cannot be greater than or equal to totalEntryFee` },
    22944: { message: `Only voter can call this function` },
    26033: { message: `This id is already exists` },
    27831: { message: `Only owner can call this function` },
    40530: { message: `This match was not found` },
    52677: { message: `Invalid playerInfo` },
    57905: { message: `matchResults is invalid` },
}

const MiniTonMatchContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Game","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"PlayerInfo","header":null,"fields":[{"name":"telegramId","type":{"kind":"simple","type":"string","optional":false}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RuleInfo","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"value","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"WinnerInfo","header":null,"fields":[{"name":"telegramId","type":{"kind":"simple","type":"string","optional":false}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"score","type":{"kind":"simple","type":"string","optional":false}},{"name":"ranking","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"prizeWon","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prizeSentStatus","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"MatchInfo","header":null,"fields":[{"name":"matchId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"game","type":{"kind":"simple","type":"Game","optional":false}},{"name":"players","type":{"kind":"dict","key":"int","value":"PlayerInfo","valueFormat":"ref"}},{"name":"playerCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"coin","type":{"kind":"simple","type":"string","optional":false}},{"name":"totalEntryFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prizeShare","type":{"kind":"simple","type":"string","optional":false}},{"name":"commissionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rules","type":{"kind":"dict","key":"int","value":"RuleInfo","valueFormat":"ref"}},{"name":"ruleCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"winners","type":{"kind":"dict","key":"int","value":"WinnerInfo","valueFormat":"ref"}},{"name":"winnerCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MatchResults","header":null,"fields":[{"name":"winners","type":{"kind":"dict","key":"int","value":"WinnerInfo","valueFormat":"ref"}},{"name":"winnerCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MasterActionRequest","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"action","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"timeout","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"weight","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"voters","type":{"kind":"dict","key":"address","value":"bool"}}]},
    {"name":"MasterActionRequestMsg","header":2781662770,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"request","type":{"kind":"simple","type":"MasterActionRequest","optional":false}}]},
    {"name":"VoteMsg","header":1409092501,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"requestId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MatchInfoMsg","header":317852652,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"matchInfo","type":{"kind":"simple","type":"MatchInfo","optional":false}}]},
    {"name":"SendPrizeMsg","header":2551490520,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"matchId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"telegramId","type":{"kind":"simple","type":"string","optional":false}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"matchResults","type":{"kind":"simple","type":"MatchResults","optional":true}},{"name":"commissionWalletAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RemoveMatchDumpMsg","header":2257659986,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"matchIds","type":{"kind":"dict","key":"int","value":"uint","valueFormat":64}}]},
    {"name":"WithdrawMsg","header":504816758,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MinBalanceMsg","header":76781397,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const MiniTonMatchContract_getters: ABIGetter[] = [
    {"name":"seqno","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"masterRequest","arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"MasterActionRequest","optional":true}},
    {"name":"minBalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"matchInfo","arguments":[{"name":"matchId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"MatchInfo","optional":true}},
    {"name":"matchCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const MiniTonMatchContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MatchInfoMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MasterActionRequestMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"VoteMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendPrizeMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveMatchDumpMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MinBalanceMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class MiniTonMatchContract implements Contract {
    
    static async init(weightRequired: bigint, voters: Dictionary<Address, boolean>) {
        return await MiniTonMatchContract_init(weightRequired, voters);
    }
    
    static async fromInit(weightRequired: bigint, voters: Dictionary<Address, boolean>) {
        const init = await MiniTonMatchContract_init(weightRequired, voters);
        const address = contractAddress(0, init);
        return new MiniTonMatchContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MiniTonMatchContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MiniTonMatchContract_types,
        getters: MiniTonMatchContract_getters,
        receivers: MiniTonMatchContract_receivers,
        errors: MiniTonMatchContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | MatchInfoMsg | MasterActionRequestMsg | VoteMsg | SendPrizeMsg | RemoveMatchDumpMsg | MinBalanceMsg | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MatchInfoMsg') {
            body = beginCell().store(storeMatchInfoMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MasterActionRequestMsg') {
            body = beginCell().store(storeMasterActionRequestMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'VoteMsg') {
            body = beginCell().store(storeVoteMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendPrizeMsg') {
            body = beginCell().store(storeSendPrizeMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveMatchDumpMsg') {
            body = beginCell().store(storeRemoveMatchDumpMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MinBalanceMsg') {
            body = beginCell().store(storeMinBalanceMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getSeqno(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('seqno', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMasterRequest(provider: ContractProvider, id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(id);
        let source = (await provider.get('masterRequest', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleMasterActionRequest(result_p) : null;
        return result;
    }
    
    async getMinBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('minBalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMatchInfo(provider: ContractProvider, matchId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(matchId);
        let source = (await provider.get('matchInfo', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleMatchInfo(result_p) : null;
        return result;
    }
    
    async getMatchCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('matchCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}