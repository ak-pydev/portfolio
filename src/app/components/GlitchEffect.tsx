"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function GlitchEffect() {
  const [glitchText, setGlitchText] = useState("SIMULATION: CHAOS MODE")
  const [isGlitching, setIsGlitching] = useState(true)

  useEffect(() => {
    if (!isGlitching) return

    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"
    const originalText = "SIMULATION: CHAOS MODE"

    const interval = setInterval(() => {
      const glitched = originalText
        .split("")
        .map((char) => {
          if (char === " " || char === ":") return char
          return Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : char
        })
        .join("")
      setGlitchText(glitched)
    }, 100)

    const resetTimer = setTimeout(() => {
      setGlitchText(originalText)
      setIsGlitching(false)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(resetTimer)
    }
  }, [isGlitching])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div
          className="text-4xl md:text-6xl font-mono text-red-400 mb-8 font-bold"
          animate={{
            x: isGlitching ? [-2, 2, -2, 2, 0] : 0,
            y: isGlitching ? [0, -1, 1, -1, 0] : 0,
            textShadow: isGlitching
              ? ["2px 0 0 #ff0000, -2px 0 0 #00ffff", "0 0 0 #ff0000", "2px 0 0 #ff0000, -2px 0 0 #00ffff"]
              : "0 0 0 #ff0000",
          }}
          transition={{
            duration: 0.1,
            repeat: isGlitching ? Number.POSITIVE_INFINITY : 0,
          }}
        >
          {glitchText}
        </motion.div>

        <motion.div
          className="text-lg md:text-2xl font-mono text-green-400 mb-8"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        >
          REALITY.EXE HAS STOPPED WORKING
        </motion.div>

        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-1 bg-red-400 mx-auto"
              style={{ width: `${Math.random() * 60 + 20}%` }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.2,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>

        <motion.div
          className="mt-8 text-sm text-gray-400 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Restoring neural pathways...
        </motion.div>
      </div>
    </motion.div>
  )
}
