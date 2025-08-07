import { addProductToCart } from "@/actions/add-cart-product";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["addProductToCart", productVariantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
