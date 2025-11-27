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
    <div className="mx-auto flex flex-col space-y-6 xl:max-w-[50%]">
      <div className="mx-auto md:flex">
        <div className="px-5">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover md:rounded"
          />
        </div>

        <div className="flex flex-col">
          <div className="px-5">
            <h2 className="mt-5 font-semibold text-lg md:text-2xl">
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

          <div className="mt-5 px-5">
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
