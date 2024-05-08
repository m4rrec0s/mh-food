import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] space-y-2">
      <div className="h-[150px] w-full relative">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover"/>
      </div>
    </div>
  );
};

export default ProductItem;
