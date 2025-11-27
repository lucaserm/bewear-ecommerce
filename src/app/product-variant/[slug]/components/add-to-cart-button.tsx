"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
  onAddToCart?: () => void;
}

export const AddToCartButton = ({
  productVariantId,
  quantity,
  onAddToCart,
}: AddToCartButtonProps) => {
  const increaseCartProductMutation = useIncreaseCartProduct({
    productVariantId,
    quantity,
  });

  const handleClick = () => {
    increaseCartProductMutation.mutate();
    toast.success("Produto adicionado à sacola!");
    onAddToCart?.();
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
