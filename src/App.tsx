// useCoreMicroBankEvents listens to the blockchain

// App.tsx stores events in memory

// TransactionsSection only displays them
//No component except App.tsx should ever call the event hook

//Do NOT manage events inside action hooks (registerUser, recordDeposit)
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import DevWalletPanel from "./components/DevWalletPanel";
import { useCoreMicroBankEvents } from "./hooks/useCoreMicroBankEvents";
import { useCoreMicroBank } from "./hooks/useCoreMicroBank";

import UserSection from "./components/UserSection";
import DepositSection from "./components/DepositSection";
import WithdrawSection from "./components/WithdrawSection";
import LoanSection from "./components/LoanSection";
import TransactionsSection from "./components/TransactionsSection";
import ProtocolSection from "./components/ProtocolSection";

const App = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [protocolStats, setProtocolStats] = useState<any>(null);

  const { getProtocolStats } = useCoreMicroBank();

  // 🔁 Load protocol data
  // useEffect(() => {
  //   async function loadProtocol() {
  //     const stats = await getProtocolStats();
  //     setProtocolStats(stats);
  //   }
  //   loadProtocol();
  // }, []);
  const refreshProtocol = async () => {
    const stats = await getProtocolStats();
    setProtocolStats(stats);
  };

  useEffect(() => {
    getProtocolStats().then(setProtocolStats);
  }, []);

  // ✅ EVENTS (mounted ONCE)
  useCoreMicroBankEvents((event) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) return prev;
      return [event, ...prev].slice(0, 50);
    });
  });
  console.log("ENV CHECK:", import.meta.env.VITE_CORE_MICROBANK);
  return (

    <>
      <Navbar />
      <DevWalletPanel />

      <div style={{ paddingTop: 70 }} />

      <UserSection />
      <DepositSection />

      <WithdrawSection
        totalLiquidStaked={Number(protocolStats?.totalStaked ?? 0)}
      />

      <LoanSection />

      <TransactionsSection events={events} />

      <ProtocolSection stats={protocolStats}
        refreshProtocol={refreshProtocol}
      />
    </>
  );
};

export default App;
