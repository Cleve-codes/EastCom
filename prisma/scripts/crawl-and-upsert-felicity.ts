#!/usr/bin/env tsx
import fs from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { prisma } from '../../src/lib/prisma'

const BASE = 'https://africa.felicitysolar.com'
const SITEMAP_INDEX = `${BASE}/sitemap_index.xml`
const OUT_DIR = path.resolve(process.cwd(), 'data')
const OUT_JSON = path.join(OUT_DIR, 'felicity-catalog.json')

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function fetchText(url: string, opts: RequestInit = {}) {
  const res = await fetch(url, opts)
  if (!res.ok) throw new Error(`fetch ${url} -> ${res.status}`)
  return await res.text()
}

function extractLocs(xml: string) {
  const re = /<loc>([^<]+)<\/loc>/gi
  const urls: string[] = []
  let m
  while ((m = re.exec(xml))) urls.push(m[1])
  return urls
}

function siteSlugFromUrl(u: string) {
  try {
    const url = new URL(u)
    const parts = url.pathname.split('/').filter(Boolean)
    return parts[parts.length - 1] || ''
  } catch {
    return ''
  }
}

async function parseProductPage(html: string, url: string) {
  // Try JSON-LD Product first
  const jsonLdRe = /<script[^>]+type=(?:"|')application\/ld\+json(?:"|')[^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = jsonLdRe.exec(html))) {
    try {
      const j = JSON.parse(match[1])
      // Some pages have an array
      const candidate = Array.isArray(j) ? j.find(x => x['@type'] === 'Product') || j[0] : j
      if (candidate && (candidate['@type'] === 'Product' || candidate['name'])) {
        const name = candidate.name || ''
        const description = candidate.description || ''
        const images = Array.isArray(candidate.image) ? candidate.image : (candidate.image ? [candidate.image] : [])
        const price = candidate.offers && (candidate.offers.price || candidate.offers.priceSpecification?.price)
        const specs: Record<string, any> = {}
        if (candidate.additionalProperty) {
          for (const p of candidate.additionalProperty) specs[p.name] = p.value
        }
        return { name, description, images, price: price ? Number(price) : null, specs }
      }
    } catch (err) {
      // ignore JSON parse errors
    }
  }

  // Fallback heuristics
  const title = (html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || [])[1] || (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || ''
  const ogDesc = (html.match(/<meta[^>]*property=(?:"|')og:description(?:"|')[^>]*content=(?:"|')([^"']+)(?:"|')/i) || [])[1]
  const metaDesc = ogDesc || (html.match(/<meta[^>]*name=(?:"|')description(?:"|')[^>]*content=(?:"|')([^"']+)(?:"|')/i) || [])[1] || ''
  const images: string[] = []
  const ogImage = (html.match(/<meta[^>]*property=(?:"|')og:image(?:"|')[^>]*content=(?:"|')([^"']+)(?:"|')/i) || [])[1]
  if (ogImage) images.push(ogImage)
  // first <img> inside main content
  const imgRe = /<img[^>]+src=(?:"|')([^"']+)(?:"|')/gi
  let im
  while ((im = imgRe.exec(html))) {
    const src = im[1]
    if (src && !src.startsWith('data:') && images.indexOf(src) === -1) images.push(src)
    if (images.length >= 6) break
  }

  // Try to extract specs from tables or lists (very heuristic)
  const specs: Record<string, any> = {}
  const tableRe = /<table[\s\S]*?<tbody[\s\S]*?>([\s\S]*?)<\/tbody>/i
  const tableMatch = html.match(tableRe)
  if (tableMatch) {
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
    let r
    while ((r = rowRe.exec(tableMatch[1]))) {
      const td = r[1].replace(/<\/td>/gi, '\n').replace(/<[^>]+>/g, '').split(/\n+/).map(s => s.trim()).filter(Boolean)
      if (td.length >= 2) specs[td[0]] = td.slice(1).join(' ')
    }
  }

  // lists
  const listRe = /<ul[^>]*>([\s\S]*?)<\/ul>/gi
  let l
  const bullets: string[] = []
  while ((l = listRe.exec(html))) {
    const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
    let li
    while ((li = liRe.exec(l[1]))) {
      const text = li[1].replace(/<[^>]+>/g, '').trim()
      if (text) bullets.push(text)
      if (bullets.length >= 8) break
    }
    if (bullets.length) break
  }

  // Price heuristics
  const priceMatch = html.match(/(KSh|KES|TZS|UGX|R|USD)\s?([0-9,]+(?:\.[0-9]+)?)/i) || html.match(/([0-9,]+)\s?(?:KES|KSh|TZS|UGX)/i)
  const price = priceMatch ? Number((priceMatch[2] || priceMatch[1]).replace(/[, ]+/g, '')) : null

  return {
    name: (title || '').trim(),
    description: (metaDesc || '').trim(),
    images,
    price,
    specs: Object.keys(specs).length ? specs : (bullets.length ? { bullets } : {})
  }
}

async function ensureOutDir() {
  try { await fs.mkdir(OUT_DIR, { recursive: true }) } catch {}
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  console.log('Starting Felicity sitemap crawl and upsert...')
  // load env (prefer .env.local then .env)
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
  dotenv.config({ path: path.resolve(process.cwd(), '.env') })
  await ensureOutDir()

  console.log('Fetching sitemap index:', SITEMAP_INDEX)
  const idxText = await fetchText(SITEMAP_INDEX)
  const sitemapUrls = extractLocs(idxText)
  console.log(`Found ${sitemapUrls.length} sitemaps in index`)

  // Collect product URLs
  const productUrls = new Set<string>()
  for (const sm of sitemapUrls) {
    try {
      const txt = await fetchText(sm)
      const locs = extractLocs(txt)
      for (const l of locs) {
        if (l.includes('/product/') || l.includes('/products/') || l.match(/\/\w+-\d{3,}/)) productUrls.add(l)
      }
    } catch (err) {
      console.warn('Failed to fetch sitemap', sm, String((err as any)?.message || err))
    }
    // polite pause
    await delay(300)
  }

  const urls = Array.from(productUrls)
  console.log(`Collected ${urls.length} product URLs (filtered heuristically)`)

  const staged: any[] = []
  let i = 0
  for (const u of urls) {
    i++
    try {
      console.log(`[${i}/${urls.length}] Fetching`, u)
      const html = await fetchText(u)
      const parsed = await parseProductPage(html, u)
      const slug = slugify(siteSlugFromUrl(u) || parsed.name || `p-${i}`)
      staged.push({
        sourceUrl: u,
        slug,
        name: parsed.name || slug.replace(/-/g, ' '),
        description: parsed.description || '',
        images: (parsed.images || []).map((im: string) => im.startsWith('/') ? BASE + im : im),
        price: parsed.price || null,
        specs: parsed.specs || {},
        crawledAt: new Date().toISOString()
      })
    } catch (err) {
      console.warn('Failed to fetch/parse', u, String((err as any)?.message || err))
    }
    // small pause
    await delay(400)
  }

  await fs.writeFile(OUT_JSON, JSON.stringify(staged, null, 2), 'utf8')
  console.log('Wrote staged JSON to', OUT_JSON)

  // Upsert into DB
  console.log('Upserting staged products into database (idempotent)')
  let upserted = 0
  for (const p of staged) {
    try {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          description: p.description || undefined,
          images: p.images.length ? p.images : undefined,
          price: p.price != null ? Math.round(Number(p.price)) : undefined,
          specs: Object.keys(p.specs).length ? p.specs : undefined
        },
        create: {
          slug: p.slug,
          name: p.name,
          description: p.description || '',
          images: p.images,
          price: p.price != null ? Math.round(Number(p.price)) : 0,
          specs: p.specs || {},
          // category is required in the schema; default to Panels when unknown
          category: 'Panels'
        }
      })
      upserted++
    } catch (err) {
      console.warn('Upsert failed for', p.slug, String((err as any)?.message || err))
    }
  }

  console.log(`Upsert complete. ${upserted} products upserted/updated.`)
  await prisma.$disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
