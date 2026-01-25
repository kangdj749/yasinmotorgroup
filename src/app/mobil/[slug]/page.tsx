import { Suspense } from "react";
import { getAllCars, getCarBySlug } from "@/lib/data/cars";
import { paginate } from "@/lib/pagination/paginate";
import MobilDetailClient from "./mobil-detail-client";
import MobilDetailSkeleton from "./mobil-detail-skeleton";

export default async function MobilDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    page?: string;
    brand?: string;
  };
}) {
  const car = await getCarBySlug(params.slug);
  if (!car) return null;

  const page = Number(searchParams.page) || 1;
  const activeBrand = searchParams.brand;

  const allCars = await getAllCars();

  /* ==========================
   * RELATED CARS (SHOWROOM)
   * ========================== */
  const relatedAll = allCars.filter(
    (c) =>
      c.showroomId === car.showroomId &&
      c.id !== car.id &&
      c.status === "available"
  );

  const relatedPagination = paginate(relatedAll, page, 8);

  /* ==========================
   * ALL CARS (FILTERABLE)
   * ========================== */
  const availableCars = allCars.filter(
    (c) => c.status === "available"
  );

  const brands = Array.from(
    new Set(availableCars.map((c) => c.brand))
  );

  const filteredCars = activeBrand
    ? availableCars.filter((c) => c.brand === activeBrand)
    : availableCars;

  const allCarsPagination = paginate(filteredCars, page, 12);

  return (
    <Suspense fallback={<MobilDetailSkeleton />}>
      <MobilDetailClient
        car={car}
        related={relatedPagination.data}
        relatedPagination={{
          currentPage: relatedPagination.currentPage,
          totalPages: relatedPagination.totalPages,
        }}
        allCars={allCarsPagination.data}
        brands={brands}
        allCarsPagination={{
          currentPage: allCarsPagination.currentPage,
          totalPages: allCarsPagination.totalPages,
        }}
      />
    </Suspense>
  );
}
