"use server"

import { prisma } from "@/lib/prisma"
import { Category } from "@prisma/client"

export async function getProducts({
    category,
    search,
    sort,
    minPrice,
    maxPrice,
    page = 1,
    pageSize = 15
}: {
    category?: string
    search?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    page?: number
    pageSize?: number
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
        const total = await prisma.product.count({ where })
        const products = await prisma.product.findMany({
            where,
            orderBy,
            skip: (Math.max(1, page) - 1) * pageSize,
            take: pageSize
        })
        return { products, total }
    } catch (error) {
        console.error('Error fetching products:', error)
        // Return empty results on error to avoid crashing UI
        return { products: [], total: 0 }
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
export async function getHomepageProducts() {
    try {
        const categories = Object.values(Category);
        // Get one product from each category first
        const productsByCategory = await Promise.all(
            categories.map(async (category) => {
                return prisma.product.findFirst({
                    where: { category },
                    orderBy: { createdAt: 'desc' }
                });
            })
        );

        const categoryProducts = productsByCategory.filter((p): p is NonNullable<typeof p> => p !== null);

        // If we have less than 4 products, fetch additional products to reach 4
        if (categoryProducts.length < 4) {
            const existingIds = categoryProducts.map(p => p.id);
            const additionalProducts = await prisma.product.findMany({
                where: {
                    id: { notIn: existingIds }
                },
                orderBy: { createdAt: 'desc' },
                take: 4 - categoryProducts.length
            });
            return [...categoryProducts, ...additionalProducts];
        }

        return categoryProducts.slice(0, 4);
    } catch (error) {
        console.error('Error fetching homepage products:', error);
        return [];
    }
}
