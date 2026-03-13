"use client";

import type { Car } from "@/types/car";
import { CarCard } from "@/components/car";

type Props = {
  cars: Car[];
};

export default function MobilListingClient(
  { cars }: Props
) {

  /* ================================
     EMPTY STATE
  ================================= */

  if (cars.length === 0) {

    return (

      <section
        className="
        mx-auto
        max-w-[1020px]
        px-4
        py-10
        "
      >

        <div
          className="
          rounded-md
          border
          border-[rgb(var(--border))]
          bg-[rgb(var(--card))]
          px-6
          py-10
          text-center
          "
        >

          <p
            className="
            text-[13px]
            text-[rgb(var(--foreground))]
            "
          >
            Tidak ada mobil tersedia saat ini.
          </p>

        </div>

      </section>

    );

  }

  /* ================================
     LISTING
  ================================= */

  return (

    <section
      className="
      mx-auto
      max-w-[1020px]
      px-4
      py-4
      "
    >

      <div
        className="
        grid
        grid-cols-2
        gap-3

        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        "
      >

        {cars.map((car) => (

          <CarCard
            key={car.id}
            car={car}
          />

        ))}

      </div>

    </section>

  );

}