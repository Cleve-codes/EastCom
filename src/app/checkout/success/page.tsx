import { Suspense } from "react";
import { SuccessContent } from "@/components/checkout/success-content";
import { Loader2 } from "lucide-react";

export const metadata = {
    title: "Order Success | EastCom Solar",
    description: "Your order has been placed successfully.",
};

export default function SuccessPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-[#0A0E1A]">
            <div className="container mx-auto px-6">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <Loader2 className="w-16 h-16 text-primary animate-spin mb-8" />
                        <h2 className="text-3xl font-display font-bold text-white mb-3">Loading Confirmation</h2>
                        <p className="text-white/60 text-lg">Preparing your order details...</p>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </div>
        </main>
    );
}
