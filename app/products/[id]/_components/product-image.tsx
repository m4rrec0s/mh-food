"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[360px] lg:h-full w-full lg:rounded-lg">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="100%"
        className="object-cover lg:rounded-lg"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white dark:text-gray-800 text-foreground hover:text-white lg:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
