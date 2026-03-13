import { InternalLinkItem } from "./carKeywordGenerator"

export function autoInternalLinkEngine(
  content: string,
  links: InternalLinkItem[],
  maxLinks = 5
): string {

  let updated = content
  let count = 0

  for (const item of links) {

    if (count >= maxLinks) break

    const regex =
      new RegExp(`\\b${item.keyword}\\b`, "i")

    if (regex.test(updated)) {

      updated =
        updated.replace(
          regex,
          `<a href="${item.url}" class="text-primary hover:underline">${item.keyword}</a>`
        )

      count++

    }

  }

  return updated

}