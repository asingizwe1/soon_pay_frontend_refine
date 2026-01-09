import { useState } from "react";
//import { useCoreMicroBankEvents } from "../hooks/useCoreMicroBankEvents";
// F:\soon_pay_frontend\vite-ethersjs-template\src\hooks\useCoreMicroBankEvents.ts
//Event listeners must be mounted ONCE
//only in App.tsx

type Props = {
    events: any[];
};
export default function TransactionsSection({ events }: Props) {
    // const [events, setEvents] = useState<any[]>([]);

    // useCoreMicroBankEvents((event) => {
    //     setEvents((prev) => [event, ...prev]);
    // });

    return (
        <section
            id="transactions"
            style={{ padding: "100px 20px", minHeight: "100vh" }}
        >
            <h2>📜 Live Protocol Activity</h2>

            {events.length === 0 && <p>No activity yet</p>}

            {events.map((event, i) => (
                <pre
                    key={i}
                    style={{
                        background: "#0f172a",
                        color: "#e5e7eb",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        overflowX: "auto"
                    }}
                >
                    {JSON.stringify(event, null, 2)}
                </pre>
            ))}
        </section>
    );
}
