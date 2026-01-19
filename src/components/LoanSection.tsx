// requestLoan

// repayLoan

// maxBorrowable
import { useState } from "react";
import { useCoreMicroBank } from "../hooks/useCoreMicroBank";
//import { sendSMS } from "../utils/sendSMS";
import { getUserPhone } from "../utils/userDictionary";
import { notifySMS } from "@/utils/smsClient";
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
const actionBtn = {
    marginTop: 12,
    width: "100%",
    padding: 12,
    borderRadius: 12,
    background: "#111827",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
};
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
            <h2> Loans</h2>

            <div style={{ maxWidth: 400, ...formCard }}>
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

                <button style={actionBtn} onClick={handleRequest}>
                    Request Loan
                </button>

                <button style={actionBtn} onClick={handleRepay}>
                    Repay Loan
                </button>

                <button style={actionBtn} onClick={handleMaxBorrowable}>
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
