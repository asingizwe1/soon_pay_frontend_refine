import { useCoreMicroBank } from "../hooks/useCoreMicroBank";

type ProtocolSectionProps = {
    stats: any;
    refreshProtocol: () => Promise<void>;
};

const ProtocolSection = ({ stats, refreshProtocol }: ProtocolSectionProps) => {
    const { convertFeesAndStake } = useCoreMicroBank();
    return (
        <section id="protocol" style={{ padding: "100px 20px" }}>
            <h2>🏛 Protocol</h2>

            {!stats ? (
                <p>Loading protocol data...</p>
            ) : (
                <ul>
                    <li>Protocol Fee Pool: {stats.feePool}</li>
                    <li>Total Liquid Staked: {stats.totalStaked}</li>
                    <li>Protocol LIQ Balance: {stats.liquidBalance}</li>
                </ul>
            )}
            <button
                style={{
                    marginTop: 20,
                    padding: 10,
                    width: "100%",
                    background: "#22c55e",
                    color: "black",
                    fontWeight: "bold"
                }}
                onClick={async () => {
                    try {
                        await convertFeesAndStake();
                        await refreshProtocol();
                        alert("Fees converted to LIQ ✅");
                    } catch (e) {
                        alert("Conversion failed ❌");
                        console.error(e);
                    }
                }}
            >
                🔄 Convert Fees → LIQ (Admin)
            </button>

        </section>
    );
};

export default ProtocolSection;

// // protocolLiquidBalance()

// // protocolFeePool

// // totalLiquidStaked
// import { useEffect, useState } from "react";
// import { useCoreMicroBank } from "../hooks/useCoreMicroBank";

// const ProtocolSection = ({ stats }: { stats: any }) => {

//     // const {
//     //     getProtocolStats,
//     //     getUGXtoUSD
//     // } = useCoreMicroBank();

//     const [stats, setStats] = useState<any>(null);
//     const [price, setPrice] = useState<number | null>(null);

//     // useEffect(() => {
//     //     async function load() {
//     //         const s = await getProtocolStats();
//     //         const p = await getUGXtoUSD();

//     //         setStats(s);
//     //         setPrice(p);
//     //     }
//     //     load();
//     // }, []);

//     return (
//         <section id="protocol" style={{ padding: "100px 20px" }}>
//             <h2>🏛 Protocol</h2>

//             {!stats ? (
//                 <p>Loading protocol data...</p>
//             ) : (
//                 <ul>
//                     <li>Protocol Fee Pool: {stats.feePool}</li>
//                     <li>Total Liquid Staked: {stats.totalStaked}</li>
//                     <li>Protocol LIQ Balance: {stats.liquidBalance}</li>
//                     <li>UGX / USD Price: {price}</li>
//                 </ul>
//             )}
//         </section>
//     );
// };

// export default ProtocolSection;
