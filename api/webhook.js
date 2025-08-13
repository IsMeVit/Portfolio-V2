// File: /api/webhook.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, telegram, message } = req.body;

  if (!name || !telegram || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `📩 New Contact Form\n\n👤 Name: ${name}\n📧 Telegram: ${telegram}\n📝 Message: ${message}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!telegramRes.ok) {
      throw new Error(`Telegram API error: ${telegramRes.status}`);
    }

    const data = await telegramRes.json();
    return data
  } catch (error) {
    console.error('Telegram error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
