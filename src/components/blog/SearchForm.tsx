"use client"

import { useSearchParams } from "next/navigation"

export default function SearchForm() {

  const params = useSearchParams()
  const query = params.get("q") ?? ""

  return (

    <form
      action="/blog/search"
      method="GET"
      className="mb-6"
    >

      <div
        className="
        flex
        items-center
        gap-2
        "
      >

        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Cari artikel..."
          className="
          w-full
          rounded-[var(--radius-md)]
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          px-3
          py-2
          text-[13px]
          text-[rgb(var(--color-text))]
          placeholder:text-[rgb(var(--color-subtle))]
          focus:outline-none
          focus:shadow-[var(--shadow-focus)]
          "
        />

        <button
          type="submit"
          className="
          rounded-[var(--radius-md)]
          bg-[rgb(var(--color-primary))]
          px-4
          py-2
          text-[12px]
          font-medium
          text-white
          transition
          hover:opacity-90
          "
        >
          Cari
        </button>

      </div>

    </form>

  )
}