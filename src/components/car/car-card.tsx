"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Car } from "@/types/car";
import { cn } from "@/lib/utils";
import { buildCarUrl } from "@/lib/routes/car";
import { cloudinaryImage } from "@/lib/utils/cloudinary";

type Props = {
  car: Car;
  variant?: "default" | "promo";
};

export default function CarCard({
  car,
  variant = "default",
}: Props) {
  return (
    <article
      className={cn(
        `
        group relative
        bg-card border border-border
        rounded-2xl overflow-hidden
        shadow-card hover:shadow-soft
        transition
        `,
        variant === "promo" &&
          "ring-2 ring-red-500/70 shadow-red-200/40"
      )}
    >
      <Link href={buildCarUrl(car)} className="block">
        {/* PROMO BADGE */}
        {variant === "promo" && (
          <span
            className="
              absolute top-2 left-2 z-20
              bg-red-600 text-white
              text-[10px] font-bold
              px-2 py-1 rounded-md
              shadow
            "
          >
            PROMO
          </span>
        )}

        {/* BRAND BADGE */}
        {car.brand && (
          <span
            className={cn(
              `
              absolute top-2 z-10
              text-[10px] font-semibold
              px-2 py-1 rounded-md
              shadow
              `,
              variant === "promo"
                ? "left-2 mt-6 bg-primary/90 text-primary-foreground"
                : "left-2 bg-primary/90 text-primary-foreground"
            )}
          >
            {car.brand}
          </span>
        )}

        {/* SHOWROOM BADGE — DESKTOP ONLY */}
        {car.showroomName && (
          <span
            className="
              hidden sm:block
              absolute top-2 right-2 z-10
              bg-black/70 text-white
              text-[10px] font-medium
              px-2 py-1 rounded-md
            "
          >
            {car.showroomName}
          </span>
        )}

        {/* IMAGE 1:1 */}
        <div className="relative aspect-square bg-muted">

      

          <Image
            src={cloudinaryImage(car.image, "card")}
            alt={car.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            decoding="async"
            placeholder="blur"
            blurDataURL="/blur-car.png"
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          <Image
            src={car.image || "/placeholder-car.png"}
            alt={car.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* CONTENT */}
        <div className="p-3 space-y-1.5">
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">
            {car.title}
          </h3>

          {/* SHOWROOM TEXT — MOBILE ONLY */}
          {car.showroomName && (
            <p className="text-[11px] text-muted-foreground sm:hidden">
              {car.showroomName}
            </p>
          )}

          {/* PRICE */}
          <div className="pt-1">
            <p className="text-[11px] text-muted-foreground">
              DP mulai
            </p>
            <p className="text-primary font-bold text-base">
              Rp {Number(car.dp).toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-foreground/70">
              Cicilan{" "}
              <span className="font-semibold">
                Rp {Number(car.installment).toLocaleString("id-ID")}
              </span>
              {car.tenor && ` / ${car.tenor}`}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
