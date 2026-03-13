export function injectExternalLinks(
  content: string,
  externalLinks?: string
): string {

  if (!externalLinks) return content

  const links = externalLinks
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean)

  if (links.length === 0) return content

  const rendered = links
    .map((url) => {

      try {

        const hostname =
          new URL(url).hostname
            .replace("www.", "")

        return `
<p class="text-[12px] opacity-70">
Referensi tambahan:
<a 
href="${url}" 
target="_blank" 
rel="nofollow noopener"
class="underline text-[rgb(var(--primary))]"
>
${hostname}
</a>
</p>
`

      } catch {

        return ""

      }

    })
    .join("")

  return content + rendered

}