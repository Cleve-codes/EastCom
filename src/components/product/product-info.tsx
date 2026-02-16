"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { Minus, Plus, ShoppingCart, MessageCircle, Check, ShieldCheck, Truck, Zap } from "lucide-react";
import { toast } from "sonner";

export function ProductInfo({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images[0]
        });
        toast.success(`Added ${quantity} ${product.name} to cart`);

        // Auto-open cart on desktop
        if (typeof window !== 'undefined' && window.innerWidth > 768) {
            openCart();
        }
    };

    const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";
    const stockColor = product.stock > 0 ? "text-green-500" : "text-red-500";

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-2.5 py-1 rounded text-xs uppercase font-bold tracking-widest border border-primary/20">{product.category}</span>
                    {product.featured && <span className="bg-white/10 text-white px-2.5 py-1 rounded text-xs uppercase font-bold tracking-widest border border-white/10">Featured</span>}
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">{product.name}</h1>
                <div className="flex items-center gap-4 mt-4">
                    <p className="text-2xl text-primary font-bold">KES {product.price.toLocaleString()}</p>
                    <span className={`text-sm font-medium flex items-center gap-1.5 ${stockColor} px-2 py-1 rounded-full bg-white/5`}>
                        <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                        {stockStatus}
                    </span>
                </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base border-t border-b border-white/5 py-6">
                {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    {/* Qty */}
                    <div className="flex items-center border border-white/10 rounded-lg bg-white/5">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 hover:bg-white/5 text-white disabled:opacity-50 transition-colors"
                            disabled={product.stock <= 0}
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-10 text-center text-white font-mono font-bold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-3 hover:bg-white/5 text-white disabled:opacity-50 transition-colors"
                            disabled={product.stock <= 0}
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 h-auto py-3 text-base font-bold bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(245,166,35,0.2)]"
                        disabled={product.stock <= 0}
                    >
                        <ShoppingCart size={18} className="mr-2" /> Add to Cart
                    </Button>
                </div>

                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white h-auto py-3 bg-transparent" asChild>
                    <a href={`https://wa.me/254718790654?text=I'm interested in ${product.name}, could you verify availability and installation options?`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle size={18} className="mr-2" /> Request Installation Quote
                    </a>
                </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <ShieldCheck size={20} className="text-primary flex-shrink-0" />
                    <span className="text-xs text-white/80 font-medium">Official Verify Warranty</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <Zap size={20} className="text-primary flex-shrink-0" />
                    <span className="text-xs text-white/80 font-medium">Expert Installation</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <Truck size={20} className="text-primary flex-shrink-0" />
                    <span className="text-xs text-white/80 font-medium">Countrywide Delivery</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <Check size={20} className="text-primary flex-shrink-0" />
                    <span className="text-xs text-white/80 font-medium">Price Match Promise</span>
                </div>
            </div>
        </div>
    );
}
