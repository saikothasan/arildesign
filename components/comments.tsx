"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

declare global {
  interface Window {
    DISQUS?: any
    disqus_config?: any
  }
}

interface CommentsProps {
  slug: string
}

export function Comments({ slug }: CommentsProps) {
  const { theme } = useTheme()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://your-disqus-shortname.disqus.com/embed.js"
    script.setAttribute("data-timestamp", Date.now().toString())

    window.disqus_config = function (this: any) {
      this.page = this.page || {}
      this.page.url = window.location.href
      this.page.identifier = slug
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [slug])

  useEffect(() => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: any) {
          this.page = this.page || {}
          this.page.url = window.location.href
          this.page.identifier = slug
        },
      })
    }
  }, [slug])

  return <div id="disqus_thread"></div>
}

