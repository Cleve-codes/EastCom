import Link from "next/link";
import { Sun, Instagram, Twitter, Linkedin, Facebook, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="border-t border-border bg-card/30 pt-16 pb-8 backdrop-blur-lg">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-lg">
                                <Sun className="w-5 h-5 text-[#0A0E1A] fill-[#0A0E1A]" />
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-white">
                                EastCom<span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Empowering East Africa with premium solar energy solutions.
                            Reliable, efficient, and built for the future.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="#" icon={Instagram} />
                            <SocialLink href="#" icon={Twitter} />
                            <SocialLink href="#" icon={Linkedin} />
                            <SocialLink href="#" icon={Facebook} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-display font-bold text-white text-lg">Company</h4>
                        <ul className="flex flex-col gap-2">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/services">Services</FooterLink>
                            <FooterLink href="/offerings">Our Offerings</FooterLink>
                            <FooterLink href="/#faq">FAQs</FooterLink>
                            <FooterLink href="/blog">News & Blog</FooterLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-display font-bold text-white text-lg">Contact</h4>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>Ken-Banco House, Moi Avenue,<br />Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+254 718 790 654</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>info@eastcom.tech</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-display font-bold text-white text-lg">Stay Updated</h4>
                        <p className="text-muted-foreground text-sm">
                            Subscribe to our newsletter for the latest solar tech updates.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter email"
                                className="bg-background/50 border-border focus:border-primary transition-colors"
                                type="email"
                            />
                            <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-[#0A0E1A]">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © {new Date().getFullYear()} EastCom Tech Solutions. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <Link
            href={href}
            className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-[#0A0E1A] transition-all duration-300"
        >
            <Icon className="w-5 h-5" />
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2 group"
            >
                <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                {children}
            </Link>
        </li>
    );
}
