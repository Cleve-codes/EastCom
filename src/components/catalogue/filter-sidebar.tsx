"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const categories = ["Panels", "Inverters", "Batteries", "Systems"];

export function FilterSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get("category");
    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPrice = Number(searchParams.get("maxPrice") || 5000000);

    const [localPrice, setLocalPrice] = useState([minPrice, maxPrice]);

    // Sync local price state with URL when URL changes
    useEffect(() => {
        setLocalPrice([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === null) {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleCategoryChange = (category: string) => {
        const newCategory = selectedCategory === category ? null : category;
        router.push(pathname + "?" + createQueryString("category", newCategory));
    };

    const handlePriceApply = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("minPrice", localPrice[0].toString());
        params.set("maxPrice", localPrice[1].toString());
        router.push(pathname + "?" + params.toString());
    };

    const handleClear = () => {
        router.push(pathname);
        setLocalPrice([0, 5000000]);
    };

    const isFiltered = !!selectedCategory || minPrice > 0 || maxPrice < 5000000;

    return (
        <aside className="w-full md:w-64 space-y-8 pr-6 border-r border-white/5 h-fit md:sticky md:top-24">
            <div>
                <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Categories</h3>
                <div className="space-y-3">
                    {categories.map(c => (
                        <div key={c} className="flex items-center space-x-3">
                            <Checkbox
                                id={c}
                                checked={selectedCategory === c}
                                onCheckedChange={() => handleCategoryChange(c)}
                                className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                            />
                            <Label htmlFor={c} className="text-white/70 cursor-pointer hover:text-white transition-colors text-sm">
                                {c}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white uppercase text-xs tracking-wider">Price (KES)</h3>
                </div>
                <Slider
                    defaultValue={[0, 5000000]}
                    value={localPrice}
                    max={5000000}
                    step={5000}
                    onValueChange={(vals) => setLocalPrice(vals)}
                    className="mb-6 py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mb-4 font-mono">
                    <span>{localPrice[0].toLocaleString()}</span>
                    <span>{localPrice[1].toLocaleString()}</span>
                </div>
                <Button onClick={handlePriceApply} size="sm" className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs h-8">
                    Apply Price Range
                </Button>
            </div>

            {isFiltered && (
                <Button variant="ghost" onClick={handleClear} className="w-full text-muted-foreground hover:text-white hover:bg-white/5 h-8 text-xs">
                    Clear All Filters
                </Button>
            )}
        </aside>
    );
}
