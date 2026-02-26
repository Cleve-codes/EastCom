#!/usr/bin/env tsx
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import XLSX from 'xlsx'
import { prisma } from '../../src/lib/prisma'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function ensureOutDir() {
  try { await fs.mkdir(path.resolve(process.cwd(), 'data'), { recursive: true }) } catch {}
}

async function main() {
  console.log('Exporting products to Excel...')
  await ensureOutDir()
  const products = await prisma.product.findMany({ select: { name: true, category: true, price: true } })

  const rows = products.map(p => ({ Name: p.name, Category: p.category, Price: p.price }))
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Products')

  const outPath = path.resolve(process.cwd(), 'data', 'products.xlsx')
  XLSX.writeFile(wb, outPath)
  console.log('Wrote Excel to', outPath)
  await prisma.$disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
