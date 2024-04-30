import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

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
          alt="Até 30% de desconto em pizzas!"
          height={0}
          width={0}
          className="w-full h-auto"
          sizes="100vh"
          quality={100}
        />
      </div>
    </>
  );
}
