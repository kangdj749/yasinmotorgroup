export function formatBlogContent(content: string): string {

  if (!content) return ""

  return content
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
}