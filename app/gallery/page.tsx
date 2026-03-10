"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Play, ChevronLeft, ChevronRight, Images, Video, FolderOpen } from "lucide-react"

type MediaItem = {
  id: string
  media_type: "photo" | "video"
  media_url: string
  title: string
  album: string
  published: boolean
  created_at: string
}

const FIXED_ALBUMS = [
  { id: "all", label: "All Media", icon: Images },
  { id: "Cultural Festival", label: "Cultural Festival", icon: FolderOpen },
  { id: "Youth Programs", label: "Youth Programs", icon: FolderOpen },
  { id: "Community Events", label: "Community Events", icon: FolderOpen },
  { id: "Videos", label: "Videos", icon: Video },
]

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeAlbum, setActiveAlbum] = useState("all")
  const [lightbox, setLightbox] = useState<MediaItem | null>(null)

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        const published = Array.isArray(data) ? data.filter((item: MediaItem) => item.published) : []
        setMediaItems(published)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Build album tabs dynamically from fetched data + fixed ones
  const dynamicAlbums = Array.from(new Set(mediaItems.map((m) => m.album).filter(Boolean)))
  const albumIds = new Set(FIXED_ALBUMS.map((a) => a.id))
  const extraAlbums = dynamicAlbums
    .filter((a) => !albumIds.has(a))
    .map((a) => ({ id: a, label: a, icon: FolderOpen }))
  const albums = [...FIXED_ALBUMS, ...extraAlbums]

  const filtered =
    activeAlbum === "all"
      ? mediaItems
      : activeAlbum === "Videos"
      ? mediaItems.filter((m) => m.media_type === "video")
      : mediaItems.filter((m) => m.album === activeAlbum)

  const currentIndex = lightbox ? filtered.findIndex((m) => m.id === lightbox.id) : -1

  function prev() {
    if (currentIndex > 0) setLightbox(filtered[currentIndex - 1])
  }

  function next() {
    if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1])
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Moments</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Gallery
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A visual journey through our events, programs, and community moments across Nigeria,
              Cameroon, and the diaspora.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          {/* Album Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeAlbum === album.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <album.icon className="h-4 w-4" />
                {album.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-video rounded-xl bg-secondary animate-pulse" />
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-card"
                >
                  <Image
                    src={item.media_url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1a1207]/0 transition-all group-hover:bg-[#1a1207]/50" />
                  {item.media_type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg">
                        <Play className="h-6 w-6 fill-current" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-white/70">{item.album}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">
              No media in this album yet.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Media */}
            {lightbox.media_type === "photo" ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image src={lightbox.media_url} alt={lightbox.title} fill className="object-contain" />
              </div>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  src={lightbox.media_url}
                  className="h-full w-full"
                  allowFullScreen
                  title={lightbox.title}
                />
              </div>
            )}

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-white">{lightbox.title}</p>
              <p className="text-xs text-white/50">{lightbox.album}</p>
            </div>

            {/* Prev / Next */}
            <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white disabled:opacity-20 hover:bg-black/80"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                disabled={currentIndex === filtered.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white disabled:opacity-20 hover:bg-black/80"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
