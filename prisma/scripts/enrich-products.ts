import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
const BASE = 'https://africa.felicitysolar.com'
const LOCALES = ['', '/sw']

function slugCandidates(slug: string, name?: string) {
  const base = slug.replace(/-\d+$/, '')
  const candidates = new Set<string>()
  candidates.add(`/product/${slug}/`)
  candidates.add(`/product/${base}/`)
  if (name) {
    const s = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    candidates.add(`/product/${s}/`)
  }
  return Array.from(candidates)
}

async function fetchHtml(url: string) {
  try {
    const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'eastcom-seeder/1.0' } })
    if (!res.ok) return null
    const text = await res.text()
    return text
  } catch (e) {
    return null
  }
}

function extractMeta(html: string) {
  const out: any = {}
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1) out.title = h1[1].replace(/<[^>]+>/g, '').trim()
  const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
  if (desc) out.description = desc[1].trim()
  const og = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i)
  if (og) out.ogImage = og[1]
  // first large img
  const img = html.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i)
  if (img) out.image = img[1]

  // heuristics: collect spec-like tokens e.g. 5kW, 48V, 15kWh
  const specMatches = Array.from(new Set((html.match(/\b\d+(?:\.\d+)?\s?(?:kW|KW|kVA|KVA|kWh|KWh|V|VA|A|Ah)\b/gi) || []).map(s => s.trim())))
  if (specMatches.length) out.specs = specMatches

  // also try to extract bullet list under product sections
  const ulMatch = html.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i)
  if (ulMatch) {
    const items = Array.from(ulMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)).map(m => m[1].replace(/<[^>]+>/g,'').trim())
    if (items.length) out.bullets = items.slice(0,8)
  }

  return out
}

async function enrich() {
  console.log('Fetching products from DB...')
  const products = await prisma.product.findMany()
  console.log(`Found ${products.length} products`)

  const report: Array<any> = []

  for (const p of products) {
    console.log(`Checking ${p.slug}`)
    let matched = false
    let best: any = null

    const candidates = slugCandidates(p.slug, p.name)
    for (const loc of LOCALES) {
      for (const candidate of candidates) {
        const url = `${BASE}${loc}${candidate}`
        const html = await fetchHtml(url)
        if (!html) continue
        const meta = extractMeta(html)
        // simple confidence: title or description must include series or model token
        const title = (meta.title || meta.description || '').toLowerCase()
        const checkTokens = [p.slug, p.name].filter(Boolean).map(s => s.toLowerCase())
        const matchesToken = checkTokens.some(t => t && title.includes(t.split('-').join(' ')))
        if (matchesToken || meta.specs || meta.bullets) {
          matched = true
          best = { url, meta }
          break
        }
      }
      if (matched) break
    }

    if (best && best.meta) {
      const meta = best.meta
      const updates: any = {}
      if (meta.description) updates.description = meta.description
      let newSpecs: any = {}
      if (p.specs && typeof p.specs === 'object') {
        newSpecs = { ...(p.specs as Record<string, any>) }
      }
      if (meta.specs) meta.specs.forEach((s: string, i: number) => { newSpecs[`spec_${i+1}`] = s })
      if (meta.bullets) { newSpecs.bullets = meta.bullets }
      updates.specs = newSpecs
      const imgs = new Set<string>([...(p.images || [])])
      if (meta.ogImage) imgs.add(meta.ogImage)
      if (meta.image) imgs.add(meta.image)
      updates.images = Array.from(imgs)

      try {
        await prisma.product.update({ where: { id: p.id }, data: updates })
        console.log(`Updated ${p.slug} from ${best.url}`)
        report.push({ slug: p.slug, url: best.url, updated: true })
      } catch (e) {
        console.error('Failed to update', p.slug, e)
        report.push({ slug: p.slug, url: best.url, updated: false, error: String(e) })
      }
    } else {
      console.log(`No good match for ${p.slug}`)
      report.push({ slug: p.slug, updated: false })
    }

    // be polite
    await new Promise(r => setTimeout(r, 600))
  }

  console.log('Enrichment complete')
  console.log(JSON.stringify(report, null, 2))
  await prisma.$disconnect()
}

enrich().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
