"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  query = "",
}: Props) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const createPageLink = (page: number) =>
    `${basePath}?page=${page}${query}`;

  const siblingCount = 1; // lebih compact mobile friendly
  const left = Math.max(currentPage - siblingCount, 1);
  const right = Math.min(currentPage + siblingCount, totalPages);

  const pages: (number | "ellipsis-left" | "ellipsis-right")[] = [];

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("ellipsis-left");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages) {
    if (right < totalPages - 1) pages.push("ellipsis-right");
    pages.push(totalPages);
  }

  const handleNavigate = (page: number) => {
    if (page === currentPage) return;

    // smooth scroll sebelum navigation
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      router.push(createPageLink(page));
    }, 150);
  };

  return (
    <nav
      className="flex justify-center mt-10"
      aria-label="Pagination Navigation"
    >
      <div className="flex items-center gap-1 sm:gap-2">
        {/* FIRST - desktop only */}
        <button
          onClick={() => handleNavigate(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex px-3 py-2 text-sm rounded-full border border-border bg-background hover:bg-muted transition disabled:opacity-40"
        >
          «
        </button>

        {/* PREV */}
        <button
          onClick={() => handleNavigate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm rounded-full border border-border transition hover:bg-muted disabled:opacity-40"
        >
          ‹
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((page, index) => {
          if (page === "ellipsis-left" || page === "ellipsis-right") {
            return (
              <span
                key={page + index}
                className="px-2 text-sm text-muted-foreground"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`px-3 py-2 text-sm rounded-full border border-border transition
                ${
                  page === currentPage
                    ? "bg-primary text-white border-primary shadow-sm scale-105"
                    : "hover:bg-muted"
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={() => handleNavigate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm rounded-full border border-border transition hover:bg-muted disabled:opacity-40"
        >
          ›
        </button>

        {/* LAST - desktop only */}
        <button
          onClick={() => handleNavigate(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex px-3 py-2 text-sm rounded-full border border-border bg-background hover:bg-muted transition disabled:opacity-40"
        >
          »
        </button>
      </div>
    </nav>
  );
}
