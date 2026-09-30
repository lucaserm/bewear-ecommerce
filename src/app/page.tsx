import { desc } from "drizzle-orm";
import Image from "next/image";

import { BrandsList } from "@/components/common/brands-list";
import { CategorySelector } from "@/components/common/category-selector";
import { ProductList } from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <div className="space-y-10 md:space-y-14">
      <div>
        <picture>
          <source srcSet="/banner-03.png" media="(min-width: 1024px)" />
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-2xl object-cover shadow-sm md:rounded-3xl"
          />
        </picture>
      </div>

      <BrandsList />

      <ProductList products={products} title="Mais vendidos" />

      <div className="lg:hidden">
        <CategorySelector categories={categories} />
      </div>

      <div>
        <Image
          src="/banner-02.png"
          alt="Seja autêntico"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full rounded-2xl object-cover shadow-sm md:rounded-3xl"
        />
      </div>

      <ProductList products={newlyCreatedProducts} title="Novos produtos" />
    </div>
  );
};

export default Home;
