"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, Search, Sun, X } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { CartSheet } from "@/components/cart/cart-sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Offerings", href: "/offerings" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "FAQs", href: "/#faq" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    // We use a safe hydration pattern for the cart count to avoid hydration mismatch
    const [cartCount, setCartCount] = useState(0);
    const { items, openCart } = useCartStore();

    useEffect(() => {
        setCartCount(items.reduce((acc, item) => acc + item.quantity, 0));
    }, [items]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-border/50 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-lg group-hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300">
                        <Sun className="w-5 h-5 text-[#0A0E1A] fill-[#0A0E1A]" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-foreground">
                        EastCom<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary hidden sm:flex"
                    >
                        <Search className="w-5 h-5" />
                    </Button>

                    <ThemeToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary relative"
                        onClick={openCart}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[#0A0E1A] text-[10px] font-bold flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Button>

                    <div className="hidden md:block">
                        <Button asChild className="rounded-full px-6 font-semibold" variant="default">
                            <Link href="/contact">Get a Quote</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l border-border bg-card/95 backdrop-blur-xl">
                            <div className="flex flex-col gap-8 mt-12">
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={cn(
                                                "text-lg font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-neutral-800/50",
                                                pathname === link.href ? "text-primary bg-neutral-800/50" : "text-muted-foreground"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/contact"
                                        className="text-lg font-medium text-primary p-2 mt-4"
                                    >
                                        Get a Quote →
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Global Cart Sheet */}
            <CartSheet />
        </header>
    );
}
