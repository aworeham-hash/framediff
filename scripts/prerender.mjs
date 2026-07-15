/**
 * Post-build prerender: generates a static HTML file per route with unique
 * <title>, meta description, canonical URL, Open Graph tags, and JSON-LD.
 * Crawlers get real, keyword-targeted metadata without JS execution.
 * Also generates sitemap.xml.
 *
 * Run automatically via `npm run build`.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DOMAINS, FRAMEWORK_EVIDENCE } from '../src/data/evidence.js'
import { SP80053_EVIDENCE } from '../src/data/evidence-80053.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = process.env.DIST_DIR || join(root, 'dist')
const SITE = 'https://framediff.vercel.app'

// ---- Load framework data ----------------------------------------------------
const frameworksDir = join(root, 'data', 'frameworks')
const frameworks = {}
for (const dir of readdirSync(frameworksDir)) {
  try {
    const data = JSON.parse(readFileSync(join(frameworksDir, dir, `${dir}.json`), 'utf8'))
    frameworks[data.id || dir] = data
  } catch { /* skip non-framework dirs */ }
}

function changeStats(fw) {
  let total = 0
  const transitions = fw.transitions || {}
  for (const t of Object.values(transitions)) {
    if (t && Array.isArray(t.changes)) total += t.changes.length
  }
  return { total, transitionCount: Object.keys(transitions).length }
}

// Keyword-targeted titles per framework (falls back to generated)
const TITLES = {
  'nist-csf': 'NIST CSF 2.0 Changes — What Changed vs 1.1 and 1.0',
  'nist-sp800-53': 'NIST SP 800-53 Changes — Rev 4 to Rev 5 to Release 5.2.0',
  'pci-dss': 'PCI DSS v4.0 & v4.0.1 Changes vs 3.2.1 — Requirement Diff',
  'iso-27001': 'ISO 27001:2022 vs 2013 — What Changed (Annex A Restructure)',
  'soc2': 'SOC 2 Trust Services Criteria 2022 Changes vs 2017',
  'hipaa': 'HIPAA Security Rule Changes — 2013 Omnibus & Proposed 2025 Update',
  'sox': 'SOX / PCAOB Standard Changes — AS5 to AS 2201 to QC 1000',
  'irs-4812': 'IRS Publication 4812 Changes — 2013 Original to Rev. 12-2025',
  'stigs': 'DISA STIG Changes by Year — Windows, RHEL, SQL Server & More',
  'nist-sp800-171': 'NIST SP 800-171 Rev 3 vs Rev 2 — What Changed for CUI & CMMC',
  'cmmc': 'CMMC 1.0 vs 2.0 — What Changed in the Final Rule (32 CFR 170)',
  'nydfs-500': 'NYDFS Part 500 Second Amendment — 2023 Changes vs 2017',
}

const DESCRIPTIONS = {
  'nist-csf': (s) => `Interactive changelog of the NIST Cybersecurity Framework: every control added, removed, or modified from CSF 1.0 to 1.1 to 2.0, including the new Govern function. ${s.total} tracked changes.`,
  'nist-sp800-53': (s) => `Every control change from NIST SP 800-53 Rev 4 to Rev 5 and the August 2025 Release 5.2.0 patch (SA-24, software update security per EO 14306). ${s.total} tracked changes.`,
  'pci-dss': (s) => `What changed in PCI DSS v4.0 and v4.0.1 vs 3.2.1: new requirements, customized approach, future-dated controls. Based on official PCI SSC summaries. ${s.total} tracked changes.`,
  'iso-27001': (s) => `ISO 27001:2022 vs 2013 structural comparison: Annex A reduced from 114 to 93 controls, 11 new controls, merges and renumbering — plus Amendment 1:2024 climate action changes. ${s.total} tracked changes.`,
  'soc2': (s) => `SOC 2 Trust Services Criteria changes from 2016 to 2017 to the 2022 revision: category and points-of-focus updates for audit readiness. ${s.total} tracked changes.`,
  'hipaa': (s) => `HIPAA Security Rule evolution: HITECH, 2013 Omnibus Rule, and the proposed 2025 Security Rule NPRM (not yet final; final action expected 2027) — every safeguard change tracked. ${s.total} tracked changes.`,
  'sox': (s) => `PCAOB auditing standard changes for SOX compliance: AS5 to AS 2201 reorganization and the new QC 1000 quality control standard. ${s.total} tracked changes.`,
  'irs-4812': (s) => `IRS Publication 4812 contractor security control changes from the original 2013 publication through Rev. 8, Rev. 9, and Rev. 12-2025 — the only interactive changelog for IRS contractor compliance. ${s.total} tracked changes.`,
  'stigs': (s) => `DISA STIG year-over-year changes for common products: Windows Server, RHEL, Ubuntu, SQL Server, IIS, Cisco IOS, and more. ${s.total} tracked changes.`,
  'nist-sp800-171': (s) => `NIST SP 800-171 Revision 3 vs Revision 2: requirements 110 to 97, three new families (PL, SA, SR), ODPs, and the DoD/CMMC Rev 2 assessment status. ${s.total} tracked changes.`,
  'cmmc': (s) => `CMMC 2.0 vs 1.0: five levels to three, process maturity eliminated, POA&Ms, SPRS affirmations, and the 32 CFR Part 170 final rule effective December 16, 2024. ${s.total} tracked changes.`,
  'nydfs-500': (s) => `NYDFS 23 NYCRR Part 500 Second Amendment (November 2023) vs the 2017 original: Class A companies, universal MFA, 24-hour ransom payment reporting, dual-signature certifications. ${s.total} tracked changes.`,
}

