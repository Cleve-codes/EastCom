"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "How long does a typical solar installation take?",
        answer: "For most residential projects in Nairobi and surrounding areas, the physical installation of panels and inverters takes 1-3 days. However, the end-to-end process—including site survey, system design, and technical configuration—typically spans 7-14 days.",
    },
    {
        question: "What maintenance is required for my solar system?",
        answer: "Solar systems are remarkably low-maintenance. We recommend a professional cleaning of the panels every 6 months to remove dust and debris, which ensures maximum efficiency. Our maintenance team also performs annual technical audits to verify inverter performance and battery health.",
    },
    {
        question: "Do you offer financing or M-PESA payment plans?",
        answer: "Yes, EastCom partners with leading financial institutions to offer flexible solar loans. We also provide internal staggered payment plans for systems over KES 500,000. All transactions can be conveniently processed via Paystack or M-PESA.",
    },
    {
        question: "Will my solar system work during KPLC power outages?",
        answer: "If you have a hybrid or off-grid system with battery storage, your power will remain uninterrupted during outages. For grid-tie only systems without batteries, the inverter automatically shuts down during an outage for safety reasons (anti-islanding).",
    },
    {
        question: "What kind of warranties do you provide?",
        answer: "We offer industry-leading warranties: 25 years linear power warranty on solar panels, 5-10 years on inverters, and 5-10 years on lithium-ion batteries. Additionally, EastCom provides a 1-year comprehensive workmanship warranty on all installations.",
    },
    {
        question: "How much can I realistically save on my electricity bill?",
        answer: "On average, EastCom customers see a 50% to 90% reduction in their monthly KPLC bills. The exact savings depend on your daytime energy usage, system size, and whether you've integrated battery storage for evening power.",
    },
];

export function FaqSection() {
    return (
        <section id="faq" className="py-32 lg:py-56 bg-[#0A0E1A] relative overflow-hidden">
            {/* Architectural Background */}
            <div className="absolute top-0 right-0 w-px h-full bg-white/5 lg:mr-[25%]" />
            <div className="absolute top-0 left-0 w-px h-full bg-white/5 lg:ml-[25%]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <HelpCircle className="w-4 h-4 text-primary" />
                            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/50">Knowledge Base</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.85] tracking-tighter">
                            COMMON <br />
                            <span className="text-primary italic">QUERIES.</span>
                        </h2>

                        <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            Everything you need to know about transitioning to the African sun.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="bg-white/5 border border-white/5 rounded-[2.5rem] px-10 py-4 hover:bg-white/[0.08] hover:border-primary/20 transition-all duration-700 overflow-hidden"
                                >
                                    <AccordionTrigger className="text-left text-white font-display font-black text-xl hover:text-primary hover:no-underline py-6">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-white/40 text-lg leading-relaxed pb-8 font-medium italic">
                                        &quot;{faq.answer}&quot;
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>

                <div className="mt-32 text-center space-y-8">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Direct Protocol</p>
                    <a
                        href="https://wa.me/254718790654"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-6 group"
                    >
                        <span className="text-2xl lg:text-4xl font-display font-black text-white group-hover:text-primary transition-colors">
                            Speak with an Engineer
                        </span>
                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:rotate-12">
                            <Sparkles className="w-6 h-6 text-primary group-hover:text-black" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
