"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  ExternalLink,
} from "lucide-react"

const allOpportunities = [
  {
    id: 1,
    type: "Job",
    icon: Briefcase,
    title: "Software Engineer - Remote",
    org: "TechBridge Africa",
    location: "Remote / Nigeria",
    deadline: "March 30, 2026",
    category: "Technology",
    description: "Build scalable web applications for a leading African tech firm. React, Node.js, and cloud experience preferred.",
  },
  {
    id: 2,
    type: "Scholarship",
    icon: GraduationCap,
    title: "Kamwe Heritage Scholarship 2026",
    org: "KYCA Foundation",
    location: "Nigeria & Cameroon",
    deadline: "April 15, 2026",
    category: "Education",
    description: "Full tuition scholarship for undergraduate studies in any field. Open to Kamwe youth aged 18-25.",
  },
  {
    id: 3,
    type: "Job",
    icon: Briefcase,
    title: "Community Manager",
    org: "KYCA",
    location: "Michika, Nigeria",
    deadline: "March 20, 2026",
    category: "Community",
    description: "Lead community engagement efforts across Adamawa State. Experience in youth mobilization required.",
  },
  {
    id: 4,
    type: "Internship",
    icon: Briefcase,
    title: "Digital Marketing Intern",
    org: "Kamwe Business Network",
    location: "Lagos, Nigeria",
    deadline: "April 1, 2026",
    category: "Marketing",
    description: "6-month internship in social media management and content creation. Stipend provided.",
  },
  {
    id: 5,
    type: "Scholarship",
    icon: GraduationCap,
    title: "Women in STEM Grant",
    org: "Africa Women Foundation",
    location: "Pan-African",
    deadline: "May 1, 2026",
    category: "Education",
    description: "Research grant for female students pursuing STEM degrees in African universities.",
  },
  {
    id: 6,
    type: "Job",
    icon: Briefcase,
    title: "Agricultural Extension Officer",
    org: "Adamawa State Agric Board",
    location: "Michika, Nigeria",
    deadline: "March 25, 2026",
    category: "Agriculture",
    description: "Support farmers in Michika LGA with modern farming techniques and access to markets.",
  },
  {
    id: 7,
    type: "Volunteer",
    icon: Calendar,
    title: "Cultural Festival Volunteers",
    org: "KYCA Events",
    location: "Michika, Nigeria",
    deadline: "May 5, 2026",
    category: "Culture",
    description: "Help organize and run the 2026 Kamwe Cultural Festival. All skills welcome.",
  },
  {
    id: 8,
    type: "Scholarship",
    icon: GraduationCap,
    title: "Postgraduate Research Fellowship",
    org: "Univ. of Maiduguri",
    location: "Maiduguri, Nigeria",
    deadline: "June 15, 2026",
    category: "Education",
    description: "Fully funded postgraduate research positions in social sciences and development studies.",
  },
]

const types = ["All", "Job", "Scholarship", "Internship", "Volunteer"]
const locations = ["All Locations", "Nigeria", "Cameroon", "Remote", "Pan-African"]

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  const filtered = allOpportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase())
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
              {filtered.map((opp) => (
                <div
                  key={opp.id}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <opp.icon className="h-3.5 w-3.5" />
                      {opp.type}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {opp.category}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{opp.title}</h3>
                  <p className="text-sm text-primary font-medium">{opp.org}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{opp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {opp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {opp.deadline}
                    </span>
                  </div>
                  <button className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                    Apply Now <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
