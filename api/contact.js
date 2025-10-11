// Vercel serverless function for contact form submissions.
// Supports SendGrid when SENDGRID_API_KEY is configured in the environment.

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM = process.env.SENDGRID_FROM || 'no-reply@yourdomain.com';
const SENDGRID_TO = process.env.SENDGRID_TO || process.env.SENDGRID_FROM || 'you@yourdomain.com';

async function sendViaSendGrid({ name, email, message }) {
  const payload = {
    personalizations: [{ to: [{ email: SENDGRID_TO }] }],
    from: { email: SENDGRID_FROM },
    subject: `Portfolio contact from ${name} <${email}>`,
    content: [{ type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\n${message}` }]
  };

  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!r.ok) {
    const text = await r.text();
    throw new Error(`SendGrid responded ${r.status}: ${text}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }

    console.log('Contact form received:', { name, email, message });

    if (SENDGRID_API_KEY) {
      try {
        await sendViaSendGrid({ name, email, message });
        res.status(200).json({ ok: true, sent: true });
        return;
      } catch (err) {
        console.error('SendGrid error:', err);
        res.status(500).json({ error: 'Failed to send email' });
        return;
      }
    }

    // Fallback: no email provider configured — keep submission in logs for manual retrieval.
    res.status(200).json({ ok: true, sent: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
