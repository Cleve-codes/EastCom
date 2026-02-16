import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateOrderPayment } from "@/lib/order-actions";

export async function POST(req: Request) {
    try {
        const text = await req.text();
        const secret = process.env.PAYSTACK_SECRET_KEY;

        if (!secret) {
            console.error("PAYSTACK_SECRET_KEY is missing for webhook");
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        const hash = crypto
            .createHmac("sha512", secret)
            .update(text)
            .digest("hex");

        const signature = req.headers.get("x-paystack-signature");

        if (hash !== signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const body = JSON.parse(text);
        const event = body.event;

        if (event === "charge.success") {
            const reference = body.data.reference;
            // We stored orderNumber as reference in initialize
            const orderNumber = body.data.reference;
            await updateOrderPayment(orderNumber, reference, "SUCCESS");
        }

        return NextResponse.json({ status: "success" });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: "Processing failed" }, { status: 400 });
    }
}
