// src/lib/data/getShowrooms.ts

import { getSheetRows } from "@/lib/google/google-sheets";
import { Showroom } from "@/types/showroom";

export async function getShowrooms(): Promise<Showroom[]> {
  const rows = await getSheetRows<Showroom>("showroom");

  return rows
    .filter((s) => s.isActive)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
