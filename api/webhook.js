const userCooldowns = new Map();
const COOLDOWN_SECONDS = 30;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, telegram, message, honeypot } = req.body;

  if (honeypot) {
    console.log('Bot detected via honeypot field. Request rejected.');
    return res.status(400).json({ message: 'Request rejected.' });
  }

  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (userCooldowns.has(ipAddress)) {
    const lastRequestTime = userCooldowns.get(ipAddress);
    const timeSinceLastRequest = (Date.now() - lastRequestTime) / 1000;

    if (timeSinceLastRequest < COOLDOWN_SECONDS) {
      const timeLeft = Math.ceil(COOLDOWN_SECONDS - timeSinceLastRequest);
      return res.status(429).json({ message: `Please wait ${timeLeft} seconds before sending another message.` });
    }
  }

  userCooldowns.set(ipAddress, Date.now());

  if (!name || !telegram || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `📩 New Contact Form\n\n👤 Name: ${name}\n📱 Telegram: @${telegram}\n📝 Message: ${message}`;

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
      const errorData = await telegramRes.json();
      throw new Error(`Telegram API error: ${telegramRes.status} - ${errorData.description}`);
    }

    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Telegram error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}