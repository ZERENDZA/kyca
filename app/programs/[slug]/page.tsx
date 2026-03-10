import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Users, Calendar, MapPin } from "lucide-react"
import { notFound } from "next/navigation"

const programsData: Record<string, {
  title: string
  subtitle: string
  description: string[]
  image: string
  features: string[]
  stats: { label: string; value: string }[]
}> = {
  "youth-empowerment": {
    title: "Youth Empowerment",
    subtitle: "Building Leaders for Tomorrow",
    description: [
      "Our Youth Empowerment program is the cornerstone of KYCA's mission. We believe that when young people are equipped with the right skills, mindset, and networks, they can transform their communities and the world.",
      "Through intensive leadership workshops, mentorship pairings, and hands-on skill-building programs, we prepare Kamwe youth for professional and civic leadership. Our coding bootcamps have produced over 200 tech professionals, while our entrepreneurship incubator has supported 50+ startups.",
      "We also run public speaking labs, financial literacy workshops, and career counseling sessions that have directly impacted the career trajectories of thousands of young Kamwe people across Nigeria, Cameroon, and the diaspora.",
    ],
    image: "/images/programs-hero.jpg",
    features: [
      "6-month leadership training cohorts",
      "One-on-one mentorship matching",
      "Coding bootcamps and tech workshops",
      "Entrepreneurship incubator",
      "Public speaking and debate clubs",
      "Financial literacy programs",
    ],
    stats: [
      { label: "Youth Trained", value: "1,200+" },
      { label: "Mentors Active", value: "80" },
      { label: "Startups Supported", value: "50+" },
      { label: "Countries Reached", value: "3" },
    ],
  },
  "cultural-preservation": {
    title: "Cultural Preservation",
    subtitle: "Safeguarding Our Heritage",
    description: [
      "The Kamwe people possess a rich cultural heritage that spans centuries - from the Vecemwe language to traditional festivals, music, and artisan crafts. Our Cultural Preservation program ensures these treasures endure for future generations.",
      "We work closely with elders, linguists, and cultural historians to document the Vecemwe language, record oral histories, and digitize traditional knowledge. Our annual Cultural Festival brings together thousands to celebrate through music, dance, food, and storytelling.",
      "The program also includes an interactive Vecemwe language learning platform, cultural exchange programs with diaspora communities, and a digital archive that makes Kamwe heritage accessible to anyone, anywhere in the world.",
    ],
    image: "/images/culture.jpg",
    features: [
      "Vecemwe language documentation and courses",
      "Annual Kamwe Cultural Festival",
      "Digital heritage archive",
      "Intergenerational storytelling sessions",
      "Traditional arts and crafts workshops",
      "Cultural exchange programs",
    ],
    stats: [
      { label: "Words Documented", value: "5,000+" },
      { label: "Festival Attendees", value: "2,000+" },
      { label: "Oral Histories", value: "300+" },
      { label: "Digital Assets", value: "1,500+" },
    ],
  },
  "education-scholarships": {
    title: "Education & Scholarships",
    subtitle: "Investing in Bright Futures",
    description: [
      "Education is the most powerful tool for social transformation. Our Education & Scholarships program removes financial barriers and provides comprehensive academic support to deserving Kamwe students.",
      "Since 2023, we have awarded over 50 scholarships to students pursuing degrees in medicine, engineering, education, and the arts at universities across Nigeria and Cameroon. Beyond funding, we provide tutoring, exam preparation, and career guidance.",
      "We also partner with schools and libraries in Michika, Madagali, and other Kamwe communities to improve learning infrastructure, donate educational materials, and train teachers in modern pedagogical methods.",
    ],
    image: "/images/about-hero.jpg",
    features: [
      "Merit-based scholarship awards",
      "Exam preparation workshops",
      "Academic tutoring network",
      "School infrastructure support",
      "Teacher training programs",
      "Educational material donations",
    ],
    stats: [
      { label: "Scholarships Awarded", value: "50+" },
      { label: "Students Supported", value: "500+" },
      { label: "Partner Schools", value: "15" },
      { label: "Books Donated", value: "10,000+" },
    ],
  },
  "diaspora-connect": {
    title: "Diaspora Connect",
    subtitle: "Bridging Continents, Building Futures",
    description: [
      "Kamwe professionals and students are making their mark around the world - from Lagos to London, Abuja to Atlanta. Our Diaspora Connect program harnesses this global talent pool to create opportunities for all.",
      "Through virtual networking events, professional mentorship platforms, and investment circles, we enable knowledge transfer and capital flow back to Kamwe communities. Diaspora members mentor local youth, fund community projects, and share expertise across borders.",
      "The program also organizes homecoming events, cultural immersion trips for second-generation Kamwe youth, and an online community platform that keeps the diaspora connected to their roots.",
    ],
    image: "/images/hero-bg.jpg",
    features: [
      "Global networking events",
      "Professional mentorship platform",
      "Investment and remittance programs",
      "Homecoming and cultural trips",
      "Online community platform",
      "Skills transfer workshops",
    ],
    stats: [
      { label: "Diaspora Members", value: "600+" },
      { label: "Countries", value: "12" },
      { label: "Mentorships", value: "150+" },
      { label: "Projects Funded", value: "25" },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const program = programsData[slug]
  if (!program) return { title: "Program Not Found" }
  return {
    title: program.title,
    description: program.description[0],
  }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = programsData[slug]
  if (!program) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center overflow-hidden">
        <Image src={program.image} alt={program.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1207]/90 to-[#1a1207]/50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <Link href="/programs" className="mb-4 inline-flex items-center gap-1 text-sm text-[#d0c8b8] hover:text-gold-light">
            <ArrowLeft className="h-4 w-4" /> All Programs
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">{program.subtitle}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#f5f0e8] sm:text-5xl">{program.title}</h1>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {program.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary font-serif">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {program.description.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">{para}</p>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Get Involved <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-sm font-semibold text-primary"
                >
                  Support This Program
                </Link>
              </div>
            </div>

            {/* Features sidebar */}
            <div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-card-foreground">Program Features</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
