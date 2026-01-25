// src/lib/parsers/parseCar.ts

import { Car } from "@/types/car";

export function parseCar(row: any[]): Car {
  return {
    id: row[0],
    slug: row[1],

    title: row[2],
    description: row[3],
    brand: row[4],
    showroomId: row[5],
    showroomName: row[6],
    dp: Number(row[7]),
    installment: Number(row[8]),
    tenor: row[9],

    image: row[10],
    gallery: row[11] ? row[11].split(",") : [],

    status: row[12],

    createdAt: row[13],
  };
}
