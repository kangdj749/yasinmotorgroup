"use client";

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";

type Props = {
  car: Car;
};

export default function CarCard({ car }: Props) {
  return (
    <article
      className="
        group relative
        bg-card border border-border
        rounded-2xl overflow-hidden
        shadow-card hover:shadow-soft
        transition
      "
    >
      <Link href={`/mobil/${car.slug}`} className="block">
        {/* ================= IMAGE + BADGES ================= */}
        <div className="relative aspect-square bg-muted">
          {/* BRAND BADGE */}
          {car.brand && (
            <span
              className="
                absolute top-3 left-3 z-10
                bg-primary/90 text-primary-foreground
                text-[11px] font-semibold
                px-2 py-1 rounded-md shadow
                backdrop-blur
              "
            >
              {car.brand}
            </span>
          )}

          {/* SHOWROOM BADGE */}
          {car.showroomName && (
            <span
              className="
                absolute top-3 right-3 z-10
                bg-black/60 text-white
                text-[11px] font-medium
                px-2 py-1 rounded-md shadow
                backdrop-blur
              "
            >
              {car.showroomName}
            </span>
          )}

          <Image
            src={car.image || "/placeholder-car.png"}
            alt={car.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-3 space-y-2">
          {/* TITLE */}
          <h3 className="text-sm sm:text-base font-semibold line-clamp-2">
            {car.title}
          </h3>

          {/* PRICE */}
          <div className="pt-1 space-y-0.5">
            <p className="text-xs text-foreground/60">
              DP mulai
            </p>

            <p className="text-primary font-bold text-base sm:text-lg">
              Rp {Number(car.dp).toLocaleString("id-ID")}
            </p>

            <p className="text-xs text-foreground/70">
              Cicilan Rp{" "}
              <span className="font-semibold">
                {Number(car.installment).toLocaleString("id-ID")}
              </span>
              {car.tenor && ` / ${car.tenor}`}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
