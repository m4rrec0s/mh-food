import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import RestaurantDetails from "./_components/restaurant-details";
import Header from "@/app/_components/header";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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

  if (!restaurant) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div>
      <div className="hidden lg:mb-3 lg:block">
        <Header />
      </div>
      <div className="lg:mt-10 lg:grid lg:grid-cols-2 lg:gap-8 lg:px-32">
        {/* IMAGEM */}
        <RestaurantImage
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
        <RestaurantDetails restaurant={restaurant} />
      </div>

      <div className="lg:mt-10 lg:space-y-3 lg:px-32 lg:pb-3">
        <div className="space-y-4">
          {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
          <h2 className="px-5  font-semibold">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>
        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
            <h2 className="px-5  font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}
      </div>

      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
