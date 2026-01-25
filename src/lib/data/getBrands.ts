// src/lib/data/getBrands.ts

import { getAllCars } from "@/lib/data/cars";

export async function getBrands(): Promise<string[]> {
  const cars = await getAllCars();
  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  return brands.sort();
}
