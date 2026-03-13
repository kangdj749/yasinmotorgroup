import Link from "next/link"
import { BlogPost } from "@/types/blog"
import { highlightKeyword } from "@/lib/highlightKeyword"

interface Props{
 post:BlogPost
 query:string
}

export default function SearchResultCard({post,query}:Props){

 const title =
 highlightKeyword(post.title,query)

 const excerpt =
 highlightKeyword(post.excerpt,query)

 return(

 <Link
 href={`/blog/${post.slug}`}
 className="
 block
 border
 border-[rgb(var(--color-border))]
 rounded-[var(--radius-lg)]
 p-3
 bg-[rgb(var(--color-surface))]
 shadow-[var(--shadow-soft)]
 hover:shadow-[var(--shadow-elevated)]
 transition
 "
 >

 <h3
 className="
 text-[13px]
 font-semibold
 text-[rgb(var(--color-text))]
 "
 dangerouslySetInnerHTML={{
  __html:title
 }}
 />

 <p
 className="
 text-[11px]
 mt-1
 text-[rgb(var(--color-subtle))]
 "
 >
 {post.published_date}
 </p>

 <p
 className="
 text-[12px]
 mt-2
 text-[rgb(var(--color-muted))]
 line-clamp-3
 "
 dangerouslySetInnerHTML={{
  __html:excerpt
 }}
 />

 </Link>

 )

}