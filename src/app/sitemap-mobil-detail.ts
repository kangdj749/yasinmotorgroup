import { MetadataRoute } from "next";
import { getAllCars } from "@/lib/data/cars";
import { buildCarPath } from "@/lib/routes/car";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const cars = await getAllCars();

  return cars
    .filter((car) => car.status === "available")
    .map((car) => ({

      url: `${base}${buildCarPath(car)}`,

      lastModified: car.createdAt
        ? new Date(car.createdAt)
        : new Date(),

      changeFrequency: "weekly",

      priority: 0.8

    }));

}