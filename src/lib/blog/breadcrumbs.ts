/* ==================================
   BREADCRUMB ENGINE
   lib/blog/breadcrumbs.ts
================================== */

export interface BreadcrumbItem {
  name: string
  url: string
}

/* ==================================
   SLUGIFY HELPER
================================== */

function slugify(text: string): string {

  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")

}

/* ==================================
   GENERATE BREADCRUMBS
================================== */

export function generateBreadcrumbs(
  baseUrl: string,
  category: string,
  title: string,
  slug: string
): BreadcrumbItem[] {

  return [
    {
      name: "Home",
      url: baseUrl
    },
    {
      name: "Blog",
      url: `${baseUrl}/blog`
    },
    {
      name: category,
      url: `${baseUrl}/blog/kategori/${slugify(category)}`
    },
    {
      name: title,
      url: `${baseUrl}/blog/${slug}`
    }
  ]

}

/* ==================================
   GENERATE JSON-LD SCHEMA
================================== */

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
) {

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      })
    )
  }

}