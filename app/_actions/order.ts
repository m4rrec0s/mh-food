"use server";

import { OrderStatus } from "@prisma/client";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { calculateProductTotalPrice } from "../_helpers/price";

interface CreateOrderInput {
  restaurantId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

export const createOrder = async ({
  restaurantId,
  products,
}: CreateOrderInput) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (!products.length) {
    throw new Error("Pedido inválido.");
  }

  if (products.some(({ quantity }) => !Number.isInteger(quantity) || quantity <= 0)) {
    throw new Error("Quantidade inválida.");
  }

  const normalizedProducts = products.reduce<CreateOrderInput["products"]>(
    (acc, currentProduct) => {
      const existingProduct = acc.find(
        (product) => product.productId === currentProduct.productId,
      );

      if (existingProduct) {
        existingProduct.quantity += currentProduct.quantity;
        return acc;
      }

      acc.push(currentProduct);
      return acc;
    },
    [],
  );

  const productIds = normalizedProducts.map((product) => product.productId);

  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
    select: {
      deliveryFee: true,
      deliveryTimeMinutes: true,
      products: {
        where: {
          id: {
            in: productIds,
          },
        },
        select: {
          id: true,
          price: true,
          discountPercentage: true,
        },
      },
    },
  });

  if (!restaurant || restaurant.products.length !== normalizedProducts.length) {
    throw new Error("Produtos inválidos para este restaurante.");
  }

  const productsById = new Map(
    restaurant.products.map((product) => [product.id, product]),
  );

  const subtotalPrice = normalizedProducts.reduce((acc, cartProduct) => {
    const product = productsById.get(cartProduct.productId);

    if (!product) {
      return acc;
    }

    return acc + Number(product.price) * cartProduct.quantity;
  }, 0);

  const productsTotalPrice = normalizedProducts.reduce((acc, cartProduct) => {
    const product = productsById.get(cartProduct.productId);

    if (!product) {
      return acc;
    }

    return acc + calculateProductTotalPrice(product) * cartProduct.quantity;
  }, 0);

  const deliveryFee = Number(restaurant.deliveryFee);
  const totalPrice = productsTotalPrice + deliveryFee;
  const totalDiscounts = subtotalPrice - productsTotalPrice;

  await db.order.create({
    data: {
      subtotalPrice,
      totalDiscounts,
      totalPrice,
      deliveryFee,
      deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
      restaurant: {
        connect: { id: restaurantId },
      },
      status: OrderStatus.CONFIRMED,
      user: {
        connect: { id: userId },
      },
      products: {
        createMany: {
          data: normalizedProducts.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
    },
  });

  revalidatePath("/my-orders");
};
