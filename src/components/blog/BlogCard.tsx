import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/types/blog"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {

  return (

    <article
      className="
      group
      rounded-[var(--radius-lg)]
      border
      border-[rgb(var(--color-border))]
      bg-[rgb(var(--color-surface))]
      overflow-hidden
      shadow-[var(--shadow-soft)]
      transition
      hover:shadow-[var(--shadow-elevated)]
      "
    >

      <Link
        href={`/blog/${post.slug}`}
        className="block"
      >

        {/* Cover */}

        <div
          className="
          relative
          w-full
          h-[140px]
          overflow-hidden
          "
        >

          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
            "
          />

        </div>

        {/* Content */}

        <div
          className="
          p-3
          space-y-2
          "
        >

          {/* Title */}

          <h3
            className="
            text-[13px]
            font-semibold
            leading-snug
            tracking-tight
            text-[rgb(var(--color-text))]
            group-hover:text-[rgb(var(--color-primary))]
            transition-colors
            line-clamp-2
            "
          >
            {post.title}
          </h3>

          {/* Date */}

          <p
            className="
            text-[11px]
            text-[rgb(var(--color-subtle))]
            "
          >
            {post.published_date}
          </p>

          {/* Excerpt */}

          <p
            className="
            text-[12px]
            leading-relaxed
            text-[rgb(var(--color-muted))]
            line-clamp-3
            "
          >
            {post.excerpt}
          </p>

        </div>

      </Link>

    </article>

  )

}