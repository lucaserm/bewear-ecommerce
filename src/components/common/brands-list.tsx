import Image from "next/image";

export const BrandsList = () => {
  type Brand = {
    name: string;
    uri: string;
  };
  const brands: Brand[] = [
    {
      name: "Nike",
      uri: "/brands/simple-icons_nike.png",
    },
    {
      name: "Adidas",
      uri: "/brands/simple-icons_adidas.png",
    },
    {
      name: "Puma",
      uri: "/brands/simple-icons_puma.png",
    },
    {
      name: "New Balance",
      uri: "/brands/simple-icons_newbalance.png",
    },
    {
      name: "Converse",
      uri: "/brands/simple-icons_converse.png",
    },
    {
      name: "Polo",
      uri: "/brands/simple-icons_polo.png",
    },
    {
      name: "Zara",
      uri: "/brands/simple-icons_zara.png",
    },
  ];
  return (
    <div className="w-full space-y-6 px-5">
      <h3 className="font-semibold">Marcas parceiras</h3>
      <div className="flex w-full gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => {
          return (
            <div
              key={brand.name}
              className="flex w-full cursor-pointer flex-col items-center gap-3"
            >
              <div className="flex min-h-[100px] w-full min-w-[150px] items-center justify-center rounded-3xl border">
                <Image
                  src={brand.uri}
                  alt={brand.name}
                  height={40}
                  width={40}
                  className="h-auto w-auto"
                />
              </div>
              <p className="font-medium text-sm">{brand.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
