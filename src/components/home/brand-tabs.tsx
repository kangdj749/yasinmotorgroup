"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export type BrandTabsProps = {
  brands: string[];
};

const BrandTabs: React.FC<BrandTabsProps> = ({ brands }) => {
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
    router.push(`/mobil?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => selectBrand("all")}
        className={`px-4 py-2 rounded-full text-sm border border-border transition ${
          !activeBrand
            ? "bg-primary text-white"
            : "bg-background"
        }`}
      >
        Semua
      </button>

      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => selectBrand(brand)}
          className={`px-4 py-2 rounded-full text-sm border border-border whitespace-nowrap transition ${
            activeBrand === brand
              ? "bg-primary text-white"
              : "bg-background"
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
};

export default BrandTabs;
