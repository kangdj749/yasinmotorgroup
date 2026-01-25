import { getAllCars } from "@/lib/data/cars";
import CarCard from "@/components/car/car-card";

type Props = {
  brand?: string;
  page?: number;
};

export default async function HomeCarGrid({
  brand,
  page = 1,
}: Props) {
  const cars = await getAllCars();

  const filteredCars = brand
    ? cars.filter((car) => car.brand === brand)
    : cars;

  const start = (page - 1) * 8;
  const data = filteredCars.slice(start, start + 8);

  if (!data.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Mobil tidak ditemukan
      </p>
    );
  }

  return (
    <section
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        lg:grid-cols-4
      "
    >
      {data.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </section>
  );
}