// ---- Routes -----------------------------------------------------------------
const routes = [
  {
    path: '/',
    title: 'FrameDiff — Compliance Framework Version Tracker',
    description: 'Track exactly what changed between versions of NIST CSF, SP 800-53, SP 800-171, CMMC, PCI DSS, ISO 27001, HIPAA, SOC 2, SOX, NYDFS Part 500, IRS 4812, and DISA STIGs. Control-level diffs for GRC teams, auditors, and security professionals.',
    priority: '1.0',
  },
  {
    path: '/about',
    title: 'About FrameDiff — Data Sources & Disclaimer',
    description: 'How FrameDiff tracks compliance framework changes, where the data comes from, and our accuracy disclaimer. Not affiliated with NIST, PCI SSC, ISO, AICPA, or DISA.',
    priority: '0.5',
  },
  {
    path: '/terms',
    title: 'Terms of Service — FrameDiff',
    description: 'Terms of service for FrameDiff, the compliance framework version tracker.',
    priority: '0.3',
  },
  {
    path: '/updates',
    title: 'Compliance Framework Updates & Deadlines 2026\u20132027 | FrameDiff',
    description: 'Upcoming compliance dates in one place: PCAOB QC 1000 effective December 15, 2026; HIPAA Security Rule final rule expected 2027; DISA STIG quarterly releases; PCI DSS post-RFC revision watch. Plus recent framework releases.',
    priority: '0.8',
  },
  {
    path: '/evidence',
    title: 'Compliance Evidence Collection Guide \u2014 What to Screenshot for Each Control | FrameDiff',
    description: 'Audit evidence examples for every NIST 800-53 Rev 5 base control (AC-1 through SR-12), plus SOC 2, 800-171, CMMC, PCI DSS, ISO 27001, HIPAA and NYDFS 500 control families: what auditors want to see, with concrete screenshot examples.',
    priority: '0.9',
  },
  {
    path: '/mapping',
    title: 'Compliance Framework Crosswalk \u2014 NIST 800-53, ISO 27001, SOC 2, PCI DSS, HIPAA Mapping | FrameDiff',
    description: 'Cross-framework control mapping: pick a control theme (MFA, logging, backups, vendor risk) and see the corresponding families and requirements in NIST 800-53, 800-171, CMMC, ISO 27001, SOC 2, PCI DSS, HIPAA, NYDFS 500, and more.',
    priority: '0.9',
  },
  {
    path: '/scoping',
    title: 'Which Compliance Frameworks Apply to You? Free Scoping Wizard | FrameDiff',
    description: 'Answer 9 yes/no questions and find out which security frameworks apply to your organization \u2014 CMMC, NIST 800-171, PCI DSS, HIPAA, SOC 2, ISO 27001, NYDFS 500, SOX \u2014 with the reason each applies and upcoming deadlines.',
    priority: '0.8',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — FrameDiff',
    description: 'Privacy policy for FrameDiff. We collect almost nothing and sell nothing.',
    priority: '0.3',
  },
]

for (const [id, fw] of Object.entries(frameworks)) {
  const s = changeStats(fw)
  routes.push({
    path: `/${id}`,
    title: `${TITLES[id] || `${fw.shortName || fw.name} Version Changes`} | FrameDiff`,
    description: (DESCRIPTIONS[id] || (() => fw.description || ''))(s),
    priority: '0.9',
    framework: fw,
    stats: s,
  })
}

// ---- HTML generation --------------------------------------------------------
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const esc = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

