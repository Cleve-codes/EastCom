"use client";

import { Star, Quote, Heart } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sophia Mwangi",
        role: "Architecture Director, Karen",
        text: "EastCom synthesized our vision of a zero-noise, fully integrated solar home. The engineering precision is unmatched in the region.",
        rating: 5
    },
    {
        name: "Edmunds Ndegwa",
        role: "COO, Rift Valley Industrial",
        text: "The yield projections were conservative—we've actually exceeded expectation by 15%. A masterclass in energy architecture.",
        rating: 5
    },
    {
        name: "Regan Waiyua",
        role: "Estate Manager, Naivasha",
        text: "Reliable, high-fidelity power. EastCom delivered where legacy providers failed. Their support protocol is truly world-class.",
        rating: 5
    },
    {
        name: "Nathan Jobs",
        role: "Founder, LabOne Tech",
        text: "The data-first approach to installation gave us total confidence. Every panel is performing at peak optimization.",
        rating: 5
    }
];

export function Testimonials() {
    return (
        <section className="py-32 lg:py-56 bg-[#0A0E1A] overflow-hidden relative">
            {/* Header */}
            <div className="container mx-auto px-6 mb-24 lg:mb-32">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <Heart className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">The Impact Network</span>
                    </motion.div>

                    <h2 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.85] tracking-tighter">
                        WORDS FROM <br />
                        <span className="text-white/20 italic">OUR PARTNERS.</span>
                    </h2>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative flex">
                {/* Edge Feathers */}
                <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-96 bg-gradient-to-r from-[#0A0E1A] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-96 bg-gradient-to-l from-[#0A0E1A] to-transparent z-10" />

                <motion.div
                    className="flex gap-12 lg:gap-20 px-10"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                >
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="min-w-[400px] lg:min-w-[600px] p-12 lg:p-20 rounded-[4rem] bg-white/[0.02] border border-white/5 relative group hover:bg-white/[0.05] transition-all duration-700"
                        >
                            <Quote className="absolute top-12 right-12 text-primary/5 group-hover:text-primary/20 transition-all duration-700 w-24 h-24" />

                            <div className="flex gap-1 mb-10 text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="font-display text-2xl lg:text-4xl text-white font-bold mb-12 leading-tight tracking-tight">
                                &quot;{t.text}&quot;
                            </p>

                            <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[#0A0E1A] font-black text-xl shadow-lg">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-white text-lg tracking-tight uppercase">{t.name}</h4>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Background Stats Banner */}
            <div className="mt-32 border-y border-white/5 py-12 flex justify-center items-center gap-24 opacity-20 whitespace-nowrap overflow-hidden">
                <span className="font-display font-black text-4xl lg:text-6xl text-white">98% SATISFACTION</span>
                <span className="w-4 h-4 rounded-full bg-primary" />
                <span className="font-display font-black text-4xl lg:text-6xl text-white">EPRA CERTIFIED</span>
                <span className="w-4 h-4 rounded-full bg-primary" />
                <span className="font-display font-black text-4xl lg:text-6xl text-white">TIER-1 ARCHITECTURE</span>
                <span className="w-4 h-4 rounded-full bg-primary" />
                <span className="font-display font-black text-4xl lg:text-6xl text-white">12+ YEARS LEGACY</span>
            </div>
        </section>
    );
}
