// src/lib/data/getShowrooms.ts

import { getSheetRows } from "@/lib/google/google-sheets";
import { Showroom } from "@/types/showroom";

export async function getShowrooms(): Promise<Showroom[]> {
  const rows = await getSheetRows("showroom");

  return rows
    .filter(
      (r: any) =>
        String(r.is_active).toLowerCase() === "true"
    )
    .sort(
      (a: any, b: any) =>
        Number(a.order || 999) - Number(b.order || 999)
    )
    .map((r: any) => ({
      slug: r.slug,
      name: r.name,
      description: r.description,
      isActive: true,
      order: Number(r.order),
      seoTitle: r.seo_title,
      seoDescription: r.seo_description,
    }));
}
