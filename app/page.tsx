import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import { ChevronRightIcon, Fullscreen } from "lucide-react";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany({
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
  return (
    <div className="h-full w-full items-center justify-center bg-gray-500">
      <div className="max-w-xl rounded bg-white">
        <Header />
        <div className="px-5 pt-6">
          <Search />
        </div>
        <div className="px-5 pt-6">
          <CategoryList />
        </div>
        <div className="pt-6">
          <PromoBanner
            src="/Banner-01.svg"
            alt="Até 30% de desconto em pizzas!"
          />
        </div>
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Pedidos recomendados</h2>

            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href={`/products/recommended`}>
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>

        <div className="pt-6">
          <PromoBanner
            src="/Banner-02.svg"
            alt="A partir de 17,90 em lanches"
          />
        </div>

        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Restaurantes recomendados</h2>

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
    </div>
  );
}
