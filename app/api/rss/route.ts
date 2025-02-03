import { NextResponse } from "next/server"
import RSS from "rss"
import type { Post } from "@/lib/posts" // Import the Post interface

async function getPosts(): Promise<Post[]> {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const host = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
  const res = await fetch(`${protocol}://${host}/api/posts`)
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export async function GET(request: Request) {
  const posts = await getPosts()
  const { protocol, host } = new URL(request.url)
  const siteUrl = `${protocol}//${host}`

  const feed = new RSS({
    title: "Tech Blog",
    description: "Latest technology news and tips",
    feed_url: `${siteUrl}/api/rss`,
    site_url: siteUrl,
  })

  posts.forEach((post: Post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
      author: post.author.name,
    })
  })

  return new NextResponse(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

