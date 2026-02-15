import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { getShowroomBySlug } from "@/lib/data/getShowroomBySlug";
import { getCarsByShowroomSlug } from "@/lib/data/getCarsByShowroomSlug";
import { getActivePromoByShowroom } from "@/lib/data/getActivePromoByShowroom";

import { CarCard } from "@/components/car";
import { Breadcrumb } from "@/components/ui/breadcrumb";

/* ================= ENV ================= */
const DEFAULT_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

/* ================= HELPER ================= */
function formatPhoneToWA(phone?: string | number | null) {
  if (!phone) return null;

  // paksa jadi string dulu (fix error replace)
  let clean = String(phone).trim();

  // hapus semua selain angka
  clean = clean.replace(/\D/g, "");

  if (!clean) return null;

  // kalau sudah mulai 62 → biarkan
  if (clean.startsWith("62")) {
    return clean;
  }

  // kalau mulai 8 (karena 0 hilang dari sheet)
  if (clean.startsWith("8")) {
    return "62" + clean;
  }

  // kalau mulai 0
  if (clean.startsWith("0")) {
    return "62" + clean.slice(1);
  }

  // fallback
  return "62" + clean;
}


function formatAddress(address?: string | number | null) {
  if (!address) return "";

  // paksa jadi string supaya tidak error split
  const clean = String(address).trim();

  if (!clean) return "";

  return clean
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(", ");
}


/* ================= SEO METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const showroom = await getShowroomBySlug(params.slug);

  if (!showroom) {
    return {
      title: "Showroom Tidak Ditemukan",
      robots: { index: false },
    };
  }

  return {
    title:
      showroom.seoTitle ||
      `${showroom.name} – Showroom Mobil Bekas Terpercaya`,
    description:
      showroom.seoDescription ||
      showroom.description ||
      `Daftar mobil bekas terbaik di ${showroom.name}. DP ringan & proses cepat.`,

    alternates: {
      canonical: `/showroom/${showroom.slug}`,
    },

    openGraph: {
      title:
        showroom.seoTitle ||
        `${showroom.name} – Showroom Mobil Bekas`,
      description:
        showroom.seoDescription ||
        showroom.description,
      url: `/showroom/${showroom.slug}`,
      type: "website",
    },
  };
}

/* ================= PAGE ================= */
export default async function ShowroomPage({
  params,
}: {
  params: { slug: string };
}) {
  const showroom = await getShowroomBySlug(params.slug);
  if (!showroom) return notFound();

  const cars = await getCarsByShowroomSlug(params.slug);
  const promoData = await getActivePromoByShowroom(params.slug);

  /* ================= WHATSAPP ================= */
  const showroomPhone = formatPhoneToWA(showroom.phone);
  const defaultPhone = formatPhoneToWA(DEFAULT_WHATSAPP);

  const finalPhone = showroomPhone || defaultPhone;

  const waLink = finalPhone
    ? `https://wa.me/${finalPhone}?text=${encodeURIComponent(
        `Halo ${showroom.name}, saya tertarik melihat unit mobil yang tersedia.`
      )}`
    : null;

  return (
    <main
      className="
        max-w-6xl mx-auto
        px-4 sm:px-6
        pt-6
        pb-32 sm:pb-10
        space-y-8
      "
    >
      {/* ================= JSON-LD ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: showroom.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: showroom.address,
              addressLocality: showroom.city,
              addressCountry: "ID",
            },
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/showroom/${showroom.slug}`,
            telephone: finalPhone ? `+${finalPhone}` : undefined,
          }),
        }}
      />

      {/* ================= BREADCRUMB ================= */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Showroom", href: "/showroom" },
          { label: showroom.name },
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {showroom.name}
        </h1>

        {showroom.city && (
          <p className="text-sm text-muted-foreground">
            {showroom.city}
          </p>
        )}

        {showroom.description && (
          <p className="text-sm max-w-2xl">
            {showroom.description}
          </p>
        )}
      </section>

      {/* ================= INFO CARD ================= */}
      <section className="rounded-2xl border border-border bg-card p-4 space-y-4">
        {(showroom.address || showroom.city) && (
          <div className="flex gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <span className="leading-relaxed whitespace-pre-line">
              {formatAddress(showroom.address)}
              {showroom.city && `\n${showroom.city}`}
            </span>
          </div>
        )}

        <div className="flex gap-4 flex-wrap">
          {showroom.mapsUrl?.trim() && (
            <Link
              href={showroom.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:underline"
            >
              📍 Buka di Google Maps
            </Link>
          )}

          {waLink && (
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:underline"
            >
              💬 Hubungi via WhatsApp
            </Link>
          )}
        </div>
      </section>

      {/* ================= PROMO ================= */}
      {promoData && (
        <section
          className="
            rounded-2xl
            border
            bg-primary/5
            p-4
            space-y-3
          "
        >
          <h2 className="font-semibold text-base">
            🔥 Promo Aktif
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {promoData.cars.slice(0, 3).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                variant="promo"
              />
            ))}
          </div>

          <Link
            href={`/promo/${promoData.promo.slug}`}
            className="text-xs text-primary font-medium"
          >
            Lihat detail promo →
          </Link>
        </section>
      )}

      {/* ================= CAR GRID ================= */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">
          Unit Tersedia
        </h2>

        {cars.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Belum ada unit tersedia di showroom ini.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* ================= MOBILE CTA ================= */}
      {waLink && (
        <div
          className="
            fixed bottom-0 left-0 right-0
            sm:hidden
            border-t
            bg-background/95 backdrop-blur
            p-3
            z-40
          "
        >
          <Link
            href={waLink}
            className="
              block text-center
              bg-primary text-primary-foreground
              rounded-full
              py-3
              font-semibold text-sm
            "
          >
            Hubungi via WhatsApp
          </Link>
        </div>
      )}
    </main>
  );
}
