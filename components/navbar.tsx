"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Youth Empowerment", href: "/programs/youth-empowerment" },
      { label: "Cultural Preservation", href: "/programs/cultural-preservation" },
      { label: "Education & Scholarships", href: "/programs/education-scholarships" },
      { label: "Diaspora Connect", href: "/programs/diaspora-connect" },
    ],
  },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Resources", href: "/resources" },
  { label: "Sponsorship", href: "/sponsorship" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src="/images/logo.jpeg"
              alt="KYCA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground font-serif tracking-tight">KYCA</span>
            <span className="text-[10px] leading-none text-muted-foreground tracking-widest uppercase">Kamwe Youth Connect</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary rounded-md hover:bg-secondary"
                  aria-expanded={dropdownOpen === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {dropdownOpen === link.label && (
                  <div className="absolute left-0 top-full mt-0.5 w-60 rounded-lg border border-border bg-card p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary rounded-md hover:bg-secondary"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/membership"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Join KYCA
          </Link>
          <Link
            href="/donate"
            className="rounded-lg border-2 border-gold bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-gold hover:text-primary-foreground"
          >
            Donate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                      className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground rounded-md hover:bg-secondary"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen === link.label && (
                      <div className="ml-4 flex flex-col gap-0.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-foreground rounded-md hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Link href="/membership" onClick={() => setMobileOpen(false)} className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">
                Join KYCA
              </Link>
              <Link href="/donate" onClick={() => setMobileOpen(false)} className="rounded-lg border-2 border-gold px-5 py-2.5 text-center text-sm font-semibold text-foreground">
                Donate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
