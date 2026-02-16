"use client";

import { motion } from "framer-motion";
import { MoveDown, Users, Target, Zap, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0A0E1A] overflow-x-hidden">
            {/* Cinematic Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
                {/* Animated Background Element */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
                </div>

                <div className="relative z-10 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <span className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-8 block">Our Mission</span>
                        <h1 className="text-[12vw] lg:text-[10rem] font-display font-black text-white leading-[0.85] tracking-tighter mb-12">
                            BEYOND <br />
                            <span className="text-primary italic">ENERGY.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-white/60 text-lg lg:text-2xl max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        EastCom Tech Solutions isn't just a solar provider. We are architecting the sustainable future of East Africa through advanced engineering and cinematic innovation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Scroll to explore</span>
                            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Narrative Section - Split Screen */}
            <section className="py-24 lg:py-48 px-6 container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-[3rem] group">
                        <Image
                            src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop"
                            alt="EastCom Engineering"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-12 left-12">
                            <div className="text-primary text-6xl font-display font-bold mb-2">12+</div>
                            <p className="text-white font-bold tracking-widest uppercase text-xs">Years of Excellence</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl lg:text-7xl font-display font-bold text-white leading-none mb-8">
                                The <span className="text-primary">Genesis</span> of Change.
                            </h2>
                            <p className="text-white/60 text-xl leading-relaxed">
                                Founded in Nairobi, EastCom began with a simple observation: energy is the bottleneck for progress. We set out to dismantle this barrier by making high-efficiency solar technology accessible, reliable, and beautiful.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500">
                                <Globe className="text-primary w-10 h-10 mb-6" />
                                <h3 className="text-white font-bold text-lg mb-2">Regional Reach</h3>
                                <p className="text-white/40 text-sm">Deploying solar infrastructure across Kenya, Tanzania, and Rwanda.</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500">
                                <Zap className="text-primary w-10 h-10 mb-6" />
                                <h3 className="text-white font-bold text-lg mb-2">Innovation Lab</h3>
                                <p className="text-white/40 text-sm">Proprietary monitoring software to maximize system lifespan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values - Full Width Grid */}
            <section className="bg-white/5 py-32 lg:py-48 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6 underline decoration-primary decoration-8 underline-offset-8">Core Principles</h2>
                        <p className="text-white/50 text-xl max-w-2xl mx-auto">The unshakeable foundations that define every EastCom project.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            index={1}
                            icon={Target}
                            title="Precision"
                            description="Engineered to the millimeter. Exactness is our baseline."
                        />
                        <ValueCard
                            index={2}
                            icon={Users}
                            title="Integrity"
                            description="Transparent partnerships with our clients and stakeholders."
                        />
                        <ValueCard
                            index={3}
                            icon={Globe}
                            title="Impact"
                            description="Carbon-negative installations for a cleaner tomorrow."
                        />
                    </div>
                </div>
            </section>

            {/* Join Section */}
            <section className="py-32 lg:py-48 px-6 text-center container mx-auto">
                <div className="max-w-4xl mx-auto bg-gradient-to-tr from-primary to-accent rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden group">
                    {/* Artistic Swirls */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-[2000ms]" />

                    <div className="relative z-10">
                        <h2 className="text-5xl lg:text-[5rem] font-display font-black text-[#0A0E1A] leading-[0.9] tracking-tighter mb-10">
                            BECOME AN <br /> ENERGY <span className="opacity-40 italic">ARCHITECT.</span>
                        </h2>
                        <p className="text-[#0A0E1A] font-bold text-lg lg:text-xl mb-12 opacity-80 max-w-xl mx-auto">
                            Join EastCom and lead the sustainable revolution across East Africa.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button size="lg" className="bg-[#0A0E1A] text-white hover:bg-white hover:text-black font-black uppercase tracking-widest px-10 py-8 rounded-full transition-all duration-500" asChild>
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="border-[#0A0E1A] text-[#0A0E1A] hover:bg-[#0A0E1A] hover:text-white font-black uppercase tracking-widest px-10 py-8 rounded-full transition-all duration-500" asChild>
                                <Link href="/offerings">Our Offerings</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ValueCard({ index, icon: Icon, title, description }: { index: number; icon: any; title: string; description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group p-10 lg:p-16 rounded-[3rem] bg-[#0A0E1A] border border-white/5 hover:border-primary transition-all duration-700 hover:shadow-[0_0_50px_rgba(245,166,35,0.05)]"
        >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500">
                <Icon className="w-8 h-8 text-white group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-6 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-white/40 group-hover:text-white/60 transition-colors text-lg leading-relaxed">{description}</p>
        </motion.div>
    );
}
