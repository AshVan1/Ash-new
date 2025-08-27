'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ChromeSignature3D from '@/components/ui/ChromeSignature3D'
import { SparkleParticles } from '@/components/ui/SparkleParticles'
import BlurText from '@/components/ui/BlurText'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

export default function About() {
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
            <div className="flex space-x-8 items-center ml-8">
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
                <div className="h-18 w-40 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold tracking-wide font-['Helvetica'] uppercase">
                    ABOUT
                  </span>
                </div>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <div className="h-18 w-44 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold tracking-wide font-['Helvetica']">
                      Contact
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Right side - Empty space for balance */}
            <div className="w-32 md:w-40 lg:w-48"></div>
          </div>
        </div>
      </motion.nav>

      {/* About Content */}
      <section className="pt-32 pb-16 container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="pt-16 lg:col-span-1"
          >
            <BlurText 
              text="My Journey in Jewelry Design" 
              className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Helvetica']"
              delay={100}
              stepDuration={0.4}
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
              animationTo={[
                { filter: 'blur(5px)', opacity: 0.5, y: 5 },
                { filter: 'blur(0px)', opacity: 1, y: 0 }
              ]}
              onAnimationComplete={() => {}}
            />
            <div className="space-y-6 text-gray-300 leading-relaxed text-xl font-['Helvetica']">
              <p>
                I began designing jewelry in the 8th grade, carving my first pieces from wax. 
                Since then, jewelry design has been a consistent thread in my life. 
                Over the years, I’ve created custom rings and pendants for both clients and brands, 
                developing a design approach that consistently produces distinctive, memorable pieces. 
                In such a saturated space, my goal is to create jewelry that feels both unique and approachable. 
                I am currently open to custom one-of-one work, as well as collection or one off designs for brands seeking standout, eye-catching pieces.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative pt-4 flex justify-end items-center lg:col-span-1"
          >
            <div className="photo-card">
              <div className="photo-container">
                <img 
                  src="/IMG_7367.jpeg" 
                  alt="Jewelry Design Work" 
                  className="photo-main"
                  onLoad={() => console.log('IMG_7367.jpeg loaded successfully')}
                  onError={(e) => console.error('IMG_7367.jpeg failed to load:', e)}
                />
                <img 
                  src="/DSC04639.jpeg" 
                  alt="Jewelry Design Work Hover" 
                  className="photo-hover"
                  onLoad={() => console.log('DSC04639.jpeg loaded successfully')}
                  onError={(e) => console.error('DSC04639.jpeg failed to load:', e)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .photo-card {
          width: 500px;
          height: 400px;
          border-radius: 10px;
          overflow: hidden;
          perspective: 1000px;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .photo-card:hover {
          transform: scale(1.05);
        }

        .photo-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .photo-main,
        .photo-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .photo-main {
          opacity: 1;
          transform: rotateY(0deg);
        }

        .photo-hover {
          opacity: 0;
          transform: rotateY(90deg);
        }

        .photo-card:hover .photo-main {
          opacity: 0;
          transform: rotateY(-90deg);
        }

        .photo-card:hover .photo-hover {
          opacity: 1;
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  )
} 