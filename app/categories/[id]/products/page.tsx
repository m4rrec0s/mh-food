import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const session = await getServerSession(authOptions);
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      restaurants: true,
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6 lg:px-32">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-6">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
        <h2 className="mt-6 mb-6 text-lg font-semibold">Restaurantes</h2>
        <div className="grid grid-cols-4 gap-4">
          {category.restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}            
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
