// AzaBot Integrations Service
// Smart routing and integration with other systems

import { QUICK_QUESTIONS } from "./aza-quick-questions"

export type IntegrationRoute = "maintenance" | "calculator" | "portfolio" | "contact" | "services" | "brand" | "consultation"

export interface IntegrationAction {
  type: IntegrationRoute
  data?: Record<string, any>
}

export class AzaIntegrations {
  public static handleQuickQuestion(questionId: string): IntegrationAction | null {
    const question = QUICK_QUESTIONS.find((q) => q.id === questionId)
    if (!question) return null

    const routeMap: Record<string, IntegrationRoute> = {
      "services-main": "services",
      "pricing-estimate": "calculator",
      "maintenance-request": "maintenance",
      "portfolio-view": "portfolio",
      "brand-identity": "brand",
      "finishing-luxury": "services",
      "contact-us": "contact",
      "consultation-free": "consultation",
    }

    return {
      type: routeMap[questionId] || "services",
      data: { questionId },
    }
  }

  public static getMaintenanceIntegration(userMessage: string): boolean {
    const maintenanceKeywords = [
      "صيانة",
      "تصليح",
      "إصلاح",
      "خلل",
      "عطل",
      "مشكلة",
      "maintenance",
      "repair",
      "fix",
      "problem",
      "issue",
    ]
    return maintenanceKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))
  }

  public static getCalculatorIntegration(userMessage: string): boolean {
    const calcKeywords = ["سعر", "تكلفة", "حساب", "cost", "price", "calculator", "estimate", "quote"]
    return calcKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))
  }

  public static getPortfolioIntegration(userMessage: string): boolean {
    const portfolioKeywords = ["مشاريع", "أعمال", "معرض", "portfolio", "projects", "work", "gallery"]
    return portfolioKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))
  }

  public static getBrandIntegration(userMessage: string): boolean {
    const brandKeywords = ["هوية", "تجارية", "brand", "identity", "design", "logo"]
    return brandKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))
  }

  public static detectIntention(userMessage: string): IntegrationRoute | null {
    if (this.getMaintenanceIntegration(userMessage)) return "maintenance"
    if (this.getCalculatorIntegration(userMessage)) return "calculator"
    if (this.getPortfolioIntegration(userMessage)) return "portfolio"
    if (this.getBrandIntegration(userMessage)) return "brand"
    return null
  }

  public static getNavigationUrl(route: IntegrationRoute): string {
    const baseUrls: Record<IntegrationRoute, string> = {
      maintenance: "/maintenance-requests",
      calculator: "/cost-calculator",
      portfolio: "/gallery",
      contact: "/contact",
      services: "/services",
      brand: "/brand-identity",
      consultation: "/consultation-booking",
    }
    return baseUrls[route] || "/"
  }

  public static formatMessageForIntegration(
    userMessage: string,
    route: IntegrationRoute,
  ): Record<string, any> {
    return {
      originalMessage: userMessage,
      route,
      timestamp: new Date().toISOString(),
      metadata: {
        detectedIntention: route,
        messageLength: userMessage.length,
        hasArabic: /[\u0600-\u06FF]/.test(userMessage),
      },
    }
  }
}

// Utility functions
export const shouldOpenIntegration = (message: string): IntegrationRoute | null => {
  return AzaIntegrations.detectIntention(message)
}

export const trackIntegrationUsage = (route: IntegrationRoute, questionId?: string): void => {
  console.log("[AzaBot] Integration tracked:", { route, questionId, timestamp: new Date().toISOString() })
}
