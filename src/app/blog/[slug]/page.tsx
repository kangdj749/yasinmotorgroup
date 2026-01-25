// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog/getPosts";

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="container py-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <article className="prose">
        {post.content}
      </article>
    </main>
  );
}
