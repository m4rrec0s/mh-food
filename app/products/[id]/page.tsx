import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import Header from "@/app/_components/header";
import CompletaryProducts from "./_components/complementary-products";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      <div className="hidden lg:mb-3 lg:block">
        <Header />
      </div>
      <div className="lg:mt-10 lg:grid-cols-2 lg:grid lg:px-32 lg:gap-8">
        {/* IMAGEM */}
        <ProductImage product={product} />

        {/* TITULO E PREÇO */}
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
      <div className="mt-10 space-y-3 px-32 pb-3 hidden lg:block">
        <CompletaryProducts complementaryProducts={juices} />
      </div>
    </div>
  );
};

export default ProductPage;
