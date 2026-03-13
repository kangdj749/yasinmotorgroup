import { BlogPost } from "@/types/blog"

export function searchPosts(
  posts: BlogPost[],
  query: string
){

 const q = query.toLowerCase()

 return posts.filter((post)=>{

  const title = post.title.toLowerCase()
  const excerpt = post.excerpt.toLowerCase()
  const tags = post.tags.toLowerCase()
  const category = post.category.toLowerCase()

  return (
   title.includes(q) ||
   excerpt.includes(q) ||
   tags.includes(q) ||
   category.includes(q)
  )

 })

}