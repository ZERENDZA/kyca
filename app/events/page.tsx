"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, ArrowRight, Ticket } from "lucide-react"

type Event = {
  id: string
  title: string
  event_date: string
  end_date?: string
  time?: string
  location: string
  description: string
  image_url?: string
  attendees_expected?: number
  status: string
  featured?: boolean
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events")
      .then(r => r.json())
      .then(data => { setEvents(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const now = new Date()
  const upcoming = events.filter(e => new Date(e.event_date) >= now)
  const past = events.filter(e => new Date(e.event_date) < now)
  const featured = upcoming.find(e => e.featured) || upcoming[0]
  const regular = upcoming.filter(e => e.id !== featured?.id)

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Community Gatherings</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Events</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              From cultural festivals to professional workshops, our events bring the Kamwe community together in meaningful ways.
            </p>
          </div>
        </div>
      </section>

      {loading && (
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => <div key={i} className="aspect-video rounded-xl bg-secondary animate-pulse" />)}
          </div>
        </section>
      )}

      {/* Featured Event */}
      {!loading && featured && (
        <section className="bg-background py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-primary">Featured Event</p>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto bg-secondary">
                  {featured.image_url && (
                    <Image src={featured.image_url} alt={featured.title} fill className="object-cover" />
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-10">
                  <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    {featured.status || "Upcoming"}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-card-foreground sm:text-3xl">{featured.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{featured.description}</p>
                  <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{formatDate(featured.event_date)}</span>
                    {featured.time && <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{featured.time}</span>}
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{featured.location}</span>
                    {featured.attendees_expected && (
                      <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{featured.attendees_expected.toLocaleString()} expected</span>
                    )}
                  </div>
                  <div className="mt-6">
                    <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                      <Ticket className="h-4 w-4" /> Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {!loading && regular.length > 0 && (
        <section className="bg-background py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Upcoming Events</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {regular.map(event => (
                <div key={event.id} className="group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    {event.image_url && (
                      <Image src={event.image_url} alt={event.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {event.status || "Upcoming"}
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-semibold text-card-foreground">{event.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{event.description}</p>
                    <div className="mt-4 flex flex-col gap-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(event.event_date)}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                    </div>
                    <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      Register <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {!loading && past.length > 0 && (
        <section className="bg-secondary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Past Events</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {past.map(event => (
                <div key={event.id} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs text-muted-foreground">{formatDate(event.event_date)}</p>
                  <h3 className="mt-2 font-serif text-base font-semibold text-card-foreground">{event.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                    {event.attendees_expected && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{event.attendees_expected}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && events.length === 0 && (
        <section className="bg-background py-24">
          <div className="text-center text-muted-foreground">No events yet. Check back soon!</div>
        </section>
      )}
    </>
  )
}
