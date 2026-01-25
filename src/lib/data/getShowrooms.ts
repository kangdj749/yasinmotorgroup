// src/lib/data/getShowrooms.ts

import { getAllCars } from "@/lib/data/cars";
import { slugify } from "@/lib/utils/slugify";

export type Showroom = {
  name: string;
  slug: string;
};

export async function getShowrooms(): Promise<Showroom[]> {
  const cars = await getAllCars();

  const map = new Map<string, Showroom>();

  cars.forEach((car) => {
    if (!map.has(car.showroomId)) {
      map.set(car.showroomId, {
        name: car.showroomId,
        slug: slugify(car.showroomId),
      });
    }
  });

  return Array.from(map.values());
}
