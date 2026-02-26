import React from 'react'
import { getProducts } from "@/lib/actions";
import { FilterSidebar } from "@/components/catalogue/filter-sidebar";
import { ProductGrid } from "@/components/catalogue/product-grid";

export const metadata = {
    title: "Offerings | EastCom Solar",
    description: "Browse our catalogue of premium solar panels, inverters, batteries, and complete systems.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function OfferingsPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;

    const category = (searchParams.category as string) || undefined;
    const search = (searchParams.search as string) || undefined;
    const sort = (searchParams.sort as string) || undefined;
    const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
    const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
    const page = searchParams.page ? Number(searchParams.page) || 1 : 1

    const { products, total } = await getProducts({ category, search, sort, minPrice, maxPrice, page, pageSize: 6 });

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#0A0E1A]">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-2">Catalogue</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Our Solutions</h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl">
                        Explore our curated selection of tier-1 energy products. All installations come with warranty and expert support.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    <FilterSidebar />

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                            <p className="text-sm text-muted-foreground">Showing <strong className="text-white">{total}</strong> results</p>
                        </div>

                        <ProductGrid products={products} />

                        {/* Pagination controls */}
                        <div className="mt-8 flex items-center justify-center">
                            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                {renderPageLinks(page, Math.ceil(total / 6), searchParams)}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function renderPageLinks(currentPage: number, totalPages: number, searchParams: Record<string, any>) {
    const links = [] as React.ReactNode[]
    const maxVisible = 7
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    for (let p = start; p <= end; p++) {
        const params = new URLSearchParams()
        for (const k of Object.keys(searchParams)) {
            const v = searchParams[k]
            if (!v) continue
            if (Array.isArray(v)) v.forEach(x => params.append(k, String(x)))
            else params.set(k, String(v))
        }
        params.set('page', String(p))
        const href = `/offerings?${params.toString()}`
        links.push(
            <a
                key={p}
                href={href}
                className={`relative inline-flex items-center px-3 py-1.5 border text-sm font-medium ${p === currentPage ? 'z-10 bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}>
                {p}
            </a>
        )
    }

    return links
}
