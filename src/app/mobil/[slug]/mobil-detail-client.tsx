"use client";
export const dynamic = "force-dynamic";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ZoomIn,
} from "lucide-react";
import { Car } from "@/types/car";
import CarCard from "@/components/car/car-card";
import Pagination from "@/components/ui/pagination";
import { buildCarUrl } from "@/lib/routes/car";
import { cloudinaryImage } from "@/lib/utils/cloudinary";

type Props = {
  car: Car;

  related: Car[];
  relatedPagination: {
    currentPage: number;
    totalPages: number;
  };

  allCars: Car[];
  brands: string[];
  allCarsPagination: {
    currentPage: number;
    totalPages: number;
  };
};

export default function MobilDetailClient({
  car,
  related,
  relatedPagination,
  allCars,
  brands,
  allCarsPagination,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* ================= IMAGE SOURCE ================= */
  const images = useMemo<string[]>(() => {
    return Array.from(
      new Set([car.image, ...(car.gallery || [])].filter(Boolean))
    );
  }, [car.image, car.gallery]);

  /* ================= UX SCROLL RESTORE ================= */
  // ⬇️ PASTIKAN LANGSUNG KE ATAS TANPA FLICKER
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [car.id]);

  /* ================= RESET STATE SAAT GANTI MOBIL ================= */
  useEffect(() => {
    setActiveIndex(0);
    setZoom(false);
    setShowFullDesc(false);
  }, [car.id]);

  const prevImage = () =>
    setActiveIndex((p) => (p > 0 ? p - 1 : images.length - 1));
  const nextImage = () =>
    setActiveIndex((p) => (p < images.length - 1 ? p + 1 : 0));

  /* ================= WHATSAPP ================= */
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "628123456789";

  const waMessage = encodeURIComponent(
    `Halo admin 👋
Saya tertarik dengan unit berikut:

🚗 ${car.title}
🏢 Showroom: ${car.showroomName || "-"}
💰 DP: Rp ${car.dp.toLocaleString("id-ID")}
📆 Angsuran: Rp ${car.installment.toLocaleString("id-ID")} / bulan
⏱ Tenor: ${car.tenor}

Link unit:
${typeof window !== "undefined" ? window.location.href : ""}

Mohon info lebih lanjut 🙏`
  );

  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  /* ================= RENDER ================= */
  return (
    <section className="bg-background min-h-screen py-8 px-4 space-y-14 pb-24">
      <div className="max-w-md mx-auto bg-card rounded-3xl shadow-card border border-border overflow-hidden">
        {/* BACK */}
        <div className="px-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-primary-soft border border-border text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>

        {/* IMAGE UTAMA */}
        <div
          className="relative w-full aspect-square overflow-hidden mt-4"
          onTouchStart={(e) =>
            (touchStartX.current = e.changedTouches[0].screenX)
          }
          onTouchEnd={(e) => {
            touchEndX.current = e.changedTouches[0].screenX;
            if (touchStartX.current - touchEndX.current > 50) nextImage();
            if (touchEndX.current - touchStartX.current > 50) prevImage();
          }}
        >
          <Image
            src={cloudinaryImage(images[activeIndex], "detail")}
            alt={car.title}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 768px) 100vw, 720px"
            placeholder="blur"
            blurDataURL="/blur-car.png"
            decoding="async"
            unoptimized
            className={`object-cover transition-transform duration-300 ${
              zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => setZoom((p) => !p)}
          />

          <div className="absolute bottom-3 right-3 bg-black/40 text-white p-2 rounded-full">
            <ZoomIn className="w-4 h-4" />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* GALERI */}
        {images.length > 1 && (
          <div className="px-4 py-3 bg-muted/40">
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => {
                    setActiveIndex(i);
                    setZoom(false);
                  }}
                  className={`relative w-20 aspect-square shrink-0 rounded-xl overflow-hidden border-2 ${
                    activeIndex === i ? "border-primary" : "border-border"
                  }`}
                >
                  <Image
                    src={cloudinaryImage(img, "thumb")}
                    alt=""
                    fill
                    sizes="80px"
                    loading="lazy"
                    decoding="async"
                    placeholder="blur"
                    blurDataURL="/blur-car.png"
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{car.title}</h1>
            {car.showroomName && (
              <p className="text-sm text-muted-foreground">
                {car.showroomName}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-primary font-bold text-2xl">
              DP Rp {car.dp.toLocaleString("id-ID")}
            </p>
            <p className="text-sm">
              Angsuran Rp {car.installment.toLocaleString("id-ID")} / bulan
            </p>
            <p className="text-xs text-muted-foreground">
              Tenor {car.tenor}
            </p>
          </div>

          {/* DESKRIPSI */}
          <div>
            <h2 className="font-semibold text-primary mb-2">
              Deskripsi Mobil
            </h2>
            <p
              className={`text-sm leading-relaxed whitespace-pre-line ${
                !showFullDesc ? "line-clamp-6" : ""
              }`}
            >
              {car.description || "Tidak ada deskripsi."}
            </p>
            {car.description && car.description.length > 200 && (
              <button
                onClick={() => setShowFullDesc((p) => !p)}
                className="text-primary text-sm mt-2"
              >
                {showFullDesc ? "Sembunyikan" : "Lihat Selengkapnya"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CTA WHATSAPP */}
      <div className="pt-4">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition"
        >
          TANYA UNIT DI WHATSAPP
        </a>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Team TM akan membalas langsung
        </p>
      </div>

      {/* RELATED */}
      <div className="max-w-6xl mx-auto px-2 space-y-4">
        <h2 className="font-semibold">Mobil Lain di Showroom Ini</h2>

        {related.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Belum ada unit lain.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        )}

        {allCarsPagination.totalPages > 1 && (
          <Pagination
            currentPage={allCarsPagination.currentPage}
            totalPages={allCarsPagination.totalPages}
            basePath={buildCarUrl(car)}
          />
        )}
      </div>
    </section>
  );
}
