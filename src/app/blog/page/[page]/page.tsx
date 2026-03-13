import { notFound } from "next/navigation"

import { getBlogPosts } from "@/lib/googleSheetsBlog"

import BlogCard from "@/components/blog/BlogCard"
import BlogPagination from "@/components/blog/BlogPagination"

import type { BlogPost } from "@/types/blog"

interface PageProps {
  params: {
    page: string
  }
}

const POSTS_PER_PAGE = 9

export default async function BlogPaginationPage(
  { params }: PageProps
) {

  const page =
    parseInt(params.page)

  if (
    Number.isNaN(page) ||
    page < 1
  ) notFound()

  const posts =
    await getBlogPosts() as BlogPost[]

  const sorted =
    [...posts].sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    )

  const totalPages =
    Math.ceil(
      sorted.length / POSTS_PER_PAGE
    )

  if (page > totalPages)
    notFound()

  const start =
    (page - 1) *
    POSTS_PER_PAGE

  const paginated =
    sorted.slice(
      start,
      start + POSTS_PER_PAGE
    )

  return (

    <main
      className="
      mx-auto
      max-w-[1020px]
      px-4
      py-8
      "
    >

      <header
        className="
        mb-6
        space-y-1
        "
      >

        <h1
          className="
          text-[18px]
          font-semibold
          "
        >
          Blog Otomotif
        </h1>

        <p
          className="
          text-[12px]
          opacity-70
          "
        >
          Halaman {page}
        </p>

      </header>

      <section
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        "
      >

        {paginated.map((post) => (

          <BlogCard
            key={post.slug}
            post={post}
          />

        ))}

      </section>

      <BlogPagination
        currentPage={page}
        totalPages={totalPages}
      />

    </main>

  )

}