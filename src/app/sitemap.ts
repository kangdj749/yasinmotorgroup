import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  const now = new Date();

  return [

    { url: `${base}/sitemap-static.xml`, lastModified: now },
    { url: `${base}/sitemap-mobil.xml`, lastModified: now },
    { url: `${base}/sitemap-mobil-detail.xml`, lastModified: now },
    { url: `${base}/sitemap-mobil-brand.xml`, lastModified: now },
    
    { url: `${base}/sitemap-blog.xml`, lastModified: now },
    { url: `${base}/sitemap-blog-category.xml`, lastModified: now },
    { url: `${base}/sitemap-blog-tag.xml`, lastModified: now },
    { url: `${base}/sitemap-promo.xml`, lastModified: now }

  ];

}