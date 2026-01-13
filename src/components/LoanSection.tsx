// requestLoan

// repayLoan

// maxBorrowable
import { useState } from "react";
import { useCoreMicroBank } from "../hooks/useCoreMicroBank";
//import { sendSMS } from "../utils/sendSMS";
import { getUserPhone } from "../utils/userDictionary";
import { notifySMS } from "@/utils/smsClient";
const LoanSection = () => {
    //     Functions are not global

    // They must be:

    // Defined inside the hook

    // Returned

    // Destructured where used
    const {
        requestLoan,
        repayLoan,
        maxBorrowable,
        getUserDebt
    } = useCoreMicroBank();

    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
    const [max, setMax] = useState<string | null>(null);

    const handleRequest = async () => {
        try {
            const phone = getUserPhone(userId);

            if (!phone) {
                alert("User phone not found. User must deposit/register first.");
                return;
            }
            await requestLoan(userId, amount);

            notifySMS(phone,
                `Osuubiddwa ssente mu Liquid.\n` +
                `Amount / Omuwendo: UGX ${amount}\n` +
                `Webale nnyo / Thank you`
            );

            // await sendSMS({
            //     to: phone,
            //     message:
            //         `Empaako eyasabiiddwa eyise.\n` +
            //         `Omuwendo: UGX ${amount}\n` +
            //         `Jjukira okusasula mu budde.`,
            // });

            alert("Loan requested");
        } catch (e) {
            console.error(e);
            alert("Loan request failed");
        }
    };

    const handleRepay = async () => {
        if (!userId || !amount) {
            alert("Missing fields");
            return;
        }

        const debt = await getUserDebt(userId);

        if (Number(amount) > Number(debt)) {
            alert(`Cannot repay more than outstanding debt (${debt})`);
            return;
        }

        try {
            await repayLoan(userId, amount);
            alert("Loan repaid");
        } catch (err) {
            console.error(err);
            alert("Repay failed");
        }
    };

    const handleMaxBorrowable = async () => {
        const value = await maxBorrowable(userId);
        setMax(value);
    };

    return (
        <section id="loan" style={{ padding: "100px 20px" }}>
            <h2>🏦 Loans</h2>

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

                <button
                    onClick={handleRequest}
                    style={{ marginTop: 10, width: "100%", padding: 10 }}
                >
                    Request Loan
                </button>

                <button
                    disabled={!userId || !amount}
                    onClick={handleRepay}
                    style={{ marginTop: 10, width: "100%", padding: 10 }}
                >
                    Repay Loan
                </button>

                <button
                    onClick={handleMaxBorrowable}
                    style={{ marginTop: 10, width: "100%", padding: 10 }}
                >
                    Check Max Borrowable
                </button>

                {max && <p>Max Borrowable: {max}</p>}

                <button
                    onClick={async () => {
                        const debt = await getUserDebt(userId);
                        setAmount(debt);
                    }}
                >
                    Repay Full
                </button>
                <p>Outstanding Debt: {max}</p>
            </div>
        </section>
    );
};

export default LoanSection;
// 0777615456

// 0xb7922568fa6c9425732bad891c9ae8d8f34b7bf0eb3a7869f1a8523b58fb6f0a
