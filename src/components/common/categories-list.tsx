"use server";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";

const CategoriesList = async () => {
  const categories = await db.select().from(categoryTable);
  return (
    <div className="flex w-full flex-col justify-center space-x-5 space-y-5 p-5 text-center md:flex-row">
      {categories.map((category) => (
        <Button
          key={category.id}
          className="hidden text-muted-foreground hover:text-secondary-foreground md:block"
          variant="ghost"
          asChild
        >
          <Link
            href={`/category/${category.slug}`}
            className="text-muted-foreground"
          >
            {category.name}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default CategoriesList;
