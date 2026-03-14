"use client"

import { useState } from "react"
import Script from "next/script"
import Link from "next/link"
import { Building2, Handshake, Globe, Award, Star, Check, ArrowRight, Users, Eye, Heart, Shield } from "lucide-react"

const tiers = [
  {
    name: "Bronze Partner",
    price: "₦500,000",
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
    price: "₦2,000,000",
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
    price: "₦5,000,000",
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

export default function SponsorshipContent() {
  const [customAmount, setCustomAmount] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donorName, setDonorName] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSponsor = (tierPrice?: string, tierName?: string) => {
    if (!donorEmail) {
      setError("Please enter your email address below.")
      return
    }
    setError("")

    let amount = 0
    if (tierPrice) {
      amount = parseInt(tierPrice.replace(/[^0-9]/g, ""))
    } else {
      amount = parseInt(customAmount.replace(/[^0-9]/g, ""))
    }

    if (!amount || amount <= 0) {
      setError("Please enter a valid sponsorship amount.")
      return
    }

    if (!(window as any).PaystackPop) {
      setError("Payment system not loaded yet. Please wait a moment and try again.")
      return
    }

    try {
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: donorEmail,
        amount: amount * 100,
        currency: "NGN",
        ref: `sponsor-${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: "Sponsor Name", variable_name: "sponsor_name", value: donorName || "Anonymous" },
            { display_name: "Tier", variable_name: "tier", value: tierName || "Custom Sponsorship" },
          ],
        },
        callback: (response: any) => {
          fetch("/api/donate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: donorName,
              email: donorEmail,
              amount: amount,
              cause: `Sponsorship: ${tierName || "Custom"}`,
              frequency: "once",
              reference: response.reference,
              status: "paid",
            }),
          }).then(() => setSubmitted(true))
        },
        onClose: () => {},
      })
      handler.openIframe()
    } catch (e: any) {
      console.error("Paystack error:", e)
      setError("Payment error: " + (e?.message || JSON.stringify(e)))
    }
  }

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
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
                <button
                  onClick={() => handleSponsor(tier.price, tier.name)}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                    tier.popular
                      ? "bg-gold text-[#1a1207] hover:opacity-90"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Become a Partner <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Custom Sponsorship Card */}
            <div className="relative flex flex-col rounded-xl border border-border bg-card p-6 lg:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">Custom Support</h3>
              <p className="mt-1 text-sm text-muted-foreground">Every contribution helps us reach more youth.</p>
              
              <div className="mt-6">
                <label className="sr-only">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₦</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-3 pl-7 pr-3 text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-1 flex-col justify-end">
                <button
                  onClick={() => handleSponsor()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-accent text-accent px-5 py-2.5 text-sm font-semibold transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  Contribute Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Donor Info Section */}
          <div className="mt-12 mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 lg:p-8">
            <h3 className="font-serif text-lg font-semibold text-card-foreground">Partner Information</h3>
            <p className="text-sm text-muted-foreground mb-6">Enter your details to proceed with sponsorship.</p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Full Name / Organization</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="KYCA Ltd"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            {submitted && (
              <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
                <p className="text-sm font-medium text-green-800">Thank you for your partnership! Payment successful.</p>
              </div>
            )}
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              Secure payment processing via Paystack.
            </div>
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
                  { title: "Social Impact", desc: "Every Naira funds education, mentorship, and cultural preservation programs." },
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
