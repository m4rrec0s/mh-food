"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartcontext {
  products: CartProduct[];
  addProductsToCart: (product: Product, quantity: number) => void;
}

export const CartContext = createContext<ICartcontext>({
  products: [],
  addProductsToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductsToCart = (product: Product, quantity: number) => {
    const isProductAlreadyInCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductAlreadyInCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        })
      );

    }
    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductsToCart }}>
      {children}
    </CartContext.Provider>
  );
};
