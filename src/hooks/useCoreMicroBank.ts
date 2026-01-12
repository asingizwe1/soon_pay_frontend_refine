// get contract

// send tx

// read state (view functions)

// NOT manage UI state
//  NOT listen to many events
//Event hooks must be mounted by a React component that stays on the page

// protocolFeePool = 0;
// Means:

// “We have consumed all the protocol fees and converted them into another asset.”

// an internal accounting number that represents:

// “Value captured by the protocol from fees, expressed in a stable, USD-equivalent unit.”
import { ethers } from "ethers";
import CoreMicroBankABI from "../abi/CoreMicroBank.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CORE_MICROBANK_ADDRESS;

//removed the let contract: ethers.Contract | null
// Because in React:

// Wallet can change

// Network can change

// Signer can change
//->fresh contract per call is safer and simpler.

export function useCoreMicroBank() {
  // let contract: ethers.Contract | null = null;

  const getContract = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not found");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // 🔑 ensure connected
    const signer = provider.getSigner();
    console.log("🔍 CORE_MICROBANK ENV:", CONTRACT_ADDRESS);
    return new ethers.Contract(
      CONTRACT_ADDRESS,
      CoreMicroBankABI,
      signer
    );
  };

  // 🔄 Convert protocol fees to LIQ (ADMIN / DEMO)
  const convertFeesAndStake = async () => {
    const contract = await getContract();

    // mock price = 1 (demo)
    const mockPrice = 1; // ethers.utils.parseUnits("1", 18);

    const tx = await contract.convertFeesAndStake(mockPrice);
    return tx.wait();
  };


  // 🔑 phone → bytes32
  const phoneToUserId = (phone: string) => {
    return ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(phone.trim())
    );
  };

  // 👤 register user
  const registerUser = async (phone: string) => {
    const contract = await getContract();
    const userId = phoneToUserId(phone);
    const tx = await contract.registerUser(userId);
    return tx.wait();
  };

  // 💰 Record deposit
  const recordDeposit = async (phone: string, amount: string) => {
    const contract = await getContract();
    const userId = phoneToUserId(phone);

    const parsedAmount = ethers.utils.parseUnits(amount, 0); // integer UGX

    const tx = await contract.recordDeposit(userId, parsedAmount);
    return tx.wait();
  };


  // 📊 Protocol reads
  const getProtocolStats = async () => {
    const contract = await getContract();
    console.log("Reading protocol stats from:", CONTRACT_ADDRESS);
    const [
      feePool,
      totalStaked,
      liquidBalance
    ] = await Promise.all([
      contract.protocolFeePool(),
      contract.totalLiquidStaked(),
      contract.protocolLiquidBalance()
    ]);

    return {
      feePool: feePool.toString(),
      totalStaked: totalStaked.toString(),
      liquidBalance: liquidBalance.toString()
    };
  };

  // 💱 UGX/USD price feed
  const getUGXtoUSD = async () => {
    const contract = await getContract();
    const [price, decimals] = await contract.getUGXtoUSD();
    return Number(price) / 10 ** decimals;
  };

  // 🏦 Loan
  const requestLoan = async (userId: string, amount: string) => {
    const contract = await getContract();
    const parsed = ethers.utils.parseUnits(amount, 0);
    const tx = await contract.requestLoan(userId, parsed);
    return tx.wait();
  };

  const repayLoan = async (userId: string, amount: string) => {
    const contract = await getContract();
    const parsed = ethers.utils.parseUnits(amount, 0);
    const tx = await contract.repayLoan(userId, parsed);
    return tx.wait();
  };

  const maxBorrowable = async (userId: string) => {
    const contract = await getContract();
    const value = await contract.maxBorrowable(userId);
    return value.toString();
  };

  // 🏧 Withdraw
  const withdraw = async (userId: string, amount: string) => {
    if (!window.ethereum) {
      throw new Error("MetaMask not found");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const to = await signer.getAddress();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CoreMicroBankABI,
      signer
    );

    const parsed = ethers.utils.parseUnits(amount, 0);

    const tx = await contract.withdraw(userId, parsed, to);
    return tx.wait();
  };


  return {
    registerUser,
    recordDeposit,
    withdraw,
    requestLoan,
    repayLoan,
    maxBorrowable,
    convertFeesAndStake,
    getProtocolStats,
    getUGXtoUSD,
    phoneToUserId
  };
}
// LIQ is owned by the protocol

// Used as yield reserve

// NOT owned by users at deposit time