// src/app/blog/page.tsx

import Link from "next/link";
import { getAllPosts } from "@/lib/blog/getPosts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Artikel & Panduan Mobil Bekas
      </h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border rounded-lg p-4 hover:border-primary"
          >
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
