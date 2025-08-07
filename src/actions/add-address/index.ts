"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { AddAddressSchema, addAddressSchema } from "./schema";

type AddAddressReturn = {
  id: string;
};

export const addAddress = async (
  data: AddAddressSchema,
): Promise<AddAddressReturn[]> => {
  addAddressSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const addressSaved = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.recipientName,
      street: data.street,
      number: data.number,
      complement: data.complement,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      zipCode: data.zipCode,
      country: data.country,
      phone: data.phone,
      email: data.email,
      cpfOrCnpj: data.cpfOrCnpj,
    })
    .returning({ id: shippingAddressTable.id });
  return addressSaved;
};
