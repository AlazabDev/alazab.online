// AzaBot Core Service
// Main chatbot logic and response generation

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  audioUrl?: string
  isVoiceInput?: boolean
}

export interface BotResponse {
  text: string
  suggestions?: string[]
  canUseVoice?: boolean
  shouldNavigate?: boolean
  navigationUrl?: string
}

const RESPONSES_AR = {
  greeting: "مرحباً بك في عزويت! 👋\n\nأنا مساعدك الذكي. يمكنك سؤالي عن أي شيء يتعلق بخدماتنا.",
  services: `نحن نقدم:
• ✨ التشطيبات الفاخرة والتصاميم الراقية
• 🎨 خدمات الهوية التجارية الاحترافية
• 🔧 الصيانة والتجديدات على مدار الساعة
• 📦 التوريدات والمواد عالية الجودة

أي منها يهمك؟`,

  pricing:
    "لدينا حاسبة تكاليف ذكية تحسب سعر مشروعك بناءً على:\n• حجم المشروع\n• نوع التشطيبات\n• الموقع الجغرافي\n• عناصر إضافية\n\nتريد استخدامها الآن؟",

  maintenance:
    "نقدم خدمات صيانة احترافية 24/7:\n• استجابة سريعة في غضون ساعات\n• فريق متخصص وموثوق\n• ضمان على جميع الأعمال\n\nهل تريد تقديم طلب صيانة الآن؟",

  portfolio:
    "لدينا أكثر من 364 مشروع مكتمل في:\n• المنازل الفاخرة\n• المشاريع التجارية\n• المتاجر والعروض\n• المكاتب والمراكز\n\nتريد مشاهدة أعمالنا؟",

  brand:
    "خدماتنا في الهوية التجارية تشمل:\n• تصميم الشعارات\n• دليل الهوية البصرية\n• تصميم المواد الترويجية\n• بناء الهوية العلامة التجارية\n\nكيف يمكننا مساعدتك؟",

  contact:
    "يمكنك التواصل معنا:\n📞 الهاتف: +201004006620 أو +201014536600\n📧 البريد: info@al-azab.co\n📍 العنوان: القاهرة، مصر\n\nهل تريد حجز استشارة مجانية؟",

  consultation:
    "استشاراتنا المجانية تتضمن:\n✓ تقييم مشروعك\n✓ اقتراح حلول مناسبة\n✓ عرض سعر دقيق\n\nيرجى تزويدنا ببياناتك لحجز موعد.",

  default:
    "شكراً لسؤالك! 😊\n\nللحصول على إجابة مفصلة، يرجى:\n1. اختيار أحد الخيارات أعلاه\n2. أو التواصل معنا مباشرة\n3. أو حجز استشارة مجانية",

  farewell: "شكراً لتواصلك معنا! 👋\nنتطلع لخدمتك قريباً. إذا كان لديك أي أسئلة أخرى، فلا تتردد في السؤال.",
}

const RESPONSES_EN = {
  greeting: "Welcome to Azabot! 👋\n\nI'm your smart assistant. Feel free to ask me anything about our services.",
  services: `We offer:
• ✨ Luxury Finishing & Premium Design
• 🎨 Professional Brand Identity Services
• 🔧 24/7 Maintenance & Renovations
• 📦 High-Quality Supplies & Materials

Which interests you?`,

  pricing:
    "Our intelligent cost calculator computes your project price based on:\n• Project size\n• Finishing type\n• Geographic location\n• Additional elements\n\nWant to use it now?",

  maintenance:
    "We provide professional 24/7 maintenance services:\n• Quick response within hours\n• Specialized & trusted team\n• Warranty on all work\n\nWant to submit a maintenance request now?",

  portfolio:
    "We have completed over 364 projects including:\n• Luxury homes\n• Commercial projects\n• Shops & exhibitions\n• Offices & centers\n\nWant to see our work?",

  brand:
    "Our brand identity services include:\n• Logo design\n• Visual identity guidelines\n• Promotional material design\n• Brand building strategy\n\nHow can we help?",

  contact:
    "You can reach us at:\n📞 Phone: +201004006620 or +201014536600\n📧 Email: info@al-azab.co\n📍 Address: Cairo, Egypt\n\nWant to book a free consultation?",

  consultation:
    "Our free consultations include:\n✓ Project evaluation\n✓ Suitable solutions proposal\n✓ Accurate pricing\n\nPlease provide your details to book.",

  default:
    "Thank you for your question! 😊\n\nTo get a detailed answer:\n1. Choose one of the options above\n2. Contact us directly\n3. Book a free consultation",

  farewell:
    "Thank you for reaching out! 👋\nWe look forward to serving you. Feel free to ask if you have any other questions.",
}

