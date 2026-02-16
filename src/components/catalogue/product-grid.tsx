"use client";

import { Product } from "@prisma/client";
import { ProductCard } from "@/components/products/product-card";
import { PackageOpen } from "lucide-react";

export function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-2xl bg-white/5">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <PackageOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                    Try adjusting your filters or search terms. We're constantly updating our inventory.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
                <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    category={p.category}
                    price={p.price}
                    image={p.images[0] || '/images/s18.jpg'}
                    slug={`/offerings/${p.slug}`}
                    specs={formatSpecs(p.specs)}
                />
            ))}
        </div>
    );
}

function formatSpecs(specs: any): string {
    if (!specs || typeof specs !== 'object') return '';
    // Return key specs based on common keys or just first few values
    // e.g. "475W • N-type Mono"
    const values = Object.values(specs);
    return values.slice(0, 2).join(' • ');
}
