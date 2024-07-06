import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import OfferBanner from "./_components/offer-banner";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />
      <div className="block px-5 pt-6 lg:hidden">
        <Search />
      </div>
      <div className="hidden lg:block">
        <OfferBanner />
      </div>

      <div className="pt-6 px-5 lg:px-32 flex flex-col justify-center">
        <div className="">
          <CategoryList />
        </div>
        <div className="pt-6 lg:hidden">
          <Link href={`/categories/${pizzasCategory?.id}/products`}>
            <PromoBanner
              src="/Banner-01.svg"
              alt="Até 30% de desconto em pizzas!"
            />
          </Link>
        </div>
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Pedidos Recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/products/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>

        <div className="hidden lg:flex justify-center gap-5 pt-6">
          <Link href={`/categories/${pizzasCategory?.id}/products`}>
              <PromoBanner
                src="/Banner-01.svg"
                alt="Até 30% de desconto em pizzas!"
              />
            </Link>

            <Link href={`/categories/${burguersCategory?.id}/products`}>
            <PromoBanner
              src="/Banner-02.svg"
              alt="A partir de R$17,90 em lanches"
            />
          </Link>
        </div>

        <div className="pt-6 lg:hidden">
          <Link href={`/categories/${burguersCategory?.id}/products`}>
            <PromoBanner
              src="/Banner-02.svg"
              alt="A partir de R$17,90 em lanches"
            />
          </Link>
        </div>
        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Restaurantes Recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/restaurants/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default Home;
