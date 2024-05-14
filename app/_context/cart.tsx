"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartcontext {
  products: CartProduct[];
  addProductsToCart: (product: Product) => void
}

export const CartContext = createContext<ICartcontext>({
  products: [],
  addProductsToCart: () => {},
});

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([]);

    const addProductsToCart = (product: Product) => {
        setProducts((prev) => [...prev, { ...product, quantity: 0 }]);
    };

    return (
        <CartContext.Provider value={{ products, addProductsToCart }}>
            {children}
        </CartContext.Provider>
    );
};
