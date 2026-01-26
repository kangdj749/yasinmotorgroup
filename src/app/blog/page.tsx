import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Blog Carslead</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          Belum ada artikel.
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-border rounded-xl p-4 hover:bg-muted/40 transition"
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
        </div>
      )}
    </main>
  );
}
