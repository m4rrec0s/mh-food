import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import { Fullscreen } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="pt-6">
        <Image
          src="/Banner-01.svg"
          alt="Até "
          width={0}
          height={0}
          className="h-full w-full"
          sizes="100vh"
        />
      </div>
    </>
  );
}
