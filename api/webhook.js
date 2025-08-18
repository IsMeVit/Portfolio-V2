const requestCounts = new Map();
const bannedUsers = new Map();
const REQUEST_WINDOW_SECONDS = 30;
const MAX_REQUESTS = 3;
const BAN_DURATION_HOURS = 1;

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
  const currentTime = Date.now();

  if (bannedUsers.has(ipAddress)) {
    const banExpiration = bannedUsers.get(ipAddress);
    if (currentTime < banExpiration) {
      const minutesLeft = Math.ceil((banExpiration - currentTime) / (1000 * 60));
      return res.status(403).json({ message: `You are temporarily banned. Please try again in ${minutesLeft} minutes.` });
    } else {
      bannedUsers.delete(ipAddress); 
    }
  }

  let requests = requestCounts.get(ipAddress) || { count: 0, firstRequestTime: currentTime };
  
  if (currentTime - requests.firstRequestTime > REQUEST_WINDOW_SECONDS * 1000) {
    requests = { count: 1, firstRequestTime: currentTime };
  } else {
    requests.count++;
  }
  requestCounts.set(ipAddress, requests);

  if (requests.count > MAX_REQUESTS) {
    console.log(`User at IP ${ipAddress} exceeded request limit. Banning for ${BAN_DURATION_HOURS} hour(s).`);
    const banExpiration = currentTime + BAN_DURATION_HOURS * 60 * 60 * 1000;
    bannedUsers.set(ipAddress, banExpiration);
    return res.status(403).json({ message: `You have been banned for 1 hour due to excessive requests.` });
  }

  if (!name || !telegram || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const text = `📩 New Contact Form\n\n👤 Name: ${name}\n📱 Telegram: @${telegram}\n📝 Message: ${message}`;
    
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
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