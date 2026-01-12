import MetaMaskCard from './MetaMaskCard';
import SimpleConnectButton from './SimpleConnectButton';
import ContractInteractionSample from './ContractInteractionSample';

const DevWalletPanel = () => {
    return (
        <div className="agent-panel"
        // style={{
        //     position: 'fixed',
        //     top: 80,
        //     right: 20,
        //     width: 320,
        //     background: '#0f172a',
        //     color: 'white',
        //     padding: 16,
        //     borderRadius: 10,
        //     boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        //     zIndex: 999
        // }}
        >
            <h3 style={{ marginTop: 0 }}>Agent Panel</h3>

            <MetaMaskCard />

            <div style={{ marginTop: 10 }}>
                <SimpleConnectButton />
            </div>

            <details style={{ marginTop: 12 }}>
                <summary style={{ cursor: 'pointer' }}>
                    Contract Interaction
                </summary>
                <ContractInteractionSample />
            </details>
        </div>
    );
};

export default DevWalletPanel;
