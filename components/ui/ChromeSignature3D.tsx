'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface ChromeSignature3DProps {
  text?: string
  size?: number
  height?: number
  className?: string
}

function Signature3D({ 
  text = "Asher Delman", 
  size = 1, 
  height = 0.2
}: { 
  text: string; 
  size: number; 
  height: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={size}
        height={height}
        curveSegments={64}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.03}
        bevelOffset={0}
        bevelSegments={12}
      >
        {text}
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={1}
          roughness={0}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={5.0}
          ior={1.8}
          transmission={0.2}
          thickness={0.8}
          attenuationDistance={1}
          attenuationColor="#ffffff"
        />
      </Text3D>
    </mesh>
  )
}

export default function ChromeSignature3D({ 
  text = "Asher Delman",
  size = 1,
  height = 0.2,
  className = ""
}: ChromeSignature3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        {/* Enhanced Environment for more shimmer */}
        <Environment preset="sunset" />
        
        {/* Enhanced Lighting for more shimmer */}
        <ambientLight intensity={1.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={3.5} 
        />
        <pointLight 
          position={[-10, -10, -5]} 
          intensity={1.2} 
        />
        <pointLight 
          position={[10, -10, 5]} 
          intensity={1.8} 
        />
        <pointLight 
          position={[0, 15, 0]} 
          intensity={2.0} 
        />
        <pointLight 
          position={[-15, 0, 0]} 
          intensity={1.0} 
        />
        
        {/* 3D Signature */}
        <Signature3D 
          text={text}
          size={size}
          height={height}
        />
        
        {/* Controls - All disabled for performance */}
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
} 