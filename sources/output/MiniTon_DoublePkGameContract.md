# TACT Compilation Report
Contract: DoublePkGameContract
BOC Size: 2901 bytes

# Types
Total Types: 13

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## MatchInfo
TLB: `_ id1:uint32 uid1:uint64 address1:address status1:uint8 id2:uint32 uid2:uint64 address2:address status2:uint8 amount:coins rewards:coins time:uint32 = MatchInfo`
Signature: `MatchInfo{id1:uint32,uid1:uint64,address1:address,status1:uint8,id2:uint32,uid2:uint64,address2:address,status2:uint8,amount:coins,rewards:coins,time:uint32}`

## MatchInfoMessage
TLB: `match_info_message#85c9b30a id:int257 match_info:MatchInfo{id1:uint32,uid1:uint64,address1:address,status1:uint8,id2:uint32,uid2:uint64,address2:address,status2:uint8,amount:coins,rewards:coins,time:uint32} = MatchInfoMessage`
Signature: `MatchInfoMessage{id:int257,match_info:MatchInfo{id1:uint32,uid1:uint64,address1:address,status1:uint8,id2:uint32,uid2:uint64,address2:address,status2:uint8,amount:coins,rewards:coins,time:uint32}}`

## MatchResult
TLB: `match_result#52091528 id:uint32 victory_uid:uint32 defeat_uid:^string score:^string total_amount:coins rewards:coins time:uint32 = MatchResult`
Signature: `MatchResult{id:uint32,victory_uid:uint32,defeat_uid:^string,score:^string,total_amount:coins,rewards:coins,time:uint32}`

## MatchResultMessage
TLB: `match_result_message#17bb7f92 matchResult:MatchResult{id:uint32,victory_uid:uint32,defeat_uid:^string,score:^string,total_amount:coins,rewards:coins,time:uint32} msg1:^string msg2:^string delete:MatchDeleteMessage{arr:dict<int, int>,length:uint8,start:uint8} = MatchResultMessage`
Signature: `MatchResultMessage{matchResult:MatchResult{id:uint32,victory_uid:uint32,defeat_uid:^string,score:^string,total_amount:coins,rewards:coins,time:uint32},msg1:^string,msg2:^string,delete:MatchDeleteMessage{arr:dict<int, int>,length:uint8,start:uint8}}`

## MatchDeleteMessage
TLB: `match_delete_message#bc5cdfe2 arr:dict<int, int> length:uint8 start:uint8 = MatchDeleteMessage`
Signature: `MatchDeleteMessage{arr:dict<int, int>,length:uint8,start:uint8}`

## Withdraw
TLB: `withdraw#0ba69751 amount:coins = Withdraw`
Signature: `Withdraw{amount:coins}`

## MinTonForStorage
TLB: `min_ton_for_storage#8c83b775 minTon:coins = MinTonForStorage`
Signature: `MinTonForStorage{minTon:coins}`

# Get Methods
Total Get Methods: 6

## matchInfo
Argument: match_id

## matchResult
Argument: match_id

## matchesCount

## matchesResultsCount

## balance

## minTonForStorage

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
15509: Only deployer is allowed to withdraw
47204: Only deployer is allowed to Init Match
54615: Insufficient balance
61082: The players are full