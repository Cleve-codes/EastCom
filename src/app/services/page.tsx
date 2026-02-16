"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, AreaChart, Settings, Home, Factory, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
    {
        icon: Home,
        title: "Residential Solar",
        description: "Premium rooftop installations designed for Kenyan homes. Achieve energy independence with zero noise and maximum aesthetic integration.",
        features: ["Hybrid Inverters", "Lithium Battery Storage", "24/7 Monitoring", "Net Metering Ready"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop",
    },
    {
        icon: Factory,
        title: "Commercial & Industrial",
        description: "Multi-megawatt solutions for factories and office parks. Drastically reduce operational costs and stabilize your power overhead.",
        features: ["Load Balancing", "Industrial Grade Cabinets", "Grid Management", "Tier-1 Panel Arrays"],
        image: "https://images.unsplash.com/photo-1466611653911-95282fc3656b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        icon: AreaChart,
        title: "Energy Analytics",
        description: "Deep-dive technical audits. We analyze your consumption patterns and architect a custom solution optimized for ROI.",
        features: ["Technical Site Survey", "ROI Projections", "Consumption Mapping", "Safety Audit"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
        icon: Settings,
        title: "Maintenance & Support",
        description: "Proactive care for your investment. We ensure every panel and battery performs at peak efficiency for decades.",
        features: ["Semi-Annual Cleaning", "Technical Troubleshooting", "Performance Tuning", "Remote Support"],
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2075&auto=format&fit=crop",
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#0A0E1A] pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <header className="max-w-4xl mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Our Capabilities</span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-10">
                            PRECISION <br /> <span className="text-primary italic">ENGINEERING.</span>
                        </h1>
                        <p className="text-white/50 text-xl lg:text-2xl leading-relaxed max-w-2xl font-medium">
                            We deliver high-fidelity solar infrastructure tailored to the unique energy landscape of East Africa.
                        </p>
                    </motion.div>

                    {/* Decorative Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
                </header>

                {/* Services High-Impact Grid */}
                <div className="grid grid-cols-1 gap-24 lg:gap-48">
                    {services.map((service, index) => (
                        <ServiceRow key={index} service={service} index={index} />
                    ))}
                </div>

                {/* Process Section */}
                <section className="mt-48 py-32 border-y border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="text-center mb-24">
                        <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">The EastCom <span className="text-primary italic">Protocol.</span></h2>
                        <p className="text-white/40 text-lg max-w-xl mx-auto">A rigorous end-to-end framework for energy transformation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <ProcessStep number="01" title="Survey" description="Detailed site analysis and load calculation." />
                        <ProcessStep number="02" title="Architect" description="Custom system design by our lead engineers." />
                        <ProcessStep number="03" title="Deploy" description="Rapid, compliant precision installation." />
                        <ProcessStep number="04" title="Optimize" description="Post-launch tuning and performance setup." />
                    </div>
                </section>

                {/* Final CTA */}
                <section className="mt-48 text-center bg-white/5 rounded-[4rem] p-16 lg:p-32 border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                    <h2 className="text-5xl lg:text-7xl font-display font-bold text-white mb-10 tracking-tight leading-none">
                        READY TO <br /> <span className="opacity-30">REWIRE YOUR WORLD?</span>
                    </h2>
                    <Button size="lg" className="bg-primary text-black hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] font-black uppercase tracking-[0.2em] px-12 py-10 rounded-full transition-all duration-500 group" asChild>
                        <Link href="/contact">
                            Start Your Project <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </Button>
                </section>
            </div>
        </main>
    );
}

function ServiceRow({ service, index }: { service: any; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
            <motion.div
                className="lg:w-1/2 relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-white/10">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                </div>
                {/* Animated Accent */}
                <div className="absolute -bottom-6 -right-6 lg:-right-12 lg:-bottom-12 w-32 h-32 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>

            <motion.div
                className="lg:w-1/2 space-y-8"
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-primary transition-colors">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-[#0A0E1A] transition-colors" />
                </div>
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-white tracking-tight">{service.title}</h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-xl">{service.description}</p>

                <ul className="grid grid-cols-2 gap-4">
                    {service.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/50 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="pt-8">
                    <Button variant="link" className="text-primary hover:text-white p-0 h-auto font-bold uppercase tracking-widest text-xs group" asChild>
                        <Link href="/contact" className="flex items-center gap-2">
                            Consultation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 group">
            <span className="text-6xl font-display font-black text-white/5 mb-6 block group-hover:text-primary/10 transition-colors">{number}</span>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
