"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export function Typewriter({ text, speed = 50, onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Reset state when text changes
    setDisplayText("")
    setCurrentIndex(0)
    setIsComplete(false)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length && !isComplete) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex >= text.length && !isComplete) {
      setIsComplete(true)
      if (onComplete) {
        // Delay the completion callback slightly to ensure smooth rendering
        setTimeout(() => onComplete(), 100)
      }
    }
  }, [currentIndex, text, speed, onComplete, isComplete])

  return (
    <span>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}
