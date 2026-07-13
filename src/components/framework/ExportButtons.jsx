import { useState } from 'react'
import { exportCSV, exportPDF } from '../../utils/export'

export function ExportButtons({ framework, changes, fromVersion, toVersion }) {
  if (!changes?.length) return null

  const btnClass = 'inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-md px-2.5 py-1.5 transition-colors'

  return (
    <div className="flex items-center gap-2">
      <CopyLinkButton btnClass={btnClass} />
      <button
        onClick={() => exportCSV(framework, changes, fromVersion, toVersion)}
        className={btnClass}
        title="Download as CSV (opens in Excel)"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Excel / CSV
      </button>
      <button
        onClick={() => exportPDF(framework, changes, fromVersion, toVersion)}
        className={btnClass}
        title="Print or save as PDF"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        PDF
      </button>
    </div>
  )
}

function CopyLinkButton({ btnClass }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable */ }
  }
  return (
    <button onClick={copy} className={btnClass} title="Copy a shareable link to this comparison">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}
