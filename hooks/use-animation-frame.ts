"use client"

import { useRef, useEffect, useCallback } from "react"

type AnimationFrameCallback = (time: number) => void

export function useAnimationFrame(callback: AnimationFrameCallback, active = true) {
  const requestRef = useRef<number | undefined>(undefined)
  const previousTimeRef = useRef<number | undefined>(undefined)
  const callbackRef = useRef<AnimationFrameCallback>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      callbackRef.current(time)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!active) {
      previousTimeRef.current = undefined
      return
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current)
      }
      requestRef.current = undefined
      previousTimeRef.current = undefined
    }
  }, [animate, active])

  useEffect(() => {
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])
}
