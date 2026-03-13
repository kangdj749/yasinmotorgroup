"use client";

import Image from "next/image";
import Link from "next/link";
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
        bg-card
        border border-border
        rounded-xl
        overflow-hidden
        transition-all duration-200
        hover:shadow-md
        `,
        variant === "promo" &&
          "ring-1 ring-primary/70"
      )}
    >
      <Link
        href={buildCarUrl(car)}
        className="block"
      >
        {/* PROMO BADGE */}
        {variant === "promo" && (
          <span
            className="
            absolute top-2 left-2 z-20
            bg-primary
            text-primary-foreground
            text-[10px] font-semibold
            px-2 py-[2px]
            rounded
            shadow-sm
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
              absolute z-10
              text-[10px]
              font-medium
              px-2 py-[2px]
              rounded
              bg-primary/90
              text-primary-foreground
              shadow-sm
              `,
              variant === "promo"
                ? "top-7 left-2"
                : "top-2 left-2"
            )}
          >
            {car.brand}
          </span>
        )}

        {/* SHOWROOM BADGE DESKTOP */}
        {car.showroomName && (
          <span
            className="
            hidden sm:block
            absolute top-2 right-2 z-10
            bg-black/70
            text-white
            text-[10px]
            font-medium
            px-2 py-[2px]
            rounded
            "
          >
            {car.showroomName}
          </span>
        )}

        {/* IMAGE */}
        <div className="relative aspect-square bg-muted">
          <Image
            src={cloudinaryImage(car.image, "card")}
            alt={car.title}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 240px"
            loading="lazy"
            decoding="async"
            placeholder="blur"
            blurDataURL="/blur-car.png"
            unoptimized
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-[1.04]
            "
          />
        </div>

        {/* CONTENT */}
        <div className="px-3 py-2.5 space-y-1">
          {/* TITLE */}
          <h3
            className="
            text-[13px]
            font-semibold
            leading-snug
            line-clamp-2
            text-foreground
            "
          >
            {car.title}
          </h3>

          {/* SHOWROOM MOBILE */}
          {car.showroomName && (
            <p
              className="
              text-[11px]
              text-muted-foreground
              sm:hidden
              leading-tight
              "
            >
              {car.showroomName}
            </p>
          )}

          {/* PRICE */}
          <div className="pt-1 space-y-[2px]">
            <p className="text-[10px] text-muted-foreground">
              DP mulai
            </p>

            <p
              className="
              text-primary
              font-bold
              text-[15px]
              leading-tight
              "
            >
              Rp {Number(car.dp).toLocaleString("id-ID")}
            </p>

            <p
              className="
              text-[11px]
              text-foreground/70
              leading-tight
              "
            >
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