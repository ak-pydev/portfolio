"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface SkillRadarProps {
  isDarkMode: boolean
}

const skills = [
  { name: "Machine Learning", level: 87, color: "#00ff88", category: "AI/ML" },
  { name: "Backend Dev", level: 92, color: "#0088ff", category: "Development" },
  { name: "MLOps", level: 85, color: "#ff0088", category: "DevOps" },
  { name: "Data Engineering", level: 81, color: "#ffaa00", category: "Data" },
  { name: "FastAPI", level: 89, color: "#aa00ff", category: "Framework" },
  { name: "SQL", level: 94, color: "#ff4400", category: "Database" },
  { name: "Cloud Infra", level: 78, color: "#00aaff", category: "Infrastructure" },
  { name: "Creativity", level: 100, color: "#ff6600", category: "Soft Skills" },
]

export function SkillRadar({ isDarkMode }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) - 60

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2)
        ctx.strokeStyle = isDarkMode ? "#00ff88" : "#0066cc"
        ctx.globalAlpha = 0.2
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw grid lines
      const angleStep = (Math.PI * 2) / skills.length
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + Math.cos(angle) * maxRadius
        const y = centerY + Math.sin(angle) * maxRadius

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = isDarkMode ? "#00ff88" : "#0066cc"
        ctx.globalAlpha = 0.2
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw skill polygon
      ctx.beginPath()
      ctx.globalAlpha = 0.3
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const radius = ((skills[i].level * animationProgress) / 100) * maxRadius
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fillStyle = isDarkMode ? "#00ff88" : "#0066cc"
      ctx.fill()
      ctx.strokeStyle = isDarkMode ? "#00ff88" : "#0066cc"
      ctx.globalAlpha = 0.8
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw skill points and labels
      ctx.globalAlpha = 1
      ctx.font = "12px monospace"
      ctx.textAlign = "center"

      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const radius = ((skills[i].level * animationProgress) / 100) * maxRadius
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = skills[i].color
        ctx.fill()
        ctx.strokeStyle = isDarkMode ? "#000" : "#fff"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw label
        const labelX = centerX + Math.cos(angle) * (maxRadius + 30)
        const labelY = centerY + Math.sin(angle) * (maxRadius + 30)
        ctx.fillStyle = isDarkMode ? "#fff" : "#000"
        ctx.fillText(skills[i].name, labelX, labelY)

        // Draw level
        ctx.fillStyle = skills[i].color
        ctx.font = "bold 10px monospace"
        ctx.fillText(`${Math.round(skills[i].level * animationProgress)}`, labelX, labelY + 15)
        ctx.font = "12px monospace"
      }
    }

    const animate = () => {
      drawRadar()
      requestAnimationFrame(animate)
    }

    animate()
  }, [isDarkMode, animationProgress])

  return (
    <div className="space-y-6">
      {/* Radar Chart */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className={`border-2 rounded-lg ${
              isDarkMode ? "border-green-400/30 bg-black/20" : "border-gray-300 bg-white/20"
            } backdrop-blur-sm`}
          />
        </motion.div>
      </div>

      {/* RPG-Style Skill Cards */}
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className={`p-4 rounded-lg border backdrop-blur-sm ${
              isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-sm font-bold">{skill.name}</span>
              <span className="text-xs opacity-70">{skill.category}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold font-mono" style={{ color: skill.color }}>
                  {skill.level}
                </span>
                {skill.level === 100 && <span className="text-yellow-400">💯</span>}
              </div>
            </div>

            {/* Power Level Indicator */}
            <div className="mt-2 text-xs opacity-70">
              {skill.level >= 90
                ? "🔥 Master"
                : skill.level >= 80
                  ? "⭐ Expert"
                  : skill.level >= 70
                    ? "💪 Advanced"
                    : "📚 Learning"}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall Stats */}
      <motion.div
        className={`p-4 rounded-lg border backdrop-blur-sm ${
          isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="font-mono font-bold mb-3">Overall Power Level</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}
            </div>
            <div className="text-xs opacity-70">Average</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{Math.max(...skills.map((s) => s.level))}</div>
            <div className="text-xs opacity-70">Peak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">{skills.filter((s) => s.level >= 85).length}</div>
            <div className="text-xs opacity-70">Expert+</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
