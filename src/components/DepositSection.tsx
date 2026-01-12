import { useState } from "react";
import VoucherDisplay from "./VoucherDisplay";
import { useCoreMicroBank } from "../hooks/useCoreMicroBank";
import { sendSMS } from "../utils/sendSMS";
//Do NOT mix useWeb3React and window.ethereum in the same app
// recordDeposit(bytes32 userId, uint256 amount)
// THE REMOTE LIQUID VOUCHER
const DepositSection = () => {
    const { recordDeposit } = useCoreMicroBank();
    const [voucher, setVoucher] = useState<null | {
        phone: string;
        amount: number;
        code: string;
        issuedAt: number;
    }>(null);

    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDeposit = async () => {

        if (!phone || !amount) {
            alert("Please enter phone number and amount");
            return;
        }

        try {
            setLoading(true);

            // 🔥 THIS IS THE MISSING LINK
            await recordDeposit(phone, amount);

            setVoucher({
                phone,
                amount: Number(amount),
                code: crypto.randomUUID().slice(0, 8).toUpperCase(),
                issuedAt: Date.now(),
            });

            await sendSMS({
                to: phone,
                message:
                    `Osuubiddwa ssente mu Liquid.\n` +
                    `Omuwendo: UGX ${amount}\n` +
                    `Ssente ziterekeddwa bulungi.`,
            });

            alert("✅ Deposit recorded successfully");
            setAmount("");
        } catch (err) {
            console.error("Deposit failed:", err);
            alert("❌ Deposit failed — check console");
        } finally {
            setLoading(false);
        }


    };

    return (
        <section
            id="deposit"
            style={{ padding: "100px 20px", minHeight: "100vh" }}
        >
            <h2>💰 Deposit</h2>
            <p>Agent records off-chain cash or mobile money deposits</p>

            <div style={{ maxWidth: 400 }}>
                <input
                    type="text"
                    placeholder="User phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 10 }}
                />

                <input
                    type="number"
                    placeholder="Amount (UGX)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: "100%", padding: 10 }}
                />

                <VoucherDisplay voucher={voucher} />


                <button
                    onClick={handleDeposit}
                    disabled={loading}
                    style={{ marginTop: 15, width: "100%", padding: 10 }}
                >
                    {loading ? "Recording..." : "Record Deposit"}
                </button>
            </div>
        </section>
    );
};

export default DepositSection;
