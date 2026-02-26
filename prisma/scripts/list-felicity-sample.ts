#!/usr/bin/env tsx
import { prisma } from '../../src/lib/prisma'

async function main() {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { slug: true, name: true, price: true, images: true, specs: true }
  })
  console.log(JSON.stringify(rows, null, 2))
  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
