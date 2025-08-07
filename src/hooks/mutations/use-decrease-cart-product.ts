import { decreaseProductFromCart } from "@/actions/decrease-cart-product-quantity";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getDecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decreaseProductFromCart", cartItemId] as const;

export const useDecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductMutationKey(cartItemId),
    mutationFn: () => decreaseProductFromCart({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
