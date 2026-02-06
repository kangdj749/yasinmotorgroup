import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPromoBySlug } from "@/lib/data/getPromoBySlug";

import PromoDetailClient from "./promo-detail-client";
import PromoDetailSkeleton from "@/components/promo/PromoDetailSkeleton";
import { buildCarUrl } from "@/lib/routes/car";

/* ================= SEO METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getPromoBySlug(params.slug);

  if (!data) {
    return {
      title: "Promo Tidak Ditemukan",
      robots: { index: false },
    };
  }

  const { promo } = data;

  const title =
    promo.title ||
    "Promo Mobil Bekas Terbaru & Terbaik";

  const description =
    promo.description ||
    promo.subtitle ||
    "Dapatkan promo mobil bekas terbaik dengan DP ringan & cicilan terjangkau.";

  return {
    title,
    description,

    alternates: {
      canonical: `/promo/${promo.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `/promo/${promo.slug}`,
      type: "website",
    },
  };
}

/* ================= PAGE ================= */
type PromoDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function PromoDetailPage({
  params,
}: PromoDetailPageProps) {
  const data = await getPromoBySlug(params.slug);
  if (!data) return notFound();

  const { promo, cars } = data;
  
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ================= JSON-LD ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
            name: promo.title,
            description:
              promo.description || promo.subtitle,
            availability: "https://schema.org/InStock",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/promo/${promo.slug}`,
            itemOffered: {
              "@type": "ItemList",
              itemListElement: cars.map((car, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Vehicle",
                  name: car.title,
                  brand: car.brand,
                  url: `${process.env.NEXT_PUBLIC_SITE_URL}${buildCarUrl(car)}`,
                },
              })),
            },
          }),
        }}
      />

      {/* ================= CONTENT ================= */}
      <Suspense fallback={<PromoDetailSkeleton />}>
        <PromoDetailClient
          promo={promo}
          cars={cars}
        />
      </Suspense>
    </section>
  );
}
