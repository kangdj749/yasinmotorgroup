import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const now = new Date();

  return [

    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },

    {
      url: `${base}/mobil`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },

    {
      url: `${base}/showroom`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },

    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    }

  ];

}