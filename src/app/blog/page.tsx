"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogComingSoonPage() {
    return (
        <main className="min-h-screen bg-[#0A0E1A] flex items-center justify-center relative overflow-hidden px-6">
            {/* Dynamic Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-primary/5 blur-[180px] rounded-full animate-slow-pulse" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-10">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary">Intelligence & Insights</span>
                    </div>

                    <h1 className="text-[15vw] lg:text-[12rem] font-display font-black text-white leading-[0.8] tracking-tighter mb-12">
                        COMING <br /> <span className="text-primary italic">SOON.</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white/40 text-lg lg:text-2xl max-w-2xl mx-auto leading-relaxed mb-16 font-medium"
                >
                    We are preparing a high-fidelity intelligence hub for sustainable energy. Stay tuned for engineering deep-dives, industry news, and regional impact stories.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    <Button size="lg" className="bg-white text-[#0A0E1A] hover:bg-primary font-black uppercase tracking-[0.2em] px-12 py-10 rounded-full transition-all duration-500 group" asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-2" /> Return Home
                        </Link>
                    </Button>
                </motion.div>

                {/* Brand Marking */}
                <div className="mt-32 flex items-center justify-center gap-3 opacity-20">
                    <Sun className="w-10 h-10 text-primary" />
                    <span className="font-display font-bold text-2xl text-white">EastCom</span>
                </div>
            </div>

            <style jsx global>{`
        @keyframes slow-pulse {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-slow-pulse {
          animation: slow-pulse 10s ease-in-out infinite;
        }
      `}</style>
        </main>
    );
}
