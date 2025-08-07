"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  DecreaseProductFromCartSchema,
  decreaseProductFromCartSchema,
} from "./schema";

export const decreaseProductFromCart = async (
  data: DecreaseProductFromCartSchema,
) => {
  decreaseProductFromCartSchema.parse(data);
  const cartItem = await verifyIfCanBeDecreseadReturningCartItem(data);
  if (cartItem.quantity === 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
    return;
  }
  await db
    .update(cartItemTable)
    .set({ quantity: cartItem.quantity - 1 })
    .where(eq(cartItemTable.id, cartItem.id));
};

async function verifyIfCanBeDecreseadReturningCartItem(
  data: DecreaseProductFromCartSchema,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });
  const cartDoesNotBelongsToUser = cartItem?.cart.userId !== session.user.id;
  if (cartDoesNotBelongsToUser) {
    console.log(`${cartItem?.cart.userId}:${session.user.id}`);
    console.table(cartItem?.cart);
    throw new Error("Unauthorized");
  }
  if (!cartItem) {
    throw new Error("Cart item not found");
  }
  return cartItem;
}
