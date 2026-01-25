import { Suspense } from "react";
import { getAllCars } from "@/lib/data/cars";
import { paginate } from "@/lib/pagination/paginate";
import BrandTabs from "@/components/home/brand-tabs";
import Pagination from "@/components/ui/pagination";
import CarCard from "@/components/car/car-card";
import BrandTabsSkeleton from "@/components/home/brand-tabs-skeleton";
import CarGridSkeleton from "@/components/car/car-grid-skeleton";

export default async function MobilPage({
  searchParams,
}: {
  searchParams: { brand?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const brand = searchParams.brand;

  const allCars = await getAllCars();

  // 👉 ambil brand unik
  const brands = Array.from(new Set(allCars.map((c) => c.brand)));

  // 👉 filter brand
  const filteredCars = brand
    ? allCars.filter((c) => c.brand === brand)
    : allCars;

  // 👉 paginate SETELAH filter
  const { data, currentPage, totalPages } = paginate(
    filteredCars,
    page,
    8
  );

  return (
    <main className="space-y-6 px-4 max-w-7xl mx-auto">
      {/* BRAND FILTER */}
      <Suspense fallback={<BrandTabsSkeleton />}>
        <BrandTabs brands={brands} />
      </Suspense>

      {/* GRID MOBIL */}
      <Suspense fallback={<CarGridSkeleton />}>
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </section>
      </Suspense>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/mobil"
        />
      )}
    </main>
  );
}
