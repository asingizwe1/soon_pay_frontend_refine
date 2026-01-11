// components/VoucherDisplay.tsx
import React from "react";

const VoucherDisplay = ({ phone, amount, voucherCode }: {
    phone: string;
    amount: string;
    voucherCode: string;
}) => {
    const hasVoucher = voucherCode !== "";

    return (
        <div
            style={{
                marginTop: 40,
                padding: 20,
                borderRadius: 16,
                border: "2px dashed #3b82f6",
                background: hasVoucher ? "#f9fafb" : "linear-gradient(to right, #e0e7ff, #f3f4f6)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                maxWidth: 400,
                position: "relative"
            }}
        >
            {/* Liquid Agent Logo */}
            <img
                src="/assets/liquid-agent-logo.png"
                alt="Liquid Agent"
                style={{ width: 60, position: "absolute", top: 10, right: 10 }}
            />

            {/* QR Code Placeholder */}
            <div style={{
                width: 100,
                height: 100,
                background: "#e5e7eb",
                borderRadius: 8,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#6b7280"
            }}>
                QR Code
            </div>

            {hasVoucher ? (
                <>
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Amount:</strong> UGX {amount}</p>
                    <p><strong>Voucher Code:</strong> {voucherCode}</p>
                    <p><strong>Issued:</strong> {new Date().toLocaleString()}</p>
                </>
            ) : (
                <p style={{ color: "#9ca3af", fontStyle: "italic" }}>
                    Voucher will appear here after deposit...
                </p>
            )}
        </div>
    );
};

export default VoucherDisplay;
