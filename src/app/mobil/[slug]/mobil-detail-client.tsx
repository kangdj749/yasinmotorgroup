"use client";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const dynamic = "force-dynamic";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ZoomIn,
  X,
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

  // ✅ MODAL STATE
  const [showModal, setShowModal] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* ================= SALES LIST ================= */
  const salesList = [
    { name: "Rima", phone: "6282379296878" },
    { name: "Adel", phone: "628138260831" },
    { name: "Agus", phone: "6289686665682" },
    { name: "Vendra", phone: "62882000134517" },
    { name: "Rafli", phone: "6287821733684" },
    { name: "Afnan", phone: "6281312421998" },
    
  ];

  /* ================= IMAGE SOURCE ================= */
  const images = useMemo<string[]>(() => {
    return Array.from(
      new Set([car.image, ...(car.gallery || [])].filter(Boolean))
    );
  }, [car.image, car.gallery]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [car.id]);

  useEffect(() => {
    setActiveIndex(0);
    setZoom(false);
    setShowFullDesc(false);
  }, [car.id]);

  /* ================= GTM VIEW ================= */
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "view_mobil",
      car_id: car.id,
      car_name: car.title,
      brand: car.brand,
      price_installment: car.installment,
      dp: car.dp,
      showroom: car.showroomName,
    });
  }, [car.id]);

  const prevImage = () =>
    setActiveIndex((p) => (p > 0 ? p - 1 : images.length - 1));

  const nextImage = () =>
    setActiveIndex((p) => (p < images.length - 1 ? p + 1 : 0));

  /* ================= WA MESSAGE ================= */
  const buildWaLink = (phone: string) => {
    const message = encodeURIComponent(
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

    return `https://wa.me/${phone}?text=${message}`;
  };

  /* ================= WA CLICK ================= */
  const handleWaClick = (salesName: string) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "wa_click",
      car_id: car.id,
      car_name: car.title,
      brand: car.brand,
      showroom: car.showroomName,
      sales_name: salesName, // ✅ BONUS TRACKING
    });
  };

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
            sizes="(max-width: 768px) 100vw, 720px"
            placeholder="blur"
            blurDataURL="/blur-car.png"
            decoding="async"
            loading="lazy"
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

      {/* CTA */}
      <div className="pt-4">
        <button
          id="btn-wa"
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition"
        >
          TANYA UNIT DI WHATSAPP
        </button>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Pilih sales untuk melanjutkan
        </p>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Pilih Sales
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {/* LIST SALES */}
            <div className="space-y-3">
              {salesList.map((s) => (
                <a
                  key={s.phone}
                  href={buildWaLink(s.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWaClick(s.name)}
                  className="block w-full text-center py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RELATED */}
      <div className="max-w-6xl mx-auto px-2 space-y-4">
        <h2 className="font-semibold">Mobil Lain di Showroom Ini</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {related.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>

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