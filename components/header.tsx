"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "@/components/search"

const navigation = [
  { name: "Home", href: "/" },
  { name: "AdSense", href: "/category/adsense" },
  { name: "Internet", href: "/category/internet" },
  { name: "Smartphone", href: "/category/smartphone" },
  { name: "SEO", href: "/category/seo" },
  { name: "Snippet", href: "/category/snippet" },
  { name: "Tips Blogger", href: "/category/tips-blogger" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="sr-only">Tech Blog</span>
              <svg
                className="h-8 w-auto text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </Link>
            <div className="hidden md:block ml-10 space-x-8">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <Search />
            </div>
            <ThemeToggle className="ml-4" />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Tech Blog</span>
                <svg
                  className="h-8 w-auto text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-muted-foreground hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Search />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

