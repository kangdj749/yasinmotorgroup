import { BlogPost } from "@/types/blog"

export function getRelatedPosts(
 posts:BlogPost[],
 current:BlogPost
){

 const currentTags =
 current.tags.split(",")

 const related = posts.filter(post=>{

 if(post.slug === current.slug) return false

 const postTags = post.tags.split(",")

 const sameTag =
 postTags.some(tag=>currentTags.includes(tag))

 const sameCategory =
 post.category === current.category

 return sameTag || sameCategory

 })

 return related.slice(0,3)

}