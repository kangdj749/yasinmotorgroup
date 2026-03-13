import { BlogPost } from "@/types/blog"
import { slugify } from "./slugify"
import { getBlogPosts } from "./googleSheetsBlog"

/* =========================
   GET ALL POSTS
========================= */

export async function getAllPosts(): Promise<BlogPost[]> {

  return await getBlogPosts()

}

/* =========================
   CATEGORIES
========================= */

export function getCategories(posts: BlogPost[]) {

  const categories = posts.map(p => p.category)

  return [...new Set(categories)]

}

/* =========================
   TAGS
========================= */

export function getTags(posts: BlogPost[]) {

  const tags = posts
    .flatMap(p => p.tags.split(","))

  return [...new Set(tags)]

}

/* =========================
   POSTS BY CATEGORY
========================= */

export function getPostsByCategory(
  posts: BlogPost[],
  categorySlug: string
){

  const normalizedSlug =
    slugify(categorySlug)

  return posts.filter(
    (post) =>
      slugify(post.category) === normalizedSlug
  )

}

/* =========================
   POSTS BY TAG
========================= */

export function getPostsByTag(
  posts: BlogPost[],
  tagSlug: string
){

  const normalizedTag =
    slugify(tagSlug)

  return posts.filter((post) => {

    const tags = post.tags
      .split(",")
      .map((t) => slugify(t.trim()))

    return tags.includes(normalizedTag)

  })

}