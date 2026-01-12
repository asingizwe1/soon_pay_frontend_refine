// Contract logic

// Only allowed when loan = 0

// Bonus LIQ is auto handled
import { useState } from "react";
import { useCoreMicroBank } from "../hooks/useCoreMicroBank";
import VoucherDisplay from "./VoucherDisplay";
import { sendSMS } from "../utils/sendSMS";

const WithdrawSection = ({ totalLiquidStaked }: { totalLiquidStaked: number }) => {

    const hasYield = totalLiquidStaked > 0;
    const [voucher, setVoucher] = useState<null | {
        phone: string;
        amount: number;
        code: string;
        issuedAt: number;
    }>(null);


    const { withdraw } = useCoreMicroBank();

    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");

    const handleWithdraw = async () => {
        if (!userId || !amount) return alert("Missing fields");

        try {
            await withdraw(userId, amount);

            // ✅ Create voucher AFTER success
            setVoucher({
                phone: userId.slice(0, 10) + "...", // or real phone later
                amount: Number(amount),
                code: crypto.randomUUID().slice(0, 8).toUpperCase(),
                issuedAt: Date.now(),
            });

            await sendSMS({
                to: phone,
                message:
                    `Okujjayo ssente kuyise bulungi.\n` +
                    `UGX ${amount} zitumiddwa.\n` +
                    `Webale nnyo.`,
            });

            alert("Withdraw successful");
        } catch (err) {
            console.error(err);
            alert("Withdraw failed");
        }
    };


    return (
        <section id="withdraw" style={{ padding: "100px 20px" }}>
            <h2>🏧 Withdraw</h2>

            <div style={{ maxWidth: 400 }}>
                <input
                    placeholder="User ID (bytes32)"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    style={{ width: "100%", padding: 10 }}
                />

                <input
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    style={{ width: "100%", padding: 10, marginTop: 10 }}
                />

                <VoucherDisplay voucher={voucher} />


                <button
                    onClick={handleWithdraw}
                    disabled={!hasYield}
                    style={{
                        marginTop: 15,
                        width: "100%",
                        padding: 10,
                        background: hasYield ? "#22c55e" : "#6b7280",
                        cursor: hasYield ? "pointer" : "not-allowed"
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
