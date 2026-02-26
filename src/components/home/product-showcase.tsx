"use client";

import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Product } from "@prisma/client";

interface ProductShowcaseProps {
    products: Product[];
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
    const displayProducts = products.length > 0 ? products : [
        {
            id: '1',
            name: 'Jinko Tiger Neo N-type 475W',
            category: 'Panels',
            price: 18500,
            description: 'High efficiency N-type monocrystalline module with SMBB technology.',
            images: ['/images/s18.jpg'],
            slug: 'jinko-tiger-neo-475w'
        } as any
    ];

    return (
        <section className="py-32 lg:py-56 bg-[#0A0E1A] relative overflow-hidden">
            {/* Architectural Grid Background Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="container px-6 mx-auto relative z-10">
                {/* Refined Header */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 lg:mb-32">
                    <div className="max-w-3xl space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3"
                        >
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Select Inventory</span>
                        </motion.div>

                        <h2 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.85] tracking-tighter">
                            EQUIPMENT FOR <br />
                            <span className="text-primary italic">EXTREME OUTPUT.</span>
                        </h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Button variant="outline" className="h-20 px-12 rounded-full border-white/10 text-white hover:bg-white hover:text-primary font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 group" asChild>
                            <Link href="/offerings">
                                View Full Archive <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </header>

                {/* Grid with Cinematic Spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {displayProducts.map((p, i) => (
                        <ProductCard
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            category={p.category}
                            price={p.price}
                            image={p.images[0] || '/images/s18.jpg'}
                            specs={p.description || ''}
                            slug={`/offerings/${p.slug}`}
                        />
                    ))}
                </div>

                {/* Mobile Redirection */}
                <div className="mt-20 lg:hidden text-center">
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-8">Access 50+ specialized SKUs</p>
                    <Button asChild size="lg" className="w-full h-16 bg-white text-black font-black uppercase tracking-widest rounded-full">
                        <Link href="/offerings">Digital Catalogue</Link>
                    </Button>
                </div>
            </div>

            {/* Background Depth Orbs */}
            <div className="absolute bottom-0 right-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 scale-150 pointer-events-none" />
        </section>
    );
}
