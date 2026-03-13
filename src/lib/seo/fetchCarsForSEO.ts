// lib/seo/fetchCarsForSEO.ts

import { getAllCars } from "@/lib/data/cars"
import type { Car } from "@/types/car"

/* =====================================
   TYPE UNTUK SEO ENGINE
===================================== */

export interface CarSEO {

  slug: string
  title: string
  brand: string
  showroomName: string

}

/* =====================================
   NORMALIZER SEO
===================================== */

function normalizeCarForSEO(
  car: Car
): CarSEO {

  return {

    slug: car.slug,
    title: car.title,
    brand: car.brand ?? "",
    showroomName: car.showroomName ?? ""

  }

}

/* =====================================
   FETCH CARS UNTUK SEO
===================================== */

export async function fetchCarsForSEO(): Promise<CarSEO[]> {

  try {

    const cars =
      await getAllCars()

    if (!cars.length)
      return []

    const seoCars =
      cars
        .filter(
          (c) =>
            c.status === "available"
        )
        .map(
          normalizeCarForSEO
        )

    return seoCars

  } catch (error) {

    console.error(
      "fetchCarsForSEO error:",
      error
    )

    return []

  }

}