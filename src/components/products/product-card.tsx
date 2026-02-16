"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowUpRight, Zap } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductCardProps {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    specs: string;
    slug: string;
}

export function ProductCard({ id, name, category, price, image, specs, slug }: ProductCardProps) {
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id, name, price, quantity: 1, image });
        toast.success(`Added ${name} to cart`);

        if (typeof window !== 'undefined' && window.innerWidth > 768) {
            openCart();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link
                href={slug}
                className="group relative flex flex-col h-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
            >
                {/* Image Container with Architectural Framing */}
                <div className="relative aspect-[4/5] overflow-hidden p-4">
                    <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Dramatic Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
                    </div>

                    {/* Category Pin */}
                    <div className="absolute top-8 left-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0E1A]/60 backdrop-blur-xl border border-white/10 z-10">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
                            {category}
                        </span>
                    </div>

                    {/* Quick View Icon */}
                    <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-0 flex flex-col flex-1">
                    <div className="mb-6">
                        <h3 className="font-display font-black text-2xl text-white mb-2 leading-[1.1] tracking-tight group-hover:text-primary transition-colors duration-500">
                            {name}
                        </h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                            Ref. {id.padStart(4, '0')}
                        </p>
                    </div>

                    <p className="text-sm text-white/40 mb-10 line-clamp-2 leading-relaxed font-medium italic">
                        &quot;{specs}&quot;
                    </p>

                    <div className="mt-auto flex items-end justify-between gap-4">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase text-white/20 font-black tracking-[0.2em] block">Starting At</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-bold text-primary">KES</span>
                                <span className="text-3xl font-display font-black text-white tracking-tighter">
                                    {price.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <Button
                            size="icon"
                            className="w-14 h-14 rounded-2xl bg-white text-black hover:bg-primary transition-all duration-500 shadow-2xl group/btn"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="w-6 h-6 transition-transform duration-500 group-hover/btn:scale-110" />
                        </Button>
                    </div>
                </div>

                {/* Interactive Light Streak */}
                <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-primary/5 via-transparent to-transparent rotate-45 pointer-events-none group-hover:translate-x-1/2 group-hover:translate-y-1/2 transition-transform duration-1000" />
            </Link>
        </motion.div>
    );
}
