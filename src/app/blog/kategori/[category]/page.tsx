import { getBlogPosts } from "@/lib/googleSheetsBlog"
import { getPostsByCategory } from "@/lib/blogHelpers"
import BlogCard from "@/components/blog/BlogCard"
import type { BlogPost } from "@/types/blog"

interface CategoryPageProps {
  params: {
    category: string
  }
}

/* --------------------------------
   Generate Static Params (SSG)
-------------------------------- */

export async function generateStaticParams(): Promise<
  { category: string }[]
> {
  const posts: BlogPost[] = await getBlogPosts()

  const categories = [
    ...new Set(
      posts
        .map((post) => post.category)
        .filter(Boolean)
    ),
  ]

  return categories.map((category) => ({
    category: category
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-"),
  }))
}

/* --------------------------------
   Category Page
-------------------------------- */

export default async function CategoryPage({
  params,
}: CategoryPageProps) {

  const posts: BlogPost[] = await getBlogPosts()

  const categorySlug = params.category

  const categoryPosts: BlogPost[] =
    getPostsByCategory(posts, categorySlug)

  const categoryTitle = categorySlug
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
      {/* ---------------- Header ---------------- */}

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
          Artikel {categoryTitle}
        </h1>

        <p
          className="
          text-[12px]
          text-[rgb(var(--foreground)/0.6)]
          "
        >
          Kumpulan artikel terkait {categoryTitle}
        </p>
      </header>

      {/* ---------------- Content ---------------- */}

      {categoryPosts.length === 0 ? (
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
            Belum ada artikel pada kategori ini.
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
          {categoryPosts.map((post) => (
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