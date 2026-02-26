import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
  const products = await prisma.product.findMany({ select: { id: true, slug: true, name: true, price: true } })
  console.log(JSON.stringify(products, null, 2))
  await prisma.$disconnect()
}

main().catch(async (e)=>{ console.error(e); await prisma.$disconnect(); process.exit(1) })
