// lib/seo/carKeywordGenerator.ts

import type {
  CarSEO
} from "./fetchCarsForSEO"

export interface InternalLinkItem {

  keyword: string
  url: string

}

/* =====================================
   HELPER
===================================== */

function slugify(
  text: string
) {

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")

}

/* =====================================
   GENERATE KEYWORDS
===================================== */

export function generateCarKeywords(
  cars: CarSEO[]
): InternalLinkItem[] {

  const links: InternalLinkItem[] = []

  const used =
    new Set<string>()

  cars.forEach((car) => {

    const brand =
      car.brand
        ?.toLowerCase()
        .trim()

    const title =
      car.title
        ?.toLowerCase()
        .trim()

    const showroom =
      car.showroomName
        ?.toLowerCase()
        .trim()

    /* ----------------------------
       TITLE → DETAIL PAGE
    ----------------------------- */

    if (title && !used.has(title)) {

      links.push({

        keyword: title,
        url: `/mobil/${car.slug}`

      })

      used.add(title)

    }

    /* ----------------------------
       BRAND → BRAND PAGE
    ----------------------------- */

    if (brand && !used.has(brand)) {

      links.push({

        keyword: brand,
        url: `/mobil/brand/${slugify(
          brand
        )}`

      })

      used.add(brand)

    }

    /* ----------------------------
       BRAND BEKAS
    ----------------------------- */

    const brandBekas =
      `${brand} bekas`

    if (
      brand &&
      !used.has(brandBekas)
    ) {

      links.push({

        keyword: brandBekas,
        url: `/mobil/brand/${slugify(
          brand
        )}`

      })

      used.add(brandBekas)

    }

    /* ----------------------------
       SHOWROOM
    ----------------------------- */

    if (
      showroom &&
      !used.has(showroom)
    ) {

      links.push({

        keyword: showroom,
        url: `/showroom/${slugify(
          showroom
        )}`

      })

      used.add(showroom)

    }

  })

  return links

}