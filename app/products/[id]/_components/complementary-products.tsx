import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";

interface CompletaryProductsProps {
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const CompletaryProducts = ({
  complementaryProducts,
}: CompletaryProductsProps) => {
  return (
    <div className="">
      <h3 className="px-5 font-semibold">Sucos</h3>
      <ProductList products={complementaryProducts} />
    </div>
  );
};

export default CompletaryProducts;
