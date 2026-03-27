"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/contexts/language-context"
import { submitMaintenanceRequest, queryMaintenanceByNumber, queryMaintenanceByPhone, serviceTypeLabels, priorityLabels } from "@/lib/maintenance-api"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

type MaintenanceStep = "initial" | "name" | "phone" | "service" | "description" | "priority" | "submitting" | "success" | "tracking"

interface MaintenanceFormData {
  name: string
  phone: string
  service: "plumbing" | "electrical" | "ac" | "painting" | "carpentry" | "general" | ""
  description: string
  priority: "low" | "medium" | "high" | ""
  requestNumber?: string
  requestStatus?: string
}

const predefinedResponses = {
  ar: {
    greeting: "مرحباً بك في شركة العزب للإنشاءات! كيف يمكنني مساعدتك اليوم؟",
    services: "نحن نقدم خدمات التشطيبات الفاخرة، الهوية التجارية، الصيانة والتجديدات، والتوريدات العامة. أي خدمة تهمك؟",
    pricing:
      "أسعارنا تنافسية وتعتمد على نوع المشروع ومتطلباتك. يمكنك استخدام حاسبة التكلفة أو حجز استشارة مجانية للحصول على عرض سعر دقيق.",
    contact:
      "يمكنك التواصل معنا على الأرقام: +201004006620 أو +201014536600، أو عبر البريد الإلكتروني: info@al-azab.co",
    projects: "لدينا أكثر من 364 مشروع مكتمل في مختلف المجالات. يمكنك زيارة صفحة المشاريع لرؤية أعمالنا.",
    maintenance: "نقدم خدمات صيانة شاملة على مدار الساعة. يمكنك تقديم طلب صيانة من خلال النموذج المخصص.",
    default: "شكراً لسؤالك. للحصول على إجابة مفصلة، يرجى التواصل مع فريق خدمة العملاء أو حجز استشارة مجانية.",
  },
  en: {
    greeting: "Welcome to Al-Azab Construction! How can I help you today?",
    services:
      "We offer Luxury Finishing, Brand Identity, Maintenance & Renovations, and General Supplies. Which service interests you?",
    pricing:
      "Our prices are competitive and depend on project type and requirements. You can use our cost calculator or book a free consultation for an accurate quote.",
    contact: "You can reach us at: +201004006620 or +201014536600, or email us at: info@al-azab.co",
    projects: "We have completed over 364 projects across various sectors. Visit our projects page to see our work.",
    maintenance:
      "We provide comprehensive 24/7 maintenance services. You can submit a maintenance request through our dedicated form.",
    default:
      "Thank you for your question. For a detailed answer, please contact our customer service team or book a free consultation.",
  },
}

