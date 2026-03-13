export interface TOCItem {
  id: string
  text: string
}

export function generateTOC(content: string): {
  toc: TOCItem[]
  content: string
} {

  const regex = /<h2>(.*?)<\/h2>/g

  const toc: TOCItem[] = []

  let index = 0

  const newContent = content.replace(regex, (_, text) => {

    const id = `section-${index}`

    toc.push({
      id,
      text
    })

    index++

    return `<h2 id="${id}">${text}</h2>`
  })

  return {
    toc,
    content: newContent
  }
}