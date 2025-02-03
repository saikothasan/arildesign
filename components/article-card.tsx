import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ArticleCardProps {
  title: string
  excerpt: string
  image: string
  category: string
  author: {
    name: string
    image: string
  }
  slug: string
  date: string
  featured?: boolean
}

export function ArticleCard({
  title,
  excerpt,
  image,
  category,
  author,
  slug,
  date,
  featured = false,
}: ArticleCardProps) {
  return (
    <Card className={`overflow-hidden ${featured ? "md:col-span-2" : ""}`}>
      <Link href={`/posts/${slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Link href={`/category/${category.toLowerCase()}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80">
                {category}
              </Badge>
            </Link>
            <time className="text-sm text-muted-foreground" dateTime={date}>
              {new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
          </div>
          <h2 className={`font-bold ${featured ? "text-2xl" : "text-lg"} mb-2 line-clamp-2 hover:underline`}>
            {title}
          </h2>
          <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{author.name}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

