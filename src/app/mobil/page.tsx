import { Suspense } from "react";
import type { Metadata } from "next";

import BrandTabs from "@/components/home/brand-tabs";
import BrandTabsSkeleton from "@/components/home/brand-tabs-skeleton";
import HomeCarGrid from "@/components/home/HomeCarGrid";
import HomeCarSkeleton from "@/components/home/HomeCarSkeleton";
import PaginationServer from "@/components/home/PaginationServer";
import PaginationSkeleton from "@/components/home/PaginationSkeleton";

import { getAllCars } from "@/lib/data/cars";

/* ================= SEO METADATA ================= */
export const metadata: Metadata = {
  title: "Mobil Bekas Berkualitas | Harga Terbaik & Siap Kredit",
  description:
    "Daftar mobil bekas berkualitas dengan harga terbaik. Tersedia berbagai merek populer, siap kredit maupun cash di Yasin Motor Group.",
  alternates: {
    canonical: "/mobil",
  },
  openGraph: {
    title: "Mobil Bekas Berkualitas | Yasin Motor Group",
    description:
      "Cari mobil bekas berkualitas, harga terbaik, unit siap pakai dan bisa kredit. Cek daftar lengkapnya di sini.",
    url: "/mobil",
    siteName: "Yasin Motor Group",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  searchParams: {
    brand?: string;
    page?: string;
  };
};

export default async function MobilPage({ searchParams }: Props) {
  const brand = searchParams.brand;
  const page = Number(searchParams.page) || 1;

  const cars = await getAllCars();

  const availableCars = cars.filter(
    (c) => c.status === "available"
  );

  const brands = Array.from(
    new Set(availableCars.map((c) => c.brand))
  );

  /* ================= JSON-LD ================= */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: brand
      ? `Mobil Bekas ${brand}`
      : "Daftar Mobil Bekas",
    description:
      "Daftar mobil bekas berkualitas dengan berbagai pilihan merek dan harga terbaik.",
    numberOfItems: availableCars.length,
    itemListElement: availableCars.slice(0, 12).map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/mobil/${car.slug}`,
      name: car.title,
    })),
  };

  return (
    <>
      {/* ================= JSON-LD ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          pt-6 pb-24
          space-y-8
        "
      >
        {/* ================= HERO ================= */}
        <section className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {brand
              ? `Mobil Bekas ${brand}`
              : "Daftar Mobil Bekas"}
          </h1>

          <p className="text-sm text-muted-foreground max-w-2xl">
            {brand
              ? `Pilihan mobil bekas ${brand} berkualitas dengan harga terbaik. Unit terbatas dan siap kredit.`
              : "Temukan mobil bekas berkualitas dari berbagai merek populer. Harga terbaik, unit siap pakai, bisa kredit maupun cash."}
          </p>
        </section>

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
      </main>
    </>
  );
}
