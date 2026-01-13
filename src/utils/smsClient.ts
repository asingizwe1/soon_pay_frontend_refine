export async function notifySMS(to: string, message: string) {
    try {
        await fetch("http://localhost:3001/sms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to, message }),
        });
    } catch {
        // 🔕 Silent fail (intended)
    }
}