import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.yasinmotorgroup.com";

  return {

    rules: [

      {
        userAgent: "*",
        allow: "/"
      },

      {
        userAgent: "*",
        disallow: [

          "/api/",
          "/*?brand=",
          "/*?page=",
          "/*?sort=",
          "/*?filter="

        ]
      }

    ],

    sitemap: `${base}/sitemap.xml`

  };

}