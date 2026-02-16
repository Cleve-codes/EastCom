"use server"

import { prisma } from "@/lib/prisma"
import { Category } from "@prisma/client"

export async function getProducts({
    category,
    search,
    sort,
    minPrice,
    maxPrice
}: {
    category?: string
    search?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
}) {
    const where: any = {}

    if (category && category !== 'All') {
        // Check if category is valid enum
        const validCategory = Object.values(Category).find(c => c === category);
        if (validCategory) {
            where.category = validCategory
        }
    }

    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ]
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {}
        if (minPrice !== undefined) where.price.gte = minPrice
        if (maxPrice !== undefined) where.price.lte = maxPrice
    }

    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'price_asc') orderBy = { price: 'asc' }
    if (sort === 'price_desc') orderBy = { price: 'desc' }
    if (sort === 'newest') orderBy = { createdAt: 'desc' }

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy,
        })
        return products
    } catch (error) {
        console.error('Error fetching products:', error)
        // Return empty array on error to avoid crashing UI
        return []
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug }
        })
        return product
    } catch (error) {
        console.error(`Error fetching product with slug ${slug}:`, error)
        return null
    }
}

export async function getFeaturedProducts() {
    try {
        const products = await prisma.product.findMany({
            where: { featured: true },
            take: 4,
            orderBy: { createdAt: 'desc' }
        })
        return products
    } catch (error) {
        console.error('Error fetching featured products:', error)
        return []
    }
}
