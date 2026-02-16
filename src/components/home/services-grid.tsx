"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Palette, Sun, Megaphone, ShieldCheck, ArrowRight, Cog, HardHat } from "lucide-react";

const services = [
    {
        icon: Sun,
        title: "Infrastructure Design",
        desc: "High-precision solar architecture for residential and industrial complexes in East Africa.",
        tags: ["CAD", "Survey", "Planning"]
    },
    {
        icon: Cog,
        title: "Systems Engineering",
        desc: "Developing custom power-conversion protocols and storage solutions for extreme demand.",
        tags: ["Hybrid", "Off-grid", "Storage"]
    },
    {
        icon: TrendingUp,
        title: "Yield Optimization",
        desc: "Advanced energy analytics to maximize ROI and minimize grid dependency through total data.",
        tags: ["Big Data", "Audit", "ROI"]
    },
    {
        icon: ShieldCheck,
        title: "Operations & Care",
        desc: "Proactive semiconductor-level maintenance and remote biometric system monitoring.",
        tags: ["Support", "24/7", "Repair"]
    },
    {
        icon: HardHat,
        title: "Enterprise Deployment",
        desc: "Turnkey project management for multi-megawatt industrial solar parks and urban grids.",
        tags: ["MW Scale", "Grid-Tie", "PV"]
    },
    {
        icon: Lightbulb,
        title: "Energy Consulting",
        desc: "Strategic advisory for institutional sustainability and carbon-negative transition roadmaps.",
        tags: ["Advisory", "Carbon", "ESG"]
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
};

export function ServicesGrid() {
    return (
        <section className="py-32 lg:py-56 bg-[#0A0E1A] relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(245,166,35,0.03)_0%,_transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 lg:mb-32">
                    <div className="max-w-3xl space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3"
                        >
                            <Sun className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Technical Expertise</span>
                        </motion.div>

                        <h2 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.85] tracking-tighter">
                            CORE <br />
                            <span className="text-white/20 italic">CAPABILITIES.</span>
                        </h2>
                    </div>

                    <p className="text-xl text-white/40 max-w-sm leading-relaxed font-medium lg:text-right">
                        Leveraging decades of engineering legacy to power the next generation of East African infrastructure.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-[3rem]"
                >
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className="group bg-[#0A0E1A] p-12 lg:p-16 hover:bg-white/[0.02] transition-all duration-700 relative flex flex-col h-full"
                        >
                            {/* Hover light streak */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-black transition-all duration-500 group-hover:scale-110">
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-display font-bold text-white mb-6 tracking-tight group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-white/40 mb-10 leading-relaxed font-medium h-24 overflow-hidden">
                                    {service.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {service.tags.map((tag, i) => (
                                        <span key={i} className="text-[9px] font-black uppercase tracking-widest text-white/20 px-2 py-1 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link href="/services" className="mt-auto inline-flex items-center gap-3 text-white/30 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-white transition-all">
                                    Full Protocol <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
