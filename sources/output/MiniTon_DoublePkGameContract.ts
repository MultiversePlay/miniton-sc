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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type MatchInfo = {
    $$type: 'MatchInfo';
    id1: bigint;
    uid1: bigint;
    address1: Address;
    status1: bigint;
    id2: bigint;
    uid2: bigint;
    address2: Address;
    status2: bigint;
    amount: bigint;
    rewards: bigint;
    time: bigint;
}

export function storeMatchInfo(src: MatchInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id1, 32);
        b_0.storeUint(src.uid1, 64);
        b_0.storeAddress(src.address1);
        b_0.storeUint(src.status1, 8);
        b_0.storeUint(src.id2, 32);
        b_0.storeUint(src.uid2, 64);
        b_0.storeAddress(src.address2);
        b_0.storeUint(src.status2, 8);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.rewards);
        b_0.storeUint(src.time, 32);
    };
}

export function loadMatchInfo(slice: Slice) {
    let sc_0 = slice;
    let _id1 = sc_0.loadUintBig(32);
    let _uid1 = sc_0.loadUintBig(64);
    let _address1 = sc_0.loadAddress();
    let _status1 = sc_0.loadUintBig(8);
    let _id2 = sc_0.loadUintBig(32);
    let _uid2 = sc_0.loadUintBig(64);
    let _address2 = sc_0.loadAddress();
    let _status2 = sc_0.loadUintBig(8);
    let _amount = sc_0.loadCoins();
    let _rewards = sc_0.loadCoins();
    let _time = sc_0.loadUintBig(32);
    return { $$type: 'MatchInfo' as const, id1: _id1, uid1: _uid1, address1: _address1, status1: _status1, id2: _id2, uid2: _uid2, address2: _address2, status2: _status2, amount: _amount, rewards: _rewards, time: _time };
}

function loadTupleMatchInfo(source: TupleReader) {
    let _id1 = source.readBigNumber();
    let _uid1 = source.readBigNumber();
    let _address1 = source.readAddress();
    let _status1 = source.readBigNumber();
    let _id2 = source.readBigNumber();
    let _uid2 = source.readBigNumber();
    let _address2 = source.readAddress();
    let _status2 = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _rewards = source.readBigNumber();
    let _time = source.readBigNumber();
    return { $$type: 'MatchInfo' as const, id1: _id1, uid1: _uid1, address1: _address1, status1: _status1, id2: _id2, uid2: _uid2, address2: _address2, status2: _status2, amount: _amount, rewards: _rewards, time: _time };
}

function storeTupleMatchInfo(source: MatchInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id1);
    builder.writeNumber(source.uid1);
    builder.writeAddress(source.address1);
    builder.writeNumber(source.status1);
    builder.writeNumber(source.id2);
    builder.writeNumber(source.uid2);
    builder.writeAddress(source.address2);
    builder.writeNumber(source.status2);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.rewards);
    builder.writeNumber(source.time);
    return builder.build();
}

function dictValueParserMatchInfo(): DictionaryValue<MatchInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMatchInfo(src)).endCell());
        },
        parse: (src) => {
            return loadMatchInfo(src.loadRef().beginParse());
        }
    }
}

export type MatchInfoMessage = {
    $$type: 'MatchInfoMessage';
    id: bigint;
    match_info: MatchInfo;
}

export function storeMatchInfoMessage(src: MatchInfoMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2244588298, 32);
        b_0.storeInt(src.id, 257);
        let b_1 = new Builder();
        b_1.store(storeMatchInfo(src.match_info));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMatchInfoMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2244588298) { throw Error('Invalid prefix'); }
    let _id = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _match_info = loadMatchInfo(sc_1);
    return { $$type: 'MatchInfoMessage' as const, id: _id, match_info: _match_info };
}

function loadTupleMatchInfoMessage(source: TupleReader) {
    let _id = source.readBigNumber();
    const _match_info = loadTupleMatchInfo(source.readTuple());
    return { $$type: 'MatchInfoMessage' as const, id: _id, match_info: _match_info };
}

function storeTupleMatchInfoMessage(source: MatchInfoMessage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeTuple(storeTupleMatchInfo(source.match_info));
    return builder.build();
}

function dictValueParserMatchInfoMessage(): DictionaryValue<MatchInfoMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMatchInfoMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMatchInfoMessage(src.loadRef().beginParse());
        }
    }
}

export type MatchResult = {
    $$type: 'MatchResult';
    id: bigint;
    victory_uid: bigint;
    defeat_uid: string;
    score: string;
    total_amount: bigint;
    rewards: bigint;
    time: bigint;
}

export function storeMatchResult(src: MatchResult) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1376326952, 32);
        b_0.storeUint(src.id, 32);
        b_0.storeUint(src.victory_uid, 32);
        b_0.storeStringRefTail(src.defeat_uid);
        b_0.storeStringRefTail(src.score);
        b_0.storeCoins(src.total_amount);
        b_0.storeCoins(src.rewards);
        b_0.storeUint(src.time, 32);
    };
}

