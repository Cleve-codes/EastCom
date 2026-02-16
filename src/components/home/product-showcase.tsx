"use client";

import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const products = [
    {
        id: '1',
        name: 'High-Efficiency Monocrystalline 450W',
        category: 'Panels',
        price: 18500,
        specs: 'Bifacial technology, reinforced architectural framing.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
        slug: '/offerings/panel-450w-mono'
    },
    {
        id: '2',
        name: 'IVEM6048 Industrial Inverter 6kW',
        category: 'Inverters',
        price: 85000,
        specs: 'Pure sine wave, integrated grid-balancing software.',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop',
        slug: '/offerings/inverter-ivem6048'
    },
    {
        id: '3',
        name: 'LPBF48200 Lithium Storage Pro',
        category: 'Batteries',
        price: 145000,
        specs: '6000 cycles, smart BMS with remote mobile diagnostics.',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
        slug: '/offerings/battery-lpbf48200'
    },
    {
        id: '4',
        name: 'Full Ecosystem: Urban 5kW Package',
        category: 'Systems',
        price: 450000,
        specs: 'Full-spectrum turnkey solution with white-glove install.',
        image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800&auto=format&fit=crop',
        slug: '/offerings/system-package-a'
    }
];

export function ProductShowcase() {
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
                        <Button variant="outline" className="h-20 px-12 rounded-full border-white/10 text-white hover:bg-white hover:text-black font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 group" asChild>
                            <Link href="/offerings">
                                View Full Archive <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </header>

                {/* Grid with Cinematic Spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {products.map((p, i) => (
                        <ProductCard
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            category={p.category}
                            price={p.price}
                            image={p.image}
                            specs={p.specs}
                            slug={p.slug}
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
