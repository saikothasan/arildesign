import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/lib/posts"
import { Newsletter } from "@/components/newsletter"

interface SidebarProps {
  posts: Post[]
}

export function Sidebar({ posts }: SidebarProps) {
  return (
    <aside className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="font-bold text-xl mb-4">Trending Now</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="flex gap-4 group">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Newsletter />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="font-bold text-xl mb-4">Follow Us</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              YouTube
            </Button>
            <Button variant="outline" className="w-full">
              Facebook
            </Button>
            <Button variant="outline" className="w-full">
              Twitter
            </Button>
            <Button variant="outline" className="w-full">
              Codepen
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

