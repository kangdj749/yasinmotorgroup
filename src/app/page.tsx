import { Suspense } from "react";
import { getAllCars } from "@/lib/data/cars";

import BrandTabs from "@/components/home/brand-tabs";
import BrandTabsSkeleton from "@/components/home/brand-tabs-skeleton";

import HomeCarGrid from "@/components/home/HomeCarGrid";
import HomeCarSkeleton from "@/components/home/HomeCarSkeleton";

import PaginationServer from "@/components/home/PaginationServer";
import PaginationSkeleton from "@/components/home/PaginationSkeleton";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { brand?: string; page?: string };
}) {
  /* ================= DATA ================= */
  const allCars = await getAllCars();

  const brand = searchParams.brand;
  const page = Number(searchParams.page) || 1;

  const brands = Array.from(
    new Set(allCars.map((c) => c.brand))
  );

  /* ================= RENDER ================= */
  return (
    <main
      className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-6 sm:py-10
        space-y-8
      "
    >
      {/* ================= HERO ================= */}
      <section className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Mobil Bekas Berkualitas
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
          DP ringan, cicilan fleksibel, proses cepat & transparan.
        </p>
      </section>

      {/* ================= BRAND FILTER ================= */}
      <Suspense fallback={<BrandTabsSkeleton />}>
        <BrandTabs brands={brands} />
      </Suspense>

      {/* ================= GRID ================= */}
      <Suspense fallback={<HomeCarSkeleton />}>
        <HomeCarGrid brand={brand} page={page} />
      </Suspense>

      {/* ================= PAGINATION ================= */}
      <Suspense fallback={<PaginationSkeleton />}>
        <PaginationServer brand={brand} page={page} />
      </Suspense>
    </main>
  );
}