export class AzaChatbotService {
  private responses: typeof RESPONSES_AR | typeof RESPONSES_EN

  constructor(private language: "ar" | "en" = "ar") {
    this.responses = language === "ar" ? RESPONSES_AR : RESPONSES_EN
  }

  public setLanguage(language: "ar" | "en"): void {
    this.language = language
    this.responses = language === "ar" ? RESPONSES_AR : RESPONSES_EN
  }

  public generateResponse(userMessage: string): BotResponse {
    const message = userMessage.toLowerCase().trim()

    // Greeting
    if (
      this.language === "ar"
        ? /^(مرحبا|السلام|اهلا|hi|hello)/.test(message)
        : /^(hello|hi|hey|greetings)/.test(message)
    ) {
      return {
        text: this.responses.greeting,
        canUseVoice: true,
      }
    }

    // Services
    if (
      message.includes("خدمة") ||
      message.includes("خدمات") ||
      message.includes("service") ||
      message.includes("services")
    ) {
      return {
        text: this.responses.services,
        canUseVoice: true,
      }
    }

    // Pricing & Calculator
    if (message.includes("سعر") || message.includes("تكلفة") || message.includes("price") || message.includes("cost")) {
      return {
        text: this.responses.pricing,
        shouldNavigate: true,
        navigationUrl: "/cost-calculator",
        canUseVoice: true,
      }
    }

    // Maintenance
    if (
      message.includes("صيانة") ||
      message.includes("إصلاح") ||
      message.includes("maintenance") ||
      message.includes("repair")
    ) {
      return {
        text: this.responses.maintenance,
        shouldNavigate: true,
        navigationUrl: "/maintenance-requests",
        canUseVoice: true,
      }
    }

    // Portfolio
    if (
      message.includes("مشاريع") ||
      message.includes("أعمال") ||
      message.includes("projects") ||
      message.includes("portfolio")
    ) {
      return {
        text: this.responses.portfolio,
        shouldNavigate: true,
        navigationUrl: "/gallery",
        canUseVoice: true,
      }
    }

    // Brand Identity
    if (message.includes("هوية") || message.includes("brand") || message.includes("design")) {
      return {
        text: this.responses.brand,
        shouldNavigate: true,
        navigationUrl: "/brand-identity",
        canUseVoice: true,
      }
    }

    // Contact
    if (message.includes("تواصل") || message.includes("contact") || message.includes("phone")) {
      return {
        text: this.responses.contact,
        canUseVoice: true,
      }
    }

    // Consultation
    if (message.includes("استشارة") || message.includes("consultation") || message.includes("book")) {
      return {
        text: this.responses.consultation,
        canUseVoice: true,
      }
    }

    // Farewell
    if (
      message.includes("وداع") ||
      message.includes("bye") ||
      message.includes("goodbye") ||
      message.includes("thank you")
    ) {
      return {
        text: this.responses.farewell,
        canUseVoice: true,
      }
    }

    // Default
    return {
      text: this.responses.default,
      canUseVoice: true,
    }
  }

  public createMessage(text: string, sender: "user" | "bot"): ChatMessage {
    return {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    }
  }
}

export const generateContextualResponse = (
  message: string,
  language: "ar" | "en",
): BotResponse => {
  const service = new AzaChatbotService(language)
  return service.generateResponse(message)
}
