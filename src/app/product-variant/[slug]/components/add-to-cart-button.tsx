"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

export const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const increaseCartProductMutation = useIncreaseCartProduct({
    productVariantId,
    quantity,
  });

  const handleClick = () => {
    increaseCartProductMutation.mutate();
  };

  const { isPending } = increaseCartProductMutation;

  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => handleClick()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};
