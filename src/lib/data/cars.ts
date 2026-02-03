// src/lib/data/cars.ts
import { Car } from "@/types/car";
import { safeJsonParse } from "@/lib/utils/json";

/* ===============================
   CONFIG
================================ */
const SHEET_ID = process.env.GOOGLE_SHEET_CARS_ID!;
const TAB_NAME = "cars";
const OPENSHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${TAB_NAME}`;

/* ===============================
   NORMALIZER
================================ */
function normalizeCar(row: any): Car {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: row.description ?? "",
    brand: row.brand ?? "",
    showroomId: row.showroomId ?? "",
    showroomName: row.showroomName ?? "",

    dp: Number(row.dp) || 0,
    installment: Number(row.installment) || 0,
    tenor: row.tenor ?? "",

    image: row.image ?? "",

    // ✅ FIX UTAMA (ANTI CRASH)
    gallery: safeJsonParse<string[]>(row.gallery, []),

    status: row.status || "available",
    createdAt: row.createdAt,
  };
}

/* ===============================
   BASE FETCHER (PUBLIC READ)
================================ */
export async function getAllCars(): Promise<Car[]> {
  try {
    const res = await fetch(OPENSHEET_URL, {
      next: {
        revalidate: 300, // ISR 5 menit
        tags: ["cars"],
      },
    });

    if (!res.ok) {
      console.error("OpenSheet failed:", res.status);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map(normalizeCar);
  } catch (error) {
    console.error("getAllCars error:", error);
    return [];
  }
}

/* ===============================
   QUERIES
================================ */
export async function getCarBySlug(
  slug: string
): Promise<Car | null> {
  const cars = await getAllCars();
  return cars.find((c) => c.slug === slug) ?? null;
}

export async function getCarById(
  id: string
): Promise<Car | null> {
  const cars = await getAllCars();
  return cars.find((c) => c.id === id) ?? null;
}

export async function getCarsByShowroomId(
  showroomId: string,
  options?: {
    onlyAvailable?: boolean;
  }
): Promise<Car[]> {
  const cars = await getAllCars();

  return cars.filter((c) => {
    if (c.showroomId !== showroomId) return false;
    if (options?.onlyAvailable && c.status !== "available")
      return false;
    return true;
  });
}

export async function getRelatedCarsByShowroom(
  showroomId: string,
  excludeId?: string,
  limit = 6
): Promise<Car[]> {
  const cars = await getCarsByShowroomId(showroomId, {
    onlyAvailable: true,
  });

  return cars
    .filter((c) => !excludeId || c.id !== excludeId)
    .slice(0, limit);
}
