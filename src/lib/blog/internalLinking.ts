import type { BlogPost } from "@/types/blog"

import {
  fetchCarsForSEO
} from "@/lib/seo/fetchCarsForSEO"

import {
  generateCarKeywords
} from "@/lib/seo/carKeywordGenerator"

interface LinkItem {
  keyword: string
  url: string
}

/* ======================================
   HELPERS
====================================== */

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

/* ======================================
   BLOG KEYWORD GENERATOR
====================================== */

function generateBlogKeywords(
  current: BlogPost,
  posts: BlogPost[]
): LinkItem[] {

  const links: LinkItem[] = []

  posts.forEach((p) => {

    if (p.slug === current.slug)
      return

    const keyword =
      p.focus_keyword ||
      p.title

    links.push({
      keyword: keyword.toLowerCase(),
      url: `/blog/${p.slug}`
    })

  })

  return links

}

/* ======================================
   APPLY LINK ENGINE
====================================== */

function applyLinks(
  content: string,
  links: LinkItem[],
  limit: number
) {

  let updated = content
  let count = 0

  for (const item of links) {

    if (count >= limit) break

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

/* ======================================
   MAIN ENGINE
====================================== */

export async function injectInternalLinks(
  html: string,
  currentPost: BlogPost,
  allPosts: BlogPost[]
) {

  /* -------------------------
     BLOG LINKS
  -------------------------- */

  const blogLinks =
    generateBlogKeywords(
      currentPost,
      allPosts
    )

  let content =
    applyLinks(
      html,
      blogLinks,
      3
    )

  /* -------------------------
     CAR LINKS
  -------------------------- */

  const cars =
    await fetchCarsForSEO()

  const carLinks =
    generateCarKeywords(cars)

  content =
    applyLinks(
      content,
      carLinks,
      2
    )

  return content

}