"use client"

import { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Terminal } from "@/app/components/Terminal"
import { ProjectCards } from "@/app/components/ProjectCards"
import { SkillRadar } from "@/app/components/SkillRadar"
import { GlitchEffect } from "@/app/components/GlitchEffect"
import { MemorySystem } from "@/app/components/MemorySystem"
import { CommandProcessor } from "@/app/lib/commandProcessor"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai" | "system"
  content: string
  timestamp: number
  action?: string
}

export default function AadiNet() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "🚀 Welcome to AadiNet Neural Interface v3.0.1!",
      timestamp: 1000000000000, // Fixed timestamp to prevent hydration issues
    },
    {
      id: "2",
      type: "ai",
      content: "Hello! I'm Aaditya's AI assistant. I can help you explore projects, view skills, access resume data, and more.\n\n💡 Try commands like 'help' or use the quick access buttons below!",
      timestamp: 1000000000500, // Fixed timestamp to prevent hydration issues
    },
  ])

  const [currentInput, setCurrentInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionMemory, setSessionMemory] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [chaosMode, setChaosMode] = useState(false)
  const [currentView, setCurrentView] = useState<"terminal" | "projects" | "skills">("terminal")

  const terminalRef = useRef<HTMLDivElement>(null)
  const commandProcessor = useMemo(() => new CommandProcessor(), [])

  useGSAP(() => {
    gsap.from(".main-container", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
    })

    gsap.from(".header-title", {
      opacity: 0,
      x: -50,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    })
  }, [])

  const handleCommand = async (input: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentInput("")
    setIsLoading(true)

    // Add to session memory
    setSessionMemory((prev) => [...prev, input])

    try {
      // Process command
      const response = await commandProcessor.process(input, sessionMemory)

      // Immediate response after processing
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response.message,
        timestamp: Date.now(),
        action: response.action || undefined,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)

      // Handle special actions
      switch (response.action) {
        case "show_skills":
          setTimeout(() => setCurrentView("skills"), 500)
          break
        case "show_projects":
          setTimeout(() => setCurrentView("projects"), 500)
          break
        case "chaos_mode":
          setChaosMode(true)
          setTimeout(() => setChaosMode(false), 5000)
          break
        case "show_resume":
          // Handle resume display
          break
      }
    } catch (error) {
      console.error('Command processing error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "⚠️ Neural processing error occurred. Please try again.",
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const quickCommands = [
    { label: "View Projects", command: "show --projects" },
    { label: "Access Resume", command: "cat resume.pdf" },
    { label: "Run Skill Diagnostics", command: "analyze --skills" },
    { label: "Contact Info", command: "whoami --contact" },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      setChaosMode(true)
      setTimeout(() => setChaosMode(false), 3000)
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? (chaosMode ? "bg-black text-red-400" : "bg-gray-900 text-green-400") : "bg-white text-gray-800"
      }`}
    >
      <AnimatePresence>{chaosMode && <GlitchEffect />}</AnimatePresence>

      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Main Interface */}
      <div className="relative z-10 min-h-screen flex flex-col main-container">
        {/* Header */}
        <motion.header
          className={`p-6 border-b ${
            isDarkMode ? "border-green-400/30" : "border-gray-300"
          } backdrop-blur-sm bg-black/20`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.div
                className="text-3xl font-mono header-title"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className={isDarkMode ? "text-green-400" : "text-blue-600"}>Aadi</span>
                <span className={isDarkMode ? "text-blue-400" : "text-green-600"}>Net</span>
                <motion.span
                  className="animate-pulse"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  _
                </motion.span>
              </motion.div>
              <div className={`text-sm opacity-70 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Neural Interface v3.0.1
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={toggleDarkMode}
                className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                  isDarkMode ? "border-green-400/50 hover:bg-green-400/10" : "border-gray-300 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? "🌙 Chaos Mode" : "☀️ Light Mode"}
              </motion.button>
              <motion.button
                onClick={() => setChaosMode(true)}
                className="px-4 py-2 border border-red-400/50 rounded-lg text-xs hover:bg-red-400/10 transition-colors text-red-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⚡ Glitch
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Terminal Section */}
          <AnimatePresence mode="wait">
            {currentView === "terminal" && (
              <motion.div
                key="terminal"
                className="flex-1 p-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div ref={terminalRef}>
                  <Terminal
                    messages={messages}
                    currentInput={currentInput}
                    setCurrentInput={setCurrentInput}
                    onCommand={handleCommand}
                    isLoading={isLoading}
                    quickCommands={quickCommands}
                    isDarkMode={isDarkMode}
                    chaosMode={chaosMode}
                  />
                </div>
              </motion.div>
            )}

            {/* Projects View */}
            {currentView === "projects" && (
              <motion.div
                key="projects"
                className="flex-1 p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-mono font-bold">Project Modules</h2>
                  <div className="flex gap-3">
                    <Link href="/projects">
                      <motion.button
                        className={`px-4 py-2 border rounded-lg ${
                          isDarkMode
                            ? "border-blue-400/50 hover:bg-blue-400/10 text-blue-400"
                            : "border-blue-600 hover:bg-blue-50 text-blue-600"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Other Projects →
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => setCurrentView("terminal")}
                      className={`px-4 py-2 border rounded-lg ${
                        isDarkMode ? "border-green-400/50 hover:bg-green-400/10" : "border-gray-300 hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Back to Terminal
                    </motion.button>
                  </div>
                </div>
                <ProjectCards isDarkMode={isDarkMode} />
              </motion.div>
            )}

            {/* Skills View */}
            {currentView === "skills" && (
              <motion.div
                key="skills"
                className="flex-1 p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-mono font-bold">Skill Diagnostics</h2>
                  <motion.button
                    onClick={() => setCurrentView("terminal")}
                    className={`px-4 py-2 border rounded-lg ${
                      isDarkMode ? "border-green-400/50 hover:bg-green-400/10" : "border-gray-300 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Back to Terminal
                  </motion.button>
                </div>
                <SkillRadar isDarkMode={isDarkMode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Memory System */}
        <MemorySystem sessionMemory={sessionMemory} isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}