export function loadMatchResult(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1376326952) { throw Error('Invalid prefix'); }
    let _id = sc_0.loadUintBig(32);
    let _victory_uid = sc_0.loadUintBig(32);
    let _defeat_uid = sc_0.loadStringRefTail();
    let _score = sc_0.loadStringRefTail();
    let _total_amount = sc_0.loadCoins();
    let _rewards = sc_0.loadCoins();
    let _time = sc_0.loadUintBig(32);
    return { $$type: 'MatchResult' as const, id: _id, victory_uid: _victory_uid, defeat_uid: _defeat_uid, score: _score, total_amount: _total_amount, rewards: _rewards, time: _time };
}

function loadTupleMatchResult(source: TupleReader) {
    let _id = source.readBigNumber();
    let _victory_uid = source.readBigNumber();
    let _defeat_uid = source.readString();
    let _score = source.readString();
    let _total_amount = source.readBigNumber();
    let _rewards = source.readBigNumber();
    let _time = source.readBigNumber();
    return { $$type: 'MatchResult' as const, id: _id, victory_uid: _victory_uid, defeat_uid: _defeat_uid, score: _score, total_amount: _total_amount, rewards: _rewards, time: _time };
}

function storeTupleMatchResult(source: MatchResult) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.victory_uid);
    builder.writeString(source.defeat_uid);
    builder.writeString(source.score);
    builder.writeNumber(source.total_amount);
    builder.writeNumber(source.rewards);
    builder.writeNumber(source.time);
    return builder.build();
}

function dictValueParserMatchResult(): DictionaryValue<MatchResult> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMatchResult(src)).endCell());
        },
        parse: (src) => {
            return loadMatchResult(src.loadRef().beginParse());
        }
    }
}

export type MatchResultMessage = {
    $$type: 'MatchResultMessage';
    matchResult: MatchResult;
    msg1: string;
    msg2: string;
    delete: MatchDeleteMessage;
}

export function storeMatchResultMessage(src: MatchResultMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(398163858, 32);
        b_0.store(storeMatchResult(src.matchResult));
        b_0.storeStringRefTail(src.msg1);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.msg2);
        b_1.store(storeMatchDeleteMessage(src.delete));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMatchResultMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 398163858) { throw Error('Invalid prefix'); }
    let _matchResult = loadMatchResult(sc_0);
    let _msg1 = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _msg2 = sc_1.loadStringRefTail();
    let _delete = loadMatchDeleteMessage(sc_1);
    return { $$type: 'MatchResultMessage' as const, matchResult: _matchResult, msg1: _msg1, msg2: _msg2, delete: _delete };
}

function loadTupleMatchResultMessage(source: TupleReader) {
    const _matchResult = loadTupleMatchResult(source.readTuple());
    let _msg1 = source.readString();
    let _msg2 = source.readString();
    const _delete = loadTupleMatchDeleteMessage(source.readTuple());
    return { $$type: 'MatchResultMessage' as const, matchResult: _matchResult, msg1: _msg1, msg2: _msg2, delete: _delete };
}

function storeTupleMatchResultMessage(source: MatchResultMessage) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleMatchResult(source.matchResult));
    builder.writeString(source.msg1);
    builder.writeString(source.msg2);
    builder.writeTuple(storeTupleMatchDeleteMessage(source.delete));
    return builder.build();
}

function dictValueParserMatchResultMessage(): DictionaryValue<MatchResultMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMatchResultMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMatchResultMessage(src.loadRef().beginParse());
        }
    }
}

export type MatchDeleteMessage = {
    $$type: 'MatchDeleteMessage';
    arr: Dictionary<bigint, bigint>;
    length: bigint;
    start: bigint;
}

export function storeMatchDeleteMessage(src: MatchDeleteMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3160203234, 32);
        b_0.storeDict(src.arr, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeUint(src.length, 8);
        b_0.storeUint(src.start, 8);
    };
}

export function loadMatchDeleteMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3160203234) { throw Error('Invalid prefix'); }
    let _arr = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    let _length = sc_0.loadUintBig(8);
    let _start = sc_0.loadUintBig(8);
    return { $$type: 'MatchDeleteMessage' as const, arr: _arr, length: _length, start: _start };
}

function loadTupleMatchDeleteMessage(source: TupleReader) {
    let _arr = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _length = source.readBigNumber();
    let _start = source.readBigNumber();
    return { $$type: 'MatchDeleteMessage' as const, arr: _arr, length: _length, start: _start };
}

function storeTupleMatchDeleteMessage(source: MatchDeleteMessage) {
    let builder = new TupleBuilder();
    builder.writeCell(source.arr.size > 0 ? beginCell().storeDictDirect(source.arr, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.length);
    builder.writeNumber(source.start);
    return builder.build();
}

function dictValueParserMatchDeleteMessage(): DictionaryValue<MatchDeleteMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMatchDeleteMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMatchDeleteMessage(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type MinTonForStorage = {
    $$type: 'MinTonForStorage';
    minTon: bigint;
}

export function storeMinTonForStorage(src: MinTonForStorage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2357442421, 32);
        b_0.storeCoins(src.minTon);
    };
}

