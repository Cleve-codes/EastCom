"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Zap, Compass } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
    return (
        <section className="py-32 lg:py-56 relative overflow-hidden bg-[#0A0E1A]">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />

                {/* Architectural Accents */}
                <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />

                {/* Floating Abstract Shapes */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/4 w-[1200px] h-[1200px] border border-white/5 rounded-full"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 mb-16"
                    >
                        <Compass className="text-[#0A0E1A] w-6 h-6 animate-spin-slow" />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#0A0E1A]/40 leading-none">The Point of No Return</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-6xl md:text-8xl lg:text-[9rem] font-black text-[#0A0E1A] leading-[0.85] tracking-tighter"
                    >
                        START YOUR <br />
                        <span className="opacity-40 italic">SOLAR LEGACY.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-3xl text-[#0A0E1A] max-w-2xl mx-auto font-bold leading-tight"
                    >
                        Join the elite circle of Kenyan homeowners and enterprises achieving total energy autonomy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8"
                    >
                        <Button asChild size="lg" className="h-24 px-16 text-xs bg-[#0A0E1A] text-white hover:bg-white hover:text-black font-black uppercase tracking-[0.2em] rounded-full transition-all duration-700 shadow-2xl group flex items-center">
                            <Link href="/offerings">
                                Explore Inventory <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </Button>

                        <Link href="/contact" className="text-[#0A0E1A] font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 group hover:opacity-70 transition-opacity">
                            <div className="w-12 h-12 rounded-full border-2 border-[#0A0E1A] flex items-center justify-center transition-transform group-hover:rotate-12">
                                <Mail className="w-4 h-4" />
                            </div>
                            Request Full Protocol Quote
                        </Link>
                    </motion.div>

                    {/* Bottom Status Branding */}
                    <div className="pt-32 flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#0A0E1A]" />
                            <span className="text-[10px] font-black text-[#0A0E1A] uppercase tracking-widest">Rapid Deployment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#0A0E1A]" />
                            <span className="text-[10px] font-black text-[#0A0E1A] uppercase tracking-widest">Asset Management</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#0A0E1A]" />
                            <span className="text-[10px] font-black text-[#0A0E1A] uppercase tracking-widest">24/7 Monitoring</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes rotate-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: rotate-slow 15s linear infinite;
                }
            `}</style>
        </section>
    );
}
