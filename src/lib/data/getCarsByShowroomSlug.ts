// src/lib/data/getCarsByShowroomSlug.ts

import { getAllCars } from "@/lib/data/cars";
import { Car } from "@/types/car";

export async function getCarsByShowroomSlug(
  showroomSlug: string
): Promise<Car[]> {
  const cars = await getAllCars();

  return cars.filter(
    (car) =>
      car.showroomId === showroomSlug &&
      car.status === "available"
  );
}
