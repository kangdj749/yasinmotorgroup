/* ==================================
   POPULAR ARTICLES ENGINE
   lib/blog/popularArticles.ts
================================== */

export interface BlogPost {
  slug: string
  title: string
  focus_keyword: string
  secondary_keywords?: string
  category?: string
  views?: number
  published_at?: string
}

/* ==================================
   CALCULATE SCORE
================================== */

function calculateScore(post: BlogPost): number {

  const viewsScore = post.views ?? 0

  let recencyScore = 0

  if (post.published_at) {

    const published = new Date(post.published_at)

    if (!isNaN(published.getTime())) {

      const days =
        (Date.now() - published.getTime()) /
        (1000 * 60 * 60 * 24)

      recencyScore = Math.max(0, 30 - days)

    }

  }

  return viewsScore + recencyScore * 10

}

/* ==================================
   GET POPULAR ARTICLES
================================== */

export function getPopularArticles(
  posts: BlogPost[],
  limit = 5
): BlogPost[] {

  if (!posts?.length) return []

  return [...posts]
    .sort(
      (a, b) =>
        calculateScore(b) -
        calculateScore(a)
    )
    .slice(0, limit)

}