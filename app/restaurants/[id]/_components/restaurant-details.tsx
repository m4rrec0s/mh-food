import DeliveryInfo from "@/app/_components/delivery-info";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import CartBanner from "./cart-banner";
import { Prisma } from "@prisma/client";

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      products: true;
      categories: {
        include: {
          products: true;
        };
      };
    };
  }>;
}

const RestaurantDetails = async ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div className="max-sm:relative max-sm:z-50 max-sm:mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 lg:rounded-lg lg:border lg:border-gray-200">
      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
        {/* TITULO */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              sizes="100%"
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam numquam,
          fugit cum minima accusantium error autem quidem ullam at facere itaque
          sapiente delectus dolores fugiat, recusandae voluptatum excepturi
          commodi labore.
        </p>
      </div>

      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantDetails;
