"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";

export const toggleFavoriteRestaurant = async (restaurantId: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  const isFavorite = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (isFavorite) {
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });

    revalidatePath("/");
    return;
  }

  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};
