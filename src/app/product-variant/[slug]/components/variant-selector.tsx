import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface VariantSelectorProps extends ComponentProps<"div"> {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

export const VariantSelector = ({
  selectedVariantSlug,
  variants,
  className,
  ...props
}: VariantSelectorProps) => {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariantSlug === variant.slug
              ? "border-primary rounded-xl border-2"
              : ""
          }
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};
