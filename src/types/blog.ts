// src/types/blog.ts
export type BlogPost = {
  is_published: boolean;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  published_at?: string;
  updated_at?: string;
  seo_title?: string;
  seo_description?: string;
  featured_image?: string;
};
