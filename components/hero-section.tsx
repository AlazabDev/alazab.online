"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { divisions } from "@/lib/data/divisions"

export function HeroSection() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const heroContent = {
    ar: {
      label: "مجموعة العزب للإنشاءات",
      title: "أربع شركات متخصصة",
      highlight: "تحت سقف واحد",
      description:
        "استثنائية التشطيب السكني • احترافية تجهيز المحلات • تكامل إدارة المرافق • توريد المستحيل",
      primaryCta: "ابدأ معنا",
      secondaryCta: "شاهد الفيديو",
    },
    en: {
      label: "Alazab Construction Group",
      title: "Four Specialized Companies",
      highlight: "Under One Roof",
      description:
        "Exceptional Finishing • Professional Commercial Setup • Integrated Management • Complete Solutions",
      primaryCta: "Get Started",
      secondaryCta: "Watch Video",
    },
  }

  const content = heroContent[language]

  return (
    <section className="relative w-full overflow-hidden min-h-screen bg-background">
      {/* Premium Background with Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner-premium.jpg"
          alt="Alazab Construction - Premium Services"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        {/* Premium Gradient Overlay with sophisticated blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 dark:from-black/90 dark:via-black/75 dark:to-black/90" />
        {/* Additional premium vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
      </div>

      {/* Decorative Lines - Premium Design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Side accent lines */}
        <div className={`absolute top-20 ${isRTL ? "right-0 -mr-1" : "left-0 -ml-1"} bottom-20 w-px bg-gradient-to-b from-yellow-500/20 via-yellow-500/10 to-transparent`} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 w-full h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-5xl ${isRTL ? "mr-auto" : "ml-auto"} grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}>
            {/* Left Content - Text */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`${isRTL ? "lg:col-start-2" : ""} space-y-6 sm:space-y-8`}
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center"
              >
                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 backdrop-blur-xl">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold text-yellow-500/90 uppercase tracking-wider">
                    {content.label}
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-3 sm:space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight hero-title">
                  {content.title}
                </h1>
                <div className="relative">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight hero-highlight">
                    {content.highlight}
                  </h2>
                  {/* Decorative underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-yellow-500/40 via-yellow-500 to-yellow-500/40 rounded-full origin-left"
                    style={{ width: "80%" }}
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl"
              >
                {content.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`flex flex-col sm:flex-row gap-4 pt-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Primary Button */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="hero-button-primary relative group px-8 sm:px-10 py-3 sm:py-4 text-black font-bold text-sm sm:text-base flex items-center gap-2 justify-center w-full sm:w-auto">
                    <span>{content.primaryCta}</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </button>
                </motion.div>

                {/* Secondary Button */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="hero-button-secondary relative group px-8 sm:px-10 py-3 sm:py-4 text-white font-bold text-sm sm:text-base flex items-center gap-2 justify-center w-full sm:w-auto">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </motion.div>
                    <span>{content.secondaryCta}</span>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden lg:grid grid-cols-2 gap-4 auto-rows-max"
            >
              {divisions.slice(0, 4).map((division, index) => (
                <motion.div
                  key={division.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(245, 191, 35, 0.15)" }}
                  className={`group cursor-pointer ${index % 2 === 0 ? "lg:col-span-1" : "lg:col-span-1"} ${
                    index === 3 ? "lg:col-start-2" : ""
                  }`}
                >
                  <Link href={division.link} className="block h-full">
                    <div className="hero-feature-card relative h-48 sm:h-56 p-6">
                      {/* Decorative corner accent */}
                      <motion.div
                        className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        <div className="relative w-full h-full">
                          <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-yellow-500/60 to-transparent" />
                          <div className="absolute top-0 right-0 h-8 w-px bg-gradient-to-b from-yellow-500/60 to-transparent" />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <motion.div
                            className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center mb-4 border border-yellow-500/20 group-hover:border-yellow-500/50 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-yellow-400 to-yellow-500 group-hover:shadow-lg transition-all" />
                          </motion.div>
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                            {language === "ar" ? division.titleAr : division.titleEn}
                          </h3>
                          <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">
                            {language === "ar" ? division.descriptionAr : division.descriptionEn}
                          </p>
                        </div>
                      </div>

                      {/* Animated arrow */}
                      <motion.div
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: 10, y: 10 }}
                        whileHover={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="w-8 h-8 rounded-full border border-yellow-500/40 flex items-center justify-center group-hover:bg-yellow-500/10 transition-colors">
                          <ArrowRight className="w-4 h-4 text-yellow-500" />
                        </div>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hero-scroll-indicator"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs sm:text-sm text-white/70 font-semibold uppercase tracking-wider hover:text-yellow-500/80 transition-colors cursor-pointer">
            {language === "ar" ? "اكتشف المزيد" : "Scroll to explore"}
          </span>
          <motion.div
            className="group cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 group-hover:border-yellow-500/60 transition-all duration-300 backdrop-blur-sm">
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-yellow-500/0 group-hover:bg-yellow-500/10 rounded-full transition-all duration-300 blur-lg" />
              
              {/* Moving dot */}
              <motion.div
                animate={{ y: [2, 8, 2] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="hero-scroll-dot w-1.5 h-2.5 bg-gradient-to-b from-yellow-500 to-yellow-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
    </section>
  )
}
