// src/types/post.ts

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;

  category: string;
  cover: string;

  publishedAt: string;
};
