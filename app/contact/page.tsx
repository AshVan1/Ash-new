'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SparkleParticles } from '@/components/ui/SparkleParticles'
import MobileNav from '@/components/ui/MobileNav'
import ContactBlock from '@/components/ui/ContactBlock'

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true)

  // Hide loading state after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black relative">
      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-white text-2xl font-bold animate-pulse">
            Loading...
          </div>
        </div>
      )}

      {/* Sparkle Particles Background */}
      <div className="absolute inset-0 z-0">
        <SparkleParticles
          className="w-full h-full"
          particleColor="#FFFFFF"
          maxParticleSize={4}
          minParticleSize={2}
          baseDensity={300}
          maxSpeed={1.2}
          maxOpacity={1.0}
          minParticleOpacity={0.8}
          opacityAnimationSpeed={0}
          particleShape="circle"
          enableHoverGrab={true}
          hoverMode="grab"
          backgroundColor="transparent"
          zIndexLevel={0}
          clickEffect={false}
        />
      </div>
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 py-6"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Left side - AD Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer"
              >
                <div className="h-16 md:h-20 lg:h-24 w-32 md:w-40 lg:w-48 flex items-center justify-start">
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide font-['Helvetica']">
                    AD
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Center - Navigation pills */}
            <div className="hidden xl:flex space-x-8 items-center ml-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => {
                  window.location.href = '/'
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                  })
                }}
              >
                <div className="h-18 w-44 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold tracking-wide font-['Helvetica']">
                  Portfolio
                  </span>
                </div>
                </motion.div>
              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <div className="h-18 w-40 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold tracking-wide font-['Helvetica']">
                  About
                    </span>
                  </div>
                </motion.div>
              </Link>
                <div className="h-18 w-44 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold tracking-wide font-['Helvetica'] uppercase">
                  CONTACT
                  </span>
                </div>
            </div>

            {/* Right side - Empty space for balance */}
            <div className="hidden xl:block w-32 md:w-40 lg:w-48"></div>
            <MobileNav
              items={[
                { label: 'Portfolio', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact', active: true },
              ]}
            />
          </div>
        </div>
      </motion.nav>

      <section className="pt-32 pb-16 container mx-auto px-4 relative z-10">
        <div className="pt-8 md:pt-24">
          <ContactBlock />
        </div>
      </section>
    </div>
  )
} 