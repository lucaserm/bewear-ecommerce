import { z } from "zod";

export const addAddressSchema = z.object({
  email: z.string(),
  recipientName: z.string(),
  cpfOrCnpj: z.string(),
  phone: z.string(),
  zipCode: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional().nullable(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
});

export type AddAddressSchema = z.infer<typeof addAddressSchema>;
