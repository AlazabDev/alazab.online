"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { divisions } from "@/lib/data/divisions"

export function HeroSection() {
  const { language, t } = useLanguage()
  const isRTL = language === "ar"

  const heroContent = {
    ar: {
      badge: "شركة العزب للإنشاءات",
      title: "أربع شركات متخصصة.. لبناء وتشطيب وصيانة وتوريد أحلامك",
      subtitle:
        "استثنائية التشطيب السكني، احترافية تجهيز المحلات، تكامل إدارة المرافق، وصولاً إلى توريد المستحيل. تحت سقف واحد.",
      cta: "استكشف خدماتنا",
    },
    en: {
      badge: "Alazab Construction Group",
      title: "Four Specialized Companies... Building, Finishing, Maintaining, and Supplying Your Dreams",
      subtitle:
        "Exceptional residential finishing, professional commercial setup, integrated facilities management, and supply solutions. All under one roof.",
      cta: "Explore Our Services",
    },
  }

  const content = heroContent[language]

  return (
    <section className="relative w-full overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/hero-banner.jpg"
          alt="Alazab Construction - Four Specialized Services"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/55 to-black/70 z-10" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <motion.div
          className={`absolute top-16 sm:top-20 ${isRTL ? "right-4 sm:right-10" : "left-4 sm:left-10"} text-yellow-300/20`}
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
        </motion.div>

        <motion.div
          className={`absolute top-32 sm:top-40 ${isRTL ? "left-4 sm:left-20" : "right-4 sm:right-20"} text-yellow-300/15`}
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        >
          <Sparkles className="h-4 w-4 sm:h-6 sm:w-6" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{content.badge}</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
            >
              {content.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 mb-6 sm:mb-8 md:mb-10 leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              {content.subtitle}
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {divisions.slice(0, 4).map((division, index) => (
                <motion.div
                  key={division.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <Link href={division.link}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 191, 35, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-xs sm:text-sm md:text-base rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span>{language === "ar" ? division.titleAr : division.titleEn}</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mt-12 sm:mt-16 md:mt-20 flex justify-center"
            >
              <div className="text-white/60 text-center">
                <div className="text-xs sm:text-sm mb-2">{language === "ar" ? "اسحب للأسفل" : "Scroll Down"}</div>
                <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
                  <motion.div className="w-1 h-2 bg-white/60 rounded-full" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
