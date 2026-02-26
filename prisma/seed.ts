import { PrismaClient, Category } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import fs from 'fs'
import path from 'path'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

function slugify(input: string) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}

function mapCategory(key: string): Category {
    const k = key.toLowerCase()
    if (k.includes('panel')) return Category.Panels
    if (k.includes('battery')) return Category.Batteries
    if (k.includes('system')) return Category.Systems
    if (k.includes('accessor') || k.includes('accessories') || k.includes('flood') || k.includes('light')) return Category.Panels
    // fall back to Inverters for controller/inverter related keys
    return Category.Inverters
}

function parsePriceValue(v: any): number | null {
    if (v == null) return null
    if (typeof v === 'number') return Math.round(v)
    if (typeof v === 'string') {
        // handle ranges like "12000-9500" or "12,000"
        const cleaned = v.replace(/,/g, '')
        const nums = cleaned.match(/\d+/g)
        if (!nums) return null
        const parsed = nums.map(n => parseInt(n, 10)).filter(Boolean)
        if (parsed.length === 0) return null
        if (cleaned.includes('-') && parsed.length >= 2) {
            // average the range
            return Math.round((parsed[0] + parsed[1]) / 2)
        }
        return parsed[0]
    }
    return null
}

function extractPrice(entry: any, model?: any): number {
    // check model price first, then entry-level price fields
    const candidates = [] as any[]
    if (model) candidates.push(model.price_ksh ?? model.price ?? model.price_kes)
    candidates.push(entry.price_ksh ?? entry.price ?? entry.price_kes ?? entry.price_kes)
    // also check nested pricing or ranges in other fields
    for (const c of candidates) {
        const p = parsePriceValue(c)
        if (p != null) return p
    }
    return 0
}

function ensureArray<T>(v: T | T[] | undefined): T[] {
    if (!v) return []
    return Array.isArray(v) ? v : [v]
}

function normalizeImageUrl(url: string): string {
    if (!url) return ''
    try {
        if (url.startsWith('http')) {
            const u = new URL(url)
            // if the URL points to /images on the same host, convert to relative path
            if (u.pathname && u.pathname.startsWith('/images')) return u.pathname
            return url
        }
        return url
    } catch (e) {
        return url
    }
}

async function main() {
    console.log('Seeding database from data.json...')

    const dataPath = path.join(__dirname, '..', 'data.json')
    if (!fs.existsSync(dataPath)) {
        console.error('data.json not found at', dataPath)
        process.exit(1)
    }

    const raw = fs.readFileSync(dataPath, 'utf-8')
    const parsed = JSON.parse(raw)
    const productsNode = parsed.products ?? {}

    // We'll use upsert to avoid unique constraint failures and make the seed idempotent.
    // Do NOT delete existing products here so seeding is safer in production.

    const toCreate: Array<any> = []

    for (const key of Object.keys(productsNode)) {
        const entries = productsNode[key]
        if (!entries) continue

        for (const entry of entries) {
            const category = mapCategory(key)

            // If entry has nested models, create one product per model
            if (entry.models && Array.isArray(entry.models)) {
                for (const model of entry.models) {
                    const nameParts = [entry.series || entry.model || '', model.model || model.name || '']
                    const name = nameParts.filter(Boolean).join(' ').trim()
                    const baseSlug = model.model || model.name || entry.series || ''
                    const slug = slugify(baseSlug + (entry.series ? `-${entry.series}` : ''))

                    const specs = {
                        ...entry.specifications,
                        ...entry.specifications,
                        ...model,
                    }

                    const description = entry.type
                        ? `${entry.series || ''} — ${entry.type}. ${entry.features ? entry.features.slice(0, 3).join(', ') : ''}`.trim()
                        : entry.series || name

                    toCreate.push({
                        slug,
                        name: name || entry.series || model.model,
                        description: description || entry.series,
                        price: extractPrice(entry, model),
                        category,
                        images: ensureArray(entry.image_url || entry.images).map((i: any) => normalizeImageUrl(i)),
                        stock: model.stock ?? entry.stock ?? 10,
                        specs,
                        featured: false,
                    })
                }
            } else {
                // single product entry
                const slugBase = entry.series || entry.model || entry.type || key
                const slug = slugify(slugBase)
                const name = entry.series || entry.model || entry.type || slugBase
                const description = entry.type
                    ? `${entry.series || ''} — ${entry.type}. ${entry.features ? entry.features.slice(0, 3).join(', ') : ''}`.trim()
                    : entry.series || name

                toCreate.push({
                    slug,
                    name,
                    description: description || name,
                    price: extractPrice(entry),
                    category,
                    images: ensureArray(entry.image_url || entry.images).map((i: any) => normalizeImageUrl(i)),
                    stock: entry.stock ?? 10,
                    specs: entry.specifications ?? entry.specs ?? null,
                    featured: false,
                })
            }
        }
    }

    // Ensure slugs are unique within this run by appending a numeric suffix when collisions occur
    const seen = new Map<string, number>()
    const deduped: typeof toCreate = []
    for (const item of toCreate) {
        let base = item.slug || slugify(item.name || 'product')
        base = base.replace(/\s+/g, '-')
        let candidate = base
        let counter = seen.get(base) ?? 0
        while (seen.has(candidate)) {
            counter += 1
            candidate = `${base}-${counter}`
        }
        seen.set(candidate, 1)
        // assign the unique slug
        item.slug = candidate
        deduped.push(item)
    }

    let createdCount = 0
    for (const p of deduped) {
        try {
            const upserted = await prisma.product.upsert({
                where: { slug: p.slug },
                update: {
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    category: p.category,
                    images: p.images,
                    stock: p.stock,
                    specs: p.specs,
                    featured: p.featured,
                },
                create: p,
            })
            console.log('Upserted product', upserted.slug)
            createdCount++
        } catch (e) {
            console.error('Failed to upsert product', p.slug, e)
        }
    }

    console.log(`Seeded/updated ${createdCount} products`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
