"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { Minus, Plus, ShoppingCart, Check, ShieldCheck, Truck, Zap } from "lucide-react";
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
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] mr-2">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg> Request Installation Quote
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
