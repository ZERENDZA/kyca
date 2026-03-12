import Link from "next/link"
import { Briefcase, GraduationCap, Calendar, MapPin, ArrowRight, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Event = {
  id: string
  title: string
  description: string | null
  event_date: string
  location: string | null
  status: string
  featured: boolean
}

async function getFeaturedEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, title, description, event_date, location, status, featured")
    .eq("featured", true)
    .order("event_date", { ascending: true })
    .limit(3)

  if (error) { console.error("Error fetching events:", error); return [] }
  return data || []
}

function formatDeadline(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  })
}

export async function FeaturedOpportunities() {
  const events = await getFeaturedEvents()

  if (events.length === 0) return null

  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Opportunities</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Listings</h2>
            <p className="mt-2 max-w-lg text-base text-muted-foreground">Curated jobs, scholarships, and events handpicked for Kamwe youth.</p>
          </div>
          <Link href="/opportunities" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            View all opportunities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Calendar className="h-3.5 w-3.5" /> Event
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground capitalize">
                  {event.status}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{event.title}</h3>
              {event.description && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
              )}
              <div className="mt-auto pt-4 flex flex-col gap-1.5 text-xs text-muted-foreground">
                {event.location && (
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
                )}
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {formatDeadline(event.event_date)}</span>
              </div>
              <Link href="/events" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
