import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, amount, orderNumber } = await req.json();

        if (!email || !amount || !orderNumber) {
            return NextResponse.json({ error: "Email, amount, and orderNumber are required" }, { status: 400 });
        }

        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecretKey) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: Math.round(amount * 100),
                reference: orderNumber, // Tie order to payment reference
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
                metadata: {
                    orderNumber
                }
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data.data);
    } catch (error) {
        console.error("Paystack initialization error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
