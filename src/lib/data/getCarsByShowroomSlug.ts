// src/lib/data/getCarsByShowroomSlug.ts

import { getAllCars } from "@/lib/data/cars";
import { slugify } from "@/lib/utils/slugify";

export async function getCarsByShowroomSlug(slug: string) {
  const cars = await getAllCars();
  return cars.filter(
    (car) => slugify(car.showroomId) === slug
  );
}
