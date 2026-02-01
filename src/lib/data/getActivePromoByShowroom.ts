// src/lib/data/getActivePromoByShowroom.ts

import { getActivePromo } from "@/lib/data/getActivePromo";
import { getShowroomBySlug } from "@/lib/data/getShowroomBySlug";

export async function getActivePromoByShowroom(
  showroomSlug: string
) {
  const showroom = await getShowroomBySlug(showroomSlug);
  if (!showroom) return null;

  const data = await getActivePromo();
  if (!data) return null;

  const cars = data.cars.filter(
    (car) =>
      car.showroomId === showroom.slug && // ✅ RELASI BENAR
      car.status === "available"
  );

  if (!cars.length) return null;

  return {
    promo: data.promo,
    cars,
    showroom,
  };
}
