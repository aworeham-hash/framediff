import { useState } from 'react'

// Version-alert email capture. Uses formsubmit.co (no backend needed):
// submissions arrive as emails. Swap for Resend/ConvertKit when alerts ship.
const ENDPOINT = 'https://formsubmit.co/ajax/aworeham@gmail.com'

export function AlertSignup({ frameworkName }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          framework: frameworkName || 'All frameworks',
          _subject: 'FrameDiff alert signup',
          _template: 'table',
          _captcha: 'false',
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4">
        <p className="text-sm font-medium text-emerald-800">
          You're on the list. We'll email you when {frameworkName ? `${frameworkName} publishes` : 'frameworks publish'} a new version.
        </p>
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
            One email per release. No spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 min-w-0 text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-md px-4 py-1.5 transition-colors flex-shrink-0"
            >
              {status === 'sending' ? 'Adding…' : 'Notify me'}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-xs text-red-600 mt-2">Something went wrong — please try again.</p>
          )}
        </div>
      </div>
    </div>
  )
}
