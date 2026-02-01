import { MetadataRoute } from "next";
import { getAllPromos } from "@/lib/data/getAllPromos";
import { Promo } from "@/types/promo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yasinmotorgroup.com";
  const now = new Date();

  const promos = await getAllPromos();

  return promos.map((promo: Promo) => ({
    url: `${baseUrl}/promo/${promo.slug}`,
    lastModified: promo.start_date
      ? new Date(promo.start_date)
      : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
}
