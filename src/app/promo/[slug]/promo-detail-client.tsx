"use client";

import Link from "next/link";
import { CarCard } from "@/components/car";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Car } from "@/types/car";

type Promo = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  highlightBadge?: string;
  ctaText?: string;
  startDate?: string;
  endDate?: string;
};

type PromoDetailClientProps = {
  promo: Promo;
  cars: Car[];
};

export default function PromoDetailClient({
  promo,
  cars,
}: PromoDetailClientProps) {
  return (
    <main
      className="
        max-w-[1020px] mx-auto
        px-3 sm:px-5
        pt-5 sm:pt-6
        pb-32 sm:pb-12
        space-y-6
      "
    >
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Promo", href: "/promo" },
          { label: promo.title },
        ]}
      />

      {/* HERO PROMO */}
      <section
        className="
          relative
          rounded-2xl
          border border-border
          bg-linear-to-br from-primary/10 via-background to-background
          px-4 py-4 sm:px-6 sm:py-6
          space-y-3
        "
      >
        {promo.highlightBadge && (
          <span
            className="
              inline-block
              bg-primary text-primary-foreground
              text-[11px] font-semibold
              px-3 py-1
              rounded-full
            "
          >
            {promo.highlightBadge}
          </span>
        )}

        <div className="space-y-1">
          <h1
            className="
              text-lg sm:text-xl
              font-bold
              leading-tight
              tracking-tight
            "
          >
            {promo.title}
          </h1>

          {promo.subtitle && (
            <p
              className="
                text-xs sm:text-sm
                text-muted-foreground
                leading-snug
                max-w-lg
              "
            >
              {promo.subtitle}
            </p>
          )}
        </div>

        {promo.description && (
          <p
            className="
              text-xs sm:text-sm
              leading-snug
              max-w-lg
              whitespace-pre-line
            "
          >
            {promo.description}
          </p>
        )}

        {(promo.startDate || promo.endDate) && (
          <p
            className="
              text-[11px]
              text-muted-foreground
            "
          >
            Berlaku{" "}
            {promo.startDate && `mulai ${promo.startDate}`}
            {promo.startDate && promo.endDate && " hingga "}
            {promo.endDate}
          </p>
        )}
      </section>

      {/* LIST MOBIL */}
      <section className="space-y-3">
        <h2
          className="
            text-sm sm:text-base
            font-semibold
            tracking-tight
          "
        >
          Unit Mobil Promo
        </h2>

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            gap-2.5 sm:gap-3
          "
        >
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              variant="promo"
            />
          ))}
        </div>
      </section>

      {/* CTA MOBILE */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          sm:hidden
          bg-background/95 backdrop-blur
          border-t border-border
          px-3 py-3
          z-40
        "
      >
        <div className="max-w-[1020px] mx-auto">
          <Link
            href="/contact"
            className="
              flex items-center justify-center
              w-full
              rounded-full
              bg-primary text-primary-foreground
              py-2.5
              text-xs font-semibold
            "
          >
            {promo.ctaText || "Hubungi Sales Promo"}
          </Link>
        </div>
      </div>
    </main>
  );
}