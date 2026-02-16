"use client";

import Link from "next/link";
import { TreePine, Zap, DollarSign, ArrowRight, Gauge, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const benefits = [
    {
        icon: DollarSign,
        title: "Liquidity.",
        desc: "Convert overhead into capital. Savings of up to 90% on utility bills.",
        color: "primary"
    },
    {
        icon: Zap,
        title: "Autonomy.",
        desc: "Bypass the grid. Uninterrupted power, regardless of local disruptions.",
        color: "accent"
    },
    {
        icon: TreePine,
        title: "Zero Emission.",
        desc: "A carbon-negative footprint for sustainable regional growth.",
        color: "primary"
    }
];

export function WhySolar() {
    return (
        <section className="py-32 lg:py-56 bg-[#0A0E1A] relative overflow-hidden">
            {/* Background Texture & Orbs */}
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-24 items-start">

                    {/* Left: Narrative & Benefits */}
                    <div className="lg:w-1/2 space-y-16">
                        <header className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20"
                            >
                                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Yield Analysis</span>
                            </motion.div>

                            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                                THE LOGIC OF <br />
                                <span className="text-white/20 italic">EFFICIENCY.</span>
                            </h2>
                            <p className="text-xl text-white/40 leading-relaxed max-w-xl font-medium">
                                Transitioning to solar is no longer just an environmental choice—it&apos;s a strategic financial maneuver.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#0A0E1A] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500">
                                        <benefit.icon className="w-6 h-6 text-primary group-hover:text-black transition-colors" />
                                    </div>
                                    <h4 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">{benefit.title}</h4>
                                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{benefit.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: The Estimator Card */}
                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 lg:p-16 relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                        >
                            {/* Inner Glow */}
                            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-accent/10 blur-[100px] rounded-full group-hover:bg-accent/20 transition-all duration-[2s]" />

                            <div className="relative z-10 space-y-10">
                                <header className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-3xl font-display font-black text-white mb-2 tracking-tight uppercase">Yield Estimator<span className="text-primary italic">.</span></h3>
                                        <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Global Irradiation Standard v2.1</p>
                                    </div>
                                    <TrendingUp className="text-primary w-8 h-8" />
                                </header>

                                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Monthly Energy Expenditure (KES)</label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                placeholder="15,000"
                                                className="h-20 bg-background/50 border-white/10 text-2xl font-display font-bold text-primary px-8 rounded-2xl focus:border-primary transition-all"
                                            />
                                            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 font-black">KES</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Infrastructural Profile</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="h-16 rounded-2xl border border-white/10 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-white transition-all">Residential</button>
                                            <button className="h-16 rounded-2xl border border-primary bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Industrial</button>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button size="lg" className="w-full h-20 bg-primary text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black rounded-full transition-all duration-500 group shadow-[0_20px_40px_rgba(245,166,35,0.2)]">
                                            Synthesize ROI Profile <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                                        </Button>
                                    </div>
                                </form>

                                <footer className="pt-10 border-t border-white/10 grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">Avg. Payback</p>
                                        <p className="text-2xl font-display font-black text-white leading-none">3.2 Years</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">Lifetime Value</p>
                                        <p className="text-2xl font-display font-black text-primary leading-none">KES 4.2M+</p>
                                    </div>
                                </footer>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
