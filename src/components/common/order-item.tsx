import { Order } from "@/components/common/orders-list";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const OrderItem = ({ idx, order }: { idx: string; order: Order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const total = formatCentsToBRL(
    order.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    ),
  );
  return (
    <div className="p-5">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[350px] cursor-pointer flex-col gap-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between gap-4 px-4">
            <div>
              <h4 className="text-sm font-semibold">Número do Pedido</h4>
              <p className="text-sm">#{idx}</p>
            </div>
            <Button variant="ghost" size="icon" className="size-8">
              {isOpen ? (
                <ChevronUp className="text-primary" />
              ) : (
                <ChevronDown className="text-primary" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2">
          {order.items.map((item) => (
            <div key={item.id} className="w-full space-y-6 p-5">
              <Link
                href={`/product-variant/${item.productVariant.slug}`}
                className="flex items-center gap-4"
              >
                <Image
                  height={0}
                  width={0}
                  sizes="30vw"
                  src={item.productVariant.imageUrl}
                  alt={item.productVariant.name}
                  className="h-auto w-full rounded-lg object-cover"
                />
                <div className="w-full">
                  <p className="text-sm font-semibold">
                    {item.productVariant.product.name}
                  </p>
                  <p className="text-muted-foreground text-xs font-medium">
                    {item.productVariant.name} | {item.quantity}
                  </p>
                  <p className="text-sm font-bold">
                    {formatCentsToBRL(item.productVariant.priceInCents)}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          <Separator />
          <div className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Subtotal</h2>
              <p>{total}</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Transporte e Manuseio</h2>
              <p>Grátis</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Taxa estimada</h2>
              <p>-</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Total</h2>
              <p className="font-bold">{total}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
