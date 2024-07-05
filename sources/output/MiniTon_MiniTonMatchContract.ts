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
}

function initMiniTonMatchContract_init_args(src: MiniTonMatchContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function MiniTonMatchContract_init() {
    const __code = Cell.fromBase64('te6ccgECQAEADGIAART/APSkE/S88sgLAQIBYgIDAvjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCyPhDAcx/AcoAVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAPQAEoEBAc8AAfoCye1UGAQCASAICQSy7aLt+wGSMH/gcCHXScIflTAg1wsf3iDAACLXScEhsJJbf+AgghAS8gvsuo8ZMNMfAYIQEvIL7Lry4IGBAQHXANs8EO9sH+AgghCYFKfYuuMCIIIQhpEoUrogBQYHA8CBbLf4QlYVAccF8vSBLeUPVhO6H/L0VhCBAQEuWfQNb6GSMG3fIG6SMG2Oh9DbPGwebw7ibrMtVbGBAQEREMhV0Ns8yRZDMCBulTBZ9FowlEEz9BXiA8AAkwGkAd7bPH8gNDoCEDDbPGwW2zx/HR4Epo6YMNMfAYIQhpEoUrry4IGBAQHXAPQEWWwS4CCCEB4W5Ha6jpsw0x8BghAeFuR2uvLggYEBAdcA+gBZbBLbPH/gIIIQBJOXVbrjAiCCEJRqmLa6NTY3OAIBIAoLAgEgERICAUgMDQIRuMl9s82zxsUYGBACEbBwds82zxsUYBgOAhGwkrbPNs8bFGAYDwACIQACIAACIwIBIBMUAgFIGxwCASAVFgCVt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQAlGwpfbPFUE2zxsUSBukjBtjhAgbvLQgG8uUMtvAgtVCW8N4iBukjBt3oBgXAhGxsDbPNs8bFGAYGQE6gQEBJAJZ9A1voZIwbd8gbpIwbY6H0Ns8bB5vDuIgAZrtRNDUAfhj0gABjjL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA9ASBAQHXAPoAVUBsFeAw+CjXCwqDCbry4InbPBoACPgnbxAAGPhCggr68IBwIG1AEwARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1XVDJkVFJpb0R2SlZMZ3BtYmdSSnpQMWRqSGg1SHc0ZXROSkF6Wlo0VHJ0ZoIAGq0x8BghCYFKfYuvLggYEBAdcA0z/UAdABINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdIAAZf0BNMfWW8CkW3iAR8EyIFst/hCUsDHBfL0gS3lU2q68vSCAJ5SKYEBASdZ9A1voZIwbd8gbpIwbY6H0Ns8bB5vDuJus/L0KIEBASZZ9A1voZIwbd8gbpIwbY6H0Ns8bB5vDuIgbvLQgG8uIsAA4wAiwAEgICEiAGQg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIWFRRDMABs0z/TH9QB0BIC9ATTH9QB0AH6ANQB0NQB0AGBAQHXAPQE0x/TB/QE0x8wEH4QfRB7EHoQeRB4AYQREhEYERIREREXEREREBEWERAPERUPDhEUDlYTVhlWGVYZVhlWGds8ERIRGBESERERFxERERARFhEQDxEVDw4RFA4jBNSOwhESERgREhERERcREREQERYREA8RFQ8OERQOVhNWGVYZVhlWGVYZ2zwREhEYERIREREXEREREBEWERAPERUPDhEUDt4iwgCOmA0REw0MERIMCxERCwoREAoQnxCOVVfbPJRfD18F4ts8JSY6JwL2GF8IM4IA4jEjbrPy9AIgbvLQgG8icCKBAQH0hW+lIJESlTFtMm0B4pCOsyBukjBtjofQ2zxsFm8G4iBu8tCAbyYVXwUSoIEBAVREE1n0eG+lIJQC1DBYlTFtMm0B4uhbUmChgTzsIcIA8vRxgQEBVH7cVH7cVH7YVH76KiQBRlYQVhDIVdDbPMkCERICUvAgbpUwWfRaMJRBM/QV4hEQUFITNAE8bFEgbrOOlCbCAJn4J28QJ6FWELyRcOKRMOMNkTDiKAPuW2wiggDNxYsIIwH5AQH5Ab2TIW6zkXDi8vRwJIEBAfSFb6UgkRKVMW0ybQHikI87IG6SMG2Oh9DbPGwWbwbiIG7y0IBvJlOVAfkBAfkBupJfBuMNgQEBJgJZ9HhvpSCUAtQwWJUxbTJtAeLoECRfBMD/kl8O4w0qKywCEIj4QgF/bds8PD0EWDPIbwABb4xtb4yNBVNYXRjaCBDb21taXNzaW9uRmVlICiDbPC7bPNs8ixKYMS8xKQPk2zwDIG7y0IADbyIByZMhbrOWAW8iWczJ6DEGERMGBRESBQQREQQDERADEC8BERABVhMB2zxygQEBVH7cVH7cU+1WG1YbVhssVhtWHchV0Ns8yS8QNgEgbpUwWfRaMJRBM/QV4gUREgUEEREEERBPE1DiMTM0AHzUAdABINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdQB0AHTB/oA0wdVUAPyIMAAkX+TIMAD4o/p+CdvECKhVhm8jy8wMzUhwgDjACUgbvLQgAJxUGaBAQEHyFVQ2zzJRmBSYCBulTBZ9FowlEEz9BXif46qwACOoHOBAQE4yFVQ2zzJRmBSYCBulTBZ9FowlEEz9BXiBH8Bkl8F4lBV4lAFkl8G4i0uLgE+LVWxgQEBDshV0Ns8yRA1EiBulTBZ9FowlEEz9BXiAjQERshvAAFvjG1vjIvU1hdGNoIFByaXplICiNs8VhXbPNs8ixLIMS8xMACEyFAGzxbJUAbMUAMgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4shYzxbJAczLB1j6AssHAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydAEcts8I9s8ixKY2zwmIG7y0IABbyIByZMhbrOWAW8iWczJ6DEGERsGBREaBQQRGQQDERgDAhEXAlYYATExMTIAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwEo2zwEERkEAxEYAwIRFwIBERYBERUzARRwWXMBEDRtbds8PgCGUN7LP0C6AssfyFjPFskBzBf0ABXLH8hQBM8WyVADzAH6AsjIUAPPFslYzBKBAQHPABL0ABLLHxLLBxL0ABLLH8kBzAPYgWy3+EJSgMcF8vSBLeVRJroS8vQggQEBgEBZ9IRvpSCWUCPXATBYlmwhbTJtAeKQjixQBYEBAfRawP+TA6UD3oEBAVRCFoBAQTP0eG+lIJZQI9cBMFiWbCFtMm0B4uhfA9s8iPhCAX9t2zx/Ojw9BGKBbLf4QlKAxwXy9IFE9lEmuhLy9IIA2Sf4J28QI6EivvL0+EJ/WHMQI21tbds82zyIPjo8OQNuMNMfAYIQBJOXVbry4IGBAQHXAPoAWWwSMoFst/hCUnDHBfL0gS3lURW68vTbPIj4QgF/bds8fzo8PQJkjqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXA9OwEO+EIBf23bPD0AHiOCEDuaygC+knA03gOkAwOY+QGC8F5RffHfx1svLBdOk6Ujm1AswDrmw5uyps+BEGCxBP+guo+kgWy3+EJSYMcF8vT4Qn9wgQCCECNtbW3bPIj4QgF/bds8f9sx4D48PQAIAAAAAAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zw+AcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AD8AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMw=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMiniTonMatchContract_init_args({ $$type: 'MiniTonMatchContract_init_args' })(builder);
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
    11749: { message: `Invalid sequence number` },
    15596: { message: `totalPrize cannot be greater than or equal to totalEntryFee` },
    17654: { message: `Invalid seqno` },
    27831: { message: `Only owner can call this function` },
    40530: { message: `This match was not found` },
    52677: { message: `Invalid playerInfo` },
    55591: { message: `Insufficient contract balance` },
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
    {"name":"MatchInfoMsg","header":317852652,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"matchInfo","type":{"kind":"simple","type":"MatchInfo","optional":false}}]},
    {"name":"SendPrizeMsg","header":2551490520,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"matchId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"telegramId","type":{"kind":"simple","type":"string","optional":false}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"matchResults","type":{"kind":"simple","type":"MatchResults","optional":true}},{"name":"commissionWalletAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RemoveMatchDumpMsg","header":2257659986,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"matchIds","type":{"kind":"dict","key":"int","value":"uint","valueFormat":64}}]},
    {"name":"WithdrawMsg","header":504816758,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MinBalanceMsg","header":76781397,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const MiniTonMatchContract_getters: ABIGetter[] = [
    {"name":"seqno","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"minBalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"matchInfo","arguments":[{"name":"matchId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"MatchInfo","optional":true}},
    {"name":"matchCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const MiniTonMatchContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MatchInfoMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendPrizeMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveMatchDumpMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawMsg"}},
    {"receiver":"internal","message":{"kind":"text","text":"Withdraw all"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MinBalanceMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class MiniTonMatchContract implements Contract {
    
    static async init() {
        return await MiniTonMatchContract_init();
    }
    
    static async fromInit() {
        const init = await MiniTonMatchContract_init();
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | MatchInfoMsg | SendPrizeMsg | RemoveMatchDumpMsg | WithdrawMsg | 'Withdraw all' | MinBalanceMsg | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MatchInfoMsg') {
            body = beginCell().store(storeMatchInfoMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendPrizeMsg') {
            body = beginCell().store(storeSendPrizeMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveMatchDumpMsg') {
            body = beginCell().store(storeRemoveMatchDumpMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawMsg') {
            body = beginCell().store(storeWithdrawMsg(message)).endCell();
        }
        if (message === 'Withdraw all') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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