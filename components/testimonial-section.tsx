"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { testimonials } from "@/lib/data/testimonials"
import { FadeIn } from "@/components/animations/fade-in"

export function TestimonialSection() {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const title = {
    ar: "شهادات عملائنا",
    en: "Our Clients' Testimonials",
  }

  const subtitle = {
    ar: "استمع إلى قصص النجاح من عملائنا الراضين",
    en: "Listen to success stories from our satisfied clients",
  }

  const current = testimonials[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setAutoPlay(false)
  }

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

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
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {subtitle[language]}
          </motion.p>
        </FadeIn>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 border border-gray-100"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8 leading-relaxed">
                  "{language === "ar" ? current.quoteAr : current.quoteEn}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Avatar Placeholder */}
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-bold text-xl">
                    {(language === "ar" ? current.nameAr : current.nameEn)[0]}
                  </div>

                  {/* Author Details */}
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="font-bold text-gray-900 text-base sm:text-lg">
                      {language === "ar" ? current.nameAr : current.nameEn}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {language === "ar" ? current.companyAr : current.companyEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className={`flex gap-4 justify-center mt-8 sm:mt-10 md:mt-12`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className={`w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isRTL ? "rotate-180" : ""
                }`}
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className={`w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isRTL ? "rotate-180" : ""
                }`}
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </motion.button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setAutoPlay(false)
                  }}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-yellow-400 w-8 sm:w-10"
                      : "bg-gray-300 w-2 sm:w-3 hover:bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>

          {/* Testimonials Grid - Alternative View */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{language === "ar" ? testimonial.quoteAr : testimonial.quoteEn}</p>
                <p className="font-bold text-gray-900">{language === "ar" ? testimonial.nameAr : testimonial.nameEn}</p>
                <p className="text-gray-600 text-sm">{language === "ar" ? testimonial.companyAr : testimonial.companyEn}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
