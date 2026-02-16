"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof contactSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(values);
        setIsSubmitting(false);
        toast.success("Message sent! Our team will contact you shortly.");
        form.reset();
    }

    return (
        <main className="min-h-screen bg-[#0A0E1A] pt-32 pb-20 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10 -translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl lg:text-[7rem] font-display font-black text-white leading-[0.85] tracking-tighter mb-8">
                                LET'S <br /> <span className="text-primary italic">CONNECT.</span>
                            </h1>
                            <p className="text-white/50 text-xl lg:text-2xl max-w-2xl leading-relaxed">
                                Ready to architect your energy future? Reach out to EastCom today for precision engineering and sustainable solutions.
                            </p>
                        </motion.div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Contact Form Column */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white/5 border border-white/10 rounded-[3rem] p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden group"
                            >
                                {/* Subtle light streak */}
                                <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-primary/5 via-transparent to-transparent rotate-12 transition-transform duration-1000 group-hover:translate-x-10 group-hover:translate-y-10" />

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white/70 font-bold uppercase tracking-widest text-xs">Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Amina Juma"
                                                                {...field}
                                                                className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400 text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white/70 font-bold uppercase tracking-widest text-xs">Email Address</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="amina@example.com"
                                                                {...field}
                                                                className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400 text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white/70 font-bold uppercase tracking-widest text-xs">The Topic</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Solar Infrastructure Inquiry"
                                                            {...field}
                                                            className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white/70 font-bold uppercase tracking-widest text-xs">The Detail</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Could you tell us more about your energy goals?"
                                                            {...field}
                                                            className="min-h-[180px] bg-white/5 border-white/10 text-white rounded-2xl focus:border-primary/50 focus:ring-primary/20 transition-all py-6 leading-relaxed font-medium"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="w-full bg-primary text-black hover:bg-primary/50 hover:backdrop-blur-md hover:shadow-[0_0_50px_rgba(245,166,35,0.2)] font-black uppercase tracking-[0.2em] py-10 rounded-full transition-all duration-500 group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                                    Transmitting...
                                                </>
                                            ) : (
                                                <>
                                                    Ship Message <Send className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 group-hover:-translate-y-1" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </motion.div>
                        </div>

                        {/* Information Column */}
                        <div className="lg:col-span-5 space-y-12">
                            {/* Contact Blocks */}
                            <motion.div
                                className="space-y-8"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <ContactBlock
                                    icon={MapPin}
                                    title="Headquarters"
                                    content="Ken-Banco House, Moi Avenue, Nairobi"
                                    subContent="Open Mon-Sat, 8AM - 6PM"
                                />
                                <ContactBlock
                                    icon={Phone}
                                    title="Direct Line"
                                    content="+254 718 790 654"
                                    subContent="Available for Technical Support 24/7"
                                />
                                <ContactBlock
                                    icon={Mail}
                                    title="Digital Inquiries"
                                    content="info@eastcom.tech"
                                    subContent="Response guaranteed within 2 hours"
                                />
                            </motion.div>

                            {/* Modern CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-primary p-12 rounded-[3rem] text-[#0A0E1A] relative overflow-hidden group shadow-[0_40px_100px_rgba(245,166,35,0.15)]"
                            >
                                <div className="relative z-10 text-center">
                                    <div className="w-16 h-16 bg-[#0A0E1A]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-display font-black leading-tight mb-6">IMMEDIATE <br /> CONSULTATION.</h3>
                                    <p className="font-bold text-sm mb-10 opacity-70">Connect with an engineer instantly via WhatsApp for a site assessment.</p>
                                    <Button variant="outline" className="w-full border-[#0A0E1A] text-[#0A0E1A] hover:bg-[#131824]/10 hover:backdrop-blur-md hover:border-[#0A0E1A]/20 font-black uppercase tracking-widest rounded-full h-16 transition-all duration-500" asChild>
                                        <Link href="https://wa.me/254718790654" target="_blank" rel="noopener noreferrer">Initiate WhatsApp Chat</Link>
                                    </Button>
                                </div>

                                {/* Decorative Sun */}
                                <Sun className="absolute top-0 right-0 w-48 h-48 text-[#0A0E1A] opacity-5 -translate-y-1/2 translate-x-1/2 rotate-12" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ContactBlock({ icon: Icon, title, content, subContent }: { icon: any; title: string; content: string; subContent: string }) {
    return (
        <div className="flex gap-6 group">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-2">{title}</h4>
                <p className="text-xl font-display font-bold text-white mb-1">{content}</p>
                <p className="text-sm text-white/40 font-medium">{subContent}</p>
            </div>
        </div>
    );
}
