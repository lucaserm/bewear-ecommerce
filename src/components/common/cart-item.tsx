import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveCartProduct } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  cartItemId: string;
  productVariantId: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  cartItemId,
  productVariantId,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const addProductToCartMutation = useIncreaseCartProduct({ productVariantId });
  const removeProductFromCartMutation = useRemoveCartProduct(cartItemId);
  const decreaseProductFromCartMutation = useDecreaseCartProduct(cartItemId);

  const handleAdd = () => {
    addProductToCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto adicionado ao carrinho.");
      },
      onError: () => {
        toast.error("Erro ao adicionar produto ao carrinho.");
      },
    });
  };

  const handleDecrease = () => {
    decreaseProductFromCartMutation.mutate();
  };

  const handleRemove = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

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
          <p className="font-semibold text-sm">{productName}</p>
          <p className="font-medium text-muted-foreground text-xs">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleDecrease}
            >
              <MinusIcon />
            </Button>
            <p className="font-medium text-xs">{quantity}</p>
            <Button className="h-4 w-4" variant="ghost" onClick={handleAdd}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="icon" onClick={handleRemove}>
          <TrashIcon />
        </Button>
        <p className="self-end font-bold text-sm">
          {formatCentsToBRL(quantity * productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
