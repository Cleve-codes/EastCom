import { getProductBySlug } from "@/lib/actions";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductSpecs } from "@/components/product/product-specs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props) {
    const params = await props.params;
    const product = await getProductBySlug(params.slug);

    if (!product) return { title: 'Product Not Found | EastCom Solar' };

    return {
        title: `${product.name} | EastCom Solar`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.images[0] ? [product.images[0]] : [],
        },
    };
}

export default async function ProductPage(props: Props) {
    const params = await props.params;
    const product = await getProductBySlug(params.slug);

    if (!product) notFound();

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#0A0E1A]">
            <div className="container mx-auto px-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/offerings" className="hover:text-white transition-colors">Offerings</Link>
                    <ChevronRight size={14} />
                    <span className="text-white truncate">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Gallery */}
                    <ProductGallery images={product.images} />

                    {/* Right: Info & Specs */}
                    <div>
                        <ProductInfo product={product} />

                        <ProductSpecs specs={product.specs} />
                    </div>
                </div>
            </div>
        </div>
    );
}
