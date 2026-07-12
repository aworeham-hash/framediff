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
  'nist-sp800-53': 'NIST SP 800-53 Rev 5 Changes vs Rev 4 — Control-Level Diff',
  'pci-dss': 'PCI DSS v4.0 & v4.0.1 Changes vs 3.2.1 — Requirement Diff',
  'iso-27001': 'ISO 27001:2022 vs 2013 — What Changed (Annex A Restructure)',
  'soc2': 'SOC 2 Trust Services Criteria 2022 Changes vs 2017',
  'hipaa': 'HIPAA Security Rule Changes — 2013 Omnibus to 2025 Update',
  'sox': 'SOX / PCAOB Standard Changes — AS5 to AS 2201 to QC 1000',
  'irs-4812': 'IRS Publication 4812 Changes — Rev 8, Rev 9, Rev 12 Compared',
  'stigs': 'DISA STIG Changes by Year — Windows, RHEL, SQL Server & More',
}

const DESCRIPTIONS = {
  'nist-csf': (s) => `Interactive changelog of the NIST Cybersecurity Framework: every control added, removed, or modified from CSF 1.0 to 1.1 to 2.0, including the new Govern function. ${s.total} tracked changes.`,
  'nist-sp800-53': (s) => `Every control change from NIST SP 800-53 Rev 4 to Rev 5: new privacy controls, supply chain risk management family, and consolidations. ${s.total} tracked changes.`,
  'pci-dss': (s) => `What changed in PCI DSS v4.0 and v4.0.1 vs 3.2.1: new requirements, customized approach, future-dated controls. Based on official PCI SSC summaries. ${s.total} tracked changes.`,
  'iso-27001': (s) => `ISO 27001:2022 vs 2013 structural comparison: Annex A reduced from 114 to 93 controls across 4 themes, 11 new controls, merges and renumbering. ${s.total} tracked changes.`,
  'soc2': (s) => `SOC 2 Trust Services Criteria changes from 2016 to 2017 to the 2022 revision: category and points-of-focus updates for audit readiness. ${s.total} tracked changes.`,
  'hipaa': (s) => `HIPAA Security Rule evolution: HITECH, 2013 Omnibus Rule, and the proposed 2025 Security Rule update — every safeguard change tracked. ${s.total} tracked changes.`,
  'sox': (s) => `PCAOB auditing standard changes for SOX compliance: AS5 to AS 2201 reorganization and the new QC 1000 quality control standard. ${s.total} tracked changes.`,
  'irs-4812': (s) => `IRS Publication 4812 contractor security control changes across Rev 8, Rev 9, and Rev 12 — the only interactive changelog for IRS contractor compliance. ${s.total} tracked changes.`,
  'stigs': (s) => `DISA STIG year-over-year changes for common products: Windows Server, RHEL, Ubuntu, SQL Server, IIS, Cisco IOS, and more. ${s.total} tracked changes.`,
}

// ---- Routes -----------------------------------------------------------------
const routes = [
  {
    path: '/',
    title: 'FrameDiff — Compliance Framework Version Tracker',
    description: 'Track exactly what changed between versions of NIST CSF, NIST SP 800-53, PCI DSS, ISO 27001, HIPAA, SOC 2, SOX, IRS 4812, and DISA STIGs. Control-level diffs for GRC teams, auditors, and security professionals.',
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

  return html
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

console.log(`Prerendered ${generated} routes + sitemap.xml`)
