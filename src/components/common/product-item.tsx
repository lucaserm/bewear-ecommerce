import Image from "next/image";
import Link from "next/link";

import type { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

export const ProductItem = ({
  product,
  textContainerClassName,
}: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="group flex min-w-0 flex-col gap-3"
    >
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        sizes="100vw"
        height={0}
        width={0}
        className="aspect-[4/5] h-auto w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div
        className={cn(
          "flex min-w-0 max-w-full flex-col gap-1",
          textContainerClassName,
        )}
      >
        <p className="truncate font-medium text-sm">{product.name}</p>
        <p className="truncate font-medium text-muted-foreground text-xs">
          {product.description}
        </p>
        <p className="truncate font-semibold text-sm">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};
