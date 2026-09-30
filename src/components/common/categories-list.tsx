"use server";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";

const CategoriesList = async () => {
  const categories = await db.select().from(categoryTable);
  return (
    <nav className="mt-4 hidden w-full items-center justify-center gap-2 border-t pt-4 lg:flex">
      {categories.map((category) => (
        <Button
          key={category.id}
          className="text-muted-foreground hover:text-secondary-foreground"
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
    </nav>
  );
};

export default CategoriesList;
