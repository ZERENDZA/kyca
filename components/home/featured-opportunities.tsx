import Link from "next/link"
import { Briefcase, GraduationCap, Calendar, MapPin, ArrowRight, Clock, ExternalLink } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Opportunity = {
  id: string
  title: string
  org: string
  location: string | null
  deadline: string | null
  type: string
  tag: string | null
  url: string | null
  published: boolean
}

const typeIconMap: Record<string, React.ElementType> = {
  Job: Briefcase,
  Internship: Briefcase,
  Scholarship: GraduationCap,
  Volunteer: Calendar,
  Event: Calendar,
}

async function getFeaturedOpportunities(): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("id, title, org, location, deadline, type, tag, url, published")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (error) { console.error("Error fetching opportunities:", error); return [] }
  return data || []
}

export async function FeaturedOpportunities() {
  const opportunities = await getFeaturedOpportunities()

  if (opportunities.length === 0) return null

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
          {opportunities.map((opp) => {
            const OppIcon = typeIconMap[opp.type] ?? Briefcase
            return (
              <div key={opp.id} className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <OppIcon className="h-3.5 w-3.5" /> {opp.type}
                  </span>
                  {opp.tag && (
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground capitalize">
                      {opp.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{opp.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{opp.org}</p>
                <div className="mt-auto pt-4 flex flex-col gap-1.5 text-xs text-muted-foreground">
                  {opp.location && (
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {opp.location}</span>
                  )}
                  {opp.deadline && (
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {opp.deadline}</span>
                  )}
                </div>
                {opp.url ? (
                  <a
                    href={opp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Apply now <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link href="/opportunities" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
