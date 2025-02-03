import { NextResponse } from "next/server"
import RSS from "rss"

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/api/posts`)
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

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
    })
  })

  return new NextResponse(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

