"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: string[] }) {
    const [activeImage, setActiveImage] = useState(images[0] || "/placeholder.jpg");

    // Ensure we have at least one image to display
    const safeImages = images.length > 0 ? images : ["/placeholder.jpg"];

    return (
        <div className="space-y-4 sticky top-24">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/5 border border-white/5 group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeImage}
                        src={activeImage}
                        alt="Product Image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Zoom indication */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            </div>

            {/* Thumbnails */}
            {safeImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {safeImages.map((img, idx) => (
                        <button
                            key={`${img}-${idx}`}
                            onClick={() => setActiveImage(img)}
                            className={cn(
                                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                                activeImage === img ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-60 hover:opacity-100 hover:border-white/20"
                            )}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
