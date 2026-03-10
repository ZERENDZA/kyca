"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building2, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/kyca_national/profilecard/?igsh=MXhmYjZ6MjczbHNwZQ==", icon: Instagram, color: "hover:text-pink-500 hover:border-pink-500" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083362591307&mibextid=ZbWKwL", icon: Facebook, color: "hover:text-blue-600 hover:border-blue-600" },
  { label: "X", href: "https://x.com/Kyca_National", icon: Twitter, color: "hover:text-foreground hover:border-foreground" },
  { label: "Telegram", href: "https://t.me/+EMrtMnDHoEswYTI0", icon: Send, color: "hover:text-sky-500 hover:border-sky-500" },
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029VbBKcM49hXFAWC4G591s", icon: MessageSquare, color: "hover:text-green-500 hover:border-green-500" },
]

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@kyca.org",
    href: "mailto:info@kyca.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 (0) 803 XXX XXXX",
    href: "tel:+2348030000000",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "Michika LGA, Adamawa State, Nigeria",
    href: "#",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon - Fri, 9:00 AM - 5:00 PM WAT",
    href: "#",
  },
]

const subjects = [
  "General Inquiry",
  "Membership Question",
  "Sponsorship / Partnership",
  "Program Information",
  "Volunteer / Mentorship",
  "Technical Support",
  "Media / Press",
  "Other",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-7 w-7 text-primary" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Get in Touch</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Have a question, suggestion, or want to get involved? We would love to hear from you.
              Reach out and a team member will respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-card-foreground">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
                <h2 className="font-serif text-2xl font-bold text-card-foreground">Send a Message</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill out the form below and we will get back to you as soon as possible.
                </p>

                {submitted ? (
                  <div className="mt-8 py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                      <Send className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">Message Sent!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thank you for reaching out. We will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: "", email: "", subject: "", message: "" })
                      }}
                      className="mt-4 text-sm font-medium text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-card-foreground">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-card-foreground">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="mb-1 block text-sm font-medium text-card-foreground">
                        Subject <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-card-foreground">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                    >
                      <Send className="h-4 w-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Quick Links */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-card-foreground">Quick Links</h3>
                <p className="mt-1 text-sm text-muted-foreground">Looking for something specific?</p>
                <div className="mt-4 flex flex-col gap-2">
                  {[
                    { label: "Join KYCA", href: "/membership", icon: Users },
                    { label: "Become a Sponsor", href: "/sponsorship", icon: Building2 },
                    { label: "Make a Donation", href: "/donate", icon: Mail },
                    { label: "View Programs", href: "/programs", icon: ArrowRight },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <link.icon className="h-4 w-4 text-muted-foreground" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Regional Contacts */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-card-foreground">Regional Contacts</h3>
                <div className="mt-4 flex flex-col gap-4">
                  {[
                    { region: "Nigeria HQ", contact: "Michika, Adamawa State", email: "nigeria@kyca.org" },
                    { region: "Cameroon Chapter", contact: "Northern Cameroon", email: "cameroon@kyca.org" },
                    { region: "UK Diaspora", contact: "London, United Kingdom", email: "uk@kyca.org" },
                    { region: "US Diaspora", contact: "Washington D.C., USA", email: "usa@kyca.org" },
                  ].map((r) => (
                    <div key={r.region} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
                      <p className="text-sm font-semibold text-card-foreground">{r.region}</p>
                      <p className="text-xs text-muted-foreground">{r.contact}</p>
                      <a href={`mailto:${r.email}`} className="text-xs font-medium text-primary hover:underline">
                        {r.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">Follow Us</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Stay connected and follow our journey on social media.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow KYCA on ${s.label}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors ${s.color}`}
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground">Common Questions</h2>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            {[
              {
                q: "How do I become a KYCA member?",
                a: "Visit our Membership page to sign up. We offer free Basic membership and paid tiers with additional benefits.",
              },
              {
                q: "Can I volunteer with KYCA?",
                a: "Absolutely! We welcome volunteers for mentoring, event organization, content creation, and more. Use the contact form above to express your interest.",
              },
              {
                q: "Is KYCA open to non-Kamwe individuals?",
                a: "While our focus is on Kamwe youth, we welcome allies and supporters from all backgrounds who share our values of cultural preservation and youth empowerment.",
              },
              {
                q: "How are donations used?",
                a: "All donations go directly to our programs: education and scholarships, cultural preservation, youth empowerment, and community events. We publish annual transparency reports.",
              },
              {
                q: "Does KYCA operate internationally?",
                a: "Yes, we have active chapters in Nigeria, Cameroon, the UK, and the USA, with community members across the global diaspora.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-serif text-base font-semibold text-card-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}