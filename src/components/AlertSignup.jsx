import { useState } from 'react'

// Version-alert email capture via formsubmit.co (no backend required).
// - Subscriber receives a branded auto-response confirmation
// - Owner receives a structured notification with context fields
// - Honeypot field filters bots; localStorage prevents duplicate signups
const ENDPOINT = 'https://formsubmit.co/ajax/aworeham@gmail.com'

const AUTORESPONSE = `You're subscribed to FrameDiff version alerts.

What happens next:
- When a compliance framework you follow publishes a new version, you'll get one short email describing what changed, with a link to the full comparison.
- No newsletters, no marketing, no more than one email per framework release.

While you wait, you can track upcoming compliance dates here:
https://framediff.vercel.app/updates

To unsubscribe at any time, just reply to any alert email with "unsubscribe".

— FrameDiff
The changelog for compliance frameworks
https://framediff.vercel.app`

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
}

export function AlertSignup({ frameworkName }) {
  const [email, setEmail] = useState('')
  const [honey, setHoney] = useState('') // honeypot — humans never see it
  const [status, setStatus] = useState(() =>
    localStorage.getItem('framediff-subscribed') ? 'done' : 'idle'
  )
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (honey) { setStatus('done'); return } // bot — pretend success, send nothing
    if (!isValidEmail(email)) {
      setError('Please enter a valid work or personal email address.')
      return
    }
    setError('')
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          frameworks_followed: frameworkName || 'All frameworks',
          signup_page: window.location.href,
          signup_date: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
          _subject: `FrameDiff subscriber: ${email} (${frameworkName || 'all frameworks'})`,
          _template: 'box',
          _autoresponse: AUTORESPONSE,
          _captcha: 'false',
        }),
      })
      if (res.ok) {
        try { localStorage.setItem('framediff-subscribed', email) } catch { /* noop */ }
        setStatus('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-emerald-800">You're on the list.</p>
            <p className="text-xs text-emerald-700 mt-1">
              A confirmation is on its way to your inbox. You'll get one email when{' '}
              {frameworkName ? `${frameworkName} publishes` : 'a framework you follow publishes'} a new version — nothing else.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-5 py-4">
      <div className="flex items-start gap-3">
        <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3A6 6 0 006 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            Get notified when {frameworkName || 'a framework'} releases a new version
          </p>
          <p className="text-xs text-gray-500 mt-0.5 mb-3">
            One short email per release with a summary of what changed. No newsletter, no spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md" noValidate>
            {/* Honeypot — hidden from humans, bots fill it */}
            <input
              type="text"
              value={honey}
              onChange={e => setHoney(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
              name="_honey_website"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
              placeholder="you@company.com"
              aria-label="Email address"
              className={`flex-1 min-w-0 text-sm border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-md px-4 py-1.5 transition-colors flex-shrink-0"
            >
              {status === 'sending' ? 'Subscribing…' : 'Notify me'}
            </button>
          </form>
          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
          {status === 'error' && !error && (
            <p className="text-xs text-red-600 mt-2">Something went wrong — please try again in a moment.</p>
          )}
          <p className="text-[10px] text-gray-400 mt-2">
            We store only your email address, only for release alerts. See our{' '}
            <a href="/privacy" className="underline hover:text-gray-600">privacy policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
