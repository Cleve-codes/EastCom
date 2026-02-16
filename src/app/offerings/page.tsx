import { getProducts } from "@/lib/actions";
import { FilterSidebar } from "@/components/catalogue/filter-sidebar";
import { ProductGrid } from "@/components/catalogue/product-grid";

export const metadata = {
    title: "Offerings | EastCom Solar",
    description: "Browse our catalogue of premium solar panels, inverters, batteries, and complete systems.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function OfferingsPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;

    const category = (searchParams.category as string) || undefined;
    const search = (searchParams.search as string) || undefined;
    const sort = (searchParams.sort as string) || undefined;
    const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
    const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;

    const products = await getProducts({ category, search, sort, minPrice, maxPrice });

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#0A0E1A]">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-2">Catalogue</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Our Solutions</h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl">
                        Explore our curated selection of tier-1 energy products. All installations come with warranty and expert support.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    <FilterSidebar />

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                            <p className="text-sm text-muted-foreground">Showing <strong className="text-white">{products.length}</strong> results</p>
                            {/* Sort could go here if implemented as dropdown */}
                        </div>

                        <ProductGrid products={products} />
                    </div>
                </div>
            </div>
        </div>
    );
}
