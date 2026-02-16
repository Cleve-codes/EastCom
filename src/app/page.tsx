import { Hero } from "@/components/home/hero";
import { TrustCounter } from "@/components/home/trust-counter";
import { BrandStory } from "@/components/home/brand-story";
import { ProductShowcase } from "@/components/home/product-showcase";
import { ServicesGrid } from "@/components/home/services-grid";
import { WhySolar } from "@/components/home/why-solar";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TrustCounter />
      <BrandStory />
      <ProductShowcase />
      <ServicesGrid />
      <WhySolar />
      <Testimonials />
      <FaqSection />
      <CTASection />
    </div>
  );
}
