import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

const previewItems = [
  { src: "/images/hero-bg.jpg", caption: "Youth Gathering 2025", type: "photo", span: "col-span-2 row-span-2" },
  { src: "/images/culture.jpg", caption: "Cultural Festival", type: "photo", span: "" },
  { src: "/images/programs-hero.jpg", caption: "Youth Workshop", type: "video", span: "" },
  { src: "/images/about-hero.jpg", caption: "Community Summit", type: "photo", span: "" },
  { src: "/images/culture.jpg", caption: "Heritage Exhibition", type: "photo", span: "" },
]

export function GalleryPreview() {
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
          <Link
            href="/gallery"
            className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mosaic Grid */}
        <div className="mt-10 grid grid-cols-3 grid-rows-2 gap-3 h-[420px]">
          {previewItems.map((item, i) => (
            <Link
              key={i}
              href="/gallery"
              className={`group relative overflow-hidden rounded-xl bg-card ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1a1207]/0 transition-all group-hover:bg-[#1a1207]/50" />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                    <Play className="h-5 w-5 fill-current" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform group-hover:translate-y-0">
                <p className="text-xs font-medium text-white">{item.caption}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}