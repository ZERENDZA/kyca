import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

type GalleryItem = {
  id: string
  title: string
  image_url: string
  published: boolean
}

async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("id, title, image_url, published")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(5)

  if (error) { console.error("Error fetching gallery:", error); return [] }
  return data || []
}

export async function GalleryPreview() {
  const items = await getGalleryItems()

  if (items.length === 0) return null

  // First item spans 2 cols + 2 rows, rest are single
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Moments</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Gallery
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Snapshots of our community, culture, and impact across Nigeria, Cameroon, and the diaspora.
            </p>
          </div>
          <Link href="/gallery" className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-3 grid-rows-2 gap-3 h-[420px]">
          {items.slice(0, 5).map((item, i) => (
            <Link
              key={item.id}
              href="/gallery"
              className={`group relative overflow-hidden rounded-xl bg-card ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1a1207]/0 transition-all group-hover:bg-[#1a1207]/50" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform group-hover:translate-y-0">
                <p className="text-xs font-medium text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
