// src/components/ui/pagination.tsx

import Link from "next/link";

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
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}${query}`}
            className={`px-3 py-2 text-sm rounded border ${
              page === currentPage ? "bg-primary text-white" : ""
            }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
