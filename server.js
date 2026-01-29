const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// আপনার HTML ফাইলটি পরিবেশন করার জন্য
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// --- আপনার টেলিগ্রাম লজিক এখানে ব্যাকগ্রাউন্ডে চলবে ---
const TG_CONFIG = {
    token: "8313454399:AAFVRkz9fTZiMKuTxA1PEZsHU8L7uheQC8s",
    chatId: "@Rk1Trader"
};

let lastProcessedUpdateId = 0;

async function checkTgCommands() {
    try {
        const res = await fetch(`https://api.telegram.org/bot${TG_CONFIG.token}/getUpdates?offset=${lastProcessedUpdateId + 1}`);
        const data = await res.json();
        if (data.result) {
            data.result.forEach(update => {
                lastProcessedUpdateId = update.update_id;
                // আপনার মূল কোডের লজিক অনুযায়ী এখানে কমান্ড চেক হবে
            });
        }
    } catch (e) {
        // Error logging
    }
}

// প্রতি ৩ সেকেন্ড অন্তর বট আপডেট চেক করবে
setInterval(checkTgCommands, 3000);

// সার্ভারকে ঘুমিয়ে পড়া থেকে বাঁচাতে (Keep-alive)
setInterval(() => {
    fetch(`http://localhost:${PORT}`).catch(() => {});
}, 280000); // প্রতি ৪.৬ মিনিটে একবার কল করবে
