// Contract logic

// Only allowed when loan = 0

// Bonus LIQ is auto handled
import { useState } from "react";
import { useCoreMicroBank } from "../hooks/useCoreMicroBank";
import VoucherDisplay from "./VoucherDisplay";
//import { sendSMS } from "../utils/sendSMS";
import { getUserPhone } from "../utils/userDictionary";
import type { Voucher } from "@/types/voucher";
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
    border: "1px solid #e5e7eb",
    fontSize: 14,
    outline: "none",
};
const WithdrawSection = ({ totalLiquidStaked }: { totalLiquidStaked: number }) => {

    const hasYield = totalLiquidStaked > 0;
    const [voucher, setVoucher] = useState<Voucher | null>(null);


    const { withdraw } = useCoreMicroBank();

    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");

    const handleWithdraw = async () => {
        if (!userId || !amount) return alert("Missing fields");

        try {
            const tx = await withdraw(userId, amount);

            console.log("WITHDRAW TX:", tx);

            // ✅ Create voucher AFTER success
            setVoucher({
                phone: userId.slice(0, 10) + "...", // or real phone later
                amount: Number(amount),
                code: crypto.randomUUID().slice(0, 8).toUpperCase(),
                issuedAt: Date.now(),
                txHash: tx.hash,
            });
            await tx.wait();
            const phone = getUserPhone(userId);

            if (!phone) {
                alert("User phone not found. User must deposit/register first.");
                return;
            }

            // await sendSMS({
            //     to: phone,
            //     message:
            //         `Okujjayo ssente kuyise bulungi.\n` +
            //         `UGX ${amount} zitumiddwa.\n` +
            //         `Webale nnyo.`,
            // });

            alert("Withdraw successful");
        } catch (err) {
            console.error(err);
            alert("Withdraw failed");
        }
    };


    return (
        <section id="withdraw" style={{ padding: "100px 20px" }}>
            <h2> Withdraw</h2>

            <div style={{ maxWidth: 420, ...formCard }}>
                <input
                    placeholder="User ID (bytes32)"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    style={{ ...inputStyle, width: "90%" }}
                />

                <input
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    style={{ ...inputStyle, width: "90%" }}
                />

                <VoucherDisplay voucher={voucher} />


                <button
                    onClick={handleWithdraw}
                    disabled={!hasYield}
                    style={{
                        marginTop: 16,
                        width: "100%",
                        padding: 12,
                        borderRadius: 12,
                        fontWeight: 600,
                        background: hasYield ? "#111827" : "#9ca3af",
                        color: "#fff",
                        cursor: hasYield ? "pointer" : "not-allowed",
                    }}
                >
                    Withdraw
                </button>

                {!hasYield && (
                    <p style={{ color: "orange", marginTop: 8 }}>
                        Yield not available yet. Convert fees first.
                    </p>
                )}


            </div>
        </section>
    );
};

export default WithdrawSection;
