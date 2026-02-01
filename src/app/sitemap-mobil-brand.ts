import { MetadataRoute } from "next";
import { getAllCars } from "@/lib/data/cars";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://yasinmotorgroup.com";

  const cars = await getAllCars();

  const brands = Array.from(
    new Set(
      cars
        .filter((c) => c.status === "available")
        .map((c) => c.brand)
    )
  );

  return brands.map((brand) => ({
    url: `${baseUrl}/mobil?brand=${encodeURIComponent(
      brand
    )}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));
}
