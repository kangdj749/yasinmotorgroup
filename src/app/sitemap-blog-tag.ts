import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/googleSheetsBlog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const posts = await getBlogPosts();

  const tags =
    Array.from(
      new Set(
        posts.flatMap((p) =>
          p.tags?.split(",").map((t) => t.trim()) ?? []
        )
      )
    );

  return tags.map((tag) => ({

    url: `${base}/blog/tag/${tag}`,

    changeFrequency: "weekly",

    priority: 0.6

  }));

}