function renderRoute(route) {
  const url = SITE + (route.path === '/' ? '/' : route.path)
  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)

  // JSON-LD structured data
  const ld = []
  if (route.path === '/') {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'FrameDiff',
      url: SITE,
      applicationCategory: 'BusinessApplication',
      description: route.description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    })
  } else if (route.framework) {
    const fw = route.framework
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: route.title.replace(' | FrameDiff', ''),
      url,
      description: route.description,
      creator: { '@type': 'Organization', name: 'FrameDiff' },
      isBasedOn: fw.source || undefined,
      keywords: [fw.shortName || fw.name, 'compliance', 'changelog', 'version comparison'].join(', '),
    })
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FrameDiff', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: fw.shortName || fw.name, item: url },
      ],
    })
  }
  if (ld.length) {
    const scripts = ld.map(obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n    ')
    html = html.replace('</head>', `    ${scripts}\n  </head>`)
  }

  // Inject crawlable static content into #root (replaced when the app mounts)
  let body = ''
  if (route.path === '/') body = renderHomeBody()
  else if (route.path === '/evidence') body = renderEvidenceBody()
  else if (route.path === '/mapping') body = renderMappingBody()
  else if (route.path === '/scoping') body = renderScopingBody()
  else if (route.framework) body = renderFrameworkBody(route.framework, route.stats)
  if (body) {
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  }

  return html
}


// ---- Static body content (crawlable pre-JS content injected into #root) ----
const TYPE_LABEL = { added: 'Added', removed: 'Removed', modified: 'Modified', restructured: 'Restructured', renamed: 'Renamed' }

function fmtControlId(cid) {
  if (!cid) return ''
  if (typeof cid === 'string') return cid
  if (cid.old && cid.new && cid.old !== cid.new) return `${cid.old} \u2192 ${cid.new}`
  return cid.new || cid.old || ''
}

function frameworkNav(currentId) {
  const links = Object.values(frameworks)
    .filter(fw => fw.id !== currentId)
    .map(fw => `<a href="/${fw.id}">${esc(fw.shortName || fw.name)}</a>`)
    .join(' · ')
  return `<nav aria-label="Frameworks"><p><strong>All frameworks:</strong> ${links}</p></nav>`
}

function staticFooter() {
  return `<footer><p>FrameDiff is an independent reference tool, not affiliated with any framework publisher. Always verify against official publications. <a href="/about">About</a> · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a></p></footer>`
}

function latestTransition(fw) {
  const entries = Object.entries(fw.transitions || {})
  if (!entries.length) return null
  return entries[entries.length - 1][1]
}

function renderFrameworkBody(fw, stats) {
  const allTransitions = Object.values(fw.transitions || {}).reverse() // latest first
  const parts = []
  parts.push(`<header><p><a href="/">FrameDiff \u2014 the changelog for compliance frameworks</a></p></header>`)
  parts.push(`<h1>${esc(fw.name)}: what changed between versions</h1>`)
  if (fw.description) parts.push(`<p>${esc(fw.description)}</p>`)
  parts.push(`<p>${stats.total} tracked changes across ${stats.transitionCount} version transition${stats.transitionCount === 1 ? '' : 's'}. Published by ${esc(fw.publisher || '')}.</p>`)

  for (const t of allTransitions) {
    parts.push(`<h2>${esc(fw.shortName || fw.name)} ${esc(t.fromVersion)} \u2192 ${esc(t.toVersion)}</h2>`)
    const sm = t.summary || {}
    const counts = ['added', 'removed', 'modified', 'restructured', 'renamed']
      .filter(k => sm[k]).map(k => `${sm[k]} ${k}`).join(', ')
    if (counts) parts.push(`<p><strong>Summary:</strong> ${counts}.</p>`)
    if (Array.isArray(sm.highlights) && sm.highlights.length) {
      parts.push('<h3>Key changes</h3><ul>' + sm.highlights.map(h => `<li>${esc(h)}</li>`).join('') + '</ul>')
    }
    if (Array.isArray(t.changes) && t.changes.length) {
      parts.push('<h3>All changes in this transition</h3><dl>')
      for (const c of t.changes) {
        const cid = fmtControlId(c.controlId)
        parts.push(`<dt>[${TYPE_LABEL[c.type] || esc(c.type || '')}]${cid ? ' ' + esc(cid) + ' \u2014' : ''} ${esc(c.title || '')}</dt>`)
        const dd = []
        if (c.oldText) dd.push(`Before (${esc(t.fromVersion)}): ${esc(c.oldText)}`)
        if (c.newText) dd.push(`After (${esc(t.toVersion)}): ${esc(c.newText)}`)
        if (c.rationale) dd.push(`Why: ${esc(c.rationale)}`)
        if (dd.length) parts.push(`<dd>${dd.join('<br>')}</dd>`)
      }
      parts.push('</dl>')
    }
  }
  parts.push(frameworkNav(fw.id))
  parts.push(staticFooter())
  return parts.join('\n')
}

