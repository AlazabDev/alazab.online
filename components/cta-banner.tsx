"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function CTABanner() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const content = {
    ar: {
      title: "استشر فريقنا الخبير اليوم",
      subtitle: "احصل على استشارة مجانية واكتشف الحل المثالي لمشروعك",
      cta: "اتصل بنا الآن",
      whatsapp: "تواصل عبر واتس آب",
    },
    en: {
      title: "Consult Our Expert Team Today",
      subtitle: "Get a free consultation and discover the perfect solution for your project",
      cta: "Call Us Now",
      whatsapp: "Chat on WhatsApp",
    },
  }

  const copy = content[language]

  return (
    <section className={`w-full py-16 sm:py-20 md:py-24 lg:py-28 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48" />
          </div>

          {/* Content */}
          <div className="relative px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight"
              >
                {copy.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-12 leading-relaxed"
              >
                {copy.subtitle}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Phone Button */}
                <motion.a
                  href="tel:+966XXXXXXXXX"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-yellow-600 font-bold text-base sm:text-lg rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
                >
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
                  <span>{copy.cta}</span>
                </motion.a>

                {/* WhatsApp Button */}
                <motion.a
                  href="https://wa.me/966XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white/20 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2 group border-2 border-white/40 backdrop-blur-sm"
                >
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
                  <span>{copy.whatsapp}</span>
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Animated Border */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent origin-left"
          />
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 md:mt-20 ${isRTL ? "flex flex-col-reverse" : ""}`}
        >
          {/* Phone */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center border border-gray-100 hover:border-yellow-300 transition-all duration-300"
          >
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Phone className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
            </div>
            <p className="text-gray-600 text-base sm:text-lg mb-2 sm:mb-3">
              {language === "ar" ? "رقم الهاتف" : "Phone Number"}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">+966 XX XXX XXXX</p>
          </motion.div>

          {/* Email */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center border border-gray-100 hover:border-yellow-300 transition-all duration-300"
          >
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Mail className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
            </div>
            <p className="text-gray-600 text-base sm:text-lg mb-2 sm:mb-3">
              {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-900 break-all">info@alazab.com</p>
          </motion.div>

          {/* Location */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center border border-gray-100 hover:border-yellow-300 transition-all duration-300"
          >
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <ArrowRight className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
            </div>
            <p className="text-gray-600 text-base sm:text-lg mb-2 sm:mb-3">
              {language === "ar" ? "الموقع" : "Location"}
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
