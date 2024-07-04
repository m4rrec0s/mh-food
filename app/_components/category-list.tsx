import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {categories.map((category) => (
          <div key={category.id} className="w-full">
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
      <div className="lg:flex gap-5 items-center justify-evenly hidden">
        {categories.map((category) => (
          <div key={category.id} className="w-full">
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
