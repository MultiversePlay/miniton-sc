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
    prizeShare: bigint;
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
        b_0.storeUint(src.prizeShare, 8);
        b_0.storeInt(src.commissionFee, 257);
        let b_1 = new Builder();
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
    let _prizeShare = sc_0.loadUintBig(8);
    let _commissionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
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
    let _prizeShare = source.readBigNumber();
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
    builder.writeNumber(source.prizeShare);
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
    matchInfo: MatchInfo;
}

export function storeMatchInfoMsg(src: MatchInfoMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(624786263, 32);
        b_0.store(storeMatchInfo(src.matchInfo));
    };
}

export function loadMatchInfoMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 624786263) { throw Error('Invalid prefix'); }
    let _matchInfo = loadMatchInfo(sc_0);
    return { $$type: 'MatchInfoMsg' as const, matchInfo: _matchInfo };
}

function loadTupleMatchInfoMsg(source: TupleReader) {
    const _matchInfo = loadTupleMatchInfo(source.readTuple());
    return { $$type: 'MatchInfoMsg' as const, matchInfo: _matchInfo };
}

function storeTupleMatchInfoMsg(source: MatchInfoMsg) {
    let builder = new TupleBuilder();
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
    walletAddress: Address;
    matchResults: MatchResults | null;
    commissionWalletAddress: Address | null;
}

export function storeSendPrizeMsg(src: SendPrizeMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1473647626, 32);
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
    if (sc_0.loadUint(32) !== 1473647626) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadIntBig(257);
    let _matchId = sc_0.loadUintBig(64);
    let _telegramId = sc_0.loadStringRefTail();
    let _walletAddress = sc_0.loadAddress();
    let _matchResults = sc_0.loadBit() ? loadMatchResults(sc_0) : null;
    let _commissionWalletAddress = sc_0.loadMaybeAddress();
    return { $$type: 'SendPrizeMsg' as const, seqno: _seqno, matchId: _matchId, telegramId: _telegramId, walletAddress: _walletAddress, matchResults: _matchResults, commissionWalletAddress: _commissionWalletAddress };
}

function loadTupleSendPrizeMsg(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _matchId = source.readBigNumber();
    let _telegramId = source.readString();
    let _walletAddress = source.readAddress();
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
    matchIds: Dictionary<bigint, bigint>;
}

export function storeRemoveMatchDumpMsg(src: RemoveMatchDumpMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3850765879, 32);
        b_0.storeDict(src.matchIds, Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64));
    };
}

export function loadRemoveMatchDumpMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3850765879) { throw Error('Invalid prefix'); }
    let _matchIds = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64), sc_0);
    return { $$type: 'RemoveMatchDumpMsg' as const, matchIds: _matchIds };
}

function loadTupleRemoveMatchDumpMsg(source: TupleReader) {
    let _matchIds = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64), source.readCellOpt());
    return { $$type: 'RemoveMatchDumpMsg' as const, matchIds: _matchIds };
}

function storeTupleRemoveMatchDumpMsg(source: RemoveMatchDumpMsg) {
    let builder = new TupleBuilder();
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
    value: bigint;
}

export function storeMinBalanceMsg(src: MinBalanceMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2491969653, 32);
        b_0.storeCoins(src.value);
    };
}

export function loadMinBalanceMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2491969653) { throw Error('Invalid prefix'); }
    let _value = sc_0.loadCoins();
    return { $$type: 'MinBalanceMsg' as const, value: _value };
}

function loadTupleMinBalanceMsg(source: TupleReader) {
    let _value = source.readBigNumber();
    return { $$type: 'MinBalanceMsg' as const, value: _value };
}

function storeTupleMinBalanceMsg(source: MinBalanceMsg) {
    let builder = new TupleBuilder();
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
    const __code = Cell.fromBase64('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');
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
    {"name":"MatchInfo","header":null,"fields":[{"name":"matchId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"game","type":{"kind":"simple","type":"Game","optional":false}},{"name":"players","type":{"kind":"dict","key":"int","value":"PlayerInfo","valueFormat":"ref"}},{"name":"playerCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"coin","type":{"kind":"simple","type":"string","optional":false}},{"name":"totalEntryFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prizeShare","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"commissionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rules","type":{"kind":"dict","key":"int","value":"RuleInfo","valueFormat":"ref"}},{"name":"ruleCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"winners","type":{"kind":"dict","key":"int","value":"WinnerInfo","valueFormat":"ref"}},{"name":"winnerCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MatchResults","header":null,"fields":[{"name":"winners","type":{"kind":"dict","key":"int","value":"WinnerInfo","valueFormat":"ref"}},{"name":"winnerCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MatchInfoMsg","header":624786263,"fields":[{"name":"matchInfo","type":{"kind":"simple","type":"MatchInfo","optional":false}}]},
    {"name":"SendPrizeMsg","header":1473647626,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"matchId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"telegramId","type":{"kind":"simple","type":"string","optional":false}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"matchResults","type":{"kind":"simple","type":"MatchResults","optional":true}},{"name":"commissionWalletAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RemoveMatchDumpMsg","header":3850765879,"fields":[{"name":"matchIds","type":{"kind":"dict","key":"int","value":"uint","valueFormat":64}}]},
    {"name":"WithdrawMsg","header":504816758,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MinBalanceMsg","header":2491969653,"fields":[{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
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