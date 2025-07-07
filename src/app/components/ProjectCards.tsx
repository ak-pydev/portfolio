"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Play } from "lucide-react"

interface ProjectCardsProps {
  isDarkMode: boolean
}

const projects = [
  {
    id: "bargain-radar",
    name: "BargainRadar",
    description:
      "AI-powered price prediction agent using OpenAI Frontier API, Hugging Face, and Chroma vector database for intelligent market analysis.",
    tech: ["OpenAI", "Hugging Face", "LangChain", "Vector DB", "Python"],
    status: "Active",
    complexity: 87,
    demoUrl: "https://bargainradar-demo.vercel.app",
    githubUrl: "https://github.com/ak-pydev/bargainradar",
    liveUrl: "https://bargainradar.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "campus-gpt",
    name: "Campus GPT",
    description:
      "Multimodal RAG QA agent for university using FireCrawler, LangChain, and Google Gemini 2.5 Pro for intelligent campus assistance.",
    tech: ["Gemini 2.5", "RAG", "Streamlit", "LangChain", "Python"],
    status: "Completed",
    complexity: 92,
    demoUrl: "https://campusgpt-demo.streamlit.app",
    githubUrl: "https://github.com/ak-pydev/campus-gpt",
    liveUrl: "https://campusgpt.streamlit.app",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tube2text",
    name: "Tube2Text Agent",
    description:
      "AI agent using CrewAI and Gemini 2.5 Flash to transcribe YouTube videos and generate SEO-optimized blog posts automatically.",
    tech: ["CrewAI", "Gemini 2.5", "SEO", "Content Gen", "Python"],
    status: "Active",
    complexity: 85,
    demoUrl: "https://tube2text-demo.vercel.app",
    githubUrl: "https://github.com/ak-pydev/tube2text",
    liveUrl: "https://tube2text.vercel.app",
    color: "from-purple-500 to-pink-500",
  },
]

export function ProjectCards({ isDarkMode }: ProjectCardsProps) {
  const handleDemoClick = (demoUrl: string) => {
    if (demoUrl && demoUrl !== '#') {
      window.open(demoUrl, '_blank', 'noopener,noreferrer')
    } else {
      alert('Demo coming soon!')
    }
  }

  const handleGithubClick = (githubUrl: string) => {
    if (githubUrl && githubUrl !== '#') {
      window.open(githubUrl, '_blank', 'noopener,noreferrer')
    } else {
      alert('Repository will be available soon!')
    }
  }

  const handleLiveClick = (liveUrl: string) => {
    if (liveUrl && liveUrl !== '#') {
      window.open(liveUrl, '_blank', 'noopener,noreferrer')
    } else {
      alert('Live site coming soon!')
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className={`relative overflow-hidden rounded-xl border backdrop-blur-sm ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
              : "bg-white/50 border-gray-200 hover:border-gray-300"
          } transition-all duration-300 group`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          {/* Gradient Header */}
          <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 left-4">
              <div
                className={`px-2 py-1 rounded text-xs font-mono ${
                  project.status === "Active" ? "bg-green-500/20 text-green-300" : "bg-blue-500/20 text-blue-300"
                }`}
              >
                {project.status}
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="text-white/80 text-xs font-mono">Complexity: {project.complexity}/100</div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{project.name}</h3>
            <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className={`px-2 py-1 rounded text-xs font-mono ${
                    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => handleDemoClick(project.demoUrl)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title="View Demo"
              >
                <Play size={16} />
                Demo
              </motion.button>
              <motion.button
                onClick={() => handleGithubClick(project.githubUrl)}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title="View Source Code"
              >
                <Github size={16} />
              </motion.button>
              <motion.button
                onClick={() => handleLiveClick(project.liveUrl)}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title="Visit Live Site"
              >
                <ExternalLink size={16} />
              </motion.button>
            </div>
          </div>

          {/* Hover Effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          ></div>
        </motion.div>
      ))}
    </div>
  )
}
