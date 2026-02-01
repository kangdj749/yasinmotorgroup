// src/lib/data/getCarsByShowroomId.ts

import { getSheet } from "../google/google-sheets";
import { Car } from "@/types/car";

export async function getCarsByShowroomId(
  showroomId: string,
  options?: {
    onlyAvailable?: boolean;
    onlyPromo?: boolean;
  }
): Promise<Car[]> {
  const sheet = await getSheet("cars");
  let cars = sheet as Car[];

  cars = cars.filter((car) => car.showroomId === showroomId);

  if (options?.onlyAvailable) {
    cars = cars.filter((car) => car.status === "available");
  }

  return cars;
}
