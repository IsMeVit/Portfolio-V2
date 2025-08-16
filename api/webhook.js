const userCooldowns = new Map();
const COOLDOWN_SECONDS = 30;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract the honeypot field along with the other data
  const { name, telegram, message, honeypot } = req.body;

  // Honeypot check: if the hidden field is filled out, reject the request as it's likely a bot.
  if (honeypot) {
    console.log('Bot detected via honeypot field. Request rejected.');
    return res.status(400).json({ message: 'Request rejected.' });
  }

  // Get the user's IP for rate limiting
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Rate-limiting check:
  if (userCooldowns.has(ipAddress)) {
    const lastRequestTime = userCooldowns.get(ipAddress);
    const timeSinceLastRequest = (Date.now() - lastRequestTime) / 1000;

    if (timeSinceLastRequest < COOLDOWN_SECONDS) {
      const timeLeft = Math.ceil(COOLDOWN_SECONDS - timeSinceLastRequest);
      return res.status(429).json({ message: `Please wait ${timeLeft} seconds before sending another message.` });
    }
  }

  // Update the user's last request time after passing the check
  userCooldowns.set(ipAddress, Date.now());

  if (!name || !telegram || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Add the '@' symbol for a clean Telegram username
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

    // Return a clean success message to the frontend
    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Telegram error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}