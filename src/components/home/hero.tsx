"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Zap, Shield, Award } from "lucide-react";
import Image from "next/image";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    const titleWords = "Architecting the Future of Solar.".split(" ");

    return (
        <section
            ref={containerRef}
            className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#0A0E1A] pt-20"
        >
            {/* Cinematic Background Image with Parallax */}
            <motion.div
                style={{ y: y1, scale }}
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <Image
                    src="https://images.unsplash.com/photo-1509391366360-fe09a921fe3e?q=80&w=2070&auto=format&fit=crop"
                    alt="Cinematic Solar Farm"
                    fill
                    priority
                    className="object-cover opacity-40 grayscale-[0.2]"
                />
                {/* Sophisticated Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-transparent to-[#0A0E1A] opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-transparent to-[#0A0E1A] opacity-40" />
            </motion.div>

            {/* Glowing Orbs for Depth */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full animate-pulse pointer-events-none delay-700" />

            <div className="container relative z-10 px-6 flex flex-col items-center text-center">
                {/* Modern Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group mb-10 flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 cursor-default"
                >
                    <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border border-[#0A0E1A]">
                            <Zap className="w-3 h-3 text-[#0A0E1A]" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center border border-[#0A0E1A]">
                            <Award className="w-3 h-3 text-[#0A0E1A]" />
                        </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-white/70 group-hover:text-primary transition-colors">
                        Premium Energy Standards
                    </span>
                </motion.div>

                {/* High-Impact Headline */}
                <h1 className="font-display text-[12vw] sm:text-7xl md:text-8xl lg:text-[9.5rem] font-black tracking-tighter text-white leading-[0.85] mb-12 max-w-6xl">
                    {titleWords.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 100, rotateX: -45 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 1,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="inline-block mr-[0.2em] last:mr-0 origin-bottom"
                        >
                            {word === "Future" ? (
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">{word}</span>
                            ) : word}
                        </motion.span>
                    ))}
                </h1>

                {/* Refined Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-lg md:text-2xl text-white/50 max-w-2xl mb-16 leading-relaxed font-medium"
                >
                    EastCom Tech Solutions harmonizes advanced engineering with the sun&apos;s raw power to energize the East African landscape.
                </motion.p>

                {/* Sophisticated Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto items-center"
                >
                    <Button asChild size="lg" className="h-20 px-12 text-sm bg-primary text-[#0A0E1A] hover:bg-white hover:text-black font-black tracking-[0.2em] uppercase rounded-full transition-all duration-500 hover:scale-105 group relative overflow-hidden shadow-[0_0_50px_rgba(245,166,35,0.3)]">
                        <Link href="/offerings">
                            <span className="relative z-10 flex items-center">
                                Explore Catalogue <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </span>
                        </Link>
                    </Button>

                    <Link href="/contact" className="text-white/40 hover:text-white font-bold tracking-[0.2em] uppercase text-xs transition-colors flex items-center gap-3 group">
                        Start Your Consultation
                        <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator - Architectural style */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-6"
            >
                <div className="w-[1px] h-32 bg-gradient-to-b from-white/20 via-primary/50 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 128] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-primary to-transparent"
                    />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/30 vertical-text [writing-mode:vertical-lr]">Scroll to discover</span>
            </motion.div>

            {/* Performance Stats - Subtle Floating */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute right-12 bottom-12 hidden xl:block"
            >
                <div className="flex flex-col gap-8 text-right">
                    <div>
                        <div className="text-4xl font-display font-black text-white leading-none">99.8%</div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-primary mt-2">System Uptime</div>
                    </div>
                    <div>
                        <div className="text-4xl font-display font-black text-white leading-none">2.5k+</div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-primary mt-2">Projects Completed</div>
                    </div>
                </div>
            </motion.div>

            <style jsx global>{`
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 5s ease infinite;
                }
                .vertical-text {
                    text-orientation: mixed;
                }
            `}</style>
        </section>
    );
}
