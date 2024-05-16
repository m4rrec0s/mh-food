import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, totalPrice, subTotalPrice, totalDiscount } =
    useContext(CartContext);
  return (
    <div className="flex h-[100vh] max-h-[90vh] flex-col py-4">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subTotalPrice)}</span>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Discontos</span>
                  <span className="text-muted-foreground">
                    - {formatCurrency(totalDiscount)}
                  </span>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Grátis</span>
                  ) : (
                    formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                  )}
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Button className="w-full">Finalizar pedido</Button>
          </div>
        </>
      ) : (
        "Sacola vazia. Adicione produtos para continuar."
      )}
    </div>
  );
};

export default Cart;
