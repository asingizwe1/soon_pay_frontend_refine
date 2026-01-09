// Agent enters numeric ID

// Frontend hashes → bytes32 (later)

// Calls registerUser(userId)

// Users are represented by hashed identifiers.
// Agents register users on-chain using a custodial accounting model.
// No personal data is stored — only cryptographic identifiers.”
//even if you can decrypt you cant decrypt the secret_value
import { useState } from "react";
import { ethers } from "ethers";
import { getCoreMicroBankContract } from "../contracts/coreMicroBank";
import { phoneToUserId } from "../utils/userId";

const UserSection = () => {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

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

      setStatus("✅ User registered successfully");

    } catch (err: any) {
      console.error(err);
      setStatus("❌ Registration failed");
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
    </section>
  );
};

export default UserSection;
