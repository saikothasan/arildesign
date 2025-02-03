import { notFound } from "next/navigation"
import { Markdown } from "@/components/markdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Comments } from "@/components/comments"
import { SocialShare } from "@/components/social-share"
import { TableOfContents } from "@/components/table-of-contents"
import { RelatedPosts } from "@/components/related-posts"

async function getPost(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/api/posts?slug=${slug}`)
  if (!res.ok) {
    throw new Error("Failed to fetch post")
  }
  return res.json()
}

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/api/posts`)
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  const allPosts = await getPosts()

  if (!post) {
    notFound()
  }

  const url = `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/posts/${params.slug}`

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <article className="lg:col-span-2 xl:col-span-3">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
          </div>
          <SocialShare url={url} title={post.title} />
        </div>

        {post.image && (
          <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <TableOfContents />
          <Markdown content={post.content} />
        </div>

        <RelatedPosts posts={allPosts} currentPostSlug={params.slug} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <Comments slug={params.slug} />
        </div>
      </article>
      <Sidebar posts={allPosts.slice(0, 5)} />
    </div>
  )
}

