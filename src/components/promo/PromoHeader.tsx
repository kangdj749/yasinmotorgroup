import Link from "next/link";

export default function PromoHeader({ promo }: { promo: any }) {
  return (
    <div className="space-y-2">
      {/* Badge */}
      <span
        className="
          inline-block
          rounded-full
          bg-red-600
          px-3 py-1
          text-xs font-semibold text-white
        "
      >
        {promo.highlight_badge || "PROMO"}
      </span>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold leading-tight">
        {promo.title}
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
        {promo.description}
      </p>

      {/* CTA */}
      <Link
        href={`/promo/${promo.slug}`}
        className="
          inline-flex
          items-center
          text-sm font-semibold
          text-red-600
          hover:underline
        "
      >
        {promo.cta_text || "Lihat Promo"} →
      </Link>
    </div>
  );
}
