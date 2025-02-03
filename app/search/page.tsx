import { ArticleCard } from "@/components/article-card"
import { Sidebar } from "@/components/sidebar"

async function searchPosts(query: string) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const host = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
  const res = await fetch(`${protocol}://${host}/api/posts`)
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  const posts = await res.json()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()),
  )
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q
  const posts = await searchPosts(query)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-2 lg:col-span-3">
        <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
        {posts.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <ArticleCard key={post.slug} {...post} />
            ))}
          </div>
        )}
      </div>
      <Sidebar posts={posts.slice(0, 5)} />
    </div>
  )
}

