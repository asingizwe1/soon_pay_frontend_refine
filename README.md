MICRO-VOUCH LIQUID AGENT

DEPLOYED AT: https://soon-pay-frontend-refine.onrender.com

```text
A blockchain-based microbanking protocol for underbanked communities

CoreMicroBank is a custodial, agent-assisted microbanking system designed to serve underbanked and cash-based communities.
It enables on-chain deposits, protocol fees, small loans, yield generation, and withdrawal bonuses, all backed by transparent smart contracts and a real-time dashboard UI.

This project demonstrates how blockchain can power offline-first finance, community yield, and progressive credit access without requiring users to understand crypto or DeFi.
```

```text
 Features

📥 Agent-assisted deposits (custodial model)

💰 Protocol fee pooling (5% per deposit)

🔄 Automated fee conversion into yield (LIQ)

📈 Protocol-owned staking treasury

🏦 Small loans with interest accrual

🎁 Withdrawal bonuses paid from protocol yield

📊 Live protocol dashboard

📱 Phone-number-based user IDs (hashed)

🔔 Event-driven UI updates

🔗 Chainlink price feed integration (UGX → USD)

🤖 Chainlink Automation-ready architecture
```

🛠️ Tech Stack
Smart Contracts

Solidity ^0.8.19

Chainlink (Price Feeds, Automation)

OpenZeppelin ERC20

Foundry (deployment & testing)

Frontend

React + TypeScript (Vite)

ethers.js v5

MetaMask (or any EIP-1193 wallet)

🚀 Project Setup
1️⃣ Prerequisites

Install the following tools:
```markdown
Node.js (v18+)
https://nodejs.org

MetaMask
https://metamask.io
```

Create a .env file in the frontend root:

VITE_CORE_MICROBANK_ADDRESS=0xa637140be582b49c54cd8dab6f99dd75fe9d500a

🖥️ Frontend Setup

 Install Frontend Dependencies
cd frontend
npm install

clone repo: git clone https://github.com/asingizwe1/soon_pay_frontend_refine.git


Dependencies used:

npm install react react-dom
npm install ethers@5
npm install typescript
npm install vite

8️⃣ Run Frontend
npm run dev


🔐 Core Smart Contract Flow
👤 Register User
registerUser(bytes32 userId)


Hashes a phone number into a user ID

Creates a user record

💰 Record Deposit
recordDeposit(bytes32 userId, uint256 amount)


Adds deposit balance

Charges 5% protocol fee

Updates protocolFeePool

🔄 Convert Fees → Stake LIQ
convertFeesAndStake(uint256 mockLiquidPrice)


Converts pooled fees into LIQ

Mints protocol-owned yield tokens

Updates protocol treasury

🏦 Request Loan
requestLoan(bytes32 userId, uint256 amount)


Loans up to 50% of deposit balance

Accrues interest

Updates user debt

💳 Repay Loan
repayLoan(bytes32 userId, uint256 amount)


Reduces outstanding debt

🏧 Withdraw
withdraw(bytes32 userId, uint256 amount, address to)


Requires no outstanding loan

Pays user a LIQ bonus

Deducts from protocol yield pool

📊 Protocol Dashboard (UI)

The UI reflects real on-chain state:

Metric	Meaning
Protocol Fee Pool	Accumulated fees from deposits
Total Liquid Staked	Total protocol-owned yield
Protocol LIQ Balance	Actual ERC20 balance
Convert Fees → Stake LIQ	Admin treasury action
🔔 Event-Driven Architecture

The contract emits events used by the frontend to update state:

UserRegistered

DepositRecorded

ProtocolFeeAccumulated

FeesConvertedToLiquid

LiquidStaked

LoanIssued

InterestAccrued

LoanRepaid

WithdrawalProcessed

ProtocolLiquidBalanceUpdated

