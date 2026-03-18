"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Diamond, Store, Wrench, Truck, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { divisions } from "@/lib/data/divisions"
import { FadeIn } from "@/components/animations/fade-in"

const iconMap = {
  diamond: Diamond,
  storefront: Store,
  wrench: Wrench,
  truck: Truck,
}

export function DivisionsShowcase() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const title = {
    ar: "مجموعتنا المتكاملة",
    en: "Our Integrated Group",
  }

  const subtitle = {
    ar: "أربع شركات متخصصة تحت سقف واحد لتلبية جميع احتياجاتك",
    en: "Four specialized companies under one roof to meet all your needs",
  }

  return (
    <section className={`w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
          >
            {title[language]}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle[language]}
          </motion.p>
        </FadeIn>

        {/* Divisions Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {divisions.map((division, index) => {
            const IconComponent = iconMap[division.icon as keyof typeof iconMap] || Diamond
            const isRightColumn = index % 2 === 1

            return (
              <motion.div
                key={division.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={division.link}>
                  <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-yellow-300">
                    {/* Card Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative p-6 sm:p-8 md:p-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className="mb-4 sm:mb-6">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                        >
                          <IconComponent className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                        {language === "ar" ? division.titleAr : division.titleEn}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed flex-grow">
                        {language === "ar" ? division.descriptionAr : division.descriptionEn}
                      </p>

                      {/* CTA */}
                      <motion.div
                        whileHover={{ x: isRTL ? -5 : 5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 text-yellow-600 font-bold group-hover:text-yellow-700"
                      >
                        <span>{language === "ar" ? "استكشف أكثر" : "Learn More"}</span>
                        <ArrowRight className={`h-5 w-5 transition-transform ${isRTL ? "rotate-180" : ""}`} />
                      </motion.div>
                    </div>

                    {/* Bottom Accent Bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className={`h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 origin-${isRightColumn ? "right" : "left"}`}
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
