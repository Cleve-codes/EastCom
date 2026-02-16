"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { CheckCircle2, XCircle, ArrowRight, Loader2, Mail, Phone, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SuccessContent() {
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const { clearCart } = useCartStore();

    useEffect(() => {
        if (reference) {
            verifyPayment();
        } else {
            setStatus("error");
        }
    }, [reference]);

    async function verifyPayment() {
        try {
            const resp = await fetch(`/api/paystack/verify?reference=${reference}`);
            const data = await resp.json();

            if (data.status === "success" || data.status === true) {
                setStatus("success");
                clearCart();
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Verification error:", err);
            setStatus("error");
        }
    }

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-8" />
                <h2 className="text-3xl font-display font-bold text-white mb-3">Verifying Payment</h2>
                <p className="text-white/60 text-lg">Please wait while we confirm your solar solution purchase...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto px-6">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                    <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6 tracking-tight">Payment Verification Failed</h2>
                <p className="text-white/60 mb-10 leading-relaxed text-lg">
                    We couldn't confirm your transaction. If money has been deducted from your account, please contact our support team with your reference ID.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-10 w-full">
                    <span className="text-xs text-white/30 uppercase tracking-widest block mb-1">Reference ID</span>
                    <span className="text-white font-mono break-all font-bold">{reference || "NO-REF-ID"}</span>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <Button asChild className="bg-white/5 hover:bg-white/10 text-white border border-white/10 h-14 font-bold rounded-full">
                        <Link href="/checkout">Back to Checkout</Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-primary hover:text-primary/80 h-14 font-bold">
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 lg:py-24 px-6">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 lg:p-16 backdrop-blur-md text-center relative overflow-hidden">
                {/* Abstract Background Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-28 h-28 bg-primary/20 rounded-full mb-10 shadow-[0_0_80px_rgba(245,166,35,0.15)] pulse-animation">
                        <CheckCircle2 className="w-14 h-14 text-primary" />
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tighter">Order Placed!</h1>
                    <p className="text-xl lg:text-2xl text-white/70 mb-16 max-w-2xl mx-auto leading-relaxed">
                        Thank you for choosing <span className="text-primary font-black uppercase tracking-tighter italic">EastCom Tech</span>. Your journey to energy independence has officially begun.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-500 group">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Sun className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-display font-bold uppercase tracking-widest text-xs text-white/80">Next Step: Installation</h3>
                            </div>
                            <p className="text-base text-white/50 leading-relaxed font-medium">
                                Our lead solar engineers will contact you within <span className="text-white font-bold">24 hours</span> to finalize your technical site survey and installation schedule.
                            </p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-500 group">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-display font-bold uppercase tracking-widest text-xs text-white/80">Receipt & Reference</h3>
                            </div>
                            <p className="text-sm text-white/50 leading-relaxed font-medium mb-4">
                                Reference: <span className="text-white font-mono font-bold tracking-tight text-xs block mt-1">{reference}</span>
                            </p>
                            <p className="text-xs text-white/30 italic">A digital receipt has been dispatched to your email address.</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative">
                        <Button asChild size="lg" className="bg-primary text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] font-black uppercase tracking-widest px-10 py-8 rounded-full group transition-all duration-500">
                            <Link href="/">
                                Back to Homepage <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="lg" className="text-white hover:text-primary hover:bg-transparent px-10 py-8 rounded-full font-bold transition-all duration-300" asChild>
                            <Link href="/offerings">Keep Shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center gap-10">
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">EastCom Nairobi Headquarters</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <a href="tel:+254718790654" className="flex items-center gap-4 text-white/50 hover:text-primary transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase block font-bold tracking-widest text-white/30">Call Support</span>
                            <span className="text-lg font-mono font-bold">0718 790654</span>
                        </div>
                    </a>
                    <a href="mailto:info@eastcom.co.ke" className="flex items-center gap-4 text-white/50 hover:text-primary transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase block font-bold tracking-widest text-white/30">Email Us</span>
                            <span className="text-lg font-mono font-bold">info@eastcom.co.ke</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
