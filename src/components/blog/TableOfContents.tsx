interface TOCItem {
  id: string
  text: string
  level?: 2 | 3
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {

  if (!items || items.length === 0) return null

  return (

    <aside
      className="
      mb-8
      rounded-[var(--radius-lg)]
      border
      border-[rgb(var(--color-border))]
      bg-[rgb(var(--color-surface))]
      p-4
      shadow-[var(--shadow-soft)]
      "
    >

      <p
        className="
        mb-3
        text-[13px]
        font-semibold
        tracking-tight
        text-[rgb(var(--color-text))]
        "
      >
        Daftar Isi
      </p>

      <nav aria-label="Table of contents">

        <ul className="space-y-1">

          {items.map((item) => {

            const level = item.level ?? 2
            const isSub = level === 3

            return (

              <li
                key={item.id}
                className={`
                ${isSub ? "ml-3 pl-3 border-l border-[rgb(var(--color-border))]" : ""}
                `}
              >

                <a
                  href={`#${item.id}`}
                  className="
                  block
                  text-[13px]
                  leading-relaxed
                  text-[rgb(var(--color-muted))]
                  transition-colors
                  hover:text-[rgb(var(--color-primary))]
                  "
                >
                  {item.text}
                </a>

              </li>

            )

          })}

        </ul>

      </nav>

    </aside>

  )
}