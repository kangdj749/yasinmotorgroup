import BlogCard from "./BlogCard"
import type { BlogPost } from "@/types/blog"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {

  if (posts.length === 0) return null

  return (

    <section
      className="
      mt-14
      pt-8
      border-t
      border-[rgb(var(--color-border))]
      "
    >

      <header className="mb-5">

        <h3
          className="
          text-[15px]
          font-semibold
          tracking-tight
          text-[rgb(var(--color-text))]
          "
        >
          Artikel Terkait
        </h3>

      </header>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        "
      >

        {posts.map((post) => (

          <BlogCard
            key={post.slug}
            post={post}
          />

        ))}

      </div>

    </section>

  )

}