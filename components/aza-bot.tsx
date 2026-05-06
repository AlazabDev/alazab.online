"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Mic, Volume2, Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/contexts/language-context"
import { ChatMessage, AzaChatbotService } from "@/lib/aza-chatbot-service"
import { QUICK_QUESTIONS, getQuestionText } from "@/lib/aza-quick-questions"
import { AzaSpeechRecognition, isSpeechRecognitionSupported, getLanguageCode } from "@/lib/aza-speech-service"
import { AzaTextToSpeech, isTextToSpeechSupported } from "@/lib/aza-tts-service"
import { AzaIntegrations } from "@/lib/aza-integrations"

interface ChatTab {
  id: "text" | "voice"
  label: string
  icon: string
}

const CHAT_TABS: ChatTab[] = [
  { id: "text", label: "محادثة نصية", icon: "💬" },
  { id: "voice", label: "محادثة صوتية", icon: "🎙️" },
]

export function AzaBot() {
  const { language, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"text" | "voice">("text")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechRecognition, setSpeechRecognition] = useState<AzaSpeechRecognition | null>(null)
  const [tts, setTts] = useState<AzaTextToSpeech | null>(null)
  const [chatbotService, setChatbotService] = useState<AzaChatbotService | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize services
  useEffect(() => {
    const langCode = getLanguageCode(language as "ar" | "en")
    const speechRec = new AzaSpeechRecognition(langCode)
    setSpeechRecognition(speechRec)

    const textToSpeech = new AzaTextToSpeech(language as "ar" | "en")
    setTts(textToSpeech)

    const service = new AzaChatbotService(language as "ar" | "en")
    setChatbotService(service)
  }, [language])

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0 && chatbotService) {
      const welcomeMessage = chatbotService.createMessage(
        language === "ar"
          ? "مرحباً! 👋 كيف يمكنني مساعدتك اليوم؟"
          : "Hello! 👋 How can I help you today?",
        "bot",
      )
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length, chatbotService, language])

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !chatbotService) return

      const userMessage = chatbotService.createMessage(text, "user")
      setMessages((prev) => [...prev, userMessage])
      setInputValue("")
      setIsLoading(true)

      // Simulate typing delay
      setTimeout(() => {
        const response = chatbotService.generateResponse(text)
        const botMessage = chatbotService.createMessage(response.text, "bot")
        setMessages((prev) => [...prev, botMessage])

        // Check for integration navigation
        if (response.shouldNavigate && response.navigationUrl) {
          setTimeout(() => {
            window.location.href = response.navigationUrl!
          }, 1000)
        }

        // Speak response if TTS is available
        if (response.canUseVoice && tts && activeTab === "voice") {
          tts.speak(response.text)
        }

        setIsLoading(false)
      }, 800)
    },
    [chatbotService, tts, activeTab],
  )

  const handleStartListening = useCallback(() => {
    if (!speechRecognition || !isSpeechRecognitionSupported()) return

    setIsListening(true)
    speechRecognition.startListening((transcript, isFinal) => {
      setInputValue(transcript)
      if (isFinal) {
        setIsListening(false)
        if (transcript.trim()) {
          setTimeout(() => {
            handleSendMessage(transcript)
          }, 500)
        }
      }
    })
  }, [speechRecognition, handleSendMessage])

  const handleQuickQuestion = (questionId: string) => {
    const question = QUICK_QUESTIONS.find((q) => q.id === questionId)
    if (!question) return

    const text = getQuestionText(question, language as "ar" | "en")
    handleSendMessage(text)

    // Track integration
    const action = AzaIntegrations.handleQuickQuestion(questionId)
    if (action) {
      console.log("[AzaBot] Integration action:", action)
    }
  }

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const isSpeechSupported = isSpeechRecognitionSupported()
  const isTTSSupported = isTextToSpeechSupported()

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">💬</span>
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-yellow-400 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="text-white font-bold text-sm">AzaBot</h3>
            <p className="text-blue-100 text-xs">عزويت - المساعد الذكي</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-gray-50">
        {CHAT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 flex items-center justify-center gap-1 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-yellow-400 text-blue-900 bg-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-900 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                {message.sender === "bot" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleCopyMessage(message.text)}
                      className="text-xs hover:bg-gray-200 p-1 rounded transition-colors"
                      title="Copy"
                    >
                      <Copy size={14} />
                    </button>
                    {isTTSSupported && (
                      <button
                        onClick={() => tts?.speak(message.text)}
                        className="text-xs hover:bg-gray-200 p-1 rounded transition-colors"
                        title="Speak"
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-3 bg-blue-50 border-t">
          <p className="text-xs text-gray-600 mb-2 font-medium">
            {language === "ar" ? "أسئلة سريعة:" : "Quick questions:"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_QUESTIONS.slice(0, 4).map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuickQuestion(question.id)}
                className="text-xs p-2 bg-white border border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors text-left line-clamp-2"
              >
                <span className="mr-1">{question.icon}</span>
                {getQuestionText(question, language as "ar" | "en")}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-3 bg-gray-50">
        {activeTab === "text" ? (
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(inputValue)
                }
              }}
              placeholder={language === "ar" ? "اكتب رسالتك..." : "Type message..."}
              className="flex-1 text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-3"
            >
              <Send size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {isSpeechSupported ? (
              <>
                <div className="flex-1 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">
                    {isListening ? "🎙️ جاري الاستماع..." : "الميكروفون جاهز"}
                  </p>
                  <p className="text-sm text-gray-900">{inputValue || "..."}</p>
                </div>
                <Button
                  onClick={handleStartListening}
                  disabled={isListening || isLoading}
                  className={`w-full ${
                    isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-900 hover:bg-blue-800"
                  } text-white`}
                >
                  <Mic size={18} className="mr-2" />
                  {isListening ? "جاري الاستماع..." : "اضغط للتحدث"}
                </Button>
              </>
            ) : (
              <p className="text-sm text-red-600 text-center">
                {language === "ar" ? "المتصفح لا يدعم الصوت" : "Voice not supported"}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
