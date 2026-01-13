import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sms", async (req, res) => {
    const { to, message } = req.body;

    try {
        const response = await fetch(
            "https://api.sandbox.africastalking.com/version1/messaging",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    apiKey: process.env.AT_API_KEY,
                },
                body: new URLSearchParams({
                    username: process.env.AT_USERNAME,
                    to,
                    message,
                }),
            }
        );

        const data = await response.json();

        // 🚨 SMS failure MUST NOT break frontend
        res.json({ ok: true, data });

    } catch (err) {
        console.error("SMS error:", err);
        res.json({ ok: false });
    }
});

app.listen(3001, () => {
    console.log("SMS server running on http://localhost:3001");
});
