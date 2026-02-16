"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/lib/order-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShoppingCart, Truck, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Please provide a valid delivery address"),
});

export function CheckoutForm() {
    const { items, getTotalPrice } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                customerName: values.name,
                customerEmail: values.email,
                customerPhone: values.phone,
                address: values.address,
                totalAmount: getTotalPrice(),
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            };

            const order = await createOrder(orderData);

            if (!order) {
                toast.error("Failed to create order. Please try again.");
                return;
            }

            // Initialize Paystack
            const response = await fetch("/api/paystack/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values.email,
                    amount: getTotalPrice(),
                    orderNumber: order.orderNumber,
                }),
            });

            const paystackData = await response.json();

            if (!response.ok) {
                toast.error(paystackData.error || "Failed to initialize payment.");
                return;
            }

            // Redirect to Paystack checkout URL
            if (paystackData.authorization_url) {
                router.push(paystackData.authorization_url);
            } else {
                toast.error("Invalid response from Paystack.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left side: Form */}
            <div className="lg:col-span-7 space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                        <Truck className="text-primary w-6 h-6" /> Delivery Information
                    </h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/70 font-medium">Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-colors" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/70 font-medium">Email Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-colors" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white/70 font-medium">Phone Number (M-PESA / WhatsApp)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="07xxxxxxxx" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-colors" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white/70 font-medium">Specific Delivery Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Appartment/House No, Street, Area, Nairobi" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-colors" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-primary text-black hover:bg-primary/90 font-bold py-7 text-lg shadow-[0_0_30px_rgba(245,166,35,0.2)] transition-all duration-300"
                                disabled={isSubmitting || items.length === 0}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Initializing Payment...
                                    </>
                                ) : (
                                    <>
                                        Complete Order &middot; KES {isMounted ? getTotalPrice().toLocaleString() : "0"} <ArrowRight className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="flex items-start gap-4 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                    <ShieldCheck className="text-primary w-8 h-8 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Secure Checkout</h4>
                        <p className="text-xs text-white/60 leading-relaxed">
                            Your transaction is processed securely through <span className="text-primary font-bold">Paystack</span>.
                            We accept M-PESA, VISA, Mastercard, and Bank Transfers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side: Order Summary */}
            <div className="lg:col-span-5">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sticky top-24 backdrop-blur-md">
                    <h2 className="text-xl font-display font-bold text-white mb-8 pb-4 border-b border-white/10">Order Summary</h2>

                    <div className="space-y-6 mb-8 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                        {!isMounted ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            </div>
                        ) : items.length === 0 ? (
                            <p className="text-center text-white/30 py-10">Your cart is empty</p>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-20 h-20 bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10">
                                        {item.image && <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="text-sm text-white font-semibold truncate leading-snug mb-1">{item.name}</h4>
                                        <p className="text-white/40 text-xs font-medium">Quantity: {item.quantity}</p>
                                        <p className="text-primary font-mono text-sm mt-1 font-bold">KES {item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-sm text-white font-mono font-bold">KES {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="space-y-4 pt-6 mt-6 border-t border-white/10 font-medium">
                        <div className="flex justify-between text-white/60 text-sm">
                            <span>Subtotal</span>
                            <span className="text-white">KES {isMounted ? getTotalPrice().toLocaleString() : "0"}</span>
                        </div>
                        <div className="flex justify-between text-white/60 text-sm pb-4">
                            <span>Delivery Fee</span>
                            <span className="text-primary uppercase font-bold tracking-widest text-xs mt-1">Free</span>
                        </div>
                        <div className="flex justify-between text-white pt-6 border-t border-white/20">
                            <span className="text-xl font-display font-bold">Grand Total</span>
                            <div className="text-right">
                                <span className="text-3xl font-display font-bold text-primary block">KES {isMounted ? getTotalPrice().toLocaleString() : "0"}</span>
                                <span className="text-[10px] text-white/30 uppercase tracking-tighter">VAT Included where applicable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
