import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Shield, Users, Globe, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kamwe Youth Connect Association - our mission, vision, history, and the values that drive us to empower Kamwe youth worldwide.",
}

const values = [
  {
    icon: Heart,
    title: "Unity",
    description: "Bringing Kamwe people together regardless of borders, fostering a strong sense of belonging.",
  },
  {
    icon: Shield,
    title: "Cultural Pride",
    description: "Preserving and celebrating the rich Kamwe heritage, language, and traditions for future generations.",
  },
  {
    icon: Users,
    title: "Empowerment",
    description: "Equipping youth with skills, knowledge, and opportunities to shape their own futures.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connecting communities across Nigeria, Cameroon, and the diaspora through technology and events.",
  },
]

const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "KYCA was founded by a group of passionate Kamwe youth in Michika, Adamawa State, Nigeria.",
  },
  {
    year: "2021",
    title: "Digital Launch",
    description: "Launched our first digital platform, connecting 500+ Kamwe youth across multiple cities.",
  },
  {
    year: "2022",
    title: "Cross-Border Expansion",
    description: "Extended operations to Cameroon, establishing chapters in Mokolo and Maroua.",
  },
  {
    year: "2023",
    title: "Scholarship Program",
    description: "Awarded the first batch of 25 scholarships to outstanding Kamwe students.",
  },
  {
    year: "2024",
    title: "Cultural Festival",
    description: "Hosted the inaugural Kamwe Cultural Festival with over 2,000 attendees from 3 countries.",
  },
  {
    year: "2025",
    title: "Diaspora Connect",
    description: "Launched the Diaspora Connect program linking Kamwe professionals worldwide.",
  },
  {
    year: "2026",
    title: "5,000 Members",
    description: "Reached the milestone of 5,000 active members across Nigeria, Cameroon, and the diaspora.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Kamwe community landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1207]/90 to-[#1a1207]/50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Our Story</p>
          <h1 className="mt-2 max-w-xl font-serif text-4xl font-bold tracking-tight text-[#f5f0e8] sm:text-5xl text-balance">
            About Kamwe Youth Connect Association
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d0c8b8]">
            A movement born from a shared dream of unity, cultural preservation, and empowerment
            for Kamwe youth everywhere.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-8 lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-4 font-serif text-2xl font-bold text-card-foreground">Our Mission</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To serve as the global digital hub for Kamwe youths in Nigeria, Cameroon, and the
                diaspora, fostering unity, cultural preservation, empowerment, and opportunity
                access. We connect young people with resources, mentorship, and each other to
                build a stronger, more vibrant Kamwe community worldwide.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Eye className="h-6 w-6 text-accent" />
              </div>
              <h2 className="mt-4 font-serif text-2xl font-bold text-card-foreground">Our Vision</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                A world where every Kamwe youth, regardless of location, has access to quality
                education, meaningful opportunities, and a deep connection to their cultural
                heritage. We envision a united global community where traditions thrive alongside
                innovation, creating pathways for sustainable development and collective
                prosperity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Who We Are</p>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Rooted in Heritage, Growing Globally
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  The Kamwe people, primarily located in the Michika and Madagali Local Government
                  Areas of Adamawa State, Nigeria, and neighboring communities in Cameroon, have a
                  rich cultural heritage spanning centuries. The Vecemwe language, traditional
                  festivals, and community values form the backbone of Kamwe identity.
                </p>
                <p>
                  KYCA was born from a simple yet powerful idea: that modern technology and
                  traditional values can work together to uplift an entire generation. Founded in
                  2020 by a group of passionate young Kamwe professionals and students, the
                  association has grown from a small WhatsApp group into a thriving global
                  community.
                </p>
                <p>
                  Today, we operate across three countries with over 5,000 active members,
                  running programs in education, cultural preservation, youth empowerment, and
                  diaspora connectivity. Our work has earned recognition from cultural bodies and
                  development organizations across West Africa.
                </p>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/culture.jpg"
                alt="Kamwe cultural heritage"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Foundation</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Core Values
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Journey</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Milestones
            </h2>
          </div>
          <div className="relative mt-12">
            {/* Center line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
            <div className="flex flex-col gap-8">
              {milestones.map((milestone, i) => (
                <div key={milestone.year} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="rounded-xl border border-border bg-card p-5">
                      <span className="text-xs font-semibold text-primary">{milestone.year}</span>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-card-foreground">{milestone.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Circle */}
                  <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-card md:left-1/2">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  {/* Mobile card */}
                  <div className="ml-10 md:hidden">
                    <div className="rounded-xl border border-border bg-card p-5">
                      <span className="text-xs font-semibold text-primary">{milestone.year}</span>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-card-foreground">{milestone.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Ready to Be Part of Our Story?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/80">
            Join thousands of Kamwe youth who are making a difference. Together, we are stronger.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-[#1a1207]"
            >
              Join KYCA <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
