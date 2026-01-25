"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  brands: string[];
};

export default function BrandTabsClient({ brands }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeBrand = searchParams.get("brand");

  function selectBrand(brand: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (brand === "all") {
      params.delete("brand");
    } else {
      params.set("brand", brand);
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      <button
        onClick={() => selectBrand("all")}
        className={`
          px-4 py-2 rounded-full text-sm border whitespace-nowrap
          ${!activeBrand ? "bg-primary text-white" : "bg-background"}
        `}
      >
        Semua
      </button>

      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => selectBrand(brand)}
          className={`
            px-4 py-2 rounded-full text-sm border whitespace-nowrap
            ${
              activeBrand === brand
                ? "bg-primary text-white"
                : "bg-background"
            }
          `}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}
