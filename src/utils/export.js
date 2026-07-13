// Client-side export: CSV (opens in Excel) and print-optimized PDF.
// Zero dependencies, zero backend.

function csvEscape(value) {
  const s = String(value ?? '')
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
  return s
}

function formatControlId(controlId) {
  if (!controlId) return ''
  if (typeof controlId === 'string') return controlId
  const { old: oldId, new: newId } = controlId
  if (oldId && newId && oldId !== newId) return `${oldId} → ${newId}`
  return newId || oldId || ''
}

export function exportCSV(framework, changes, fromVersion, toVersion, triage = {}) {
  const header = ['Change Type', 'Control ID', 'Title', 'Area', 'Old Text', 'New Text', 'Rationale', 'Significance', 'Triage Status']
  const rows = changes.map(c => [
    c.type || '',
    formatControlId(c.controlId),
    c.title || '',
    c.area || '',
    c.oldText || '',
    c.newText || '',
    c.rationale || '',
    c.significance || '',
    ({ relevant: 'Relevant', na: 'Not applicable', done: 'Done' })[triage[c.id]] || '',
  ])
  const meta = [
    [`${framework.name} — ${fromVersion} to ${toVersion}`],
    [`Exported from FrameDiff (framediff.vercel.app) on ${new Date().toISOString().slice(0, 10)}`],
    ['Informational summary only. Always verify against official framework documentation.'],
    [],
  ]
  const csv = [...meta, header, ...rows]
    .map(row => row.map(csvEscape).join(','))
    .join('\r\n')

  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${framework.id}-${fromVersion}-to-${toVersion}-changes.csv`.replace(/[^\w.-]+/g, '-')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const TYPE_LABELS = { added: 'Added', removed: 'Removed', modified: 'Modified', restructured: 'Restructured', renamed: 'Renamed' }
const TYPE_COLORS = { added: '#059669', removed: '#dc2626', modified: '#d97706', restructured: '#4f46e5', renamed: '#0891b2' }

function htmlEscape(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function exportPDF(framework, changes, fromVersion, toVersion) {
  const counts = {}
  changes.forEach(c => { counts[c.type] = (counts[c.type] || 0) + 1 })

  const changeRows = changes.map(c => `
    <div class="change">
      <div class="change-head">
        <span class="badge" style="background:${TYPE_COLORS[c.type] || '#64748b'}">${TYPE_LABELS[c.type] || htmlEscape(c.type)}</span>
        <span class="cid">${htmlEscape(formatControlId(c.controlId))}</span>
        <strong>${htmlEscape(c.title || '')}</strong>
      </div>
      ${c.area ? `<p class="area">${htmlEscape(c.area)}</p>` : ''}
      ${c.oldText ? `<div class="diff old"><span>Before (${htmlEscape(fromVersion)})</span> ${htmlEscape(c.oldText)}</div>` : ''}
      ${c.newText ? `<div class="diff new"><span>After (${htmlEscape(toVersion)})</span> ${htmlEscape(c.newText)}</div>` : ''}
      ${c.rationale ? `<p class="rationale">Why: ${htmlEscape(c.rationale)}</p>` : ''}
    </div>`).join('')

  const html = `<!doctype html>
<html><head><meta charset="utf-8">
<title>${htmlEscape(framework.name)} — ${htmlEscape(fromVersion)} to ${htmlEscape(toVersion)}</title>
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font: 13px/1.5 -apple-system, 'Segoe UI', Roboto, sans-serif; color: #1e293b; padding: 32px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 20px; margin-bottom: 2px; }
  .sub { color: #64748b; font-size: 12px; margin-bottom: 16px; }
  .summary { display: flex; gap: 12px; margin: 16px 0 24px; flex-wrap: wrap; }
  .summary div { border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 14px; text-align: center; font-size: 11px; color: #64748b; }
  .summary b { display: block; font-size: 18px; }
  .change { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px; page-break-inside: avoid; }
  .change-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .badge { color: #fff; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 999px; text-transform: uppercase; letter-spacing: .03em; }
  .cid { font-family: ui-monospace, monospace; font-size: 11px; color: #64748b; }
  .area { margin-top: 4px; font-size: 11px; color: #94a3b8; }
  .diff { margin-top: 6px; padding: 6px 10px; border-radius: 6px; font-size: 12px; white-space: pre-wrap; }
  .diff span { font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: .04em; display: block; margin-bottom: 2px; }
  .old { background: #fef2f2; color: #7f1d1d; }
  .new { background: #f0fdf4; color: #14532d; }
  .rationale { margin-top: 6px; font-size: 12px; color: #64748b; font-style: italic; }
  .footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
  @media print { body { padding: 0; } }
</style></head>
<body>
  <h1>${htmlEscape(framework.name)}</h1>
  <div class="sub">Version comparison: <strong>${htmlEscape(fromVersion)}</strong> &rarr; <strong>${htmlEscape(toVersion)}</strong> &middot; Generated by FrameDiff &middot; ${new Date().toISOString().slice(0, 10)}</div>
  <div class="summary">
    ${Object.keys(TYPE_LABELS).filter(t => counts[t]).map(t =>
      `<div><b style="color:${TYPE_COLORS[t]}">${counts[t]}</b>${TYPE_LABELS[t]}</div>`).join('')}
    <div><b>${changes.length}</b>Total</div>
  </div>
  ${changeRows}
  <div class="footer">
    Exported from FrameDiff (framediff.vercel.app). Informational summary only — always verify against official ${htmlEscape(framework.publisher || '')} documentation before making compliance decisions. FrameDiff is not affiliated with any framework publisher.
  </div>
  <script>window.onload = () => setTimeout(() => window.print(), 200)</script>
</body></html>`

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
}
