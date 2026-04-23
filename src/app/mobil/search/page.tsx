import { getAllCars } from "@/lib/data/cars";
import MobilListingClient from "../mobil-listing-client";
import Pagination from "@/components/ui/pagination";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams.query?.toLowerCase() || "";
  const page = Number(searchParams.page) || 1;

  const cars = await getAllCars();

  const filtered = cars.filter(
    (c) =>
      c.status === "available" &&
      c.title.toLowerCase().includes(query)
  );

  const PER_PAGE = 8;

  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <section className="max-w-[1020px] mx-auto px-4 py-6 space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold">
          Hasil pencarian: "{query}"
        </h1>
        <p className="text-xs text-muted-foreground">
          {filtered.length} mobil ditemukan
        </p>
      </div>

      {/* GRID */}
      <MobilListingClient cars={paginated} />

      {/* PAGINATION */}
      {filtered.length > PER_PAGE && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / PER_PAGE)}
          basePath="/mobil/search"
          query={`&query=${query}`}
        />
      )}
    </section>
  );
}