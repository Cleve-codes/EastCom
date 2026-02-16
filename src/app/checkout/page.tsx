import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata = {
    title: "Checkout | EastCom Solar",
    description: "Securely complete your solar solution purchase.",
};

export default function CheckoutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-[#0A0E1A]">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">Checkout</h1>
                        <p className="text-muted-foreground text-lg">Experience the future of energy. Secure your installation today.</p>
                    </header>

                    <CheckoutForm />
                </div>
            </div>
        </main>
    );
}
