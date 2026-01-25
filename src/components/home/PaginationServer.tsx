import Pagination from "@/components/ui/pagination";
import { getAllCars } from "@/lib/data/cars";

type Props = {
  brand?: string;
  page: number;
};

export default async function PaginationServer({
  brand,
  page,
}: Props) {
  const cars = await getAllCars();

  const filtered = brand
    ? cars.filter((c) => c.brand === brand)
    : cars;

  const totalPages = Math.ceil(filtered.length / 8);

  if (totalPages <= 1) return null;

  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      basePath="/"
      query={brand ? `&brand=${brand}` : ""}
    />
  );
}