function renderEvidenceBody() {
  const parts = []
  parts.push(`<header><p><a href="/">FrameDiff \u2014 the changelog for compliance frameworks</a></p></header>`)
  parts.push('<h1>Compliance evidence collection guide: what to screenshot for each control</h1>')
  parts.push('<p>What auditors actually want to see, control area by control area, with a concrete example of a screenshot that works as audit evidence. Capture screenshots with the date visible, include the system name, and note the scope alongside each one. Examples are illustrative \u2014 your auditor determines sufficiency.</p>')
  parts.push('<h2>NIST SP 800-53 Rev 5: evidence for every base control</h2>')
  parts.push(`<p>Control-level evidence examples for all ${SP80053_EVIDENCE.length} SP 800-53 Rev 5 base controls. Enhancements (e.g., AC-6(1)) inherit the base control's guidance scoped to the enhancement's condition.</p>`)
  parts.push('<dl>')
  for (const c of SP80053_EVIDENCE) {
    const exs = c.examples.map((x, i) => `<br><strong>Example ${i + 1}:</strong> ${esc(x)}`).join('')
    parts.push(`<dt>${esc(c.id)} \u2014 ${esc(c.name)}</dt><dd><em>Evidence must show:</em> ${esc(c.what)}${exs}</dd>`)
  }
  parts.push('</dl>')
  for (const [fid, entries] of Object.entries(FRAMEWORK_EVIDENCE)) {
    const fw = frameworks[fid]
    parts.push(`<h2>${esc(fw ? fw.name : fid)} evidence examples</h2>`)
    parts.push('<dl>')
    for (const e of entries) {
      const d = DOMAINS[e.domain]
      if (!d) continue
      parts.push(`<dt>${esc(e.code)} \u2014 ${esc(e.name)}</dt>`)
      parts.push(`<dd>${esc(d.what)}<br><strong>Example screenshot evidence:</strong> ${esc(d.screenshot)}</dd>`)
    }
    parts.push('</dl>')
    if (fw) parts.push(`<p><a href="/${fid}">See what changed in recent ${esc(fw.shortName || fw.name)} versions</a></p>`)
  }
  parts.push(staticFooter())
  return parts.join('\n')
}

function renderMappingBody() {
  const parts = []
  parts.push(`<header><p><a href="/">FrameDiff \u2014 the changelog for compliance frameworks</a></p></header>`)
  parts.push('<h1>Compliance framework crosswalk: where each control theme lives in every framework</h1>')
  parts.push('<p>Family/requirement-level mapping across NIST SP 800-53, SP 800-171, CMMC, NIST CSF, ISO 27001, SOC 2, PCI DSS, HIPAA, NYDFS Part 500, SOX ITGC, IRS 4812, and DISA STIGs. For official control-level mappings see the NIST OLIR program and CPRT.</p>')
  for (const [key, d] of Object.entries(DOMAINS)) {
    parts.push(`<h2>${esc(d.name)}</h2><p>${esc(d.what)}</p><ul>`)
    for (const [fid, entries] of Object.entries(FRAMEWORK_EVIDENCE)) {
      const m = entries.filter(e => e.domain === key)
      if (!m.length) continue
      const fw = frameworks[fid]
      parts.push(`<li><strong>${esc(fw ? fw.shortName || fw.name : fid)}:</strong> ${m.map(x => `${esc(x.code)} (${esc(x.name)})`).join(', ')}</li>`)
    }
    parts.push('</ul>')
  }
  parts.push(staticFooter())
  return parts.join('\n')
}

