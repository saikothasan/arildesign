"use client"

import { useState, useEffect } from "react"
import { Link } from "lucide-react"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([])

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3, h4"))
    const tocItems = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: Number.parseInt(heading.tagName.charAt(1)),
    }))
    setToc(tocItems)
  }, [])

  return (
    <nav className="space-y-2">
      <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-sm hover:underline ${
            item.level === 2 ? "font-medium" : item.level === 3 ? "pl-4" : "pl-8"
          }`}
        >
          <Link className="h-4 w-4 inline-block mr-1" />
          {item.text}
        </a>
      ))}
    </nav>
  )
}

