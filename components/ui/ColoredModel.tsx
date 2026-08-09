'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

interface ColoredModelProps {
  modelPath: string
  scale?: number
  rotationSpeed?: number
  className?: string
  color?: string
}

function applyChromeMaterial(root: THREE.Object3D, color: string) {
  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh
      mesh.material = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 1,
        roughness: 0,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        envMapIntensity: 2.0,
        ior: 1.8,
        transmission: 0.2,
        thickness: 0.8,
        attenuationDistance: 1,
        attenuationColor: '#ffffff',
      })
    }
  })
}

function StlModel({
  modelPath,
  rotationSpeed = 0.5,
  color = '#ffffff',
}: {
  modelPath: string
  rotationSpeed?: number
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const { STLLoader } = await import('three/addons/loaders/STLLoader.js')
        const loader = new STLLoader()
        loader.load(modelPath, (geo) => {
          if (cancelled) return
          geo.computeBoundingBox()
          const center = new THREE.Vector3()
          geo.boundingBox?.getCenter(center)
          geo.translate(-center.x, -center.y, -center.z)

          const box = new THREE.Box3().setFromBufferAttribute(
            geo.attributes.position as THREE.BufferAttribute
          )
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z) || 1
          const scaleFactor = 2 / maxDim
          geo.scale(scaleFactor, scaleFactor, scaleFactor)
          setGeometry(geo)
        })
      } catch (error) {
        console.error('Error loading STL:', error)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [modelPath])

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.5
      meshRef.current.rotation.y = 0.8
      meshRef.current.rotation.z = 0.2
    }
  }, [geometry])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  if (!geometry) return null

  return (
    <mesh ref={meshRef} geometry={geometry}>
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

function GlbModel({
  modelPath,
  rotationSpeed = 0.5,
  color = '#ffffff',
}: {
  modelPath: string
  rotationSpeed?: number
  color?: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)
  const cloned = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    applyChromeMaterial(cloned, color)
  }, [cloned, color])

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.5
      groupRef.current.rotation.y = 0.8
      groupRef.current.rotation.z = 0.2
    }
  }, [cloned])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  )
}

function Model(props: { modelPath: string; rotationSpeed?: number; color?: string }) {
  const isGlb = /\.glb($|\?)/i.test(props.modelPath)
  return isGlb ? <GlbModel {...props} /> : <StlModel {...props} />
}

export default function ColoredModel({
  modelPath,
  rotationSpeed = 0.5,
  className = '',
  color = '#ffffff',
}: ColoredModelProps) {
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(containerRef, {
    once: false,
    margin: '100px',
    amount: 0.3,
  })

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onError={() => setHasError(true)}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <pointLight position={[-10, -10, -5]} intensity={0.8} />
          <pointLight position={[0, 10, 0]} intensity={1.0} />
          <Environment preset="sunset" />

          <Suspense fallback={null}>
            <Model modelPath={modelPath} rotationSpeed={rotationSpeed} color={color} />
          </Suspense>

          <OrbitControls enablePan={false} enableZoom={false} enableRotate />
        </Canvas>
      )}

      {hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center text-red-400 text-sm bg-black bg-opacity-50">
          Failed to load model
        </div>
      )}
    </div>
  )
}
