import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div>
        {products.map((product) => (
            <ProductItem key={product.id} product={product}/>
        ))}
    </div>
  );
};

export default ProductList;
