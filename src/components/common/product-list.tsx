"use client";

import type { productTable, productVariantTable } from "@/db/schema";

import { ProductItem } from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <section className="space-y-6">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="grid grid-flow-col auto-cols-[minmax(170px,1fr)] gap-4 overflow-x-auto pb-2 md:auto-cols-[minmax(210px,1fr)] lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible xl:grid-cols-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
