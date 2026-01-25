// src/lib/seo/carJsonLd.ts

import { Car } from "@/types/car";

export function carJsonLd(car: Car) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: car.title,
    description: car.description,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },

    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: car.dp,
      availability:
        car.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "AutoDealer",
        name: car.showroomName ?? "Showroom Mobil",
      },
    },

    image: [
      car.image,
      ...car.gallery,
    ],

    vehicleModelDate: car.createdAt,
  };
}
