const ProtocolSection = ({ stats }: { stats: any }) => {
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
