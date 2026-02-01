// src/lib/blog/getPostBySlug.ts
import { getAllPosts } from "./getAllPosts";

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
