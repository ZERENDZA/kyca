"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  image_url?: string
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
      .catch(() => setLoading(false))
  }, [])

  const featured = posts[0]
  const rest = posts.slice(1)

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

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

      {loading && (
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-6 md:grid-cols-3">
            {[...Array(6)].map((_, i) => <div key={i} className="aspect-video rounded-xl bg-secondary animate-pulse" />)}
          </div>
        </section>
      )}

      {/* Featured Article */}
      {!loading && featured && (
        <section className="bg-background py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto bg-secondary">
                  {featured.image_url && (
                    <Image src={featured.image_url} alt={featured.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-10">
                  <div className="flex items-center gap-3">
                    {featured.category && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{featured.category}</span>
                    )}
                    <span className="text-xs text-muted-foreground">{formatDate(featured.created_at)}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-bold text-card-foreground sm:text-3xl text-pretty">{featured.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                  <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                    Read Full Story <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      {!loading && rest.length > 0 && (
        <section className="bg-background pb-16 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Recent Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map(article => (
                <article key={article.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    {article.image_url && (
                      <Image src={article.image_url} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    )}
                    {article.category && (
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-card-foreground backdrop-blur-sm">{article.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground">{formatDate(article.created_at)}</p>
                    <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-card-foreground text-pretty">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && posts.length === 0 && (
        <section className="bg-background py-24">
          <div className="text-center text-muted-foreground">No posts published yet. Check back soon!</div>
        </section>
      )}
    </>
  )
}
