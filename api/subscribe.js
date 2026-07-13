// Vercel serverless function: forwards alert signups to formsubmit.co.
// The destination inbox lives in the ALERT_INBOX environment variable
// (Vercel dashboard -> Project -> Settings -> Environment Variables),
// so no email address ever appears in the client bundle.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const inbox = process.env.ALERT_INBOX
  if (!inbox) {
    return res.status(503).json({ error: 'Alert signups are not configured yet.' })
  }

  const { email, frameworks_followed, signup_page, signup_date, _subject, _template, _autoresponse, _captcha } = req.body || {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  try {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, frameworks_followed, signup_page, signup_date, _subject, _template, _autoresponse, _captcha }),
    })
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok })
  } catch {
    return res.status(502).json({ error: 'Upstream error' })
  }
}
