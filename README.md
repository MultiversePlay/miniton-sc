# Read Me

## About MiniTon Match Contract

MiniTonMatchContract is a smart contract for managing match information, player details, and prize distribution.

## User Scenario
MiniTon is a crypto social competitive platform, allow players play, compete, and invest in games with others worldwide for real prizes and meaningful connections.

**Complete a Match in 5 Steps**
1. Select a Game
2. Choose a Match
3. Pay the Entry Fee to join a match
4. Match Opponents.Play and compete in games. Defeat the opponents.
5. Confirm the Match Result to receive the prize

**Blockchain Integration**
- Before the game starts, the entry fee is locked into the smart contract after match-making.
- Competition data is stored on-chain.
- Prize fulfillment is executed by smart contracts after player confirming match result.


## Features

- Record match information.
- Manage player information and prize allocation.
- Send prizes to winners and commission fees.

## Structs

### Game

- `id`: Integer ID for the game.
- `name`: Name of the game.

### PlayerInfo

- `telegramId`: Telegram ID of the player.
- `walletAddress`: Optional wallet address.

### RuleInfo
Rule of allocating the prize
- `name`: Name of the rule.
- `value`: Value of the rule.

### WinnerInfo

- `telegramId`: Telegram ID of the winner.
- `walletAddress`: Wallet address.
- `score`: Score of the winner.
- `ranking`: Ranking of the winner.
- `prizeWon`: Prize amount.
- `prizeSentStatus`: Status of the prize sent.

### MatchInfo

- `matchId`: Match ID.
- `game`: Game information.
- `players`: Map of player information.
- `playerCount`: Number of players.
- `coin`: Coin type used.
- `totalEntryFee`: Total entry fee collected.
- `prizeShare`: Percentage of prize share.
- `commissionFee`: Commission fee.
- `rules`: Map of rules.
- `ruleCount`: Number of rules.
- `status`: Match status.
- `winners`: Map of winners.
- `winnerCount`: Number of winners.

### MatchResults

- `winners`: Map of winners.
- `winnerCount`: Number of winners.

## Messages

### MatchInfoMsg

- `matchInfo`: Information about the match.

### SendPrizeMsg

- `seqno`: Sequence number.
- `matchId`: Match ID.
- `telegramId`: Telegram ID of the recipient.
- `walletAddress`: Wallet address.
- `matchResults`: Optional match results.
- `commissionWalletAddress`: Optional commission wallet address.

### RemoveMatchDumpMsg

- `matchIds`: Map of match IDs to be removed.

## Contract Functions

### init()

Initializes the contract with default values.

### receive(msg: MatchInfoMsg)

Records match information and receives entry fees.

### recordMatchResults(match: MatchInfo, msg: SendPrizeMsg): MatchInfo

Records match results and updates match status.

### sendMatchCommission(match: MatchInfo, msg: SendPrizeMsg): MatchInfo

Sends commission fee and updates match status.

### sendMatchPrize(match: MatchInfo, msg: SendPrizeMsg)

Sends the prize to the specified winner.

### receive(msg: SendPrizeMsg)

Processes prize sending message.

### receive(msg: RemoveMatchDumpMsg)

Removes specified matches.# Read Me

## MiniTonMatchContract

MiniTonMatchContract is a smart contract for managing match information, player details, and prize distribution.

## Features

- Record match information.
- Manage player information and prize allocation.
- Send prizes to winners and commission fees.

## Structs

### Game

- `id`: Integer ID for the game.
- `name`: Name of the game.

### PlayerInfo

- `telegramId`: Telegram ID of the player.
- `walletAddress`: Optional wallet address.

### RuleInfo

- `name`: Name of the rule.
- `value`: Value of the rule.

### WinnerInfo

- `telegramId`: Telegram ID of the winner.
- `walletAddress`: Wallet address.
- `score`: Score of the winner.
- `ranking`: Ranking of the winner.
- `prizeWon`: Prize amount.
- `prizeSentStatus`: Status of the prize sent.

### MatchInfo

- `matchId`: Match ID.
- `game`: Game information.
- `players`: Map of player information.
- `playerCount`: Number of players.
- `coin`: Coin type used.
- `totalEntryFee`: Total entry fee collected.
- `prizeShare`: Percentage of prize share.
- `commissionFee`: Commission fee.
- `rules`: Map of rules.
- `ruleCount`: Number of rules.
- `status`: Match status.
- `winners`: Map of winners.
- `winnerCount`: Number of winners.

### MatchResults

- `winners`: Map of winners.
- `winnerCount`: Number of winners.

## Messages

### MatchInfoMsg

- `matchInfo`: Information about the match.

### SendPrizeMsg

- `seqno`: Sequence number.
- `matchId`: Match ID.
- `telegramId`: Telegram ID of the recipient.
- `walletAddress`: Wallet address.
- `matchResults`: Optional match results.
- `commissionWalletAddress`: Optional commission wallet address.

### RemoveMatchDumpMsg

- `matchIds`: Map of match IDs to be removed.

## Contract Functions

### init()

Initializes the contract with default values.

### receive(msg: MatchInfoMsg)

Records match information and receives entry fees.

### recordMatchResults(match: MatchInfo, msg: SendPrizeMsg): MatchInfo

Records match results and updates match status.

### sendMatchCommission(match: MatchInfo, msg: SendPrizeMsg): MatchInfo

Sends commission fee and updates match status.

### sendMatchPrize(match: MatchInfo, msg: SendPrizeMsg)

Sends the prize to the specified winner.

### receive(msg: SendPrizeMsg)

Processes prize sending message.

### receive(msg: RemoveMatchDumpMsg)

Removes specified matches.
