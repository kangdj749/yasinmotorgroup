import type { BlogPost } from "@/types/blog"

/* ===============================
   CONFIG
================================ */

const SHEET_ID = process.env.GOOGLE_SHEET_ID_LP as string
const TAB_NAME = "posts2"

const OPENSHEET_URL =
  `https://opensheet.elk.sh/${SHEET_ID}/${TAB_NAME}`


/* ===============================
   NORMALIZER
================================ */

function normalizePost(row: Record<string, unknown>): BlogPost {

  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    category: String(row.category ?? ""),
    tags: String(row.tags ?? ""),
    cover_image: String(row.cover_image ?? ""),
    author: String(row.author ?? ""),
    published_date: String(row.published_date ?? ""),
    status: String(row.status ?? "draft"),
    meta_title: String(row.meta_title ?? ""),
    meta_description: String(row.meta_description ?? ""),
    focus_keyword: String(row.focus_keyword ?? ""),
    secondary_keywords: String(row.secondary_keywords ?? ""),
    longtail_keywords: String(row.longtail_keywords ?? ""),
    search_intent: String(row.search_intent ?? ""),
    internal_links: String(row.internal_links ?? ""),
    external_links: String(row.external_links ?? ""),
    faq: String(row.faq ?? ""),
    schema_type: String(row.schema_type ?? ""),
    last_updated: String(row.last_updated ?? "")
  }

}


/* ===============================
   BASE FETCHER
================================ */

export async function getBlogPosts(): Promise<BlogPost[]> {

  try {

    const res = await fetch(OPENSHEET_URL, {

      next: {
        revalidate: 300,
        tags: ["blog"]
      }

    })

    if (!res.ok) {

      console.error("OpenSheet fetch failed:", res.status)

      return []

    }

    const data: unknown = await res.json()

    if (!Array.isArray(data)) {

      console.error("Invalid blog data format")

      return []

    }

    const posts = data.map((row) =>
      normalizePost(row as Record<string, unknown>)
    )

    return posts.filter((post) => post.status === "published")

  }

  catch (error) {

    console.error("getBlogPosts error:", error)

    return []

  }

}