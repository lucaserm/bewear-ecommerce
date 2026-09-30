import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductList } from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import { ProductActions } from "./components/product-actions";
import { VariantSelector } from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <div className="space-y-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start lg:gap-14">
        <div className="lg:sticky lg:top-8">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            height={0}
            width={0}
            className="aspect-[4/5] h-auto w-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex flex-col lg:pt-8">
          <div>
            <h2 className="font-semibold text-2xl md:text-3xl">
              {productVariant.product.name}
            </h2>
            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>
            <h3 className="mt-5 font-semibold text-lg">
              {formatCentsToBRL(productVariant.priceInCents)}
            </h3>
            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
              className="my-5"
            />
          </div>

          <ProductActions productVariantId={productVariant.id} />

          <div className="mt-6">
            <p className="text-shadow-amber-600">
              {productVariant.product.description}
            </p>
          </div>
        </div>
      </div>

      <ProductList title="Talvez você goste" products={likelyProducts} />
    </div>
  );
};

export default ProductVariantPage;
