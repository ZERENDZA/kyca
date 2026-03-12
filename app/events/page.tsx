"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, CalendarX } from "lucide-react"

type Event = {
  id: string
  title: string
  description: string
  location: string
  event_date: string
  image_url: string
  published: boolean
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events")
      .then(r => r.json())
      .then(data => {
        const published = Array.isArray(data) ? data.filter((e: Event) => e.published) : []
        setEvents(published)
        setLoading(false)
      })
  }, [])

  const now = new Date()
  const upcoming = events.filter(e => !e.event_date || new Date(e.event_date) >= now)
  const past = events.filter(e => e.event_date && new Date(e.event_date) < now)

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Join Us</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Events</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Cultural festivals, workshops, networking sessions, and community gatherings across Nigeria, Cameroon, and the diaspora.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          {loading ? (
            <div className="py-24 text-center text-muted-foreground">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="py-24 text-center">
              <CalendarX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No events published yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Upcoming */}
              {upcoming.length > 0 && (
                <div className="mb-16">
                  <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Upcoming Events</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcoming.map((event) => (
                      <div key={event.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
                        <div className="relative aspect-video overflow-hidden bg-secondary">
                          {event.image_url ? (
                            <Image src={event.image_url} alt={event.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Calendar className="h-10 w-10 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute left-3 top-3">
                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Upcoming</span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif text-lg font-semibold text-foreground">{event.title}</h3>
                          {event.event_date && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(event.event_date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            </div>
                          )}
                          {event.location && (
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              {event.location}
                            </div>
                          )}
                          {event.description && (
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{event.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past */}
              {past.length > 0 && (
                <div>
                  <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Past Events</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {past.map((event) => (
                      <div key={event.id} className="overflow-hidden rounded-xl border border-border bg-card opacity-80">
                        <div className="relative aspect-video overflow-hidden bg-secondary">
                          {event.image_url ? (
                            <Image src={event.image_url} alt={event.title} fill className="object-cover grayscale" />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Calendar className="h-10 w-10 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute left-3 top-3">
                            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">Past</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
                          {event.event_date && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {new Date(event.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          )}
                          {event.location && <p className="text-xs text-muted-foreground">{event.location}</p>}
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
