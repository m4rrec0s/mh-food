import Search from "./search";

const OfferBanner = () => {
  return (
    <div className="h-[500px] w-full bg-primary">
      <div className="absolute top-[126px] left-32 z-10">
        <div className="text-white">
            <h1 className="text-4xl font-bold">Está com fome?</h1>
            <p className="text-lg font-normal">
              Com apenas alguns cliques, encontre refeições acessiveis perto de
              você.
            </p>
        </div>
        <div className="mt-8 bg-muted p-6 rounded-lg">
            <Search />
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
