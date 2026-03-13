import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/googleSheetsBlog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const posts = await getBlogPosts();

  return posts.map((post) => ({

    url: `${base}/blog/${post.slug}`,

    lastModified:
      post.last_updated ??
      post.published_date,

    changeFrequency: "weekly",

    priority: 0.7

  }));

}