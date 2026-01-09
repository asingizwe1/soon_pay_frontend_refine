// requestLoan

// repayLoan

// maxBorrowable
import { useState } from "react";
import { useCoreMicroBank } from "../hooks/useCoreMicroBank";

const LoanSection = () => {
    const {
        requestLoan,
        repayLoan,
        maxBorrowable
    } = useCoreMicroBank();

    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
    const [max, setMax] = useState<string | null>(null);

    const handleRequest = async () => {
        try {
            await requestLoan(userId, amount);
            alert("Loan requested");
        } catch (e) {
            console.error(e);
            alert("Loan request failed");
        }
    };

    const handleRepay = async () => {
        try {
            await repayLoan(userId, amount);
            alert("Loan repaid");
        } catch (e) {
            console.error(e);
            alert("Repayment failed");
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
            </div>
        </section>
    );
};

export default LoanSection;
// 0777615456

// 0xb7922568fa6c9425732bad891c9ae8d8f34b7bf0eb3a7869f1a8523b58fb6f0a
