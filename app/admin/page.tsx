"use client"

import { useEffect, useState } from "react"
import { FileText, Calendar, Images, Users, CreditCard, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"

const sections = [
  { label: "Posts", href: "/admin/posts", icon: FileText, color: "bg-blue-500/10 text-blue-500", api: "/api/posts" },
  { label: "Events", href: "/admin/events", icon: Calendar, color: "bg-green-500/10 text-green-500", api: "/api/events" },
  { label: "Gallery", href: "/admin/gallery", icon: Images, color: "bg-purple-500/10 text-purple-500", api: "/api/gallery" },
  { label: "Leadership", href: "/admin/leadership", icon: Users, color: "bg-orange-500/10 text-orange-500", api: "/api/leadership" },
  { label: "Programs", href: "/admin/programs", icon: BookOpen, color: "bg-pink-500/10 text-pink-500", api: "/api/programs" },
  { label: "Members", href: "/admin/members", icon: Users, color: "bg-yellow-500/10 text-yellow-500", api: "/api/members" },
  { label: "Payments", href: "/admin/payments", icon: CreditCard, color: "bg-emerald-500/10 text-emerald-500", api: "/api/payments" },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    sections.forEach(async (s) => {
      try {
        const res = await fetch(s.api)
        const data = await res.json()
        setCounts((prev) => ({ ...prev, [s.label]: Array.isArray(data) ? data.length : 0 }))
      } catch {}
    })
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome to the KYCA admin panel.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.label}
            href={section.href}
            className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${section.color}`}>
              <section.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground">
              {counts[section.label] ?? "—"}
            </p>
            <p className="text-sm text-muted-foreground">{section.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-serif text-lg font-semibold text-foreground">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {sections.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
            >
              + Add {s.label.slice(0, -1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
