const userCooldowns = new Map();
const COOLDOWN_SECONDS = 30;
const COOLDOWN_MS = COOLDOWN_SECONDS * 1000;

const cleanupCooldowns = (map, cooldownTimeMs) => {
  const now = Date.now();
  for (const [ip, timestamp] of userCooldowns.entries()) {
    if (now - timestamp > cooldownTimeMs + 60000) {
      userCooldowns.delete(ip);
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, telegram, message, honeypot } = req.body;



  if (honeypot && honeypot.length > 0) {
    console.log('Bot detected via non-empty honeypot field. Request rejected.');
    return res.status(400).json({ message: 'Request rejected.' });
  }

  if (!name || !telegram || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  if (
    typeof name !== "string" || name.length < 2 || name.length > 50 ||
    typeof telegram !== "string" ||telegram.length < 3 ||telegram.length > 32 ||
    typeof message !== "string" ||message.length < 10 ||message.length > 1000
  ) {
    return res.status(400).json({ message: "Invalid field data or length." });
  }

  const telegramRegex = /^[a-zA-Z0-9_]{5,32}$/;

  if (typeof telegram !== "string" || !telegramRegex.test(telegram)) {
      return res.status(400).json({ message: 'Invalid Telegram username format.' });
  }

  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if(ipAddress) {
    if (userCooldowns.has(ipAddress)) {
      const lastRequestTime = userCooldowns.get(ipAddress);
      const timeSinceLastRequest = (Date.now() - lastRequestTime); 

      if (timeSinceLastRequest < COOLDOWN_MS) {
        const timeLeft = Math.ceil(COOLDOWN_MS- timeSinceLastRequest / 1000);
        return res
          .status(429)
          .json({
            message: `Please wait ${timeLeft} seconds before sending another message.`,
        });
      }
      userCooldowns.delete(ipAddress);
    }
    userCooldowns.set(ipAddress, Date.now());
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Configuration error: Missing Telegram secrets.');
    // Return a generic 500 to the client, not revealing the exact internal error.
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const escapeMarkdownV2 = (str) => {
    return str.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
  };

  const escapeName = escapeMarkdownV2(name);

  const text = `📩 New Contact Form\n\n👤 Name: ${name}\n📱 Telegram: @${telegram}\n📝 Message: ${message}`;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      }
    );

    if (!telegramRes.ok) {
      const errorData = await telegramRes.json().catch(() => ({ description: 'No error description' }));
      console.error(`Telegram API error: ${telegramRes.status} - ${errorData.description}`);
      throw new Error(`Telegram API error: ${telegramRes.status}`);
    }

    return res.status(200).json({ message: "Message sent successfully!" });

  } catch (error) {
    console.error("Telegram error:", error);
    return res.status(500).json({ message: "Server error: Failed to send message." });
  }
}
