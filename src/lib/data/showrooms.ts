import { Showroom } from "@/types/showroom";

/**
 * Sementara static data
 * nanti gampang diganti ke DB / API
 */
const SHOWROOMS: Showroom[] = [
  {
    id: "bandung-1",
    slug: "bandung-barat",
    name: "Bandung Barat",
    city: "Bandung",
    createdAt: "2024-01-01",
  },
  {
    id: "jakarta-1",
    slug: "jakarta-selatan",
    name: "Jakarta Selatan",
    city: "Jakarta",
    createdAt: "2024-01-05",
  },
];

export async function getShowrooms(): Promise<Showroom[]> {
  return SHOWROOMS;
}