function renderScopingBody() {
  const parts = []
  parts.push(`<header><p><a href="/">FrameDiff \u2014 the changelog for compliance frameworks</a></p></header>`)
  parts.push('<h1>Which compliance frameworks apply to your organization?</h1>')
  parts.push('<p>A first-pass applicability guide. Answer these questions in the interactive wizard to build your map:</p><ul>')
  const qs = [
    ['DoD contracts or FCI/CUI handling', 'CMMC (32 CFR 170) and NIST SP 800-171 via DFARS 252.204-7012'],
    ['CUI from any federal agency', 'NIST SP 800-171'],
    ['Federal systems or cloud services for agencies', 'NIST SP 800-53 baselines; DISA STIGs for DoD configurations'],
    ['Payment card data', 'PCI DSS v4.0.1'],
    ['Protected Health Information', 'HIPAA Security Rule (watch the proposed 2025 update)'],
    ['NY DFS-licensed financial services', 'NYDFS 23 NYCRR Part 500 Second Amendment'],
    ['US public company', 'SOX 404 / PCAOB standards including QC 1000 (effective Dec 15, 2026)'],
    ['Enterprise customers requesting attestations', 'SOC 2 (2017 TSC + 2022 points of focus) and ISO/IEC 27001:2022'],
    ['Federal Tax Information as an IRS contractor', 'IRS Publication 4812 Rev. 12-2025'],
  ]
  for (const [q, a] of qs) parts.push(`<li><strong>${esc(q)}?</strong> \u2192 ${esc(a)}</li>`)
  parts.push('</ul><p>NIST CSF 2.0 is recommended for every organization as the voluntary organizing framework.</p>')
  parts.push(staticFooter())
  return parts.join('\n')
}

function renderHomeBody() {
  const parts = []
  parts.push('<h1>FrameDiff \u2014 the changelog for compliance frameworks</h1>')
  parts.push('<p>See exactly which controls were added, removed, or modified between framework versions \u2014 with the rationale behind each update. Free for GRC teams, auditors, and security professionals.</p>')
  parts.push('<h2>Tracked frameworks</h2><ul>')
  for (const fw of Object.values(frameworks)) {
    const st = changeStats(fw)
    parts.push(`<li><a href="/${fw.id}">${esc(fw.name)}</a> \u2014 ${st.total} tracked changes across ${st.transitionCount} version transition${st.transitionCount === 1 ? '' : 's'}</li>`)
  }
  parts.push('</ul>')
  parts.push(staticFooter())
  return parts.join('\n')
}

let generated = 0
for (const route of routes) {
  const html = renderRoute(route)
  if (route.path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
  } else {
    const dir = join(dist, route.path.slice(1))
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
  }
  generated++
}

// ---- sitemap.xml ------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.framework ? 'monthly' : 'yearly'}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)


// ---- feed.xml (RSS) ----------------------------------------------------------
const rssItems = Object.values(frameworks).map(fw => {
  const t = latestTransition(fw)
  if (!t) return ''
  const title = `${fw.shortName || fw.name}: ${t.fromVersion} \u2192 ${t.toVersion}`
  const sm = t.summary || {}
  const counts = ['added', 'removed', 'modified', 'restructured', 'renamed']
    .filter(k => sm[k]).map(k => `${sm[k]} ${k}`).join(', ')
  const desc = `${counts}. ${(sm.highlights || []).slice(0, 3).join(' ')}`
  const date = new Date(t.toReleaseDate || fw.lastDataUpdate || Date.now()).toUTCString()
  return `  <item>
    <title>${esc(title)}</title>
    <link>${SITE}/${fw.id}</link>
    <guid isPermaLink="true">${SITE}/${fw.id}</guid>
    <pubDate>${date}</pubDate>
    <description>${esc(desc)}</description>
  </item>`
}).filter(Boolean).join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>FrameDiff \u2014 Compliance Framework Updates</title>
  <link>${SITE}</link>
  <description>Version-to-version changes across NIST, PCI DSS, ISO 27001, HIPAA, SOC 2, SOX, IRS 4812, and DISA STIGs.</description>
  <language>en-us</language>
${rssItems}
</channel>
</rss>
`
writeFileSync(join(dist, 'feed.xml'), rss)


// ---- compliance-deadlines.ics (subscribe in Outlook/Google Calendar) --------
const ICS_EVENTS = [
  { date: '20261215', title: 'PCAOB QC 1000 takes effect', desc: 'All registered audit firms must have a QC system designed under QC 1000. Source: pcaobus.org' },
  { date: '20270701', title: 'HIPAA Security Rule final rule expected (OMB agenda)', desc: 'Expected final action on the Security Rule NPRM. Timing may change - proposals are not yet enforceable. Source: hhs.gov' },
]
const icsBody = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//FrameDiff//Compliance Deadlines//EN', 'X-WR-CALNAME:Compliance Deadlines (FrameDiff)']
for (const e of ICS_EVENTS) {
  icsBody.push('BEGIN:VEVENT', `UID:${e.date}-framediff`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${e.date}`, `SUMMARY:${e.title}`, `DESCRIPTION:${e.desc} - details at ${SITE}/updates`, 'END:VEVENT')
}
icsBody.push('END:VCALENDAR')
writeFileSync(join(dist, 'compliance-deadlines.ics'), icsBody.join('\r\n'))

console.log(`Prerendered ${generated} routes + sitemap.xml + feed.xml + ics`)
