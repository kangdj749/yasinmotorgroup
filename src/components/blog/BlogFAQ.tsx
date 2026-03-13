"use client"

import { useState } from "react"

interface FAQItem {
  q: string
  a: string
}

interface Props {
  items: FAQItem[]
}

export default function BlogFAQ({ items }: Props) {

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items?.length) return null

  return (

    <section
      className="
      mt-12
      border-t
      pt-6
      border-[rgb(var(--color-border))]
      "
    >

      <h2
        className="
        text-[15px]
        font-semibold
        tracking-tight
        text-[rgb(var(--color-text))]
        mb-4
        "
      >
        Pertanyaan Umum
      </h2>

      <div
        className="
        divide-y
        divide-[rgb(var(--color-border))]
        border
        border-[rgb(var(--color-border))]
        rounded-[var(--radius-md)]
        bg-[rgb(var(--color-surface))]
        "
      >

        {items.map((faq, i) => {

          const open = openIndex === i

          return (

            <div key={i}>

              <button
                onClick={() =>
                  setOpenIndex(open ? null : i)
                }
                className="
                w-full
                text-left
                px-4
                py-3
                flex
                items-start
                justify-between
                gap-3
                text-[12px]
                font-medium
                text-[rgb(var(--color-text))]
                hover:bg-[rgb(var(--color-elevated))]
                transition
                "
              >

                <span className="leading-snug">
                  {faq.q}
                </span>

                <span
                  className="
                  text-[rgb(var(--color-subtle))]
                  text-[12px]
                  "
                >
                  {open ? "–" : "+"}
                </span>

              </button>

              {open && (

                <div
                  className="
                  px-4
                  pb-4
                  text-[12px]
                  leading-relaxed
                  text-[rgb(var(--color-muted))]
                  "
                >
                  {faq.a}
                </div>

              )}

            </div>

          )

        })}

      </div>

    </section>

  )
}