import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Globe, BookOpen, Users, ArrowRight, Sparkles, Heart, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: "Programs & Initiatives",
  description: "Explore KYCA's programs in youth empowerment, cultural preservation, education, and diaspora connectivity.",
}

const programs = [
  {
    slug: "youth-empowerment",
    icon: Users,
    title: "Youth Empowerment",
    description:
      "Comprehensive leadership training, mentorship programs, and skill-building workshops designed to prepare Kamwe youth for professional and civic leadership. Includes coding bootcamps, entrepreneurship incubators, and public speaking labs.",
    stats: { participants: "1,200+", events: "35", mentors: "80" },
    image: "/images/programs-hero.jpg",
  },
  {
    slug: "cultural-preservation",
    icon: BookOpen,
    title: "Cultural Preservation",
    description:
      "Preserving the rich Kamwe heritage through Vecemwe language documentation, cultural festivals, digital archives, and intergenerational storytelling. We work with elders and linguists to ensure our traditions live on.",
    stats: { participants: "800+", events: "20", mentors: "15" },
    image: "/images/culture.jpg",
  },
  {
    slug: "education-scholarships",
    icon: GraduationCap,
    title: "Education & Scholarships",
    description:
      "Connecting youth with scholarships, academic tutoring, exam preparation, and educational resources. Our scholarship fund has supported over 50 students in universities across Nigeria and Cameroon.",
    stats: { participants: "500+", events: "12", mentors: "25" },
    image: "/images/about-hero.jpg",
  },
  {
    slug: "diaspora-connect",
    icon: Globe,
    title: "Diaspora Connect",
    description:
      "Building bridges between Kamwe communities worldwide through networking events, professional mentorship, and digital platforms. Enabling knowledge transfer and investment back into home communities.",
    stats: { participants: "600+", events: "18", mentors: "40" },
    image: "/images/hero-bg.jpg",
  },
]

const initiatives = [
  {
    icon: Sparkles,
    title: "Digital Skills Academy",
    description: "Free coding, design, and digital marketing courses for Kamwe youth aged 18-30.",
  },
  {
    icon: Heart,
    title: "Community Health Outreach",
    description: "Health awareness campaigns and free medical missions to underserved Kamwe communities.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "A startup incubator supporting Kamwe entrepreneurs with funding, mentorship, and workspace.",
  },
]

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">What We Do</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Programs & Initiatives
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our programs address the holistic needs of Kamwe youth - from education and
              employment to cultural identity and global connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-16">
            {programs.map((program, i) => (
              <div
                key={program.slug}
                className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <program.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">{program.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{program.description}</p>

                  <div className="mt-6 flex gap-6">
                    <div>
                      <p className="text-xl font-bold text-primary font-serif">{program.stats.participants}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Participants</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-primary font-serif">{program.stats.events}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Events</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-primary font-serif">{program.stats.mentors}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Mentors</p>
                    </div>
                  </div>

                  <Link
                    href={`/programs/${program.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className={`relative aspect-[4/3] overflow-hidden rounded-xl ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image src={program.image} alt={program.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Coming Soon</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              New Initiatives
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {initiatives.map((init) => (
              <div key={init.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                  <init.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{init.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{init.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
