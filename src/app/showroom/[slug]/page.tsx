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
    <main className="container py-6 space-y-6">
      {/* Header */}
      <Breadcrumb
        items={[
            { label: "Home", href: "/" },
            { label: "Showroom", href: "/showroom" },
            { label: showroomName },
        ]}
        />;
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">
          Showroom Mobil Bekas {showroomName}
        </h1>
        <p className="text-muted-foreground text-sm">
          DP ringan, angsuran fleksibel, proses cepat & aman.
        </p>
      </section>

      {/* List Mobil */}
      <section className="grid grid-cols-2 gap-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </section>
    </main>
  );
}
