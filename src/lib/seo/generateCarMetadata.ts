// src/lib/seo/generateCarMetadata.ts

import { Car } from "@/types";

export function generateCarMetadata(car: Car) {
  const title = `${car.title} | DP ${Intl.NumberFormat("id-ID").format(
    car.dp
  )}`;

  const description = `Jual ${car.title}. DP mulai ${Intl.NumberFormat(
    "id-ID"
  ).format(car.dp)}, angsuran ${Intl.NumberFormat("id-ID").format(
    car.installment
  )} / bulan . Showroom ${car.showroomName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [car.image],
      type: "article",
    },
  };
}
