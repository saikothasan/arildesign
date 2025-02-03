import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/lib/posts"

interface RelatedPostsProps {
  posts: Post[]
  currentPostSlug: string
}

export function RelatedPosts({ posts, currentPostSlug }: RelatedPostsProps) {
  const relatedPosts = posts.filter((post) => post.slug !== currentPostSlug).slice(0, 3)

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Card key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <div className="relative aspect-video">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

