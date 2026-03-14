"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Users } from "lucide-react"

type Leader = {
  id: string
  name: string
  role: string
  section: "founder" | "executive" | "mentor" | "sponsor"
  tag?: string
  image_url?: string
  display_order: number
}

const SECTION_THEMES = {
  founder: {
    label: "Founders",
    description: "The visionary individuals who laid the foundation for Kamwe youth connectivity.",
    badgeClass: "bg-purple-100 text-purple-700",
    accentClass: "border-purple-500",
    tagClass: "bg-purple-50 text-purple-600",
  },
  executive: {
    label: "Executive Team",
    description: "Our dedicated officers managing the day-to-day operations and strategic goals.",
    badgeClass: "bg-green-100 text-green-700",
    accentClass: "border-green-500",
    tagClass: "bg-green-50 text-green-600",
  },
  mentor: {
    label: "Mentors",
    description: "Experienced professionals providing guidance and wisdom to our youth members.",
    badgeClass: "bg-amber-100 text-amber-700",
    accentClass: "border-amber-500",
    tagClass: "bg-amber-50 text-amber-600",
  },
  sponsor: {
    label: "Sponsors",
    description: "Distinguished partners whose generosity empowers our programs and reach.",
    badgeClass: "bg-orange-100 text-orange-700",
    accentClass: "border-orange-500",
    tagClass: "bg-orange-50 text-orange-600",
  },
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leadership")
      .then(r => r.json())
      .then(data => {
        setLeaders(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  const renderSection = (sectionId: keyof typeof SECTION_THEMES) => {
    const theme = SECTION_THEMES[sectionId]
    const sectionLeaders = leaders
      .filter(l => l.section === sectionId)
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))

    return (
      <div key={sectionId} className="mb-20 last:mb-0">
        <div className="mb-10 text-center sm:text-left">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${theme.badgeClass}`}>
            {theme.label}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground">{theme.label}</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">{theme.description}</p>
        </div>

        {sectionLeaders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/30 py-12 text-center text-sm italic text-muted-foreground">
            Coming soon
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
            {sectionLeaders.map((leader) => (
              <div key={leader.id} className={`relative pt-1 overflow-hidden transition-all hover:-translate-y-1 group`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full border-t-4 ${theme.accentClass}`} />
                <div className="flex flex-col items-center p-4">
                  <div className="relative mb-4 h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-background shadow-md bg-secondary transition-transform group-hover:scale-105">
                    {leader.image_url ? (
                      <Image src={leader.image_url} alt={leader.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center font-serif text-4xl font-bold text-muted-foreground/40">
                        {leader.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-lg font-bold text-foreground leading-tight">{leader.name}</h3>
                    <p className="mt-1 text-xs font-medium text-primary">{leader.role}</p>
                    {leader.tag && (
                      <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${theme.tagClass}`}>
                        {leader.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <section className="bg-secondary/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Impactful Community</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">Leadership Team</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Meet the visionaries, executives, mentors, and sponsors who unite to empower Kamwe youth and preserve our rich heritage globally.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_3s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">Loading our community leaders...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {(["founder", "executive", "mentor", "sponsor"] as const).map(renderSection)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
