import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://yasinmotorgroup.com";

  const now = new Date();

  return [
    { url: `${baseUrl}/sitemap-static.xml`, lastModified: now },
    { url: `${baseUrl}/sitemap-mobil.xml`, lastModified: now },
    { url: `${baseUrl}/sitemap-mobil-brand.xml`, lastModified: now },
    { url: `${baseUrl}/sitemap-mobil-kota.xml`, lastModified: now },
    { url: `${baseUrl}/sitemap-showroom.xml`, lastModified: now },
    { url: `${baseUrl}/sitemap-promo.xml`, lastModified: now },
    { url: `${baseUrl}/sitemap-blog.xml`, lastModified: now },
  ];
}
