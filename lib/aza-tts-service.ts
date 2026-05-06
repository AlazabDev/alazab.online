// AzaBot Text-to-Speech Service
// Professional text-to-speech using Web Speech Synthesis API

export class AzaTextToSpeech {
  private synthesis = window.speechSynthesis
  private utterance: SpeechSynthesisUtterance | null = null
  private isPlaying = false

  constructor(private language: "ar" | "en" = "ar") {}

  public speak(text: string, onEnd?: () => void): void {
    // Cancel any ongoing speech
    if (this.isPlaying) {
      this.stop()
    }

    this.utterance = new SpeechSynthesisUtterance(text)
    this.utterance.lang = this.language === "ar" ? "ar-SA" : "en-US"
    this.utterance.rate = 0.95
    this.utterance.pitch = 1.0
    this.utterance.volume = 1.0

    this.utterance.onstart = () => {
      this.isPlaying = true
      console.log("[AzaBot] Speech synthesis started")
    }

    this.utterance.onend = () => {
      this.isPlaying = false
      console.log("[AzaBot] Speech synthesis ended")
      onEnd?.()
    }

    this.utterance.onerror = (event) => {
      console.error("[AzaBot] Speech synthesis error:", event.error)
      this.isPlaying = false
    }

    this.synthesis.speak(this.utterance)
  }

  public stop(): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel()
      this.isPlaying = false
    }
  }

  public pause(): void {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause()
    }
  }

  public resume(): void {
    if (this.synthesis.paused) {
      this.synthesis.resume()
    }
  }

  public setLanguage(language: "ar" | "en"): void {
    this.language = language
  }

  public getIsPlaying(): boolean {
    return this.isPlaying
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices()
  }

  public getArabicVoices(): SpeechSynthesisVoice[] {
    return this.getAvailableVoices().filter((voice) => voice.lang.includes("ar"))
  }

  public getEnglishVoices(): SpeechSynthesisVoice[] {
    return this.getAvailableVoices().filter((voice) => voice.lang.includes("en"))
  }
}

// Utility functions
export const isTextToSpeechSupported = (): boolean => {
  return "speechSynthesis" in window
}

export const preloadVoices = (): void => {
  if (isTextToSpeechSupported()) {
    window.speechSynthesis.getVoices()
  }
}
