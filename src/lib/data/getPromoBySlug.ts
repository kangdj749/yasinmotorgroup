import { getSheetRows } from "../google/google-sheets";
import { getAllCars } from "@/lib/data/cars";
import { Promo } from "@/types/promo";

export async function getPromoBySlug(
  slug: string
): Promise<{
  promo: Promo;
  cars: any[];
} | null> {
  const promos = await getSheetRows<Promo>("promo");

  const row = promos.find(
    (p) => p.slug === slug && p.is_active === true
  );

  if (!row) return null;

  /* ================= CAR IDS ================= */
  const carIds = Array.isArray(row.car_ids)
    ? row.car_ids
    : String(row.car_ids ?? "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

  /* ================= CARS ================= */
  const allCars = await getAllCars();

  const cars = allCars.filter((car) =>
    carIds.includes(String(car.id))
  );

  /* ================= NORMALIZED PROMO ================= */
  const promo: Promo = {
    is_active: row.is_active,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    description: Array.isArray(row.description)
      ? row.description.join(", ")
      : row.description,
    highlight_badge: row.highlight_badge,
    start_date: row.start_date,
    end_date: row.end_date,
    car_ids: carIds, // ✅ FIX DI SINI
    cta_text: row.cta_text,
    createdAt: row.createdAt,
  };

  return {
    promo,
    cars,
  };
}
