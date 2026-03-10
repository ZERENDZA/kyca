import type { Metadata } from "next"
import Link from "next/link"
import { Building2, Handshake, Globe, Award, Star, Check, ArrowRight, Users, Eye, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Partner with KYCA to empower Kamwe youth. Explore sponsorship tiers, benefits, and how your organization can make a lasting impact.",
}

const tiers = [
  {
    name: "Bronze Partner",
    price: "$500",
    period: "/year",
    icon: Handshake,
    color: "text-[#cd7f32]",
    bgColor: "bg-[#cd7f32]/10",
    borderColor: "border-[#cd7f32]/30",
    description: "Support our community programs with essential funding.",
    benefits: [
      "Logo on KYCA website",
      "Mention in quarterly newsletter",
      "Social media shoutout",
      "Certificate of partnership",
      "Annual impact report",
    ],
    popular: false,
  },
  {
    name: "Silver Partner",
    price: "$2,000",
    period: "/year",
    icon: Star,
    color: "text-[#9ca3af]",
    bgColor: "bg-[#9ca3af]/10",
    borderColor: "border-[#9ca3af]/30",
    description: "Amplify your impact with enhanced visibility and direct engagement.",
    benefits: [
      "Everything in Bronze",
      "Logo on event materials",
      "Booth at KYCA annual conference",
      "Featured sponsor spotlight",
      "Priority recruitment access",
      "Quarterly engagement meeting",
    ],
    popular: false,
  },
  {
    name: "Gold Partner",
    price: "$5,000",
    period: "/year",
    icon: Award,
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    description: "Premium partnership with maximum visibility and naming rights.",
    benefits: [
      "Everything in Silver",
      "Program naming rights",
      "Keynote at annual conference",
      "Exclusive networking dinner",
      "Custom impact campaign",
      "Youth talent pipeline access",
      "Co-branded content creation",
      "VIP seating at all events",
    ],
    popular: true,
  },
]

const impactStats = [
  { value: "2,500+", label: "Youth Reached", icon: Users },
  { value: "15+", label: "Active Programs", icon: Globe },
  { value: "3", label: "Countries", icon: Eye },
  { value: "95%", label: "Satisfaction Rate", icon: Heart },
]

const pastPartners = [
  "TechBridge Africa",
  "Michika LGA",
  "Adamawa Youth Council",
  "Heritage Foundation NG",
  "DiasporaLink",
  "African Dev Bank",
]

export default function SponsorshipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
              <Building2 className="h-7 w-7 text-gold" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Partner With Us</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Sponsor the Future of Kamwe Youth
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Your sponsorship directly empowers the next generation of Kamwe leaders through education,
              cultural preservation, and opportunity access across three countries.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#tiers"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                View Tiers <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="mt-3 font-serif text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section id="tiers" className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Investment Tiers</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Choose Your Partnership Level
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Every tier includes a tangible impact report so you can see exactly how your
              sponsorship is transforming lives.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-xl border p-6 lg:p-8 ${
                  tier.popular
                    ? "border-gold bg-card shadow-lg ring-2 ring-gold/20"
                    : "border-border bg-card"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gold px-4 py-1 text-xs font-semibold text-[#1a1207]">
                      Recommended
                    </span>
                  </div>
                )}
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tier.bgColor}`}>
                  <tier.icon className={`h-6 w-6 ${tier.color}`} />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                <p className="mt-4">
                  <span className="font-serif text-3xl font-bold text-card-foreground">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                    tier.popular
                      ? "bg-gold text-[#1a1207] hover:opacity-90"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Become a Partner <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Why Partner With KYCA</p>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground">
                Your Investment Creates Lasting Change
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                KYCA is not just an organization - it is a movement. Our sponsors gain access to a vibrant
                network of talented young people across Nigeria, Cameroon, and the global diaspora while
                making a measurable difference in their communities.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  { title: "Brand Visibility", desc: "Reach thousands of engaged youth across three countries and the diaspora." },
                  { title: "Talent Pipeline", desc: "Connect with skilled, motivated young professionals ready to contribute." },
                  { title: "Social Impact", desc: "Every dollar funds education, mentorship, and cultural preservation programs." },
                  { title: "Community Trust", desc: "Align your brand with a respected community organization with proven results." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="font-serif text-lg font-semibold text-card-foreground">Our Sponsors & Partners</h3>
              <p className="mt-1 text-sm text-muted-foreground">Trusted by organizations who believe in our mission.</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {pastPartners.map((partner) => (
                  <div key={partner} className="flex items-center justify-center rounded-lg border border-border bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Ready to Make an Impact?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
            Let us discuss a partnership that aligns with your goals and creates meaningful
            change for Kamwe youth worldwide.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-[#1a1207] transition-all hover:opacity-90"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:border-primary-foreground"
            >
              Or Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
