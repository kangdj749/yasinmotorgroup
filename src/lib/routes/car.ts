import { Car } from "@/types/car";

/**
 * URL resmi & aman untuk detail mobil
 * slug tetap SEO
 * id = identity sesungguhnya
 */
export function buildCarUrl(car: Pick<Car, "slug" | "id">) {
  return `/mobil/${car.slug}--${car.id}`;
}

/**
 * Ambil slug murni (buat SEO / fallback)
 */
export function extractSlug(slugWithId: string) {
  const parts = slugWithId.split("--");
  return parts.slice(0, -1).join("--") || slugWithId;
}

/**
 * Ambil ID dari URL (kalau ada)
 */
export function extractId(slugWithId: string) {
  const parts = slugWithId.split("--");
  return parts.length > 1 ? parts[parts.length - 1] : null;
}
