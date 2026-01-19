import { useState } from "react";
import VoucherDisplay from "./VoucherDisplay";
import { useCoreMicroBank } from "../hooks/useCoreMicroBank";
//import { sendSMS } from "../utils/sendSMS";
import { saveUserPhone } from "@/utils/userDictionary";
import { phoneToUserId } from "@/utils/userId";
import { notifySMS } from "@/utils/smsClient";
//Do NOT mix useWeb3React and window.ethereum in the same app
// recordDeposit(bytes32 userId, uint256 amount)
// THE REMOTE LIQUID VOUCHER
import type { Voucher } from "@/types/voucher";
// shared UI styles (put near top of file)
const formCard = {
    background: "#ffffff",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
};

const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #f1f5f9",
    fontSize: 14,
    outline: "none",
};
const DepositSection = () => {
    const { recordDeposit } = useCoreMicroBank();
    // const [voucher, setVoucher] = useState<null | {
    //     phone: string;
    //     amount: number;
    //     code: string;
    //     issuedAt: number;
    // }>(null);
    const [voucher, setVoucher] = useState<Voucher | null>(null);

    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDeposit = async () => {

        if (!phone || !amount) {
            alert("Please enter phone number and amount");
            return;
        }

        try {
            const userId = phoneToUserId(phone);
            setLoading(true);

            // 🔥 THIS IS THE MISSING LINK
            // await recordDeposit(phone, amount);
            const tx = await recordDeposit(phone, amount);

            console.log("DEPOSIT TX:", tx);
            notifySMS(phone,
                `Osuubiddwa ssente mu Liquid.\n` +
                `Amount / Omuwendo: UGX ${amount}\n` +
                `Webale nnyo / Thank you`
            );

            setVoucher({
                phone,
                amount: Number(amount),
                code: crypto.randomUUID().slice(0, 8).toUpperCase(),
                issuedAt: Date.now(),
                txHash: tx.hash,

            });
            await tx.wait();
            // await sendSMS({
            //     to: phone,
            //     message:
            //         `Osuubiddwa ssente mu Liquid.\n` +
            //         `Omuwendo: UGX ${amount}\n` +
            //         `Ssente ziterekeddwa bulungi.`,
            // });

            alert("✅ Deposit recorded successfully");


            saveUserPhone(userId, phone);

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
            <h2> Deposit</h2>
            <p>Agent records off-chain cash or mobile money deposits</p>

            <div style={{ maxWidth: 410, ...formCard }}>
                <input
                    type="text"
                    placeholder="User phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ ...inputStyle, width: "90%" }}
                />

                <input
                    type="number"
                    placeholder="Amount (UGX)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ ...inputStyle, width: "90%" }}
                />

                <VoucherDisplay voucher={voucher} />


                <button
                    onClick={handleDeposit}
                    disabled={loading}
                    style={{
                        marginTop: 16,
                        width: "100%",
                        padding: 12,
                        borderRadius: 12,
                        fontWeight: 600,
                        background: "#111827",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Recording..." : "Record Deposit"}
                </button>
            </div>
        </section>
    );
};

export default DepositSection;
