import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blogHelpers"
import { BlogPost } from "@/types/blog"

export async function GET(req: Request) {

  const { searchParams } =
    new URL(req.url)

  const q =
    searchParams.get("q")?.toLowerCase().trim() || ""

  if (!q) {
    return NextResponse.json([])
  }

  const posts: BlogPost[] =
    await getAllPosts()

  const results = posts.filter(
    (post: BlogPost) => {

      const title =
        post.title.toLowerCase()

      const excerpt =
        post.excerpt.toLowerCase()

      const tags =
        post.tags.toLowerCase()

      return (
        title.includes(q) ||
        excerpt.includes(q) ||
        tags.includes(q)
      )

    }
  )

  return NextResponse.json(
    results.slice(0, 6)
  )

}