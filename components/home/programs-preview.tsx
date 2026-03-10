import Link from "next/link"
import { GraduationCap, Globe, BookOpen, Users, ArrowRight } from "lucide-react"

const programs = [
  {
    icon: Users,
    title: "Youth Empowerment",
    description: "Leadership training, mentorship programs, and skill-building workshops that prepare Kamwe youth to lead with confidence and purpose.",
    href: "/programs/youth-empowerment",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Cultural Preservation",
    description: "Keeping the Kamwe heritage alive through language documentation, cultural festivals, and digital archives for future generations.",
    href: "/programs/cultural-preservation",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: GraduationCap,
    title: "Education & Scholarships",
    description: "Connecting Kamwe youth with scholarships, academic support, and educational resources to build a brighter tomorrow.",
    href: "/programs/education-scholarships",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Globe,
    title: "Diaspora Connect",
    description: "Building bridges between Kamwe communities worldwide through networking, digital platforms, and shared initiatives.",
    href: "/programs/diaspora-connect",
    color: "bg-primary/10 text-primary",
  },
]

export function ProgramsPreview() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">What We Do</p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Our Core Programs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            From cultural preservation to economic empowerment, our programs address the
            full spectrum of needs for Kamwe youth across Nigeria, Cameroon, and the diaspora.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <Link
              key={program.title}
              href={program.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${program.color}`}>
                <program.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{program.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
