"use client"

import { useState } from "react"
import Script from "next/script"
import Link from "next/link"
import { Heart, Gift, BookOpen, Globe, Users, Check, ArrowRight, Shield } from "lucide-react"

const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000]

const causes = [
  {
    id: "education",
    title: "Education & Scholarships",
    description: "Fund scholarships, learning materials, and educational programs for Kamwe youth.",
    icon: BookOpen,
    raised: 12500,
    goal: 25000,
  },
  {
    id: "culture",
    title: "Cultural Preservation",
    description: "Support Vecemwe language documentation, festivals, and heritage conservation.",
    icon: Globe,
    raised: 8200,
    goal: 15000,
  },
  {
    id: "empowerment",
    title: "Youth Empowerment",
    description: "Fund skills training, mentorship programs, and entrepreneurship support.",
    icon: Users,
    raised: 18000,
    goal: 30000,
  },
  {
    id: "general",
    title: "General Fund",
    description: "Support wherever the need is greatest across all KYCA programs.",
    icon: Heart,
    raised: 32000,
    goal: 50000,
  },
]

export default function DonatePage() {
  const [amount, setAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCause, setSelectedCause] = useState("general")
  const [frequency, setFrequency] = useState<"once" | "monthly">("once")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const donationAmount = customAmount ? parseFloat(customAmount) : amount

  function handleDonate() {
    if (!donorEmail) { setError("Please enter your email address."); return }
    if (!donationAmount || donationAmount <= 0) { setError("Please select or enter a valid amount."); return }
    setError("")

    if (!(window as any).PaystackPop) {
      setError("Payment system not loaded yet. Please wait a moment and try again.")
      return
    }

    try {
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: donorEmail,
        amount: Math.round(donationAmount * 100),
        currency: "NGN",
        ref: `kyca-${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: "Donor Name", variable_name: "donor_name", value: donorName || "Anonymous" },
            { display_name: "Cause", variable_name: "cause", value: selectedCause },
            { display_name: "Frequency", variable_name: "frequency", value: frequency },
          ],
        },
        callback: (response: any) => {
          fetch("/api/donate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: donorName,
              email: donorEmail,
              amount: donationAmount,
              cause: selectedCause,
              frequency,
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
      {/* Load Paystack inline script */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />

      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <Heart className="h-7 w-7 text-accent" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Make a Difference</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Support the Kamwe Youth Movement
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Every contribution, no matter the size, helps us build a brighter future for Kamwe
              youth across Nigeria, Cameroon, and the diaspora.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
                {/* Frequency Toggle */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-card-foreground">Donation Frequency</h3>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setFrequency("once")}
                      className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                        frequency === "once"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-foreground hover:border-primary/30"
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      onClick={() => setFrequency("monthly")}
                      className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                        frequency === "monthly"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-foreground hover:border-primary/30"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mt-8">
                  <h3 className="font-serif text-lg font-semibold text-card-foreground">Select Amount (NGN ₦)</h3>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => {
                          setAmount(preset)
                          setCustomAmount("")
                        }}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                          amount === preset && !customAmount
                            ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                            : "border border-border bg-background text-foreground hover:border-primary/30"
                        }`}
                      >
                        ₦{preset.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label htmlFor="custom-amount" className="sr-only">Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₦</span>
                      <input
                        id="custom-amount"
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setAmount(null)
                        }}
                        className="w-full rounded-lg border border-input bg-background py-3 pl-7 pr-3 text-sm text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Cause Selection */}
                <div className="mt-8">
                  <h3 className="font-serif text-lg font-semibold text-card-foreground">Direct Your Gift</h3>
                  <div className="mt-3 flex flex-col gap-3">
                    {causes.map((cause) => (
                      <button
                        key={cause.id}
                        onClick={() => setSelectedCause(cause.id)}
                        className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                          selectedCause === cause.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-border bg-background hover:border-primary/30"
                        }`}
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          selectedCause === cause.id ? "bg-primary/10" : "bg-secondary"
                        }`}>
                          <cause.icon className={`h-5 w-5 ${selectedCause === cause.id ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${selectedCause === cause.id ? "text-primary" : "text-card-foreground"}`}>
                            {cause.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{cause.description}</p>
                          {/* Progress bar */}
                          <div className="mt-2">
                            <div className="h-1.5 w-full rounded-full bg-secondary">
                              <div
                                className="h-1.5 rounded-full bg-accent"
                                style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                              />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              ₦{cause.raised.toLocaleString()} raised of ₦{cause.goal.toLocaleString()} goal
                            </p>
                          </div>
                        </div>
                        {selectedCause === cause.id && (
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donor Info */}
                <div className="mt-8">
                  <h3 className="font-serif text-lg font-semibold text-card-foreground">Your Information</h3>
                  <div className="mt-3 flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="donor-name" className="mb-1 block text-sm font-medium text-card-foreground">Full Name</label>
                        <input
                          id="donor-name"
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Your name"
                          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                        />
                      </div>
                      <div>
                        <label htmlFor="donor-email" className="mb-1 block text-sm font-medium text-card-foreground">Email</label>
                        <input
                          id="donor-email"
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                        />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <input id="anonymous" type="checkbox" className="mt-1 h-4 w-4 rounded border-input accent-primary" />
                      <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                        Make my donation anonymous
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                {submitted ? (
                  <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                      <Heart className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-bold text-card-foreground">Thank You!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your payment was successful. We are grateful for your support!
                    </p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <p className="mt-6 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
                    )}
                    <button
                      onClick={handleDonate}
                      className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90"
                    >
                      <Heart className="h-4 w-4" />
                      Donate {donationAmount ? `₦${donationAmount.toLocaleString()}` : ""} {frequency === "monthly" ? "Monthly" : "Now"}
                    </button>
                  </>
                )}

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" />
                  Secure payment processing. Your information is protected.
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Impact Summary */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-card-foreground">Your Impact</h3>
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { amount: "₦1,000", impact: "Provides school supplies for 1 student for a month" },
                    { amount: "₦5,000", impact: "Funds a Vecemwe language learning module" },
                    { amount: "₦10,000", impact: "Supports mentorship for 2 youth for 3 months" },
                    { amount: "₦25,000", impact: "Sponsors a student for a skills training workshop" },
                    { amount: "₦50,000", impact: "Funds a community cultural preservation event" },
                    { amount: "₦100,000", impact: "Provides a full scholarship for one semester" },
                  ].map((item) => (
                    <div key={item.amount} className="flex gap-3">
                      <span className="flex h-8 w-14 shrink-0 items-center justify-center rounded-md bg-gold/10 text-xs font-bold text-gold">
                        {item.amount}
                      </span>
                      <p className="text-sm text-muted-foreground">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Ways */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-card-foreground">Other Ways to Give</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <Gift className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">In-Kind Donations</p>
                      <p className="text-xs text-muted-foreground">Donate equipment, books, or services.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">Volunteer Time</p>
                      <p className="text-xs text-muted-foreground">Share your skills as a mentor or instructor.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Globe className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">Corporate Matching</p>
                      <p className="text-xs text-muted-foreground">Double your impact through employer matching.</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Contact us for details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Testimonial */}
              <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
                <p className="text-sm italic leading-relaxed text-foreground">
                  {'"'}Thanks to KYCA donors, I received a scholarship that changed my life. I am now studying
                  computer science and giving back to my community.{'"'}
                </p>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-foreground">Sarah M.</p>
                  <p className="text-xs text-muted-foreground">KYCA Scholar, Class of 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
