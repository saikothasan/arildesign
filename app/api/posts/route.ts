import { NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const slug = searchParams.get("slug")

  try {
    const fileNames = await fs.readdir(postsDirectory)
    const posts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map(async (fileName) => {
          const filePath = path.join(postsDirectory, fileName)
          const fileContents = await fs.readFile(filePath, "utf8")
          const { data, content } = matter(fileContents)
          return {
            slug: fileName.replace(/\.md$/, ""),
            ...data,
            content: slug ? content : undefined,
          }
        }),
    )

    // Sort posts by date in descending order
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    let filteredPosts = posts

    if (category) {
      filteredPosts = posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
    }

    if (slug) {
      filteredPosts = posts.find((post) => post.slug === slug)
    }

    return NextResponse.json(filteredPosts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

