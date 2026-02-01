import Link from "next/link";
import { getActivePromo } from "@/lib/data/getActivePromo";
import { CarCard } from "@/components/car";
import { Car } from "@/types/car";

export default async function PromoSection() {
  const data = await getActivePromo();
  console.log("PROMO DATA:", data);

  // ⛑️ JANGAN SILENT FAIL
  if (!data) {
    return (
      <section className="rounded-3xl border p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">
          Saat ini belum ada promo aktif.
        </p>
      </section>
    );
  }

  const { promo, cars } = data;

  if (!cars || cars.length === 0) {
    return (
      <section className="rounded-3xl border p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">
          Promo tersedia, tetapi belum ada unit terkait.
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        relative
        rounded-3xl
        border border-border
        bg-linear-to-br from-primary/10 via-background to-background
        p-4 sm:p-6
        space-y-4
      "
    >
      {/* BADGE */}
      <span
        className="
          inline-block
          bg-primary text-primary-foreground
          text-[11px] font-semibold
          px-3 py-1 rounded-full
        "
      >
        {promo.highlight_badge || "PROMO"}
      </span>

      {/* TITLE */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold">
          {promo.title}
        </h2>

        {(promo.subtitle || promo.description) && (
          <p className="text-sm text-muted-foreground max-w-xl">
            {promo.subtitle || promo.description}
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {cars.slice(0, 4).map((car: Car) => (
          <CarCard
            key={car.id}
            car={car}
            variant="promo"
          />
        ))}
      </div>

      {/* CTA */}
      <div className="pt-2 text-center">
        <Link
          href={`/promo/${promo.slug}`}
          className="
            inline-flex items-center justify-center
            rounded-full
            bg-primary text-primary-foreground
            px-5 py-2
            text-sm font-semibold
            hover:opacity-90
          "
        >
          {promo.cta_text || "Lihat Semua Promo"}
        </Link>
      </div>
    </section>
  );
}
