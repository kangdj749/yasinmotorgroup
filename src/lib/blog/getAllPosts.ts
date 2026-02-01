// src/lib/blog/getAllPosts.ts
import { getSheetRows } from "@/lib/google/google-sheets";
import { BlogPost } from "@/types/blog";

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await getSheetRows("blog");

  return rows
    .filter(
      (p: any) =>
        String(p.is_published).toLowerCase() === "true" &&
        p.slug &&
        p.title &&
        p.content
    )
    .map((p: any) => ({
      is_published: true,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || "",
      content: String(p.content ?? ""),
      author: p.author,
      published_at: p.published_at,
      updated_at: p.updated_at,
      seo_title: p.seo_title,
      seo_description: p.seo_description,
      featured_image: p.featured_image,
    }));
}
