/**
 * Utility functions for performance optimization
 */

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastFunc: ReturnType<typeof setTimeout> | null = null
  let lastRan = 0

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      lastRan = Date.now()
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
        if (lastFunc) {
          clearTimeout(lastFunc)
          lastFunc = null
        }
      }, limit)
    } else {
      if (lastFunc) clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func(...args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}

type NavigatorWithDeviceMemory = Navigator & { deviceMemory?: number }

export function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false

  const browserNavigator = navigator as NavigatorWithDeviceMemory
  if (browserNavigator.deviceMemory && browserNavigator.deviceMemory < 4) {
    return true
  }

  if (browserNavigator.hardwareConcurrency && browserNavigator.hardwareConcurrency < 4) {
    return true
  }

  return false
}

export function getBrowserCapabilities() {
  if (typeof window === "undefined") {
    return {
      supportsIntersectionObserver: false,
      supportsResizeObserver: false,
      supportsWebP: false,
      supportsTouchEvents: false,
      prefersReducedMotion: false,
      devicePixelRatio: 1,
      isLowEndDevice: false,
    }
  }

  return {
    supportsIntersectionObserver: "IntersectionObserver" in window,
    supportsResizeObserver: "ResizeObserver" in window,
    supportsWebP: false,
    supportsTouchEvents: "ontouchstart" in window,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    devicePixelRatio: window.devicePixelRatio || 1,
    isLowEndDevice: isLowEndDevice(),
  }
}

export async function checkWebPSupport(): Promise<boolean> {
  if (typeof self === "undefined" || !self.createImageBitmap) return false

  const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  const blob = await fetch(webpData).then((r) => r.blob())

  return createImageBitmap(blob).then(
    () => true,
    () => false,
  )
}

export async function getOptimalImageFormat(): Promise<"webp" | "avif" | "jpg"> {
  if (typeof createImageBitmap === "undefined") return "jpg"

  const avifData =
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK"

  const avifSupported = await fetch(avifData)
    .then((response) => response.blob())
    .then((blob) => createImageBitmap(blob))
    .then(() => true)
    .catch(() => false)

  if (avifSupported) return "avif"

  const webpSupported = await checkWebPSupport()
  return webpSupported ? "webp" : "jpg"
}

export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  label: string,
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()

    if (process.env.NODE_ENV === "development") {
      console.log(`${label} took ${end - start}ms`)
    }

    return result
  }
}
