import Link from "next/link"
import { Briefcase, GraduationCap, Calendar, MapPin, ArrowRight, Clock } from "lucide-react"

const opportunities = [
  {
    type: "Job",
    icon: Briefcase,
    title: "Software Engineer — Remote",
    org: "TechBridge Africa",
    location: "Remote / Nigeria",
    deadline: "April 10, 2026",
    tag: "Technology",
  },
  {
    type: "Scholarship",
    icon: GraduationCap,
    title: "Kamwe Heritage Scholarship 2026",
    org: "KYCA Foundation",
    location: "Nigeria & Cameroon",
    deadline: "April 30, 2026",
    tag: "Education",
  },
  {
    type: "Event",
    icon: Calendar,
    title: "Annual Kamwe Cultural Festival",
    org: "KYCA Events",
    location: "Michika, Adamawa State",
    deadline: "May 10, 2026",
    tag: "Culture",
  },
]

export function FeaturedOpportunities() {
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
          {opportunities.map((opp) => (
            <div key={opp.title} className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <opp.icon className="h-3.5 w-3.5" />{opp.type}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{opp.tag}</span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{opp.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{opp.org}</p>
              <div className="mt-auto pt-4 flex flex-col gap-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {opp.location}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Deadline: {opp.deadline}</span>
              </div>
              <Link href="/opportunities" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Apply now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
