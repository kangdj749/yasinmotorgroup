import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const now = new Date();

  const pages = [1,2,3,4,5];

  return pages.map((page) => ({

    url:
      page === 1
        ? `${base}/mobil`
        : `${base}/mobil/page/${page}`,

    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8

  }));

}