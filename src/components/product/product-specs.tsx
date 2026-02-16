"use client";

import { ClipboardList } from "lucide-react";

export function ProductSpecs({ specs }: { specs: any }) {
    if (!specs || typeof specs !== 'object') return null;

    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8 mt-12">
            <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                <ClipboardList className="text-primary" /> Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-muted-foreground capitalize text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-bold text-white text-right text-sm">{String(value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
