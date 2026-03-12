import Link from "next/link"
import { GraduationCap, Globe, BookOpen, Users, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Program = {
  id: string
  title: string
  slug: string
  description: string
  category: string
  published: boolean
}

const iconMap: Record<string, any> = {
  "Youth Empowerment": Users,
  "Cultural Preservation": BookOpen,
  "Education": GraduationCap,
  "Education & Scholarships": GraduationCap,
  "Diaspora Connect": Globe,
  "Diaspora": Globe,
}

const colorMap: Record<string, string> = {
  "Youth Empowerment": "bg-primary/10 text-primary",
  "Cultural Preservation": "bg-accent/10 text-accent",
  "Education": "bg-gold/10 text-gold",
  "Education & Scholarships": "bg-gold/10 text-gold",
  "Diaspora Connect": "bg-primary/10 text-primary",
  "Diaspora": "bg-primary/10 text-primary",
}

async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase
    .from("programs")
    .select("id, title, slug, description, category, published")
    .eq("published", true)
    .order("created_at", { ascending: true })
    .limit(4)

  if (error) { console.error("Error fetching programs:", error); return [] }
  return data || []
}

export async function ProgramsPreview() {
  const programs = await getPrograms()

  if (programs.length === 0) return null

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
          {programs.map((program) => {
            const Icon = iconMap[program.title] || iconMap[program.category] || BookOpen
            const color = colorMap[program.title] || colorMap[program.category] || "bg-primary/10 text-primary"
            return (
              <Link
                key={program.id}
                href={program.slug ? `/programs/${program.slug}` : "/programs"}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{program.title}</h3>
                {program.description && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{program.description}</p>
                )}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            View all programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
