import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getAllCars, getCarBySlug } from "@/lib/data/cars";
import { paginate } from "@/lib/pagination/paginate";

import MobilDetailClient from "./mobil-detail-client";
import MobilDetailSkeleton from "./mobil-detail-skeleton";

import { buildCarUrl, buildCarPath } from "@/lib/routes/car";
import { cloudinaryImage } from "@/lib/utils/cloudinary";

/* ======================================================
   TYPES
====================================================== */

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
    brand?: string;
  };
};

/* ======================================================
   SEO METADATA
====================================================== */

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {

  const car = await getCarBySlug(params.slug);

  if (!car) {
    return {
      title: "Mobil Tidak Ditemukan",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    `${car.title} | DP ${Intl.NumberFormat("id-ID").format(car.dp)}`;

  const description =
    car.description?.slice(0, 155) ||
    `Jual ${car.title} dengan DP ringan & cicilan terjangkau. Unit tersedia di showroom ${car.showroomName}.`;

  const ogImage = cloudinaryImage(car.image, "detail");
  const canonical = buildCarUrl(car);

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: car.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ======================================================
   PAGE
====================================================== */

export default async function MobilDetailPage({
  params,
  searchParams,
}: PageProps) {

  const car = await getCarBySlug(params.slug);

  if (!car) {
    return notFound();
  }

  /* ================= CANONICAL REDIRECT ================= */

  const canonicalSlug = `${car.slug}--${car.id}`;

  if (params.slug !== canonicalSlug) {
    redirect(buildCarPath(car));
  }

  /* ================= PAGINATION ================= */

  const page = Number(searchParams.page) || 1;
  const activeBrand = searchParams.brand;

  const allCars = await getAllCars();

  /* ======================================================
     RELATED CARS (SHOWROOM)
  ====================================================== */

  const relatedCars = allCars.filter(
    (c) =>
      c.showroomId === car.showroomId &&
      c.id !== car.id &&
      c.status === "available"
  );

  const relatedPagination = paginate(relatedCars, page, 8);

  /* ======================================================
     ALL AVAILABLE CARS
  ====================================================== */

  const availableCars = allCars.filter(
    (c) => c.status === "available"
  );

  const brands = Array.from(
    new Set(availableCars.map((c) => c.brand))
  );

  const filteredCars = activeBrand
    ? availableCars.filter((c) => c.brand === activeBrand)
    : availableCars;

  const allCarsPagination = paginate(filteredCars, page, 12);

  /* ======================================================
     SEO URL
  ====================================================== */

  const carUrl = buildCarUrl(car);

  return (
    <>
      {/* ======================================================
         PRELOAD IMAGE (LCP BOOST)
      ====================================================== */}

      <link
        rel="preload"
        as="image"
        href={cloudinaryImage(car.image, "detail")}
        fetchPriority="high"
      />

      {/* ======================================================
         JSON-LD VEHICLE SCHEMA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            name: car.title,
            brand: car.brand,
            image: cloudinaryImage(car.image, "detail"),
            description: car.description,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "IDR",
              price: car.installment,
              url: carUrl,
            },
            seller: {
              "@type": "AutoDealer",
              name: car.showroomName,
            },
          }),
        }}
      />

      {/* ======================================================
         CLIENT PAGE
      ====================================================== */}

      <Suspense fallback={<MobilDetailSkeleton />}>
        <MobilDetailClient
          car={car}
          related={relatedPagination.data}
          relatedPagination={{
            currentPage: relatedPagination.currentPage,
            totalPages: relatedPagination.totalPages,
          }}
          allCars={allCarsPagination.data}
          brands={brands}
          allCarsPagination={{
            currentPage: allCarsPagination.currentPage,
            totalPages: allCarsPagination.totalPages,
          }}
        />
      </Suspense>
    </>
  );
}