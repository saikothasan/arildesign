"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage?: number
  className?: string
}

export function Pagination({ totalItems, itemsPerPage, currentPage = 1, className = "" }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

