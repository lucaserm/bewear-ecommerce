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
    <section className="w-full space-y-6">
      <h3 className="font-semibold">Marcas parceiras</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
        {brands.map((brand) => {
          return (
            <div
              key={brand.name}
              className="flex cursor-pointer flex-col items-center gap-3"
            >
              <div className="flex min-h-[92px] w-full items-center justify-center rounded-2xl border bg-card transition-shadow hover:shadow-md lg:min-h-[112px]">
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
    </section>
  );
};
