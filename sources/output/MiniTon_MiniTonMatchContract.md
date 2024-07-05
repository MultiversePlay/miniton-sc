# TACT Compilation Report
Contract: MiniTonMatchContract
BOC Size: 3182 bytes

# Types
Total Types: 17

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

## Game
TLB: `_ id:uint32 name:^string = Game`
Signature: `Game{id:uint32,name:^string}`

## PlayerInfo
TLB: `_ telegramId:^string walletAddress:Maybe address = PlayerInfo`
Signature: `PlayerInfo{telegramId:^string,walletAddress:Maybe address}`

## RuleInfo
TLB: `_ name:^string value:^string = RuleInfo`
Signature: `RuleInfo{name:^string,value:^string}`

## WinnerInfo
TLB: `_ telegramId:^string walletAddress:Maybe address score:^string ranking:uint8 prizeWon:coins prizeSentStatus:uint8 = WinnerInfo`
Signature: `WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}`

## MatchInfo
TLB: `_ matchId:uint64 game:Game{id:uint32,name:^string} players:dict<int, ^PlayerInfo{telegramId:^string,walletAddress:Maybe address}> playerCount:uint32 coin:^string totalEntryFee:coins prizeShare:^string commissionFee:int257 rules:dict<int, ^RuleInfo{name:^string,value:^string}> ruleCount:uint32 status:uint8 winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}> winnerCount:uint32 = MatchInfo`
Signature: `MatchInfo{matchId:uint64,game:Game{id:uint32,name:^string},players:dict<int, ^PlayerInfo{telegramId:^string,walletAddress:Maybe address}>,playerCount:uint32,coin:^string,totalEntryFee:coins,prizeShare:^string,commissionFee:int257,rules:dict<int, ^RuleInfo{name:^string,value:^string}>,ruleCount:uint32,status:uint8,winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}>,winnerCount:uint32}`

## MatchResults
TLB: `_ winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}> winnerCount:uint32 = MatchResults`
Signature: `MatchResults{winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}>,winnerCount:uint32}`

## MatchInfoMsg
TLB: `match_info_msg#12f20bec seqno:int257 matchInfo:MatchInfo{matchId:uint64,game:Game{id:uint32,name:^string},players:dict<int, ^PlayerInfo{telegramId:^string,walletAddress:Maybe address}>,playerCount:uint32,coin:^string,totalEntryFee:coins,prizeShare:^string,commissionFee:int257,rules:dict<int, ^RuleInfo{name:^string,value:^string}>,ruleCount:uint32,status:uint8,winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}>,winnerCount:uint32} = MatchInfoMsg`
Signature: `MatchInfoMsg{seqno:int257,matchInfo:MatchInfo{matchId:uint64,game:Game{id:uint32,name:^string},players:dict<int, ^PlayerInfo{telegramId:^string,walletAddress:Maybe address}>,playerCount:uint32,coin:^string,totalEntryFee:coins,prizeShare:^string,commissionFee:int257,rules:dict<int, ^RuleInfo{name:^string,value:^string}>,ruleCount:uint32,status:uint8,winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}>,winnerCount:uint32}}`

## SendPrizeMsg
TLB: `send_prize_msg#9814a7d8 seqno:int257 matchId:uint64 telegramId:^string walletAddress:Maybe address matchResults:Maybe MatchResults{winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}>,winnerCount:uint32} commissionWalletAddress:Maybe address = SendPrizeMsg`
Signature: `SendPrizeMsg{seqno:int257,matchId:uint64,telegramId:^string,walletAddress:Maybe address,matchResults:Maybe MatchResults{winners:dict<int, ^WinnerInfo{telegramId:^string,walletAddress:Maybe address,score:^string,ranking:uint8,prizeWon:coins,prizeSentStatus:uint8}>,winnerCount:uint32},commissionWalletAddress:Maybe address}`

## RemoveMatchDumpMsg
TLB: `remove_match_dump_msg#86912852 seqno:int257 matchIds:dict<int, uint64> = RemoveMatchDumpMsg`
Signature: `RemoveMatchDumpMsg{seqno:int257,matchIds:dict<int, uint64>}`

## WithdrawMsg
TLB: `withdraw_msg#1e16e476 seqno:int257 amount:coins = WithdrawMsg`
Signature: `WithdrawMsg{seqno:int257,amount:coins}`

## MinBalanceMsg
TLB: `min_balance_msg#04939755 seqno:int257 value:coins = MinBalanceMsg`
Signature: `MinBalanceMsg{seqno:int257,value:coins}`

# Get Methods
Total Get Methods: 5

## seqno

## minBalance

## balance

## matchInfo
Argument: matchId

## matchCount

# Error Codes
2: Stack underflow
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
11749: Invalid sequence number
15596: totalPrize cannot be greater than or equal to totalEntryFee
17654: Invalid seqno
27831: Only owner can call this function
40530: This match was not found
52677: Invalid playerInfo
55591: Insufficient contract balance
57905: matchResults is invalid