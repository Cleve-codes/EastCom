import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eastcom.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EastCom Tech — Solar Panels, Inverters & Batteries",
    template: "%s | EastCom",
  },
  description:
    "EastCom Tech Solutions — premium solar products and installation services across East Africa. Solar panels, inverters, batteries and end-to-end solar solutions for homes and businesses.",
  keywords: [
    "solar",
    "solar panels",
    "inverters",
    "batteries",
    "solar installation",
    "East Africa",
    "EastCom",
  ],
  authors: [{ name: "EastCom Tech", url: "https://eastcom.tech" }],
  creator: "EastCom Tech",
  openGraph: {
    title: "EastCom Tech — Solar Panels, Inverters & Batteries",
    description:
      "Premium solar products and installations across East Africa — panels, inverters, batteries and complete solar systems from EastCom Tech.",
    url: BASE_URL,
    siteName: "EastCom Tech",
    images: [
      new URL("/images/solar-plant.jpg", BASE_URL).toString(),
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EastCom Tech — Solar Panels, Inverters & Batteries",
    description:
      "Premium solar products and installations across East Africa — panels, inverters, batteries and complete solar systems from EastCom Tech.",
    images: [new URL("/images/solar-plant.jpg", BASE_URL).toString()],
    site: "@EastComTech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground",
          syne.variable,
          dmSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
