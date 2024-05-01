import { db } from "../_lib/prisma";
import ResturantItem from "./resturant-item";

const ResturantList = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <ResturantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default ResturantList;
