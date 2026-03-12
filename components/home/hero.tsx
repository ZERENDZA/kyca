import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

async function getStats() {
  const [members, programs] = await Promise.all([
    supabase.from("members").select("id", { count: "exact", head: true }),
    supabase.from("programs").select("id", { count: "exact", head: true }).eq("published", true),
  ])

  const memberCount = members.count ?? 0
  const programCount = programs.count ?? 0

  return [
    { value: memberCount >= 1000 ? `${(memberCount / 1000).toFixed(1)}k+` : `${memberCount}+`, label: "Members Worldwide" },
    { value: "3", label: "Countries" },
    { value: `${programCount}+`, label: "Active Programs" },
  ]
}

export async function Hero() {
  const stats = await getStats()

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Kamwe youth community gathering"
        fill
        className="object-cover"
        priority
        quality={75}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1207]/90 via-[#1a1207]/70 to-[#1a1207]/40" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#1a1207]/60 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-gold-light uppercase">
              Empowering Kamwe Youth Since 2020
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#f5f0e8] sm:text-5xl lg:text-6xl">
            <span className="text-balance">Uniting Kamwe Youths{" "}</span>
            <span className="text-gold-light">Worldwide</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#d0c8b8] sm:text-lg">
            Connecting communities across Nigeria, Cameroon, and the diaspora through
            cultural preservation, quality education, and creating real opportunities
            for every Kamwe youth to thrive.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 sm:px-8 sm:text-base"
            >
              Join the Movement
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#f5f0e8]/30 bg-[#f5f0e8]/10 px-6 py-3 text-sm font-semibold text-[#f5f0e8] backdrop-blur-sm transition-all hover:bg-[#f5f0e8]/20 sm:px-8 sm:text-base"
            >
              Our Story
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gold-light font-serif sm:text-3xl">{stat.value}</p>
                <p className="text-xs text-[#a09888] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
