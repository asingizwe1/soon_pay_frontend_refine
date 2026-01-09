const sections = [
    { label: 'User', id: 'user' },
    { label: 'Deposit', id: 'deposit' },
    { label: 'Withdraw', id: 'withdraw' },
    { label: 'Loan', id: 'loan' },
    { label: 'Transactions', id: 'transactions' },
    { label: 'Protocol', id: 'protocol' }
];

const Navbar = () => {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                background: '#0f172a',
                color: 'white',
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 20,
                zIndex: 1000
            }}
        >
            {sections.map(sec => (
                <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 14
                    }}
                >
                    {sec.label}
                </button>
            ))}
        </nav>
    );
};

export default Navbar;
