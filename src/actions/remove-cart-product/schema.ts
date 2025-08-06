import { z } from "zod";

export const removeProductFromCartSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type RemoveProductFromCartSchema = z.infer<
  typeof removeProductFromCartSchema
>;
