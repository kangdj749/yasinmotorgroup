import { getSheet } from "@/lib/google/google-sheets";
import { Promo } from "@/types/promo";

export async function getAllPromos(): Promise<Promo[]> {
  const promos = await getSheet<Promo>("promo");

  return promos.filter(
    (p) => p.slug && p.is_active === true
  );
}
