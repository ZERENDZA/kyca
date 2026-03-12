"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, Newspaper } from "lucide-react"

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  image_url: string
  published: boolean
  created_at: string
}

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/posts")
      .then(r => r.json())
      .then(data => {
        const published = Array.isArray(data) ? data.filter((p: Post) => p.published) : []
        setPosts(published)
        setLoading(false)
      })
  }, [])

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Stay Informed</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">News & Stories</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The latest updates, stories, and announcements from across the Kamwe community.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          {loading ? (
            <div className="py-24 text-center text-muted-foreground">Loading news...</div>
          ) : posts.length === 0 ? (
            <div className="py-24 text-center">
              <Newspaper className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No news articles published yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="group mb-12 overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                      {featured.image_url ? (
                        <Image src={featured.image_url} alt={featured.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-secondary">
                          <Newspaper className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-6 lg:p-10">
                      <div className="flex items-center gap-3">
                        {featured.category && (
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{featured.category}</span>
                        )}
                        <span className="text-xs text-muted-foreground">{new Date(featured.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                      <h2 className="mt-4 font-serif text-2xl font-bold text-card-foreground sm:text-3xl">{featured.title}</h2>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <>
                  <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Recent Articles</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <article key={post.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
                        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                          {post.image_url ? (
                            <Image src={post.image_url} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Newspaper className="h-10 w-10 text-muted-foreground" />
                            </div>
                          )}
                          {post.category && (
                            <div className="absolute left-3 top-3">
                              <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-card-foreground backdrop-blur-sm">{post.category}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <p className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                          <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-card-foreground">{post.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
