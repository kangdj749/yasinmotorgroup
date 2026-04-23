const KEY = "search_trending";

export function saveSearchKeyword(keyword: string) {
  if (!keyword) return;

  const raw = localStorage.getItem(KEY);
  const data: Record<string, number> = raw ? JSON.parse(raw) : {};

  const key = keyword.toLowerCase();

  data[key] = (data[key] || 0) + 1;

  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getTrendingKeywords(limit = 5): string[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];

  const data: Record<string, number> = JSON.parse(raw);

  return Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([k]) => k);
}