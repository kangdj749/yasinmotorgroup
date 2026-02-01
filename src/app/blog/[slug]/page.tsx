// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/blog/getPostBySlug";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <main className="container py-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>

      <article className="prose max-w-none">
        <ReactMarkdown>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
