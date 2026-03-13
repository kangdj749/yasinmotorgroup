import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/googleSheetsBlog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const posts = await getBlogPosts();

  const categories =
    Array.from(
      new Set(
        posts.map((p) => p.category)
      )
    );

  return categories.map((category) => ({

    url: `${base}/blog/kategori/${category}`,

    changeFrequency: "weekly",

    priority: 0.6

  }));

}