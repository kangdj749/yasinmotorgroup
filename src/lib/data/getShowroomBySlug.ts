// src/lib/data/getShowroomBySlug.ts

import { getSheetRows } from "@/lib/google/google-sheets";
import { Showroom } from "@/types/showroom";

export async function getShowroomBySlug(
  slug: string
): Promise<Showroom | null> {
  const rows = await getSheetRows<Showroom>("showroom");

  const showroom = rows.find(
    (s) =>
      s.slug === slug &&
      s.isActive === true
  );

  return showroom ?? null;
}
