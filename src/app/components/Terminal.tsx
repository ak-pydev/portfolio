"use client"

import type React from "react"
import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typewriter } from "./Typewriter"

interface Message {
  id: string
  type: "user" | "ai" | "system"
  content: string
  timestamp: number
  action?: string
}

interface TerminalProps {
  messages: Message[]
  currentInput: string
  setCurrentInput: (input: string) => void
  onCommand: (command: string) => void
  isLoading: boolean
  quickCommands: Array<{ label: string; command: string }>
  isDarkMode: boolean
  chaosMode: boolean
}

export function Terminal({
  messages,
  currentInput,
  setCurrentInput,
  onCommand,
  isLoading,
  quickCommands,
  isDarkMode,
  chaosMode,
}: TerminalProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "l") {
        e.preventDefault()
        // Clear terminal (could add this functionality)
      }
      if (e.key === "Escape") {
        inputRef.current?.blur()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (currentInput.trim() && !isLoading) {
        onCommand(currentInput.trim())
      }
    },
    [currentInput, isLoading, onCommand],
  )

  const handleQuickCommand = useCallback(
    (command: string) => {
      if (!isLoading) {
        // Provide immediate visual feedback
        const button = document.activeElement as HTMLButtonElement
        if (button) {
          button.blur()
        }
        onCommand(command)
      }
    },
    [isLoading, onCommand],
  )

  const getMessageStyle = useCallback(
    (type: string) => {
      if (chaosMode) {
        return type === "user"
          ? "bg-red-600/20 border-red-400/50 text-red-300"
          : type === "system"
            ? "bg-yellow-600/20 border-yellow-400/50 text-yellow-300"
            : "bg-red-600/20 border-red-400/50 text-red-300"
      }

      if (isDarkMode) {
        return type === "user"
          ? "bg-blue-600/20 border-blue-400/50 text-blue-300"
          : type === "system"
            ? "bg-yellow-600/20 border-yellow-400/50 text-yellow-300"
            : "bg-green-600/20 border-green-400/50 text-green-300"
      }

      return type === "user"
        ? "bg-blue-100 border-blue-300 text-blue-800"
        : type === "system"
          ? "bg-yellow-100 border-yellow-300 text-yellow-800"
          : "bg-green-100 border-green-300 text-green-800"
    },
    [chaosMode, isDarkMode],
  )

  return (
    <motion.div
      className={`h-full flex flex-col font-mono border-2 rounded-lg ${
        chaosMode
          ? "border-red-500 shadow-red-500/20"
          : isDarkMode
            ? "border-green-500 shadow-green-500/20"
            : "border-gray-300 shadow-gray-300/20"
      } shadow-lg backdrop-blur-sm bg-black/10`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="application"
      aria-label="AI Terminal Interface"
    >
      {/* Terminal Header */}
      <div
        className={`px-4 py-3 border-b flex items-center gap-3 ${
          chaosMode
            ? "bg-red-900/20 border-red-400/50"
            : isDarkMode
              ? "bg-green-900/20 border-green-400/50"
              : "bg-gray-100 border-gray-300"
        }`}
      >
        <div className="flex gap-2" role="presentation">
          <div className="w-3 h-3 rounded-full bg-red-500" aria-label="Close"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500" aria-label="Minimize"></div>
          <div className="w-3 h-3 rounded-full bg-green-500" aria-label="Maximize"></div>
        </div>
        <span className="text-sm opacity-70">aaditya@aadinet:~$</span>
        <div className="ml-auto text-xs opacity-50">Neural Terminal v3.0.1</div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96"
        role="log"
        aria-live="polite"
        aria-label="Terminal messages"
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] border rounded-lg p-3 ${getMessageStyle(message.type)}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs opacity-70">
                    {message.type === "user" ? "user@terminal" : message.type === "system" ? "system" : "aadinet"}
                  </span>
                  <span className="text-xs opacity-50">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-sm whitespace-pre-line">
                  {message.type === "ai" && index === messages.length - 1 ? (
                    <Typewriter text={message.content} speed={30} />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className={`border rounded-lg p-3 ${getMessageStyle("ai")}`}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1" role="status" aria-label="Processing">
                  <motion.div
                    className="w-2 h-2 bg-current rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-current rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-current rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                  />
                </div>
                <span className="text-sm">Analyzing request...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Commands */}
      <div className={`p-4 border-t ${isDarkMode ? "border-green-400/30" : "border-gray-300"}`}>
        <div className="text-xs opacity-70 mb-3">Quick Access Commands:</div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickCommands.map((cmd, index) => (
            <motion.button
              key={index}
              onClick={() => handleQuickCommand(cmd.command)}
              disabled={isLoading}
              className={`px-3 py-2 border rounded text-xs transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                chaosMode
                  ? "bg-red-600/20 border-red-400/50 hover:bg-red-600/30 focus:ring-red-400"
                  : isDarkMode
                    ? "bg-green-600/20 border-green-400/50 hover:bg-green-600/30 focus:ring-green-400"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200 focus:ring-blue-400"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Execute command: ${cmd.command}`}
            >
              {cmd.label}
            </motion.button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className={chaosMode ? "text-red-400" : isDarkMode ? "text-green-400" : "text-blue-600"}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            disabled={isLoading}
            className={`flex-1 bg-transparent border-none outline-none font-mono placeholder-opacity-50 focus:ring-0 ${
              chaosMode
                ? "text-red-400 placeholder-red-400"
                : isDarkMode
                  ? "text-green-400 placeholder-green-400"
                  : "text-gray-800 placeholder-gray-500"
            }`}
            placeholder="Enter command or ask me anything..."
            autoComplete="off"
            aria-label="Terminal command input"
          />
          <motion.span
            className="text-current"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            aria-hidden="true"
          >
            |
          </motion.span>
        </form>
      </div>
    </motion.div>
  )
}
