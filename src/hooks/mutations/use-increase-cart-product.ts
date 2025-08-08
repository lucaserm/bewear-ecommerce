import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/cart/add-cart-product";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["addProductToCart", productVariantId] as const;

export const useIncreaseCartProduct = ({
  productVariantId,
  quantity,
}: {
  productVariantId: string;
  quantity?: number;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () =>
      addProductToCart({ productVariantId, quantity: quantity ?? 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
