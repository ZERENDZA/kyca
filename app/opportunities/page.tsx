"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Clock,
  Filter,
  ExternalLink,
} from "lucide-react"

type Opportunity = {
  id: string
  title: string
  org: string
  location: string
  deadline: string
  type: string
  tag: string
  url: string | null
  published: boolean
  description?: string
}

const typeIconMap: Record<string, React.ElementType> = {
  Job: Briefcase,
  Internship: Briefcase,
  Scholarship: GraduationCap,
  Volunteer: Calendar,
  Event: Calendar,
}

const types = ["All", "Job", "Scholarship", "Internship", "Volunteer"]
const locations = ["All Locations", "Nigeria", "Cameroon", "Remote", "Pan-African"]

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  useEffect(() => {
    fetch("/api/opportunities")
      .then(r => r.json())
      .then(data => {
        const published = Array.isArray(data) ? data.filter((o: Opportunity) => o.published) : []
        setOpportunities(published)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opp.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All" || opp.type === selectedType
    const matchesLocation =
      selectedLocation === "All Locations" || opp.location.includes(selectedLocation.replace("All Locations", ""))
    return matchesSearch && matchesType && matchesLocation
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Explore & Apply</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Opportunities Hub
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Curated jobs, scholarships, internships, and volunteer positions for Kamwe youth.
              Find your next opportunity and take the leap.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-[65px] z-40 border-b border-border bg-background/95 backdrop-blur-sm py-4">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground"
                aria-label="Search opportunities"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="rounded-lg border border-input bg-card px-3 py-1.5 text-xs text-foreground"
                aria-label="Filter by location"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="bg-background py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 animate-pulse">
                  <div className="h-6 w-24 rounded-full bg-secondary" />
                  <div className="mt-4 h-5 w-3/4 rounded bg-secondary" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-secondary" />
                  <div className="mt-4 h-16 rounded bg-secondary" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"} found
              </p>
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-lg font-semibold text-foreground">No opportunities match your search</p>
                  <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filtered.map((opp) => {
                    const OppIcon = typeIconMap[opp.type] ?? Briefcase
                    return (
                      <div
                        key={opp.id}
                        className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <OppIcon className="h-3.5 w-3.5" />
                            {opp.type}
                          </span>
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                            {opp.tag}
                          </span>
                        </div>
                        <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{opp.title}</h3>
                        <p className="text-sm text-primary font-medium">{opp.org}</p>
                        {opp.description && (
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{opp.description}</p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {opp.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {opp.deadline}
                          </span>
                        </div>
                        {opp.url ? (
                          <a
                            href={opp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                          >
                            Apply Now <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <button className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                            Apply Now <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
