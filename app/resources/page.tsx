import type { Metadata } from "next"
import Image from "next/image"
import { BookOpen, Download, Play, FileText, Globe, Headphones, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources & Culture",
  description: "Access Kamwe cultural resources, Vecemwe language materials, educational content, and a rich digital archive.",
}

const languageResources = [
  { title: "Vecemwe Basic Phrases", type: "PDF Guide", downloads: 450, icon: FileText },
  { title: "Vecemwe Numbers & Counting", type: "Audio Lesson", downloads: 320, icon: Headphones },
  { title: "Greetings & Introductions", type: "Video Tutorial", downloads: 580, icon: Play },
  { title: "Vecemwe-English Dictionary", type: "PDF Reference", downloads: 890, icon: BookOpen },
]

const culturalResources = [
  {
    title: "History of the Kamwe People",
    description: "A comprehensive overview of Kamwe origins, migration patterns, and historical milestones.",
    type: "Article",
    category: "History",
  },
  {
    title: "Traditional Festivals & Ceremonies",
    description: "Detailed documentation of Kamwe cultural celebrations, their significance, and practices.",
    type: "Article",
    category: "Culture",
  },
  {
    title: "Kamwe Traditional Music",
    description: "Audio recordings and documentation of traditional Kamwe songs, instruments, and musical forms.",
    type: "Audio Collection",
    category: "Music",
  },
  {
    title: "Kamwe Proverbs & Oral Traditions",
    description: "A curated collection of Kamwe wisdom sayings, folktales, and oral histories from elders.",
    type: "E-Book",
    category: "Literature",
  },
  {
    title: "Traditional Crafts & Artisanship",
    description: "Visual guide to Kamwe weaving, pottery, metalwork, and other traditional crafts.",
    type: "Photo Gallery",
    category: "Arts",
  },
  {
    title: "Kamwe Cuisine & Food Culture",
    description: "Recipes, cooking methods, and the cultural significance of Kamwe traditional dishes.",
    type: "Guide",
    category: "Food",
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center overflow-hidden">
        <Image src="/images/culture.jpg" alt="Kamwe cultural artifacts" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1207]/90 to-[#1a1207]/50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Learn & Explore</p>
          <h1 className="mt-2 max-w-xl font-serif text-4xl font-bold tracking-tight text-[#f5f0e8] sm:text-5xl">
            Resources & Culture
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d0c8b8]">
            Explore our rich collection of cultural materials, language resources, and educational
            content preserving the Kamwe heritage for future generations.
          </p>
        </div>
      </section>

      {/* Vecemwe Language Hub */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Globe className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Vecemwe Language Hub</h2>
              <p className="text-sm text-muted-foreground">Learn the language of our ancestors.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {languageResources.map((resource) => (
              <div key={resource.title} className="rounded-xl border border-border bg-card p-5 transition hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <resource.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold text-card-foreground">{resource.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{resource.type}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" /> {resource.downloads}
                  </span>
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    Access <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Quiz Teaser */}
          <div className="mt-10 rounded-xl border border-gold/30 bg-gold/5 p-6 lg:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">Test Your Vecemwe Knowledge</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Take our interactive quizzes to practice and improve your Vecemwe language skills.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-[#1a1207]">
                Start Quiz <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Library */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Digital Archive</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Cultural Library
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Browse our growing collection of articles, audio recordings, and visual archives documenting Kamwe heritage.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {culturalResources.map((resource) => (
              <div key={resource.title} className="rounded-xl border border-border bg-card p-6 transition hover:shadow-md">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {resource.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{resource.type}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold text-card-foreground">{resource.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">Photo Gallery</h2>
          <p className="mt-2 text-sm text-muted-foreground">A visual celebration of Kamwe life, culture, and community.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["/images/hero-bg.jpg", "/images/culture.jpg", "/images/about-hero.jpg", "/images/programs-hero.jpg"].map(
              (src, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1a1207]/0 transition-colors group-hover:bg-[#1a1207]/30" />
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}
