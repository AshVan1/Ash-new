'use client'

import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

interface ColoredModelProps {
  modelPath: string
  scale?: number
  rotationSpeed?: number
  className?: string
  color?: string
}

function Model({ modelPath, scale = 1, rotationSpeed = 0.5, color = "#ffffff" }: { modelPath: string; scale?: number; rotationSpeed?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load STL file
  useEffect(() => {
    const loadSTL = async () => {
      try {
        const { STLLoader } = await import('three/addons/loaders/STLLoader.js')
        const loader = new STLLoader()
        
        loader.load(
          modelPath,
          (geometry) => {
            // Center the geometry
            geometry.computeBoundingBox()
            const center = new THREE.Vector3()
            geometry.boundingBox?.getCenter(center)
            geometry.translate(-center.x, -center.y, -center.z)
            
            // Scale to fit in view
            const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position as THREE.BufferAttribute)
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const scaleFactor = 2 / maxDim
            geometry.scale(scaleFactor, scaleFactor, scaleFactor)
            
            setGeometry(geometry)
            setError(null)
          },
          undefined,
          (error) => {
            console.error('Error loading STL:', error)
            setError('Failed to load model')
          }
        )
      } catch (error) {
        console.error('Error importing STLLoader:', error)
        setError('Failed to load model')
      }
    }

    loadSTL()
  }, [modelPath])

  // Set initial slanted position and rotation animation
  useEffect(() => {
    if (meshRef.current) {
      // Set initial slanted position (rotated on X and Y axes)
      meshRef.current.rotation.x = 0.5 // More tilt forward
      meshRef.current.rotation.y = 0.8 // More rotation to the side
      meshRef.current.rotation.z = 0.2 // More twist
    }
  }, [geometry])

  // Rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  // Don't render anything if there's an error or no geometry
  if (error || !geometry) {
    return null
  }

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {/* Chrome Effect Material */}
      <meshPhysicalMaterial
        color={color}
        metalness={1}
        roughness={0}
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        envMapIntensity={2.0}
        ior={1.8}
        transmission={0.2}
        thickness={0.8}
        attenuationDistance={1}
        attenuationColor="#ffffff"
      />
    </mesh>
  )
}

export default function ColoredModel({ 
  modelPath, 
  scale = 1, 
  rotationSpeed = 0.5, 
  className = "",
  color = "#ffffff"
}: ColoredModelProps) {
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use Framer Motion's useInView to detect when model is visible
  const isInView = useInView(containerRef, {
    once: false, // Allow re-triggering when scrolling back
    margin: "100px", // Start loading 100px before it comes into view
    amount: 0.3 // Trigger when 30% of the element is visible
  })

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {/* Only render Canvas when model is in view */}
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          onError={() => setHasError(true)}
        >
          {/* Enhanced Lighting for Chrome Effect */}
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <pointLight position={[-10, -10, -5]} intensity={0.8} />
          <pointLight position={[0, 10, 0]} intensity={1.0} />
          
          {/* Environment for realistic chrome reflections */}
          <Environment preset="sunset" />
          
          {/* Model */}
          <Suspense fallback={null}>
            <Model 
              modelPath={modelPath} 
              scale={scale} 
              rotationSpeed={rotationSpeed} 
              color={color}
            />
          </Suspense>
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      )}
      
      {/* Only show error state, no loading state */}
      {hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center text-red-400 text-sm bg-black bg-opacity-50">
          Failed to load model
        </div>
      )}
    </div>
  )
} 