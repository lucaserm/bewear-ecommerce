import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { env } from "@/env";

export const POST = async (request: Request) => {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET)
    return NextResponse.error();

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.error();

  const text = await request.text();
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    env.STRIPE_WEBHOOK_SECRET,
  );
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (!orderId) return NextResponse.error();

    await db
      .update(orderTable)
      .set({
        status: "paid",
      })
      .where(eq(orderTable.id, orderId));
  }
  return NextResponse.json({ received: true });
};
