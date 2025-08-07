"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  RemoveProductFromCartSchema,
  removeProductFromCartSchema,
} from "./schema";

export const removeProductFromCart = async (
  data: RemoveProductFromCartSchema,
) => {
  removeProductFromCartSchema.parse(data);
  await verifyIfCanBeDeleted(data.cartItemId);
  await db.delete(cartItemTable).where(eq(cartItemTable.id, data.cartItemId));
};

async function verifyIfCanBeDeleted(cartItemId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, cartItemId),
    with: {
      cart: true,
    },
  });
  const cartDoesNotBelongsToUser = cartItem?.cart.userId !== session.user.id;
  if (cartDoesNotBelongsToUser) {
    throw new Error("Unauthorized");
  }
  if (!cartItem) {
    throw new Error("Cart item not found");
  }
}
