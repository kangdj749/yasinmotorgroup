import { getSheetRows } from "../google/google-sheets";
import { getAllCars } from "@/lib/data/cars";
import { Car } from "@/types/car";

/* ================= TYPES ================= */

export type Promo = {
  is_active: boolean;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  highlight_badge?: string;
  car_ids: string; // comma separated string from sheet
  cta_text?: string;
};

export type PromoWithCars = {
  promo: Promo;
  cars: Car[];
};

/* ================= HELPERS ================= */

function parseCarIds(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map(String);
  }

  return String(value)
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/* ================= MAIN ================= */

export async function getActivePromo(): Promise<PromoWithCars | null> {
  const promos = await getSheetRows<Promo>("promo");

  // ambil promo aktif pertama
  const activePromo = promos.find(
    (p) => p.is_active === true
  );

  if (!activePromo) return null;

  const carIds = parseCarIds(activePromo.car_ids);

  if (!carIds.length) {
    return {
      promo: activePromo,
      cars: [],
    };
  }

  const allCars = await getAllCars();

  const promoCars = allCars.filter((car) =>
    carIds.includes(car.id)
  );

  return {
    promo: activePromo,
    cars: promoCars,
  };
}
