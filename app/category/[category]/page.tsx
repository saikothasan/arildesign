import { ArticleCard } from "@/components/article-card"
import { Sidebar } from "@/components/sidebar"
import { Pagination } from "@/components/pagination"
import { notFound } from "next/navigation"
import type { Post } from "@/lib/posts" // Import the Post interface

async function getPosts(category: string): Promise<Post[]> {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const host = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
  const res = await fetch(
    `${protocol}://${host}/api/posts?category=${category}`,
    { next: { revalidate: 3600 } }, // Revalidate every hour
  )
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

async function getAllPosts(): Promise<Post[]> {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const host = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
  const res = await fetch(
    `${protocol}://${host}/api/posts`,
    { next: { revalidate: 3600 } }, // Revalidate every hour
  )
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const posts = await getPosts(params.category)
  const allPosts = await getAllPosts()

  if (posts.length === 0) {
    notFound()
  }

  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page, 10) : 1
  const postsPerPage = 6
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div className="lg:col-span-2 xl:col-span-3">
        <h1 className="text-3xl font-bold mb-8 capitalize">{params.category}</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {paginatedPosts.map((post: Post) => (
            <ArticleCard key={post.slug} {...post} />
          ))}
        </div>
        <Pagination totalItems={posts.length} itemsPerPage={postsPerPage} currentPage={page} className="mt-8" />
      </div>
      <Sidebar posts={allPosts.slice(0, 5)} />
    </div>
  )
}

