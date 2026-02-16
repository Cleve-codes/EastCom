"use server";

import { prisma } from "./prisma";
import { PaymentStatus } from "@prisma/client";

export async function createOrder(data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    totalAmount: number;
    items: { productId: string; quantity: number; price: number }[];
}) {
    const orderNumber = `EC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const order = await prisma.order.create({
            data: {
                orderNumber,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                customerPhone: data.customerPhone,
                address: data.address,
                totalAmount: data.totalAmount,
                paymentStatus: "PENDING",
                items: {
                    create: data.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });
        return order;
    } catch (error) {
        console.error("Failed to create order:", error);
        return null;
    }
}

export async function updateOrderPayment(orderNumber: string, reference: string, status: PaymentStatus) {
    try {
        const order = await prisma.order.update({
            where: { orderNumber },
            data: {
                paymentStatus: status,
                paymentReference: reference
            }
        });
        return order;
    } catch (error) {
        console.error("Failed to update order payment:", error);
        return null;
    }
}

export async function getOrderByNumber(orderNumber: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { orderNumber },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return order;
    } catch (error) {
        return null;
    }
}