export function SmartChatbot() {
  const { language, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [maintenanceStep, setMaintenanceStep] = useState<MaintenanceStep | null>(null)
  const [maintenanceForm, setMaintenanceForm] = useState<MaintenanceFormData>({
    name: "",
    phone: "",
    service: "",
    description: "",
    priority: "",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const responses = predefinedResponses[language as keyof typeof predefinedResponses]

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chatbot opens for the first time
      const welcomeMessage: Message = {
        id: "welcome",
        text: responses.greeting,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length, responses.greeting])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("خدمة") || message.includes("خدمات") || message.includes("service")) {
      return responses.services
    }
    if (message.includes("سعر") || message.includes("تكلفة") || message.includes("price") || message.includes("cost")) {
      return responses.pricing
    }
    if (
      message.includes("تواصل") ||
      message.includes("اتصال") ||
      message.includes("contact") ||
      message.includes("phone")
    ) {
      return responses.contact
    }
    if (message.includes("مشروع") || message.includes("مشاريع") || message.includes("project")) {
      return responses.projects
    }
    if (
      message.includes("مرحبا") ||
      message.includes("السلام") ||
      message.includes("hello") ||
      message.includes("hi")
    ) {
      return responses.greeting
    }

    return responses.default
  }

  const isMaintenanceRequest = (userMessage: string): boolean => {
    const message = userMessage.toLowerCase()
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
      "plumbing",
      "electrical",
      "سباكة",
      "كهربائية",
      "تكييف",
      "دهان",
      "painting",
      "carpentry",
      "نجارة",
    ]
    return maintenanceKeywords.some((keyword) => message.includes(keyword))
  }

  const handleMaintenanceRequest = (userMessage: string) => {
    if (!maintenanceStep) {
      // Check if user is requesting maintenance
      if (isMaintenanceRequest(userMessage)) {
        setMaintenanceStep("name")
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text:
            language === "ar"
              ? "شكراً لك! سأساعدك في تقديم طلب صيانة. أولاً، ما اسمك الكامل؟"
              : "Thank you! I'll help you submit a maintenance request. First, what's your full name?",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        return true
      }
    } else {
      // Handle form steps
      switch (maintenanceStep) {
        case "name":
          setMaintenanceForm({ ...maintenanceForm, name: userMessage })
          setMaintenanceStep("phone")
          const phoneMsg: Message = {
            id: (Date.now() + 1).toString(),
            text:
              language === "ar"
                ? "شكراً! الآن، ما رقم هاتفك؟"
                : "Thanks! Now, what's your phone number?",
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, phoneMsg])
          return true

        case "phone":
          setMaintenanceForm({ ...maintenanceForm, phone: userMessage })
          setMaintenanceStep("service")
          const serviceMsg: Message = {
            id: (Date.now() + 1).toString(),
            text:
              language === "ar"
                ? "ما نوع الخدمة التي تحتاجها؟ (سباكة، كهربائية، تكييف، دهان، نجارة، أو صيانة عامة)"
                : "What type of service do you need? (Plumbing, Electrical, AC, Painting, Carpentry, or General Maintenance)",
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, serviceMsg])
          return true

        case "service":
          const selectedService = getServiceType(userMessage)
          if (selectedService) {
            setMaintenanceForm({ ...maintenanceForm, service: selectedService })
            setMaintenanceStep("description")
            const descMsg: Message = {
              id: (Date.now() + 1).toString(),
              text:
                language === "ar"
                  ? "الآن، يرجى وصف المشكلة أو الخدمة التي تحتاجها:"
                  : "Now, please describe the problem or service you need:",
              sender: "bot",
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, descMsg])
            return true
          }
          return false

        case "description":
          setMaintenanceForm({ ...maintenanceForm, description: userMessage })
          setMaintenanceStep("priority")
          const priorityMsg: Message = {
            id: (Date.now() + 1).toString(),
            text:
              language === "ar"
                ? "ما مستوى الأولوية؟ (منخفض، متوسط، أو عالي)"
                : "What's the priority level? (Low, Medium, or High)",
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, priorityMsg])
          return true

        case "priority":
          const selectedPriority = getPriorityLevel(userMessage)
          if (selectedPriority) {
            setMaintenanceForm({ ...maintenanceForm, priority: selectedPriority })
            setMaintenanceStep("submitting")
            submitRequest(userMessage)
            return true
          }
          return false
      }
    }
    return false
  }

  const getServiceType = (input: string): MaintenanceFormData["service"] | null => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("سباكة") || lowerInput.includes("plumbing")) return "plumbing"
    if (lowerInput.includes("كهربائية") || lowerInput.includes("electrical")) return "electrical"
    if (lowerInput.includes("تكييف") || lowerInput.includes("ac") || lowerInput.includes("air")) return "ac"
    if (lowerInput.includes("دهان") || lowerInput.includes("painting")) return "painting"
    if (lowerInput.includes("نجارة") || lowerInput.includes("carpentry")) return "carpentry"
    if (lowerInput.includes("عام") || lowerInput.includes("general")) return "general"
    return null
  }

  const getPriorityLevel = (input: string): MaintenanceFormData["priority"] | null => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("منخفض") || lowerInput.includes("low")) return "low"
    if (lowerInput.includes("متوسط") || lowerInput.includes("medium")) return "medium"
    if (lowerInput.includes("عالي") || lowerInput.includes("high")) return "high"
    return null
  }

  const submitRequest = async (priorityInput: string) => {
    const selectedPriority = getPriorityLevel(priorityInput)
    if (!selectedPriority || !maintenanceForm.service) return

    const finalForm = { ...maintenanceForm, priority: selectedPriority }

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text:
        language === "ar"
          ? "جاري إرسال طلبك الآن..."
          : "Submitting your request now...",
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMsg])

    try {
      const response = await submitMaintenanceRequest({
        customerName: finalForm.name,
        customerPhone: finalForm.phone,
        serviceType: finalForm.service,
        description: finalForm.description,
        priority: finalForm.priority,
      })

      if (response.success && response.requestNumber) {
        setMaintenanceForm({ ...finalForm, requestNumber: response.requestNumber })
        setMaintenanceStep("success")

        const successMsg: Message = {
          id: (Date.now() + 2).toString(),
          text:
            language === "ar"
              ? `✅ تم استلام طلبك بنجاح!\n\nرقم الطلب: ${response.requestNumber}\n\nسيتواصل معك فريقنا قريباً لتأكيد تفاصيل الخدمة.`
              : `✅ Your request has been received successfully!\n\nRequest Number: ${response.requestNumber}\n\nOur team will contact you shortly to confirm the service details.`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, successMsg])
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 2).toString(),
          text:
            language === "ar"
              ? `حدث خطأ: ${response.error}`
              : `Error: ${response.error}`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMsg])
        setMaintenanceStep(null)
        setMaintenanceForm({
          name: "",
          phone: "",
          service: "",
          description: "",
          priority: "",
        })
      }
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        text:
          language === "ar"
            ? "حدث خطأ في الاتصال. يرجى محاولة لاحقاً."
            : "Connection error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
      setMaintenanceStep(null)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const inputMsg = inputValue
    setInputValue("")
    setIsTyping(true)

    // Check if this is a maintenance request
    if (maintenanceStep !== null || isMaintenanceRequest(inputMsg)) {
      if (handleMaintenanceRequest(inputMsg)) {
        setIsTyping(false)
        return
      }
    }

    // Simulate typing delay for regular responses
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getResponse(inputMsg),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {language === "ar" ? "مساعد العزب الذكي" : "Al-Azab Smart Assistant"}
                  </h3>
                  <p className="text-xs opacity-90">{language === "ar" ? "متاح الآن" : "Online now"}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-64">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                          message.sender === "user"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {message.sender === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 text-sm ${
                          message.sender === "user"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Bot className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === "ar" ? "اكتب رسالتك..." : "Type your message..."}
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
