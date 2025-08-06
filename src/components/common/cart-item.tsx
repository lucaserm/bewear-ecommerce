import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

import { addProductToCart } from "@/actions/add-cart-product";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

interface CartItemProps {
  productVariantId: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  productVariantId,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const { mutate: removeMutate, isPending: removeIsPending } = useMutation({
    mutationKey: ["removeProductFromCart", productVariantId, quantity],
    mutationFn: () =>
      removeProductFromCart({
        productVariantId,
        quantity: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={() => removeMutate()}
              disabled={addIsPending || removeIsPending}
            >
              {quantity > 1 ? <MinusIcon /> : <TrashIcon />}
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={() => addMutate()}
              disabled={addIsPending || removeIsPending}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <p className="self-end text-sm font-bold">
        {formatCentsToBRL(quantity * productVariantPriceInCents)}
      </p>
    </div>
  );
};

export default CartItem;
