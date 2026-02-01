// src/types/showroom.ts

export type Showroom = {
  slug: string;
  name: string;

  description?: string;
  address?: string;
  city?: string;
  mapsUrl?: string;
  phone?: string;

  isActive: boolean;
  order?: number;

  seoTitle?: string;
  seoDescription?: string;
};
