'use client'

import { useState, useEffect, useCallback } from 'react'

export function useProctoring() {
  const [cheatCount, setCheatCount] = useState(0)
  const [warnings, setWarnings] = useState<string[]>([])
  const [isFullscreen, setIsFullscreen] = useState(true)

  // Helper to log a violation
  const logViolation = useCallback((message: string) => {
    setCheatCount(prev => prev + 1)
    setWarnings(prev => [message, ...prev])
    
    // Optional: You could play a beep sound here
    // const audio = new Audio('/sounds/alert.mp3')
    // audio.play().catch(e => console.log("Audio blocked"))
  }, [])

  useEffect(() => {
    // 1. TAB SWITCH DETECTION
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logViolation("User switched tabs (Potential Integrity Violation)")
      }
    }

    // 2. FULLSCREEN DETECTION
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
        logViolation("User exited fullscreen mode")
      } else {
        setIsFullscreen(true)
      }
    }

    // Attach listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [logViolation])

  return { cheatCount, warnings, isFullscreen }
}