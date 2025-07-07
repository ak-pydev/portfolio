"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import * as THREE from "three"

interface FloatingKeywordsProps {
  isDarkMode: boolean
  chaosMode: boolean
}

const keywords = [
  "Machine Learning",
  "Neural Networks",
  "Deep Learning",
  "Python",
  "TensorFlow",
  "PyTorch",
  "Data Science",
  "AI",
  "MLOps",
  "Docker",
  "Kubernetes",
  "FastAPI",
  "SQL",
  "NoSQL",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "AWS",
  "Azure",
  "GCP",
  "Microservices",
  "API",
  "REST",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "Spark",
  "Hadoop",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "OpenAI",
  "LangChain",
  "Vector DB",
  "RAG",
  "NLP",
  "Computer Vision",
]

function FloatingKeyword({
  text,
  position,
  isDarkMode,
  chaosMode,
}: {
  text: string
  position: [number, number, number]
  isDarkMode: boolean
  chaosMode: boolean
}) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <Text
          fontSize={0.3}
          color={chaosMode ? "#ff0000" : isDarkMode ? "#00ff88" : "#0066cc"}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

export function FloatingKeywords({ isDarkMode, chaosMode }: FloatingKeywordsProps) {
const positions: [number, number, number][] = keywords.map(() => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 10 - 5,
])

  return (
    <>
      {keywords.map((keyword, index) => (
        <FloatingKeyword
          key={keyword}
          text={keyword}
          position={positions[index]}
          isDarkMode={isDarkMode}
          chaosMode={chaosMode}
        />
      ))}
    </>
  )
}
