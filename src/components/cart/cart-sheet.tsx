"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CartSheet() {
    const { isOpen, closeCart, items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleOpenChange = (open: boolean) => {
        if (!open) closeCart();
    };

    if (!isMounted) return null;

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#0A0E1A] border-l border-white/10 p-0 text-white">
                <SheetHeader className="p-6 border-b border-white/10">
                    <SheetTitle className="text-white font-display text-xl flex items-center gap-2">
                        <ShoppingCart className="text-primary w-5 h-5" /> Your Cart
                        <span className="text-sm font-normal text-muted-foreground ml-auto bg-white/5 px-2 py-0.5 rounded-full">{items.length} items</span>
                    </SheetTitle>
                    <SheetDescription className="hidden">Cart items list</SheetDescription>
                </SheetHeader>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <ShoppingCart size={40} className="opacity-20" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
                            <p className="max-w-[200px] mb-8">Looks like you haven't added any solar solutions yet.</p>
                            <Button onClick={closeCart} className="bg-white/10 hover:bg-white/20 text-white border border-white/5">Start Shopping</Button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-4 group">
                                {/* Image */}
                                <div className="w-24 h-24 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/5">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-muted-foreground text-xs">No Img</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h4 className="text-white font-medium line-clamp-2 text-sm leading-snug mb-1">{item.name}</h4>
                                        <p className="text-primary font-bold">KES {item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1 border border-white/5">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded text-muted-foreground hover:text-white disabled:opacity-50 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="text-xs font-mono font-bold w-4 text-center text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded text-muted-foreground hover:text-white transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-muted-foreground hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-white/10 p-6 bg-white/5 backdrop-blur-md">
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center text-muted-foreground text-sm">
                                <span>Subtotal</span>
                                <span>KES {getTotalPrice().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-white pt-2 border-t border-white/5">
                                <span className="font-bold">Total</span>
                                <span className="font-bold text-2xl font-display text-primary">KES {getTotalPrice().toLocaleString()}</span>
                            </div>
                        </div>
                        <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold py-6 text-base shadow-[0_0_20px_rgba(245,166,35,0.2)]" asChild>
                            <Link href="/checkout" onClick={closeCart}>
                                Checkout Now <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
