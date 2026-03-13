import Link from "next/link"

interface Props {
  currentPage: number
  totalPages: number
}

export default function BlogPagination({
  currentPage,
  totalPages
}: Props) {

  if (totalPages <= 1) return null

  return (

    <nav
      className="
      flex
      items-center
      justify-center
      gap-2
      mt-10
      text-[12px]
      "
    >

      {currentPage > 1 && (

        <Link
          href={
            currentPage === 2
              ? "/blog"
              : `/blog/page/${currentPage - 1}`
          }
          className="
          px-3
          py-1
          border
          rounded
          border-[rgb(var(--border))]
          hover:text-[rgb(var(--primary))]
          "
        >
          Prev
        </Link>

      )}

      <span
        className="
        px-3
        py-1
        border
        rounded
        border-[rgb(var(--border))]
        opacity-70
        "
      >
        Page {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages && (

        <Link
          href={`/blog/page/${currentPage + 1}`}
          className="
          px-3
          py-1
          border
          rounded
          border-[rgb(var(--border))]
          hover:text-[rgb(var(--primary))]
          "
        >
          Next
        </Link>

      )}

    </nav>

  )

}