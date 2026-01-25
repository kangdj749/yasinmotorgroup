// src/lib/pagination/paginate.ts

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
) {
  const total = items.length;
  const totalPages = Math.ceil(total / perPage);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    data: items.slice(start, end),
    total,
    totalPages,
    currentPage: page,
  };
}
