// components/VoucherDisplay.tsx
import React from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import { useRef } from "react";

type Voucher = {
    phone: string;
    amount: number;
    code: string;
    issuedAt: number;
};

const voucherRef = useRef<HTMLDivElement>(null);

const styles: any = {
    wrapper: {
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
    },

    voucher: (active: boolean) => ({
        position: "relative",
        width: 420,
        padding: 24,
        borderRadius: 12,
        background: active
            ? "linear-gradient(135deg, #ffffff, #f9fafb)"
            : "linear-gradient(135deg, #eef2ff, #f3f4f6)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        clipPath:
            "polygon(0 0, 100% 0, 100% 94%, 95% 100%, 90% 94%, 85% 100%, 80% 94%, 75% 100%, 70% 94%, 65% 100%, 60% 94%, 55% 100%, 50% 94%, 45% 100%, 40% 94%, 35% 100%, 30% 94%, 25% 100%, 20% 94%, 15% 100%, 10% 94%, 5% 100%, 0 94%)",
        overflow: "hidden",
    }),

    shimmer: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(110deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 70%)",
        animation: "shimmer 2s infinite",
    },

    logo: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 48,
        opacity: 0.9,
    },

    title: {
        textAlign: "center",
        fontWeight: 700,
        letterSpacing: 1,
        marginBottom: 20,
    },

    body: {
        display: "flex",
        gap: 16,
    },

    qrBox: {
        width: 110,
        height: 110,
        background: "#fff",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    qrPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 6,
        background:
            "repeating-linear-gradient(45deg, #d1d5db, #d1d5db 10px, #e5e7eb 10px, #e5e7eb 20px)",
    },

    details: {
        flex: 1,
    },

    line: {
        margin: "6px 0",
        fontSize: 14,
    },

    code: (active: boolean) => ({
        marginTop: 10,
        padding: "6px 10px",
        borderRadius: 6,
        fontWeight: 700,
        letterSpacing: 1,
        background: "#111827",
        color: "#fff",
        filter: active ? "none" : "blur(4px)",
    }),

    time: {
        marginTop: 6,
        fontSize: 12,
        color: "#6b7280",
    },
};

const downloadVoucher = async () => {
    if (!voucherRef.current) return;

    const dataUrl = await toPng(voucherRef.current);
    const link = document.createElement("a");
    link.download = "liquid-agent-voucher.png";
    link.href = dataUrl;
    link.click();
};


const VoucherDisplay = ({ voucher }: { voucher: Voucher | null }) => {
    const hasVoucher = voucher !== null;

    return (
        <div style={styles.wrapper}>
            <div ref={voucherRef} style={styles.voucher(hasVoucher)}>
                {/* Shimmer overlay (only when empty) */}
                {!hasVoucher && <div style={styles.shimmer} />}

                {/* Logo */}
                <img
                    src="/assets/liquid-agent-logo.png"
                    alt="Liquid Agent"
                    style={styles.logo}
                />

                {/* Header */}
                <h3 style={styles.title}>LIQUID AGENT VOUCHER</h3>

                {/* Body */}
                <div style={styles.body}>
                    {/* QR Section */}
                    <div style={styles.qrBox}>
                        {hasVoucher ? (
                            <QRCode value={voucher!.code} size={100} />

                        ) : (
                            <div style={styles.qrPlaceholder} />
                        )}
                    </div>

                    {/* Details */}
                    <div style={styles.details}>
                        <p style={styles.line}>
                            <strong>Phone:</strong>{" "}
                            {hasVoucher ? voucher!.phone : "••••••••"}
                        </p>
                        <p style={styles.line}>
                            <strong>Amount:</strong>{" "}
                            {hasVoucher ? `UGX ${voucher!.amount}` : "UGX ••••"}
                        </p>
                        <p style={styles.code(hasVoucher)}>
                            {hasVoucher ? voucher!.code : "VOUCHER-CODE-XXXX"}
                        </p>
                        <p style={styles.time}>
                            {hasVoucher && (
                                <button
                                    onClick={downloadVoucher}
                                    style={{
                                        marginTop: 16,
                                        width: "100%",
                                        padding: 10,
                                        background: "#111827",
                                        color: "#fff",
                                        borderRadius: 8,
                                        cursor: "pointer",
                                    }}
                                >
                                    ⬇ Download Voucher
                                </button>
                            )}

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoucherDisplay;



// ┌──────────────────────────────┐
// │  Torn Edge / Zigzag Outline  │  ← CSS clip-path or SVG
// ├──────────────────────────────┤
// │  Header                      │
// │  Logo        Voucher Title   │
// ├──────────────────────────────┤
// │  Body                        │
// │  QR Code   |  Details        │
// │            |  Amount         │
// │            |  Voucher Code   │
// │            |  Date           │
// ├──────────────────────────────┤
// │  Footer (branding / note)    │
// └──────────────────────────────┘


// Option A (recommended): CSS clip-path

// Use clip-path: polygon(...)

// Gives you zig-zag / receipt effect

// Lightweight, no images

// This matches the third image you attached best.

// Option B: SVG background

// More control

// Slightly heavier

// Good if you want animated edges later

// Do NOT generate vouchers inside the component

// ❌ Do NOT call contracts from this component

// ❌ Do NOT store voucher state here