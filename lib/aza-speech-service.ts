// AzaBot Speech Recognition Service
// Professional speech-to-text using the browser Web Speech API.

type SpeechRecognitionCallback = (transcript: string, isFinal: boolean) => void

type SpeechRecognitionEventLike = {
  resultIndex: number
  results: ArrayLike<{
    0: { transcript: string }
    isFinal: boolean
  }>
}

type SpeechRecognitionErrorEventLike = { error: string }

interface SpeechRecognitionLike {
  lang: string
  continuous: boolean
  interimResults: boolean
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null
  const browserWindow = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
  return browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition || null
}

export class AzaSpeechRecognition {
  private recognition: SpeechRecognitionLike | null = null
  private isListening = false
  private transcript = ""

  constructor(private language: "ar-SA" | "en-US" = "ar-SA") {
    this.initializeSpeechRecognition()
  }

  private initializeSpeechRecognition() {
    const SpeechRecognitionCtor = getSpeechRecognitionConstructor()
    if (!SpeechRecognitionCtor) {
      return
    }

    this.recognition = new SpeechRecognitionCtor()
    this.recognition.lang = this.language
    this.recognition.continuous = true
    this.recognition.interimResults = true
  }

  public startListening(callback: SpeechRecognitionCallback): void {
    if (!this.recognition) {
      return
    }

    this.transcript = ""
    this.isListening = true

    this.recognition.onstart = () => {
      this.isListening = true
    }

    this.recognition.onresult = (event) => {
      let interim = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (!result) continue
        const transcript = result[0]?.transcript || ""
        if (result.isFinal) {
          this.transcript += `${transcript} `
        } else {
          interim += transcript
        }
      }
      callback(this.transcript + interim, false)
    }

    this.recognition.onerror = (event) => {
      console.error("[AzaBot] Speech recognition error:", event.error)
    }

    this.recognition.onend = () => {
      this.isListening = false
      callback(this.transcript.trim(), true)
    }

    this.recognition.start()
  }

  public stopListening(): string {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
    return this.transcript.trim()
  }

  public setLanguage(lang: "ar-SA" | "en-US") {
    this.language = lang
    if (this.recognition) {
      this.recognition.lang = lang
    }
  }

  public isSupported(): boolean {
    return Boolean(this.recognition)
  }

  public abort(): void {
    if (this.recognition) {
      this.recognition.abort()
      this.isListening = false
    }
  }
}

export const isSpeechRecognitionSupported = (): boolean => Boolean(getSpeechRecognitionConstructor())

export const getLanguageCode = (language: "ar" | "en"): "ar-SA" | "en-US" =>
  language === "ar" ? "ar-SA" : "en-US"
