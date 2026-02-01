"use client";

import { Car } from "@/types/car";
import { CarCard } from "@/components/car";

type Props = {
  cars: Car[];
};

export default function MobilListingClient({ cars }: Props) {
  if (cars.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Tidak ada mobil tersedia.
      </p>
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
