import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import { ChevronRightIcon, Fullscreen } from "lucide-react";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";

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
        }
      },
    }
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
          <Image
            src="/Banner-01.svg"
            alt="Até "
            width={0}
            height={0}
            className="h-full w-full"
            sizes="100vh"
          />
        </div>
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Pedidos recomendados</h2>
            <Button
              variant="ghost"
              className="hover:bg-transparent p-0 text-primary h-fit"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </div>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
