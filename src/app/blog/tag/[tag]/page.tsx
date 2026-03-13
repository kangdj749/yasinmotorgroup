import { getBlogPosts } from "@/lib/googleSheetsBlog"
import { getPostsByTag } from "@/lib/blogHelpers"
import BlogCard from "@/components/blog/BlogCard"
import type { BlogPost } from "@/types/blog"

interface TagPageProps {
  params: {
    tag: string
  }
}

/* --------------------------------
   Static Params (SSG Tags)
-------------------------------- */

export async function generateStaticParams(): Promise<
  { tag: string }[]
> {
  const posts: BlogPost[] = await getBlogPosts()

  const tags = [
    ...new Set(
      posts.flatMap((post) =>
        post.tags
          .split(",")
          .map((t) => t.trim())
      )
    ),
  ]

  return tags.map((tag) => ({
    tag: tag
      .toLowerCase()
      .replace(/\s+/g, "-"),
  }))
}

/* --------------------------------
   Tag Page
-------------------------------- */

export async function generateMetadata({ params }: TagPageProps) {

  const tagName = params.tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `Artikel ${tagName} | Blog Mobil Bekas`,
    description: `Kumpulan artikel tentang ${tagName} seputar mobil bekas berkualitas dan panduan membeli mobil bekas.`,
  }
}

export default async function TagPage({
  params,
}: TagPageProps) {

  const posts: BlogPost[] = await getBlogPosts()

  const tagSlug = params.tag

  const tagPosts: BlogPost[] =
    getPostsByTag(posts, tagSlug)

  const tagName = tagSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <main
      className="
      mx-auto
      w-full
      max-w-[1020px]
      px-4
      py-6
      "
    >
      {/* Header */}

      <header
        className="
        mb-6
        space-y-1
        "
      >
        <h1
          className="
          text-[15px]
          font-semibold
          tracking-tight
          capitalize
          text-[rgb(var(--foreground))]
          "
        >
          Artikel Tag: {tagName}
        </h1>

        <p
          className="
          text-[12px]
          text-[rgb(var(--foreground)/0.6)]
          "
        >
          Kumpulan artikel dengan topik {tagName}
        </p>
      </header>

      {/* Content */}

      {tagPosts.length === 0 ? (
        <div
          className="
          rounded-lg
          border
          border-[rgb(var(--border))]
          bg-[rgb(var(--card))]
          px-5
          py-6
          text-center
          "
        >
          <p
            className="
            text-[12px]
            text-[rgb(var(--foreground)/0.6)]
            "
          >
            Belum ada artikel untuk tag ini.
          </p>
        </div>
      ) : (
        <section
          className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          "
        >
          {tagPosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
            />
          ))}
        </section>
      )}
    </main>
  )
}