"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BookOpen } from "lucide-react"

type Program = {
  id: string
  title: string
  slug: string
  description: string
  image_url: string
  published: boolean
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/programs")
      .then(r => r.json())
      .then(data => {
        const published = Array.isArray(data) ? data.filter((p: Program) => p.published) : []
        setPrograms(published)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">What We Do</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Programs & Initiatives</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Explore KYCA's programs in youth empowerment, cultural preservation, education, and diaspora connectivity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="py-24 text-center text-muted-foreground">Loading programs...</div>
          ) : programs.length === 0 ? (
            <div className="py-24 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No programs published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {programs.map((program, i) => (
                <div key={program.id} className={`group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg ${i === 0 && programs.length % 2 !== 0 ? "md:col-span-2" : ""}`}>
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    {program.image_url ? (
                      <Image src={program.image_url} alt={program.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-serif text-xl font-bold text-foreground">{program.title}</h2>
                    {program.description && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
