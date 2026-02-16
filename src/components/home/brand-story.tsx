"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
    { text: "EPRA Certified Engineers", icon: ShieldCheck },
    { text: "Tier-1 Global Brands", icon: Factory },
    { text: "End-to-End Asset Care", icon: Zap }
];

export function BrandStory() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    return (
        <section ref={containerRef} className="py-32 lg:py-48 relative overflow-hidden bg-[#0A0E1A]">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

                    {/* Visual Composition - Column 1 */}
                    <div className="lg:col-span-6 relative order-2 lg:order-1">
                        <motion.div
                            style={{ y, rotate }}
                            className="relative z-20 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1548516173-3cabfa4607e9?q=80&w=2070&auto=format&fit=crop"
                                alt="Advanced Solar Engineering"
                                fill
                                className="object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-60" />

                            {/* Floating Detail */}
                            <div className="absolute top-8 left-8 p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl max-w-[200px]">
                                <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">Pioneer Spirit</p>
                                <p className="text-white font-bold leading-tight">First MW-scale microgrid in Kenya (2022).</p>
                            </div>
                        </motion.div>

                        {/* Secondary Displacement Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute -bottom-12 -right-12 w-1/2 aspect-square rounded-[2rem] overflow-hidden border-8 border-[#0A0E1A] z-30 shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=2070&auto=format&fit=crop"
                                alt="Construction Focus"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Architectural Accent */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 border border-primary/20 rounded-full -z-10 animate-spin-slow opacity-20" />
                    </div>

                    {/* Narrative Content - Column 2 */}
                    <div className="lg:col-span-6 space-y-12 order-1 lg:order-2">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-3 text-primary"
                            >
                                <div className="w-12 h-px bg-primary/30" />
                                <span className="font-black tracking-[0.4em] uppercase text-[10px]">The Manifesto</span>
                            </motion.div>

                            <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] text-white tracking-tighter">
                                ENERGIZING <br />
                                <span className="text-white/20 italic">FUTURE CITIES.</span>
                            </h2>
                        </div>

                        <p className="text-xl text-white/40 leading-relaxed font-medium">
                            EastCom doesn’t just install hardware. We engineer legacies. Based in Nairobi, we’ve pivoted from simple supply to becoming the strategic energy partner for the region’s most ambitious infrastructural projects.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
                            {features.map((feature, i) => (
                                <div key={i} className="space-y-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                                        <feature.icon className="w-5 h-5 text-primary group-hover:text-black transition-colors" />
                                    </div>
                                    <p className="text-xs font-bold text-white uppercase tracking-widest">{feature.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-10">
                            <Button asChild size="lg" className="h-16 px-10 rounded-full bg-white text-black hover:bg-primary hover:text-black font-black uppercase tracking-widest text-xs transition-all duration-500 shadow-xl">
                                <Link href="/about">Full Story <ArrowRight className="ml-3 w-4 h-4" /></Link>
                            </Button>

                            <div className="hidden sm:flex items-center gap-4 py-2 border-l border-white/10 pl-10">
                                <div className="text-4xl font-display font-black text-white">12+</div>
                                <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] leading-tight">Years<br />Legacy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </section>
    );
}
