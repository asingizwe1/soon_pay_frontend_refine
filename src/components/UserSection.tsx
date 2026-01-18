// Agent enters numeric ID

// Frontend hashes → bytes32 (later)

// Calls registerUser(userId)

//Proof that a cryptographic identity was created on-chain
// Account creation receipt

// Identity card

// Activation slip


// Users are represented by hashed identifiers.
// Agents register users on-chain using a custodial accounting model.
// No personal data is stored — only cryptographic identifiers.”
//even if you can decrypt you cant decrypt the secret_value
import { useState } from "react";
import { ethers } from "ethers";
import { getCoreMicroBankContract } from "../contracts/coreMicroBank";
import { phoneToUserId } from "../utils/userId";
import VoucherDisplay from "./VoucherDisplay";
//import { sendSMS } from "../utils/sendSMS";
import type { Voucher } from "@/types/voucher";

const UserSection = () => {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const [voucher, setVoucher] = useState<Voucher | null>(null);


  const registerUser = async () => {

    try {
      if (!window.ethereum) {
        alert("MetaMask not found");
        return;
      }

      setStatus("Waiting for wallet...");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = getCoreMicroBankContract(signer);

      const userId = phoneToUserId(phone);

      setStatus("Registering user on-chain...");


      const tx = await contract.registerUser(userId);
      await tx.wait();

      setVoucher({
        phone,
        amount: 0,
        code: userId.slice(0, 10).toUpperCase(), // short ID fingerprint
        issuedAt: Date.now(),
        txHash: tx.hash,
      });

      // await sendSMS({
      //   to: phone,
      //   message:
      //     "Oli mutendesi wa Liquid Agent.\n" +
      //     "Omukozesa awandiikiddwa bulungi.\n" +
      //     "Webale okukozesa Liquid.",
      // });

      setStatus("✅ User registered successfully");

    } catch (err: any) {
  console.error(err);

  const message =
    err?.error?.message ||
    err?.data?.message ||
    err?.reason ||
    err?.message;

  if (message?.includes("User exists")) {
    setStatus("⚠️ User already exists");
  } else {
    setStatus("❌ Registration failed");
  }
}
  };

  return (
    <section id="user" style={{ padding: "100px 20px", minHeight: "100vh" }}>
      <h2>👤 User Registration</h2>

      <input
        type="text"
        placeholder="User phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 8, width: 250 }}
      />

      <br /><br />

      <button onClick={registerUser}>
        Register User
      </button>

      <p>{status}</p>
      <VoucherDisplay voucher={voucher} />

    </section>
  );
};

export default UserSection;
