import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        title: data.title ?? "Untitled",
        slug: data.slug ?? file.replace(".md", ""),
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        content,
      };
    });
}
