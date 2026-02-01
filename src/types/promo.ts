export type Promo = {
  is_active: boolean;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  highlight_badge?: string;
  start_date?: string;
  end_date?: string;
  car_ids?: string[];
  cta_text?: string;
  createdAt?: string;
};
