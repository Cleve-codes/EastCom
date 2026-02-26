
import { PrismaClient, Category } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import fs from 'fs'
import path from 'path'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Clearing existing data...')
    await prisma.orderItem.deleteMany({})
    await prisma.product.deleteMany({})

    console.log('Seeding database from data/processed_products.json...')

    const dataPath = path.join(process.cwd(), 'data/processed_products.json')
    if (!fs.existsSync(dataPath)) {
        console.error('processed_products.json not found at', dataPath)
        process.exit(1)
    }

    const raw = fs.readFileSync(dataPath, 'utf-8')
    const products = JSON.parse(raw)

    let createdCount = 0
    for (const p of products) {
        try {
            await prisma.product.create({
                data: {
                    slug: p.slug,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    category: p.category as Category,
                    images: p.images,
                    specs: p.specs,
                    stock: 10,
                },
            })
            console.log('Created product', p.slug)
            createdCount++
        } catch (e) {
            console.error('Failed to create product', p.slug, e)
        }
    }

    console.log(`Successfully created ${createdCount} products.`)
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
