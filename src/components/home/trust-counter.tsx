"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { label: "Systems Deployed", value: "2.5k", sub: "MW+", delay: 0 },
    { label: "Engineering Integrity", value: "99.8", sub: "%", delay: 0.1 },
    { label: "Regional Footprint", value: "12", sub: "Yrs", delay: 0.2 },
    { label: "Certified Architects", value: "40", sub: "+", delay: 0.3 },
];

export function TrustCounter() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="bg-[#0A0E1A] py-12 lg:py-20 relative overflow-hidden border-y border-white/5">
            {/* Subtle light leak for depth */}
            <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
            <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center lg:items-start justify-center lg:pl-16 first:pl-0">
                            <div className="flex items-baseline gap-1 mb-2">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                                    animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                                    transition={{ duration: 1, delay: stat.delay, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
                                >
                                    {stat.value}
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 1, delay: stat.delay + 0.3 }}
                                    className="text-primary font-display font-black text-2xl"
                                >
                                    {stat.sub}
                                </motion.span>
                            </div>
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: stat.delay + 0.5 }}
                                className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 font-black leading-none"
                            >
                                {stat.label}
                            </motion.span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
