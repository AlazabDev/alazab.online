// AzaBot Text-to-Speech Service
// Browser-safe text-to-speech using the Web Speech Synthesis API.

export class AzaTextToSpeech {
  private utterance: SpeechSynthesisUtterance | null = null
  private isPlaying = false

  constructor(private language: "ar" | "en" = "ar") {}

  private getSynthesis(): SpeechSynthesis | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return null
    }
    return window.speechSynthesis
  }

  public speak(text: string, onEnd?: () => void): void {
    const synthesis = this.getSynthesis()
    if (!synthesis || typeof SpeechSynthesisUtterance === "undefined") return

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
    }

    this.utterance.onend = () => {
      this.isPlaying = false
      onEnd?.()
    }

    this.utterance.onerror = (event) => {
      console.error("[AzaBot] Speech synthesis error:", event.error)
      this.isPlaying = false
    }

    synthesis.speak(this.utterance)
  }

  public stop(): void {
    const synthesis = this.getSynthesis()
    if (synthesis?.speaking) {
      synthesis.cancel()
    }
    this.isPlaying = false
  }

  public pause(): void {
    const synthesis = this.getSynthesis()
    if (synthesis?.speaking && !synthesis.paused) {
      synthesis.pause()
    }
  }

  public resume(): void {
    const synthesis = this.getSynthesis()
    if (synthesis?.paused) {
      synthesis.resume()
    }
  }

  public setLanguage(language: "ar" | "en"): void {
    this.language = language
  }

  public getIsPlaying(): boolean {
    return this.isPlaying
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.getSynthesis()?.getVoices() || []
  }

  public getArabicVoices(): SpeechSynthesisVoice[] {
    return this.getAvailableVoices().filter((voice) => voice.lang.includes("ar"))
  }

  public getEnglishVoices(): SpeechSynthesisVoice[] {
    return this.getAvailableVoices().filter((voice) => voice.lang.includes("en"))
  }
}

export const isTextToSpeechSupported = (): boolean =>
  typeof window !== "undefined" && "speechSynthesis" in window

export const preloadVoices = (): void => {
  if (isTextToSpeechSupported()) {
    window.speechSynthesis.getVoices()
  }
}
