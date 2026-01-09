// 100% events-based
// <li>LoanIssued</li>
//             <li>InterestAccrued</li>
//             <li>WithdrawalProcessed</li>
import { useState } from "react";
import { useCoreMicroBankEvents } from "../hooks/useCoreMicroBankEvents";

type Props = {
    events: any[];
};

const TransactionsSection = ({ events }: Props) => {
    return (
        <section
            id="transactions"
            style={{ padding: "100px 20px", minHeight: "100vh" }}
        >
            <h2>📜 Transactions</h2>
            <p>Live protocol activity powered by events</p>

            {events.length === 0 && <p>No activity yet</p>}

            {events.map((e, i) => (
                <pre
                    key={i}
                    style={{
                        background: "#111",
                        padding: 12,
                        marginBottom: 10,
                        overflowX: "auto"
                    }}
                >
                    {JSON.stringify(e, null, 2)}
                </pre>
            ))}
        </section>
    );
};

export default TransactionsSection;