'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ChromeSignature3D from '@/components/ui/ChromeSignature3D'
import { SparkleParticles } from '@/components/ui/SparkleParticles'

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
            <div className="w-32 md:w-40 lg:w-48"></div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 container mx-auto px-4 relative z-10">
      </section>

      {/* Animated Card Section */}
      <section className="py-16 container mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center pt-16">
          <div className="outer">
            <div className="dot"></div>
            <div className="card">
              <div className="ray"></div>
              <div className="contact-content">
                <div className="contact-item">
                  <div className="icon-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-info">
                    <h3>Email</h3>
                    <p>jewelry.designer@example.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="icon-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9452 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09477 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.6518C2.82196 2.44691 3.04971 2.28331 3.30351 2.17137C3.55731 2.05943 3.83172 2.00177 4.10999 2H7.10999C7.59522 1.99522 8.06569 2.16708 8.43373 2.48353C8.80177 2.79999 9.04201 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.9736 7.27675 9.89418 7.6495C9.81476 8.02225 9.63037 8.36326 9.35999 8.63L8.08999 9.9C9.51355 12.4136 11.5864 14.4865 14.1 15.91L15.37 14.64C15.6367 14.3696 15.9778 14.1852 16.3505 14.1058C16.7233 14.0264 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7635 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0099 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-info">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="icon-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="line topl"></div>
              <div className="line bottoml"></div>
              <div className="line leftl"></div>
              <div className="line rightl"></div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .outer {
          width: 600px;
          height: 500px;
          border-radius: 10px;
          padding: 1px;
          background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
          position: relative;
        }

        .dot {
          width: 5px;
          aspect-ratio: 1;
          position: absolute;
          background-color: #fff;
          box-shadow: 0 0 10px #ffffff;
          border-radius: 100px;
          z-index: 2;
          right: 10%;
          top: 10%;
          animation: moveDot 6s linear infinite;
        }

        @keyframes moveDot {
          0%,
          100% {
            top: 10%;
            right: 10%;
          }
          25% {
            top: 10%;
            right: calc(100% - 35px);
          }
          50% {
            top: calc(100% - 30px);
            right: calc(100% - 35px);
          }
          75% {
            top: calc(100% - 30px);
            right: 10%;
          }
        }

        .card {
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 9px;
          border: solid 1px #202222;
          background-size: 20px 20px;
          background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-direction: column;
          color: #fff;
        }
        
        .contact-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          width: 80%;
          z-index: 3;
          align-items: center;
          justify-content: center;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0;
          width: 100%;
          justify-content: center;
        }
        
        .icon-container {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        
        .contact-info {
          flex: 1;
        }
        
        .contact-info h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        
        .contact-info p {
          font-size: 1.2rem;
          color: #ccc;
          margin: 0;
        }
        
        .ray {
          width: 220px;
          height: 45px;
          border-radius: 100px;
          position: absolute;
          background-color: #c7c7c7;
          opacity: 0.4;
          box-shadow: 0 0 50px #fff;
          filter: blur(10px);
          transform-origin: 10%;
          top: 0%;
          left: 0;
          transform: rotate(40deg);
        }

        .line {
          width: 100%;
          height: 1px;
          position: absolute;
          background-color: #2c2c2c;
        }
        .topl {
          top: 10%;
          background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
        }
        .bottoml {
          bottom: 10%;
        }
        .leftl {
          left: 10%;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, #747474 30%, #222424 70%);
        }
        .rightl {
          right: 10%;
          width: 1px;
          height: 100%;
        }
      `}</style>
    </div>
  )
} 