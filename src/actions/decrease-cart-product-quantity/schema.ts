import { z } from "zod";

export const decreaseProductFromCartSchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseProductFromCartSchema = z.infer<
  typeof decreaseProductFromCartSchema
>;
