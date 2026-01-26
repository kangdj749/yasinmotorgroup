// src/app/showroom/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getCarsByShowroomSlug } from "@/lib/data/getCarsByShowroomSlug";
import { generateShowroomMetadata } from "@/lib/seo/generateShowroomMetadata";
import { CarCard } from "@/components/car";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const showroomName = params.slug.replace(/-/g, " ");
  return generateShowroomMetadata(showroomName);
}

export default async function ShowroomPage({
  params,
}: {
  params: { slug: string };
}) {
  const cars = await getCarsByShowroomSlug(params.slug);
  if (!cars.length) return notFound();

  const showroomName = cars[0].showroomId;

  return (
    <main
      className="
        max-w-6xl mx-auto
        px-4 sm:px-6
        py-6 space-y-6
      "
    >
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Showroom", href: "/showroom" },
          { label: showroomName },
        ]}
      />

      {/* HEADER */}
      <section className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {showroomName}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          DP ringan, angsuran fleksibel, proses cepat & aman.
        </p>
      </section>

      {/* CAR GRID */}
      <section
        className="
          grid grid-cols-2
          gap-3
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </section>
    </main>
  );
}
