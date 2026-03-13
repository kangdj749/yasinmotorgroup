import { getBlogPosts } from "@/lib/googleSheetsBlog"
import BlogSearch from "@/components/blog/BlogSearch"

export default async function SearchPage(){

 const posts = await getBlogPosts()

 return(

 <main
 className="
 mx-auto
 max-w-[var(--container-max)]
 px-4
 py-8
 "
 >

 <header className="mb-6">

 <h1
 className="
 text-[16px]
 font-semibold
 tracking-tight
 text-[rgb(var(--color-text))]
 "
 >
 Pencarian Artikel
 </h1>

 <p
 className="
 text-[12px]
 text-[rgb(var(--color-muted))]
 "
 >
 Cari artikel secara cepat.
 </p>

 </header>

 <BlogSearch posts={posts} />

 </main>

 )

}