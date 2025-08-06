"use server";

import { categoryTable } from "@/db/schema";

type Category = typeof categoryTable.$inferSelect;

const CategoriesList = async ({ categories }: { categories: Category[] }) => {
  return (
    <div>
      {categories.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </div>
  );
};

export default CategoriesList;
