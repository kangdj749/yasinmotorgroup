// src/lib/blog/getPosts.ts

import fs from "fs";
import path from "path";

const POSTS_PATH = path.join(process.cwd(), "content/blog");

export function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH);

  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    const raw = fs.readFileSync(
      path.join(POSTS_PATH, file),
      "utf-8"
    );

    const [meta, content] = raw.split("---").slice(1);

    const data = Object.fromEntries(
      meta
        .trim()
        .split("\n")
        .map((line) => line.split(": "))
    );

    return {
      slug,
      content,
      ...data,
    };
  });
}
