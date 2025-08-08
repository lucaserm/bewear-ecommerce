"use server";

import Link from "next/link";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

const CategoriesList = async () => {
  const categories = await db.select().from(categoryTable);
  return (
    <div className="flex w-full p-5 text-center">
      {categories.map((category) => (
        <Link
          href={`/category/${category.slug}`}
          key={category.id}
          className="text-muted-foreground w-full"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
