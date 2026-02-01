import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllCars } from "@/lib/data/cars";
import { getSheetRows } from "@/lib/google/google-sheets";
import { Showroom } from "@/types/showroom";
import MobilListingClient from "../../mobil-listing-client";

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = decodeURIComponent(params.city);

  return {
    title: `Mobil Bekas ${city} | DP Ringan & Siap Pakai`,
    description: `Cari mobil bekas di ${city} dengan DP ringan dan cicilan mudah. Unit tersedia dan siap pakai.`,
    alternates: {
      canonical: `/mobil/kota/${params.city}`,
    },
  };
}

export default async function MobilByCityPage({
  params,
}: {
  params: { city: string };
}) {
  const city = decodeURIComponent(params.city);

  const showrooms = await getSheetRows<Showroom>("showroom");
  const showroomIds = showrooms
    .filter(
      (s) =>
        s.city?.toLowerCase() === city.toLowerCase() &&
        s.isActive === true
    )
    .map((s) => s.slug);

  if (!showroomIds.length) return notFound();

  const cars = await getAllCars();

  const filtered = cars.filter(
    (c) =>
      c.status === "available" &&
      showroomIds.includes(c.showroomId)
  );

  if (!filtered.length) return notFound();

  return <MobilListingClient cars={filtered} />;
}
