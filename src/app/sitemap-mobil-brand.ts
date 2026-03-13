import { MetadataRoute } from "next";
import { getAllCars } from "@/lib/data/cars";

function slugify(text: string) {

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const cars = await getAllCars();

  const brands =
    Array.from(
      new Set(
        cars
          .filter((c) => c.status === "available")
          .map((c) => c.brand)
      )
    );

  return brands.map((brand) => ({

    url: `${base}/mobil/brand/${slugify(brand)}`,

    changeFrequency: "weekly",

    priority: 0.7

  }));

}