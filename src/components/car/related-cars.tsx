// src/components/car/related-cars.tsx

import { Car } from "@/types";
import { CarCard } from "@/components/car";

type Props = {
  cars: Car[];
};

export default function RelatedCars({ cars }: Props) {
  if (!cars.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">
        Mobil lainnya di showroom ini
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
