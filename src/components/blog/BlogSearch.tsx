"use client"

import { useState, useMemo } from "react"
import { BlogPost } from "@/types/blog"
import { searchPosts } from "@/lib/searchEngine"
import SearchResultCard from "./SearchResultCard"

interface Props{
 posts:BlogPost[]
}

export default function BlogSearch({posts}:Props){

 const [query,setQuery] = useState("")
 const [page,setPage] = useState(1)

 const perPage = 6

 const results = useMemo(()=>{

  if(!query) return []

  return searchPosts(posts,query)

 },[query,posts])

 const totalPages =
  Math.ceil(results.length/perPage)

 const paginated =
  results.slice(
   (page-1)*perPage,
   page*perPage
  )

 return(

 <div className="space-y-6">

 {/* Search Input */}

 <div className="flex gap-2">

 <input
 value={query}
 onChange={(e)=>{

  setQuery(e.target.value)
  setPage(1)

 }}
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
 focus:outline-none
 focus:shadow-[var(--shadow-focus)]
 "
 />

 </div>

 {/* Popular Search */}

 {!query && (

 <div className="flex flex-wrap gap-2">

 {[
 "website",
 "seo",
 "landing page",
 "digital marketing"
 ].map((tag)=>(
  
 <button
 key={tag}
 onClick={()=>setQuery(tag)}
 className="
 text-[11px]
 px-3
 py-1
 rounded-full
 bg-[rgb(var(--color-soft))]
 text-[rgb(var(--color-muted))]
 hover:bg-[rgb(var(--color-elevated))]
 "
 >
 {tag}
 </button>

 ))}

 </div>

 )}

 {/* Results */}

 {query &&(

 <div className="space-y-4">

 <p className="
 text-[12px]
 text-[rgb(var(--color-muted))]
 ">
 {results.length} artikel ditemukan
 </p>

 <div
 className="
 grid
 grid-cols-1
 sm:grid-cols-2
 lg:grid-cols-3
 gap-4
 "
 >

 {paginated.map((post)=>(

 <SearchResultCard
 key={post.slug}
 post={post}
 query={query}
 />

 ))}

 </div>

 {/* Pagination */}

 {totalPages>1 &&(

 <div className="flex gap-2 pt-2">

 {Array.from(
  {length:totalPages}
 ).map((_,i)=>{

  const p=i+1

  return(

  <button
  key={p}
  onClick={()=>setPage(p)}
  className={`
  text-[11px]
  px-3
  py-1
  rounded
  border
  ${
  page===p
  ?"bg-[rgb(var(--color-primary))] text-white border-transparent"
  :"border-[rgb(var(--color-border))] text-[rgb(var(--color-muted))]"
  }
  `}
  >
  {p}
  </button>

  )

 })}

 </div>

 )}

 </div>

 )}

 </div>

 )

}