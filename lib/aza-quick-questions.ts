// AzaBot Quick Questions Service
// Advanced quick question system for professional interaction

export interface QuickQuestion {
  id: string
  textAr: string
  textEn: string
  category: "services" | "pricing" | "maintenance" | "calculator" | "portfolio" | "brand" | "contact"
  icon: string
  action?: () => void
}

export const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: "services-main",
    textAr: "ما هي خدماتكم الرئيسية؟",
    textEn: "What are your main services?",
    category: "services",
    icon: "🏗️",
  },
  {
    id: "pricing-estimate",
    textAr: "احسب تكلفة مشروعي",
    textEn: "Calculate my project cost",
    category: "pricing",
    icon: "💰",
  },
  {
    id: "maintenance-request",
    textAr: "أريد تقديم طلب صيانة",
    textEn: "I want to submit a maintenance request",
    category: "maintenance",
    icon: "🔧",
  },
  {
    id: "portfolio-view",
    textAr: "شاهد معرض أعمالنا",
    textEn: "View our portfolio",
    category: "portfolio",
    icon: "🖼️",
  },
  {
    id: "brand-identity",
    textAr: "خدمات الهوية التجارية",
    textEn: "Brand Identity Services",
    category: "brand",
    icon: "🎨",
  },
  {
    id: "finishing-luxury",
    textAr: "التشطيبات الفاخرة",
    textEn: "Luxury Finishing",
    category: "services",
    icon: "✨",
  },
  {
    id: "contact-us",
    textAr: "تواصل معنا الآن",
    textEn: "Contact us now",
    category: "contact",
    icon: "📞",
  },
  {
    id: "consultation-free",
    textAr: "احجز استشارة مجانية",
    textEn: "Book a free consultation",
    category: "services",
    icon: "📅",
  },
]

export const getQuestionText = (question: QuickQuestion, language: "ar" | "en"): string => {
  return language === "ar" ? question.textAr : question.textEn
}

export const getQuestionsByCategory = (category: QuickQuestion["category"]): QuickQuestion[] => {
  return QUICK_QUESTIONS.filter((q) => q.category === category)
}

export const getRandomQuestions = (count: number = 4): QuickQuestion[] => {
  const shuffled = [...QUICK_QUESTIONS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
