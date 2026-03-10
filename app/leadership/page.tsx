"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"

type Leader = {
  id: string
  name: string
  role: string
  region?: string
  bio?: string
  image_url?: string
  order_index?: number
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leadership")
      .then(r => r.json())
      .then(data => { setLeaders(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our People</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Leadership Team</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Meet the passionate individuals guiding KYCA's mission to empower Kamwe youth and preserve our cultural heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[4/3] rounded-xl bg-secondary animate-pulse" />)}
            </div>
          )}

          {!loading && leaders.length > 0 && (
            <>
              <h2 className="font-serif text-2xl font-bold text-foreground">Leadership</h2>
              <p className="mt-2 text-sm text-muted-foreground mb-10">The dedicated team leading our organization.</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {leaders.map(leader => (
                  <div key={leader.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                      {leader.image_url ? (
                        <Image src={leader.image_url} alt={leader.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-serif text-4xl font-bold text-primary/30">
                            {leader.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207]/70 to-transparent" />
                      {leader.region && (
                        <div className="absolute bottom-3 left-3">
                          <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">{leader.region}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-card-foreground">{leader.name}</h3>
                      <p className="text-sm font-medium text-primary">{leader.role}</p>
                      {leader.bio && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>}
                      <div className="mt-4 flex gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-primary">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-primary">
                          <Linkedin className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && leaders.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">Leadership team coming soon.</div>
          )}
        </div>
      </section>
    </>
  )
}
