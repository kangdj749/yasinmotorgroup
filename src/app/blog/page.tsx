// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/blog/getAllPosts";

export const dynamic = "force-static";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">
        Blog Yasin Motor Group
      </h1>

      {posts.map((post) => (
        <article
          key={post.slug}
          className="border border-border rounded-xl p-5 hover:bg-muted/40 transition"
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="font-semibold text-lg">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {post.excerpt}
            </p>
          </Link>
        </article>
      ))}
    </main>
  );
}
