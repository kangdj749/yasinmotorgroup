import { Suspense } from "react";
import { getAllCars } from "@/lib/data/cars";

import BrandTabs from "@/components/home/brand-tabs";
import BrandTabsSkeleton from "@/components/home/brand-tabs-skeleton";

import HomeCarGrid from "@/components/home/HomeCarGrid";
import HomeCarSkeleton from "@/components/home/HomeCarSkeleton";

import PaginationServer from "@/components/home/PaginationServer";
import PaginationSkeleton from "@/components/home/PaginationSkeleton";

import PromoSection from "@/components/promo/PromoSection";
import PromoDetailSkeleton from "@/components/promo/PromoDetailSkeleton";

/* ✅ ISR: refresh promo + mobil tiap 5 menit */
export const revalidate = 300;

export default async function HomePage({
  searchParams,
}: {
  searchParams: { brand?: string; page?: string };
}) {
  const allCars = await getAllCars();

  const brand = searchParams.brand;
  const page = Number(searchParams.page) || 1;

  const brands = Array.from(new Set(allCars.map((c) => c.brand)));

  return (
    <section
      className="
        max-w-7xl mx-auto
        px-3 sm:px-6 lg:px-8
        pt-5 sm:pt-10
        pb-28 md:pb-10
        space-y-8
      "
    >
      {/* ================= HERO ================= */}
      <header className="space-y-4">
        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            JUAL BELI MOBIL BEKAS BERKUALITAS
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Melayani Proses Cash & Kredit · Tukar Tambah · Seluruh Jawa Barat
          </p>
        </div>

        {/* WHATSAPP CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/6282379296878"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl
              bg-green-600 hover:bg-green-700
              text-white
              px-5 py-3
              text-sm sm:text-base font-semibold
              transition
              shadow-sm
            "
          >
            {/* WhatsApp Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M19.11 17.93c-.29-.14-1.71-.84-1.98-.93-.27-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.07-.29-.14-1.21-.45-2.31-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.14-.14.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.65-1.57-.89-2.15-.24-.58-.48-.5-.65-.5-.17 0-.36-.02-.55-.02-.19 0-.51.07-.77.36-.27.29-1.02 1-.02 2.44 1 1.43 1.96 2.81 4.75 3.93.66.29 1.18.46 1.58.59.66.21 1.27.18 1.75.11.53-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.14-.27-.21-.56-.36z" />
              <path d="M16 2.67c-7.36 0-13.33 5.97-13.33 13.33 0 2.35.61 4.65 1.77 6.68L2.67 29.33l6.83-1.79a13.27 13.27 0 006.5 1.72c7.36 0 13.33-5.97 13.33-13.33S23.36 2.67 16 2.67zm0 24.02c-2.1 0-4.15-.55-5.95-1.59l-.43-.25-4.05 1.06 1.08-3.95-.28-.41a10.65 10.65 0 01-1.63-5.64c0-5.87 4.78-10.65 10.65-10.65s10.65 4.78 10.65 10.65-4.78 10.65-10.65 10.65z" />
            </svg>

            <span>Chat WhatsApp</span>

            {/* VERIFIED BADGE */}
            <span
              className="
                inline-flex items-center gap-1
                rounded-full
                bg-white/20
                px-2 py-0.5
                text-[11px] font-medium
              "
            >
              ✓ Resmi
            </span>
          </a>

          {/* NUMBER INFO */}
          <div className="text-xs sm:text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              0823-7929-6878
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-blue-500">✔</span>
              <span>Akun WhatsApp Bisnis</span>
            </div>
          </div>
        </div>
      </header>


      {/* ================= PROMO ================= */}
      <Suspense fallback={<PromoDetailSkeleton/>}>
        <PromoSection />
      </Suspense>

      {/* ================= BRAND FILTER ================= */}
      <Suspense fallback={<BrandTabsSkeleton />}>
        <BrandTabs brands={brands} />
      </Suspense>

      {/* ================= GRID ================= */}
      <Suspense fallback={<HomeCarSkeleton />}>
        <HomeCarGrid brand={brand} page={page} />
      </Suspense>

      {/* ================= PAGINATION ================= */}
      <Suspense fallback={<PaginationSkeleton />}>
        <PaginationServer brand={brand} page={page} />
      </Suspense>
    </section>
  );
}
