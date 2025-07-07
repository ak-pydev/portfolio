"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Brain } from "lucide-react"

interface MemorySystemProps {
  sessionMemory: string[]
  isDarkMode: boolean
}

export function MemorySystem({ sessionMemory, isDarkMode }: MemorySystemProps) {
  if (sessionMemory.length === 0) return null

  return (
    <motion.div
      className="fixed bottom-6 left-6 max-w-xs z-20"
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`backdrop-blur-sm border rounded-lg p-4 ${
          isDarkMode ? "bg-black/80 border-blue-400/50" : "bg-white/80 border-blue-600/50"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <Brain className="w-4 h-4 text-blue-400" />
          </motion.div>
          <span className="text-xs font-mono text-blue-400 font-bold">Memory Active</span>
          <motion.div
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className={`text-xs mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Session queries: {sessionMemory.length}
        </div>

        <div className="space-y-1">
          <AnimatePresence>
            {sessionMemory.slice(-3).map((query, index) => (
              <motion.div
                key={index}
                className={`text-xs truncate ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-blue-400">→</span> {query}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {sessionMemory.length > 3 && (
          <div className={`text-xs mt-2 opacity-60 ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
            +{sessionMemory.length - 3} more...
          </div>
        )}
      </div>
    </motion.div>
  )
}
