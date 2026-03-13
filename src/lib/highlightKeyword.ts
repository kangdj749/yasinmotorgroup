export function highlightKeyword(
 text:string,
 keyword:string
){

 if(!keyword) return text

 const regex = new RegExp(`(${keyword})`,"gi")

 return text.replace(
  regex,
  `<mark class="bg-[rgb(var(--color-soft))] px-[2px] rounded">$1</mark>`
 )

}