import { NextResponse } from "next/server";
import { updateOrderPayment } from "@/lib/order-actions";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const reference = searchParams.get("reference");

        if (!reference) {
            return NextResponse.json({ error: "Reference is required" }, { status: 400 });
        }

        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecretKey) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        // Update order status if verification succeeds
        if (data.data.status === "success") {
            const orderNumber = data.data.reference; // reference was orderNumber
            await updateOrderPayment(orderNumber, reference, "SUCCESS");
        } else {
            const orderNumber = data.data.reference;
            await updateOrderPayment(orderNumber, reference, "FAILED");
        }

        return NextResponse.json(data.data);
    } catch (error) {
        console.error("Verification failed:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
