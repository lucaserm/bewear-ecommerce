import { removeProductFromCart } from "@/actions/remove-cart-product";
import { getUserCartQueryKey } from "@/hooks/queries/use-cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ["remove-cart-product", cartItemId] as const;

export const useRemoveCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => removeProductFromCart({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserCartQueryKey() });
    },
  });
};
