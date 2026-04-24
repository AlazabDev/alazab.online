"use client"

import { ScrollProgress } from "@/components/animations/scroll-progress"
import { HeroSection } from "@/components/hero-section"
import { DivisionsShowcase } from "@/components/divisions-showcase"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TestimonialSection } from "@/components/testimonial-section"
import { CTABanner } from "@/components/cta-banner"
import { EnhancedContactSection } from "@/components/enhanced-contact-section"
import { useLanguage } from "@/contexts/language-context"

export default function HomePageClient() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <ScrollProgress />

      {/* Hero Section with Full Portal Introduction */}
      <HeroSection />

      {/* Divisions Showcase - Main Service Categories */}
      <DivisionsShowcase />

      {/* Why Choose Us - Statistics & Advantages */}
      <WhyChooseUs />

      {/* Testimonials - Client Success Stories */}
      <TestimonialSection />

      {/* CTA Banner - Call to Action */}
      <CTABanner />

      <EnhancedContactSection />
    </div>
  )
}
