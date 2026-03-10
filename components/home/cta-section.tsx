import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Users } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 lg:py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
              Be Part of Something Greater
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-primary-foreground/80">
              Whether you are a student in Michika, a professional in Lagos, or part of the
              Kamwe diaspora abroad — your voice and contribution matter. Join us in shaping
              a stronger, more connected Kamwe community for generations to come.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/membership" className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-[#1a1207] transition-all hover:bg-gold-light sm:text-base">
                <Users className="h-5 w-5" />Become a Member
              </Link>
              <Link href="/donate" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10 sm:text-base">
                <Heart className="h-5 w-5" />Support Our Cause
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/images/culture.jpg" alt="Kamwe cultural heritage" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <ArrowRight className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Active in 3 Countries</p>
                  <p className="text-xs text-muted-foreground">Nigeria, Cameroon & Diaspora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
