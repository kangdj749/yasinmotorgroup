import { fetchCarsForSEO }
  from "@/lib/seo/fetchCarsForSEO"

import { generateCarKeywords }
  from "@/lib/seo/carKeywordGenerator"

import { autoInternalLinkEngine }
  from "@/lib/seo/autoInternalLinkEngine"

export async function applyInternalLinks(
  html: string
) {

  const cars =
    await fetchCarsForSEO()

  const keywords =
    generateCarKeywords(cars)

  const updated =
    autoInternalLinkEngine(
      html,
      keywords,
      5
    )

  return updated

}