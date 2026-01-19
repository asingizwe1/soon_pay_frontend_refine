// import { useState } from "react";
// //import { useCoreMicroBankEvents } from "../hooks/useCoreMicroBankEvents";
// // F:\soon_pay_frontend\vite-ethersjs-template\src\hooks\useCoreMicroBankEvents.ts
// //Event listeners must be mounted ONCE
// //only in App.tsx

// type Props = {
//     events: any[];
// };
// export default function TransactionsSection({ events }: Props) {
//     // const [events, setEvents] = useState<any[]>([]);

//     // useCoreMicroBankEvents((event) => {
//     //     setEvents((prev) => [event, ...prev]);
//     // });

//     return (
//         <section
//             id="transactions"
//             style={{ padding: "100px 20px", minHeight: "100vh" }}
//         >
//             <h2>📜 Live Protocol Activity</h2>

//             {events.length === 0 && <p>No activity yet</p>}

//             {events.map((event, i) => (
//                 <pre
//                     key={i}
//                     style={{
//                         background: "#0f172a",
//                         color: "#e5e7eb",
//                         padding: "12px",
//                         borderRadius: "8px",
//                         marginBottom: "10px",
//                         overflowX: "auto"
//                     }}
//                 >
//                     {JSON.stringify(event, null, 2)}
//                 </pre>
//             ))}
//         </section>
//     );
// }
type Props = {
    event: any;
};

const labelStyle = {
    fontSize: 12,
    color: "#9ca3af",
};

const valueStyle = {
    fontSize: 14,
    fontWeight: 500,
};

const cardStyle = {
    background: "#0b1220",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    maxWidth: 780,
};

const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
};

const TransactionCard = ({ event }: Props) => {
    return (
        <div style={cardStyle}>
            {/* Header */}
            <div style={{ marginBottom: 10 }}>
                <strong>{event.type}</strong>
            </div>

            {/* Common fields */}
            {event.userId && (
                <div style={rowStyle}>
                    <span style={labelStyle}>User</span>
                    <span style={valueStyle}>{event.userId}</span>
                </div>
            )}

            {event.agent && (
                <div style={rowStyle}>
                    <span style={labelStyle}>Agent</span>
                    <span style={valueStyle}>{event.agent}</span>
                </div>
            )}

            {event.to && (
                <div style={rowStyle}>
                    <span style={labelStyle}>To</span>
                    <span style={valueStyle}>{event.to}</span>
                </div>
            )}

            {/* Amount fields */}
            {event.amount && (
                <div style={rowStyle}>
                    <span style={labelStyle}>Amount</span>
                    <span style={valueStyle}>
                        {parseInt(event.amount.hex, 16)}
                    </span>
                </div>
            )}

            {event.gross && (
                <div style={rowStyle}>
                    <span style={labelStyle}>Gross</span>
                    <span style={valueStyle}>
                        {parseInt(event.gross.hex, 16)}
                    </span>
                </div>
            )}

            {event.fee && (
                <div style={rowStyle}>
                    <span style={labelStyle}>Fee</span>
                    <span style={valueStyle}>
                        {parseInt(event.fee.hex, 16)}
                    </span>
                </div>
            )}

            {event.net && (
                <div style={rowStyle}>
                    <span style={labelStyle}>Net</span>
                    <span style={valueStyle}>
                        {parseInt(event.net.hex, 16)}
                    </span>
                </div>
            )}
        </div>
    );
};

export default TransactionCard;
