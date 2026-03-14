import type { Metadata } from "next"
import SponsorshipContent from "@/components/sponsorship/SponsorshipContent"

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Partner with KYCA to empower Kamwe youth. Explore sponsorship tiers, benefits, and how your organization can make a lasting impact.",
}

export default function SponsorshipPage() {
  return <SponsorshipContent />
}
