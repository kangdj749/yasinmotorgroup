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
        max-w-7xl mx-auto
        px-4
        pt-6
        pb-32 sm:pb-10
        space-y-8
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
          rounded-3xl
          border border-border
          bg-linear-to-br from-primary/15 via-background to-background
          p-5 sm:p-8
          space-y-4
        "
      >
        {promo.highlightBadge && (
          <span
            className="
              inline-block
              bg-primary text-primary-foreground
              text-xs font-semibold
              px-4 py-1.5
              rounded-full
            "
          >
            {promo.highlightBadge}
          </span>
        )}

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            {promo.title}
          </h1>
          {promo.subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {promo.subtitle}
            </p>
          )}
        </div>

        {promo.description && (
          <p className="text-sm sm:text-base max-w-2xl whitespace-pre-line">
            {promo.description}
          </p>
        )}

        {(promo.startDate || promo.endDate) && (
          <p className="text-xs text-muted-foreground">
            Berlaku{" "}
            {promo.startDate && `mulai ${promo.startDate}`}
            {promo.startDate && promo.endDate && " hingga "}
            {promo.endDate}
          </p>
        )}
      </section>

      {/* LIST MOBIL */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Unit Mobil Promo
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
          border-t
          p-3
          z-40
        "
      >
        <Link
          href="/contact"
          className="
            flex items-center justify-center
            w-full
            rounded-full
            bg-primary text-primary-foreground
            py-3
            text-sm font-semibold
          "
        >
          {promo.ctaText || "Hubungi Sales Promo"}
        </Link>
      </div>
    </main>
  );
}
