import { Hero } from "@/components/home/hero"
import { ProgramsPreview } from "@/components/home/programs-preview"
import { FeaturedOpportunities } from "@/components/home/featured-opportunities"
import { CTASection } from "@/components/home/cta-section"
import { NewsPreview } from "@/components/home/news-preview"
import { GalleryPreview } from "@/components/home/gallery-preview"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramsPreview />
      <FeaturedOpportunities />
      <GalleryPreview />
      <NewsPreview />
      <CTASection />
    </>
  )
}