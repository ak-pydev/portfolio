"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Play } from "lucide-react"
import Link from "next/link"

const allProjects = [
  {
    id: "bargain-radar",
    name: "BargainRadar",
    description:
      "AI-powered price prediction agent using OpenAI Frontier API, Hugging Face, and Chroma vector database for intelligent market analysis and price optimization.",
    tech: ["OpenAI", "Hugging Face", "LangChain", "Vector DB", "Python", "FastAPI"],
    status: "Active",
    complexity: 87,
    category: "AI/ML",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "campus-gpt",
    name: "Campus GPT",
    description:
      "Multimodal RAG QA agent for university using FireCrawler, LangChain, and Google Gemini 2.5 Pro for intelligent campus assistance and student support.",
    tech: ["Gemini 2.5", "RAG", "Streamlit", "LangChain", "Python", "Firebase"],
    status: "Completed",
    complexity: 92,
    category: "AI/ML",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tube2text",
    name: "Tube2Text Agent",
    description:
      "AI agent using CrewAI and Gemini 2.5 Flash to transcribe YouTube videos and generate SEO-optimized blog posts automatically with content analysis.",
    tech: ["CrewAI", "Gemini 2.5", "SEO", "Content Gen", "Python", "YouTube API"],
    status: "Active",
    complexity: 85,
    category: "AI/ML",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "colorectal-cancer",
    name: "Colorectal Cancer Prediction",
    description:
      "End-to-end MLOps pipeline for cancer risk prediction using Docker, PyTorch, MLflow, and Kubeflow with comprehensive model monitoring.",
    tech: ["PyTorch", "MLflow", "Docker", "Kubeflow", "Python", "Scikit-learn"],
    status: "Completed",
    complexity: 95,
    category: "MLOps",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "khutruke-ai",
    name: "Khutruke AI",
    description:
      "MERN-stack chatbot web application using OpenAI's GPT-4 API for personalized financial planning and investment advice. Hackathon winner.",
    tech: ["MERN", "GPT-4", "FinTech", "Chatbot", "MongoDB", "Express"],
    status: "Completed",
    complexity: 88,
    category: "Full-Stack",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "data-pipeline",
    name: "Real-time Data Pipeline",
    description:
      "Scalable data processing pipeline using Apache Kafka, Spark, and Delta Lake for real-time analytics and machine learning feature engineering.",
    tech: ["Kafka", "Spark", "Delta Lake", "Python", "AWS", "Airflow"],
    status: "Active",
    complexity: 90,
    category: "Data Engineering",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "sentiment-analyzer",
    name: "Multi-language Sentiment Analyzer",
    description:
      "Advanced sentiment analysis system supporting 15+ languages using transformer models and custom training on domain-specific datasets.",
    tech: ["Transformers", "BERT", "Python", "FastAPI", "Docker", "PostgreSQL"],
    status: "Completed",
    complexity: 83,
    category: "NLP",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "recommendation-engine",
    name: "Hybrid Recommendation Engine",
    description:
      "Sophisticated recommendation system combining collaborative filtering, content-based filtering, and deep learning for personalized user experiences.",
    tech: ["TensorFlow", "Python", "Redis", "MongoDB", "FastAPI", "Docker"],
    status: "Active",
    complexity: 91,
    category: "AI/ML",
    color: "from-rose-500 to-pink-500",
  },
]

export default function ProjectsPage() {
  const categories = ["All", "AI/ML", "MLOps", "Full-Stack", "Data Engineering", "NLP"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects =
    selectedCategory === "All" ? allProjects : allProjects.filter((project) => project.category === selectedCategory)

  const handleProjectAction = (type: 'demo' | 'github' | 'live', projectId: string) => {
    // Map project IDs to actual URLs
    const projectUrls: Record<string, Record<string, string>> = {
      'bargain-radar': {
        demo: 'https://bargainradar-demo.vercel.app',
        github: 'https://github.com/ak-pydev/bargainradar',
        live: 'https://bargainradar.com'
      },
      'campus-gpt': {
        demo: 'https://campusgpt-demo.streamlit.app',
        github: 'https://github.com/ak-pydev/campus-gpt',
        live: 'https://campusgpt.streamlit.app'
      },
      'tube2text': {
        demo: 'https://tube2text-demo.vercel.app',
        github: 'https://github.com/ak-pydev/tube2text',
        live: 'https://tube2text.vercel.app'
      },
      'colorectal-cancer': {
        demo: '#',
        github: 'https://github.com/ak-pydev/colorectal-cancer-prediction',
        live: '#'
      },
      'khutruke-ai': {
        demo: '#',
        github: 'https://github.com/ak-pydev/khutruke-ai',
        live: '#'
      },
      'data-pipeline': {
        demo: '#',
        github: 'https://github.com/ak-pydev/realtime-data-pipeline',
        live: '#'
      },
      'sentiment-analyzer': {
        demo: '#',
        github: 'https://github.com/ak-pydev/multilang-sentiment-analyzer',
        live: '#'
      },
      'recommendation-engine': {
        demo: '#',
        github: 'https://github.com/ak-pydev/hybrid-recommendation-engine',
        live: '#'
      }
    }

    const url = projectUrls[projectId]?.[type]
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      const actionMessages = {
        demo: 'Demo coming soon!',
        github: 'Repository will be available soon!',
        live: 'Live site coming soon!'
      }
      alert(actionMessages[type])
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.header
        className="p-6 border-b border-green-400/30 backdrop-blur-sm bg-black/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 border border-green-400/50 rounded-lg hover:bg-green-400/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={16} />
                Back to Terminal
              </motion.button>
            </Link>
            <div>
              <h1 className="text-3xl font-mono font-bold">
                <span className="text-green-400">Project</span>
                <span className="text-blue-400">Archive</span>
              </h1>
              <p className="text-sm opacity-70">Complete portfolio of technical projects</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Category Filter */}
      <div className="p-6">
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === category
                  ? "bg-green-600/30 border-green-400/50 text-green-300"
                  : "bg-gray-800/50 border-gray-700 hover:border-gray-600 text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative overflow-hidden rounded-xl border border-gray-700 hover:border-gray-600 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group"
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
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-1 rounded text-xs font-mono bg-black/30 text-white">{project.category}</div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="text-white/80 text-xs font-mono">Complexity: {project.complexity}/100</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                <p className="text-sm mb-4 leading-relaxed text-gray-300">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 rounded text-xs font-mono bg-gray-700 text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Complexity Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Complexity</span>
                    <span className="text-xs text-gray-400">{project.complexity}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${project.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.complexity}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleProjectAction('demo', project.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title="View Demo"
                  >
                    <Play size={16} />
                    Demo
                  </motion.button>
                  <motion.button
                    onClick={() => handleProjectAction('github', project.id)}
                    className="flex items-center justify-center p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title="View Source Code"
                  >
                    <Github size={16} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleProjectAction('live', project.id)}
                    className="flex items-center justify-center p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
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
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-green-400">{allProjects.length}</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {allProjects.filter((p) => p.status === "Active").length}
            </div>
            <div className="text-sm text-gray-400">Active Projects</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">
              {Math.round(allProjects.reduce((acc, p) => acc + p.complexity, 0) / allProjects.length)}
            </div>
            <div className="text-sm text-gray-400">Avg Complexity</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">{new Set(allProjects.flatMap((p) => p.tech)).size}</div>
            <div className="text-sm text-gray-400">Technologies</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
