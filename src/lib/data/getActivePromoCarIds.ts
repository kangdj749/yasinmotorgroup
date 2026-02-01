// src/lib/data/getActivePromoCarIds.ts

import { getSheetRows } from "@/lib/google/google-sheets";

export async function getActivePromoCarIds(): Promise<string[]> {
  const promos = await getSheetRows("promo");

  return promos
    .filter(
      (p: any) =>
        String(p.is_active).toLowerCase() === "true"
    )
    .flatMap((p: any) =>
      String(p.car_ids || "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    );
}
