// AzaBot Speech Recognition Service
// Professional speech-to-text using Web Speech API

type SpeechRecognitionCallback = (transcript: string, isFinal: boolean) => void

export class AzaSpeechRecognition {
  private recognition: SpeechRecognition | null = null
  private isListening = false
  private transcript = ""

  constructor(private language: "ar-SA" | "en-US" = "ar-SA") {
    this.initializeSpeechRecognition()
  }

  private initializeSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("[AzaBot] Speech Recognition not supported in this browser")
      return
    }

    this.recognition = new SpeechRecognition()
    this.recognition.language = this.language
    this.recognition.continuous = true
    this.recognition.interimResults = true
  }

  public startListening(callback: SpeechRecognitionCallback): void {
    if (!this.recognition) {
      console.error("[AzaBot] Speech Recognition not initialized")
      return
    }

    this.transcript = ""
    this.isListening = true

    this.recognition.onstart = () => {
      console.log("[AzaBot] Listening started...")
    }

    this.recognition.onresult = (event: any) => {
      let interim = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          this.transcript += transcript + " "
        } else {
          interim += transcript
        }
      }
      callback(this.transcript + interim, false)
    }

    this.recognition.onerror = (event: any) => {
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
      this.recognition.language = lang
    }
  }

  public isSupported(): boolean {
    return !!this.recognition
  }

  public abort(): void {
    if (this.recognition) {
      this.recognition.abort()
      this.isListening = false
    }
  }
}

// Utility functions
export const isSpeechRecognitionSupported = (): boolean => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  return !!SpeechRecognition
}

export const getLanguageCode = (language: "ar" | "en"): "ar-SA" | "en-US" => {
  return language === "ar" ? "ar-SA" : "en-US"
}
