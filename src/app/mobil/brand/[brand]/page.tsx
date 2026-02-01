import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCars } from "@/lib/data/cars";
import MobilListingClient from "../../mobil-listing-client";

export async function generateMetadata({
  params,
}: {
  params: { brand: string };
}): Promise<Metadata> {
  const brand = decodeURIComponent(params.brand);

  return {
    title: `Mobil ${brand} Bekas | DP Ringan & Kredit Mudah`,
    description: `Jual mobil ${brand} bekas berkualitas dengan DP ringan dan cicilan terjangkau. Unit siap pakai.`,
    alternates: {
      canonical: `/mobil/brand/${params.brand}`,
    },
  };
}

export default async function MobilByBrandPage({
  params,
}: {
  params: { brand: string };
}) {
  const brand = decodeURIComponent(params.brand);
  const cars = await getAllCars();

  const filtered = cars.filter(
    (c) =>
      c.status === "available" &&
      c.brand.toLowerCase() === brand.toLowerCase()
  );

  if (filtered.length === 0) return notFound();

  return <MobilListingClient cars={filtered} />;
}
