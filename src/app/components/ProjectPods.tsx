"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { Mesh } from "three"

// Define a proper type for project objects
interface Project {
    name: string;
    description: string;
    tech: string[];
    position: [number, number, number]; // 3D position array
    color: string;
}

const projects: Project[] = [
  {
    name: "BargainRadar",
    description: "AI Price Prediction Agent",
    tech: ["OpenAI", "LangChain", "Vector DB"],
    position: [-4, 2, 0],
    color: "#00ff88",
  },
  {
    name: "CampusGPT",
    description: "Multimodal RAG QA System",
    tech: ["Gemini 2.5", "RAG", "Streamlit"],
    position: [4, -1, 0],
    color: "#0088ff",
  },
  {
    name: "Tube2Text",
    description: "YouTube to Blog AI Agent",
    tech: ["CrewAI", "Gemini", "SEO"],
    position: [0, 3, -2],
    color: "#ff0088",
  },
  {
    name: "KhutrukeAI",
    description: "Financial Planning Chatbot",
    tech: ["MERN", "GPT-4", "FinTech"],
    position: [-2, -2, 1],
    color: "#ffaa00",
  },
]

function ProjectPod({ project, index }: { project: Project; index: number }) {
    const meshRef = useRef<Mesh>(null)
    const htmlRef = useRef<HTMLDivElement>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
        }
    })

    const handleAccessModule = () => {
        // Simple project access simulation
        const projectUrls: Record<string, string> = {
            'BargainRadar': 'https://github.com/ak-pydev/bargainradar',
            'CampusGPT': 'https://github.com/ak-pydev/campus-gpt',
            'Tube2Text': 'https://github.com/ak-pydev/tube2text',
            'KhutrukeAI': 'https://github.com/ak-pydev/khutruke-ai'
        }
        
        const url = projectUrls[project.name]
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
        } else {
            alert(`Accessing ${project.name} module...\nProject details loading in neural interface.`)
        }
    }

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group position={project.position}>
                {/* Pod Container */}
                <mesh ref={meshRef}>
                    <cylinderGeometry args={[1.5, 1.5, 0.3, 8]} />
                    <meshStandardMaterial color={project.color} transparent opacity={0.2} wireframe />
                </mesh>

                {/* Inner Core */}
                <mesh>
                    <sphereGeometry args={[0.8]} />
                    <meshStandardMaterial color={project.color} transparent opacity={0.1} wireframe />
                </mesh>

                {/* Project Info */}
                <Html ref={htmlRef} position={[0, 0, 0]} center distanceFactor={8} transform occlude>
                    <motion.div
                        className="bg-black/80 backdrop-blur-sm border border-green-400/50 rounded-lg p-4 min-w-[200px]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-green-400 font-mono text-lg mb-2">{project.name}</h3>
                        <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 bg-green-600/20 border border-green-400/30 rounded text-xs text-green-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <button 
                            onClick={handleAccessModule}
                            className="mt-3 w-full py-2 bg-green-600/30 border border-green-400/50 rounded text-green-400 text-sm hover:bg-green-600/50 transition-colors cursor-pointer"
                        >
                            Access Module
                        </button>
                    </motion.div>
                </Html>

                {/* Floating Particles */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <Float key={i} speed={3 + i} rotationIntensity={0.5} floatIntensity={1}>
                        <mesh position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]}>
                            <sphereGeometry args={[0.05]} />
                            <meshStandardMaterial color={project.color} />
                        </mesh>
                    </Float>
                ))}
            </group>
        </Float>
    )
}

export function ProjectPods() {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectPod key={project.name} project={project} index={index} />
      ))}
    </>
  )
}
