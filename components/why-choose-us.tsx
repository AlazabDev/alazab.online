"use client"

import { motion } from "framer-motion"
import { Award, Briefcase, Building2, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { statistics } from "@/lib/data/statistics"
import { CountUp } from "@/components/animations/count-up"
import { FadeIn } from "@/components/animations/fade-in"

const iconMap = {
  award: Award,
  briefcase: Briefcase,
  "building-2": Building2,
  users: Users,
}

export function WhyChooseUs() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const title = {
    ar: "لماذا تختار العزب؟",
    en: "Why Choose Alazab?",
  }

  const subtitle = {
    ar: "نقدم خدمات متميزة مع فريق متخصص وخبرة عميقة في مجال البناء والإنشاءات",
    en: "We provide exceptional services with a specialized team and deep expertise in construction and development",
  }

  return (
    <section className={`w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white ${isRTL ? "rtl" : "ltr"}`}>
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

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {statistics.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Award

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative group">
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />

                  {/* Content */}
                  <div className="relative p-6 sm:p-8 text-center">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4 sm:mb-6"
                    >
                      <IconComponent className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
                    </motion.div>

                    {/* Number */}
                    <div className="mb-2 sm:mb-3">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                        <CountUp
                          end={language === "ar" ? stat.valueAr : stat.valueEn}
                          duration={2}
                          suffix={stat.suffix}
                          className="inline-block text-yellow-600"
                        />
                      </div>
                    </div>

                    {/* Label */}
                    <p className="text-gray-600 text-base sm:text-lg font-semibold leading-relaxed">
                      {language === "ar" ? stat.labelAr : stat.labelEn}
                    </p>
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-2xl transition-colors duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Benefits - Optional Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-white border border-yellow-200 rounded-2xl p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              {language === "ar" ? "مميزاتنا" : "Our Advantages"}
            </h3>
            <ul
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-gray-700 text-base sm:text-lg ${isRTL ? "flex flex-col-reverse" : ""}`}
            >
              {[
                {
                  ar: "فريق متخصص وذو خبرة عالية",
                  en: "Specialized team with high expertise",
                },
                {
                  ar: "معايير جودة عالية جداً",
                  en: "Very high quality standards",
                },
                {
                  ar: "التزام بالمواعيد والجودة",
                  en: "Commitment to deadlines and quality",
                },
                {
                  ar: "خدمة عملاء ممتازة",
                  en: "Excellent customer service",
                },
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 sm:h-3 sm:w-3 bg-yellow-500 rounded-full flex-shrink-0" />
                  <span>{language === "ar" ? benefit.ar : benefit.en}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
