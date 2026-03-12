"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Users } from "lucide-react"

type Leader = {
  id: string
  name: string
  role: string
  bio: string
  image_url: string
  region: string
  order_index: number
  is_founder: boolean
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leadership")
      .then(r => r.json())
      .then(data => {
        const sorted = Array.isArray(data) ? data.sort((a: Leader, b: Leader) => (a.order_index ?? 0) - (b.order_index ?? 0)) : []
        setLeaders(sorted)
        setLoading(false)
      })
  }, [])

  const executives = leaders.filter(l => !l.is_founder)
  const founders = leaders.filter(l => l.is_founder)

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Who We Are</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Leadership</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Meet the dedicated leaders driving Kamwe Youth Connect Association forward across Nigeria, Cameroon, and the diaspora.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="py-24 text-center text-muted-foreground">Loading leadership...</div>
          ) : leaders.length === 0 ? (
            <div className="py-24 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Leadership team coming soon.</p>
            </div>
          ) : (
            <>
              {/* Executive Team */}
              {executives.length > 0 && (
                <div className="mb-16">
                  <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Executive Team</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {executives.map((leader) => (
                      <div key={leader.id} className="overflow-hidden rounded-xl border border-border bg-card">
                        <div className="relative aspect-square overflow-hidden bg-secondary">
                          {leader.image_url ? (
                            <Image src={leader.image_url} alt={leader.name} fill className="object-cover object-top" />
                          ) : (
                            <div className="flex h-full items-center justify-center font-serif text-5xl font-bold text-muted-foreground">
                              {leader.name?.[0]}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif text-lg font-bold text-foreground">{leader.name}</h3>
                          <p className="text-sm font-medium text-primary">{leader.role}</p>
                          {leader.region && <p className="text-xs text-muted-foreground mt-0.5">{leader.region}</p>}
                          {leader.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Founders */}
              {founders.length > 0 && (
                <div>
                  <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Founders</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {founders.map((leader) => (
                      <div key={leader.id} className="overflow-hidden rounded-xl border border-border bg-card">
                        <div className="relative aspect-square overflow-hidden bg-secondary">
                          {leader.image_url ? (
                            <Image src={leader.image_url} alt={leader.name} fill className="object-cover object-top" />
                          ) : (
                            <div className="flex h-full items-center justify-center font-serif text-5xl font-bold text-muted-foreground">
                              {leader.name?.[0]}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between">
                            <h3 className="font-serif text-lg font-bold text-foreground">{leader.name}</h3>
                            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">Founder</span>
                          </div>
                          <p className="text-sm font-medium text-primary">{leader.role}</p>
                          {leader.region && <p className="text-xs text-muted-foreground mt-0.5">{leader.region}</p>}
                          {leader.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