export function loadMinTonForStorage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2357442421) { throw Error('Invalid prefix'); }
    let _minTon = sc_0.loadCoins();
    return { $$type: 'MinTonForStorage' as const, minTon: _minTon };
}

function loadTupleMinTonForStorage(source: TupleReader) {
    let _minTon = source.readBigNumber();
    return { $$type: 'MinTonForStorage' as const, minTon: _minTon };
}

function storeTupleMinTonForStorage(source: MinTonForStorage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.minTon);
    return builder.build();
}

function dictValueParserMinTonForStorage(): DictionaryValue<MinTonForStorage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMinTonForStorage(src)).endCell());
        },
        parse: (src) => {
            return loadMinTonForStorage(src.loadRef().beginParse());
        }
    }
}

 type DoublePkGameContract_init_args = {
    $$type: 'DoublePkGameContract_init_args';
}

function initDoublePkGameContract_init_args(src: DoublePkGameContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function DoublePkGameContract_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDoublePkGameContract_init_args({ $$type: 'DoublePkGameContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DoublePkGameContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
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
    15509: { message: `Only deployer is allowed to withdraw` },
    47204: { message: `Only deployer is allowed to Init Match` },
    54615: { message: `Insufficient balance` },
    61082: { message: `The players are full` },
}

const DoublePkGameContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MatchInfo","header":null,"fields":[{"name":"id1","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"uid1","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address1","type":{"kind":"simple","type":"address","optional":false}},{"name":"status1","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"id2","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"uid2","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address2","type":{"kind":"simple","type":"address","optional":false}},{"name":"status2","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rewards","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"time","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MatchInfoMessage","header":2244588298,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"match_info","type":{"kind":"simple","type":"MatchInfo","optional":false}}]},
    {"name":"MatchResult","header":1376326952,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"victory_uid","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"defeat_uid","type":{"kind":"simple","type":"string","optional":false}},{"name":"score","type":{"kind":"simple","type":"string","optional":false}},{"name":"total_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rewards","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"time","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MatchResultMessage","header":398163858,"fields":[{"name":"matchResult","type":{"kind":"simple","type":"MatchResult","optional":false}},{"name":"msg1","type":{"kind":"simple","type":"string","optional":false}},{"name":"msg2","type":{"kind":"simple","type":"string","optional":false}},{"name":"delete","type":{"kind":"simple","type":"MatchDeleteMessage","optional":false}}]},
    {"name":"MatchDeleteMessage","header":3160203234,"fields":[{"name":"arr","type":{"kind":"dict","key":"int","value":"int"}},{"name":"length","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"start","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MinTonForStorage","header":2357442421,"fields":[{"name":"minTon","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const DoublePkGameContract_getters: ABIGetter[] = [
    {"name":"matchInfo","arguments":[{"name":"match_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"MatchInfo","optional":false}},
    {"name":"matchResult","arguments":[{"name":"match_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"MatchResult","optional":false}},
    {"name":"matchesCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"matchesResultsCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"minTonForStorage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const DoublePkGameContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"MatchInfoMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MatchResultMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MatchDeleteMessage"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw all"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MinTonForStorage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class DoublePkGameContract implements Contract {
    
    static async init() {
        return await DoublePkGameContract_init();
    }
    
    static async fromInit() {
        const init = await DoublePkGameContract_init();
        const address = contractAddress(0, init);
        return new DoublePkGameContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DoublePkGameContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DoublePkGameContract_types,
        getters: DoublePkGameContract_getters,
        receivers: DoublePkGameContract_receivers,
        errors: DoublePkGameContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: MatchInfoMessage | MatchResultMessage | MatchDeleteMessage | 'withdraw all' | 'withdraw safe' | Withdraw | MinTonForStorage | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MatchInfoMessage') {
            body = beginCell().store(storeMatchInfoMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MatchResultMessage') {
            body = beginCell().store(storeMatchResultMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MatchDeleteMessage') {
            body = beginCell().store(storeMatchDeleteMessage(message)).endCell();
        }
        if (message === 'withdraw all') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MinTonForStorage') {
            body = beginCell().store(storeMinTonForStorage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMatchInfo(provider: ContractProvider, match_id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(match_id);
        let source = (await provider.get('matchInfo', builder.build())).stack;
        const result = loadTupleMatchInfo(source);
        return result;
    }
    
    async getMatchResult(provider: ContractProvider, match_id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(match_id);
        let source = (await provider.get('matchResult', builder.build())).stack;
        const result = loadTupleMatchResult(source);
        return result;
    }
    
    async getMatchesCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('matchesCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMatchesResultsCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('matchesResultsCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMinTonForStorage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('minTonForStorage', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}