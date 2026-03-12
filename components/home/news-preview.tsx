import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string | null
  image_url: string | null
  created_at: string
}

async function getLatestPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, category, image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (error) { console.error("Error fetching posts:", error); return [] }
  return data || []
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  })
}

export async function NewsPreview() {
  const posts = await getLatestPosts()

  if (posts.length === 0) return null

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Latest Updates</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              News & Stories
            </h2>
            <p className="mt-2 max-w-lg text-base text-muted-foreground">
              Stay informed on KYCA programs, community milestones, and youth achievements.
            </p>
          </div>
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            All news <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                {post.image_url ? (
                  <Image src={post.image_url} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-secondary" />
                )}
                {post.category && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-card-foreground backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground">{formatDate(post.created_at)}</p>
                <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-card-foreground text-pretty">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
