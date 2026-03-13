import { Car } from "@/types/car";

/* ================= BASE URL ================= */

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.yasinmotorgroup.com";

/* ================= BUILD URL ================= */

export function buildCarPath(car: Pick<Car, "slug" | "id">) {
  return `/mobil/${car.slug}--${car.id}`;
}

export function buildCarUrl(car: Pick<Car, "slug" | "id">) {
  return `${BASE}${buildCarPath(car)}`;
}

/* ================= PARSER ================= */

export function extractSlug(slugWithId: string) {
  const parts = slugWithId.split("--");
  return parts.slice(0, -1).join("--") || slugWithId;
}

export function extractId(slugWithId: string) {
  const parts = slugWithId.split("--");
  return parts.length > 1 ? parts[parts.length - 1] : null;
}