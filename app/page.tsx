'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { JewelryHeroSection } from '@/components/ui/jewelry-hero-section'
import ChromeSignature3D from '@/components/ui/ChromeSignature3D'
import ColoredModel from '@/components/ui/ColoredModel'
import CircularText from '@/components/ui/CircularText'

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<string>("#C0C0C0") // Default silver
  const [currentPage, setCurrentPage] = useState(0) // Track which 4 models to show
  const [isLoading, setIsLoading] = useState(true) // Loading state
  const [modelsLoading, setModelsLoading] = useState(true) // 3D models loading state
  const [activeSection, setActiveSection] = useState<string>("") // Track active section - start with none
  const [showScrollIndicator, setShowScrollIndicator] = useState(true) // Track scroll indicator visibility
  const [showModelsText, setShowModelsText] = useState(false) // Track "models below" text visibility
  const [hasReachedPortfolio, setHasReachedPortfolio] = useState(false) // Track if user has reached portfolio section

  const getColorForSelection = (colorName: string) => {
    switch(colorName) {
      case "silver": return "#C0C0C0"
      case "gold": return "#FFD700"
      case "platinum": return "#E5E4E2"
      default: return "#C0C0C0"
    }
  }

  // All 16 models organized in groups of 4
  const allModels = [
    // Page 0: First 4 models
    [
      { path: "/engine.stl", name: "Engine Model" },
      { path: "/babylon.stl", name: "Babylon Model" },
      { path: "/girl ring 01 f (~recovered).stl", name: "Girl Ring" },
      { path: "/Fixed cross (~recovered).stl", name: "Fixed Cross" }
    ],
    // Page 1: Next 4 models
    [
      { path: "/Bruno Size 7.75 US FINAL.stl", name: "Bruno Ring" },
      { path: "/jewelry-model.stl", name: "Jewelry Model" },
      { path: "/Miles Size 9 US.stl", name: "Miles Ring" },
      { path: "/A ring.stl", name: "A Ring Model" }
    ],
    // Page 2: Next 4 models
    [
      { path: "/Isabel (Size 7.5).stl", name: "Isabel Size" },
      { path: "/notre damn.stl", name: "Notre Damn" },
      { path: "/Ring (~recovered).stl", name: "Ring Recovered" },
      { path: "/rng.stl", name: "RNG Model" }
    ],
    // Page 3: Last 4 models
    [
      { path: "/sfg.stl", name: "SFG Model" },
      { path: "/Yay.stl", name: "Yay Model" },
      { path: "/TOS.stl", name: "TOS Model" },
      { path: "/Untitled.stl", name: "Untitled Model" }
    ]
  ]

  const currentModels = allModels[currentPage]
  const totalPages = allModels.length

  const handleViewMore = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setModelsLoading(true) // Reset loading state when changing pages
  }

  const handleViewPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setModelsLoading(true) // Reset loading state when changing pages
  }

  // Hide loading state after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100) // Very short delay to show loading state
    return () => clearTimeout(timer)
  }, [])

  // Handle 3D models loading with 1-second delay (only for page changes)
  useEffect(() => {
    if (hasReachedPortfolio) {
      const timer = setTimeout(() => {
        setModelsLoading(false)
      }, 1000) // 1-second delay for model rendering when changing pages
      return () => clearTimeout(timer)
    }
  }, [currentPage, hasReachedPortfolio]) // Reset when page changes, but only if user has reached portfolio

  // Handle scroll-based navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Hide scroll indicator as soon as user starts scrolling
      if (window.scrollY > 0) {
        setShowScrollIndicator(false)
      }

      // Get section positions
      const portfolioSection = document.getElementById('portfolio')
      const aboutSection = document.getElementById('about')
      const contactSection = document.getElementById('contact')

      if (portfolioSection && aboutSection && contactSection) {
        const portfolioTop = portfolioSection.offsetTop
        const aboutTop = aboutSection.offsetTop
        const contactTop = contactSection.offsetTop

        // Show "models below" text when approaching portfolio section
        if (scrollPosition >= portfolioTop - (window.innerHeight * 2) && scrollPosition < portfolioTop - window.innerHeight) {
          setShowModelsText(true)
        } else {
          setShowModelsText(false)
        }

        // Only highlight portfolio when actually in the portfolio section
        if (scrollPosition >= portfolioTop && scrollPosition < aboutTop) {
          setActiveSection("portfolio")
          // Set hasReachedPortfolio to true when user first enters portfolio section
          if (!hasReachedPortfolio) {
            setHasReachedPortfolio(true)
            setModelsLoading(true) // Start loading animation
            // Show loading for 2 seconds when first reaching portfolio
            setTimeout(() => {
              setModelsLoading(false)
            }, 2000)
          }
        } else if (scrollPosition >= aboutTop && scrollPosition < contactTop) {
          setActiveSection("about")
        } else if (scrollPosition >= contactTop) {
          setActiveSection("contact")
        } else {
          // When in hero section (top of page), no section is active
          setActiveSection("")
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex items-center justify-center">
          <div className="text-off-white text-2xl font-bold animate-pulse">
            Loading...
          </div>
        </div>
      )}

      {/* 3D Jewelry Hero Section */}
      <JewelryHeroSection />

      {/* Models Below Text */}
      {showModelsText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="models-text">
            models below
            <div className="loading-text">
              Loading times may vary
            </div>
          </div>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="fixed top-0 w-full z-50 py-6"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Left side - AD Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="h-16 md:h-20 lg:h-24 w-32 md:w-40 lg:w-48 flex items-center justify-start">
                <span className="text-off-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide hover:text-white transition-colors duration-200 uppercase font-['Oxygen', sans-serif]">
                  AD
                </span>
              </div>
            </motion.div>

            {/* Center - Navigation pills */}
            <div className="flex space-x-8 items-center ml-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => {
                  const element = document.getElementById('portfolio')
                  if (element) {
                    const offset = window.innerHeight / 2 - element.offsetHeight / 2
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    })
                  }
                }}
              >
                <div className="h-18 w-44 flex items-center justify-center">
                  <span className={`text-xl font-bold tracking-wide transition-colors duration-200 uppercase font-['Oxygen', sans-serif] ${
                    activeSection === "portfolio" 
                      ? "text-white" 
                      : "text-off-white hover:text-white"
                  }`}>
                  PORTFOLIO
                  </span>
                </div>
                </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => {
                  const element = document.getElementById('about')
                  if (element) {
                    const offset = window.innerHeight / 2 - element.offsetHeight / 2
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    })
                  }
                }}
              >
                <div className="h-18 w-40 flex items-center justify-center">
                  <span className={`text-xl font-bold tracking-wide transition-colors duration-200 uppercase font-['Oxygen', sans-serif] ${
                    activeSection === "about" 
                      ? "text-white" 
                      : "text-off-white hover:text-white"
                  }`}>
                  ABOUT
                  </span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    const offset = window.innerHeight / 2 - element.offsetHeight / 2
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    })
                  }
                }}
              >
                <div className="h-18 w-44 flex items-center justify-center">
                  <span className={`text-xl font-bold tracking-wide transition-colors duration-200 uppercase font-['Oxygen', sans-serif] ${
                    activeSection === "contact" 
                      ? "text-white" 
                      : "text-off-white hover:text-white"
                  }`}>
                  CONTACT
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right side - Empty space for balance */}
            <div className="w-32 md:w-40 lg:w-48"></div>
          </div>
        </div>
      </motion.nav>

      {/* Portfolio Preview Section - positioned after 3D hero */}
      <section id="portfolio" className="py-24 container mx-auto px-4 relative z-10" style={{ marginTop: '300vh' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {modelsLoading ? (
            // Show 4 loading spinners for the 4 model slots
            <>
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-3xl">
                    <div className="aspect-[4/5] flex items-center justify-center relative overflow-hidden">
                      <div className="spinner">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            currentModels.map((model, index) => (
              <motion.div
                key={`${currentPage}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer w-full"
              >
                <div className="aspect-[4/5] flex items-center justify-center relative overflow-hidden w-full">
                  <div className="w-full h-full">
                    <ColoredModel 
                      modelPath={model.path}
                      scale={1.2}
                      rotationSpeed={0.3}
                      color={selectedColor}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-12">
          <button
            onClick={handleViewPrevious}
            className="custom-nav-button"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p data-text="Back">Back</p>
          </button>

          <div className="text-off-white text-lg font-bold mx-8">
            {currentPage + 1} / {totalPages}
          </div>

          <button
            onClick={handleViewMore}
            className="custom-nav-button"
          >
            <p data-text="Next">Next</p>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
      </section>

      {/* About Section */}
      <section id="about" className="py-64 container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="pt-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Helvetica']">
              My Journey in Jewelry Design
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed text-xl font-['Helvetica']">
              <p>
                I began designing jewelry in the 8th grade, carving my first pieces from wax. Since then, jewelry design has been a consistent thread in my life. Over the years, I’ve created custom rings and pendants for both clients and brands, developing a design approach that consistently produces distinctive, memorable pieces.
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
            className="relative pt-12 flex justify-end"
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

      {/* Contact Section */}
      <section id="contact" className="py-64 container mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center pt-24">
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
                    <p>asherdelman@gmail.com</p>
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
                    <p>323-823-7888</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="icon-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="contact-info">
                    <h3>LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/asher-delman" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-200"
                    >
                      linkedin.com/in/asher-delman
                    </a>
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

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <div>© 2025 Asher Delman. All rights reserved.</div>
              <div className="flex items-center gap-2 mt-1 text-gray-400">
                <span>Website developed and designed by Oscar Salerno</span>
                <a href="mailto:osalerno@Browning.edu" className="hover:text-white" title="Email Oscar" style={{fontSize: '1rem', display: 'flex', alignItems: 'center'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/oscar-salerno-406423341/" className="hover:text-white" title="Oscar's LinkedIn" target="_blank" rel="noopener noreferrer" style={{fontSize: '1rem', display: 'flex', alignItems: 'center'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/></svg>
                </a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/oscarasalerno/?next=%2F" className="text-gray-400 hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .glass-radio-group {
          --bg: rgba(255, 255, 255, 0.06);
          --text: #e5e5e5;

          display: flex;
          position: relative;
          background: var(--bg);
          border-radius: 1rem;
          backdrop-filter: blur(12px);
          box-shadow:
            inset 1px 1px 4px rgba(255, 255, 255, 0.2),
            inset -1px -1px 6px rgba(0, 0, 0, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          width: fit-content;
        }

        .glass-radio-group input {
          display: none;
        }

        .glass-radio-group label {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 80px;
          font-size: 14px;
          padding: 0.8rem 1.6rem;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 0.3px;
          color: var(--text);
          position: relative;
          z-index: 2;
          transition: color 0.3s ease-in-out;
        }

        .glass-radio-group label:hover {
          color: white;
        }

        .glass-radio-group input:checked + label {
          color: #fff;
        }

        .glass-glider {
          position: absolute;
          top: 0;
          bottom: 0;
          width: calc(100% / 3);
          border-radius: 1rem;
          z-index: 1;
          transition:
            transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56),
            background 0.4s ease-in-out,
            box-shadow 0.4s ease-in-out;
        }

        /* Silver */
        #glass-silver:checked ~ .glass-glider {
          transform: translateX(0%);
          background: linear-gradient(135deg, #c0c0c055, #e0e0e0);
          box-shadow:
            0 0 18px rgba(192, 192, 192, 0.5),
            0 0 10px rgba(255, 255, 255, 0.4) inset;
        }

        /* Gold */
        #glass-gold:checked ~ .glass-glider {
          transform: translateX(100%);
          background: linear-gradient(135deg, #ffd70055, #ffcc00);
          box-shadow:
            0 0 18px rgba(255, 215, 0, 0.5),
            0 0 10px rgba(255, 235, 150, 0.4) inset;
        }

        /* Platinum */
        #glass-platinum:checked ~ .glass-glider {
          transform: translateX(200%);
          background: linear-gradient(135deg, #d0e7ff55, #a0d8ff);
          box-shadow:
            0 0 18px rgba(160, 216, 255, 0.5),
            0 0 10px rgba(200, 240, 255, 0.4) inset;
        }

        /* Custom Navigation Buttons */
        .custom-nav-button {
          --primary-color: #000000;
          --hovered-color: #FFFFFF;
          position: relative;
          display: flex;
          font-weight: 600;
          font-size: 20px;
          gap: 0.5rem;
          align-items: center;
        }

        .custom-nav-button p {
          margin: 0;
          position: relative;
          font-size: 20px;
          color: var(--primary-color);
        }

        .custom-nav-button::after {
          position: absolute;
          content: "";
          width: 0;
          left: 0;
          bottom: -7px;
          background: var(--hovered-color);
          height: 2px;
          transition: 0.3s ease-out;
        }

        .custom-nav-button p::before {
          position: absolute;
          content: attr(data-text);
          width: 0%;
          inset: 0;
          color: var(--hovered-color);
          overflow: hidden;
          transition: 0.3s ease-out;
        }

        .custom-nav-button:hover::after {
          width: 100%;
        }

        .custom-nav-button:hover p::before {
          width: 100%;
        }

        .custom-nav-button:hover svg {
          transform: translateX(4px);
          color: var(--hovered-color);
        }

        .custom-nav-button svg {
          color: var(--primary-color);
          transition: 0.2s;
          position: relative;
          width: 15px;
          transition-delay: 0.2s;
        }

        /* Domino Spinner Animation */
        .spinner {
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin-left: -75px;
        }

        .spinner span {
          position: absolute;
          top: 50%;
          left: var(--left);
          width: 35px;
          height: 7px;
          background: #ffff;
          animation: dominos 1s ease infinite;
          box-shadow: 2px 2px 3px 0px black;
        }

        .spinner span:nth-child(1) {
          --left: 80px;
          animation-delay: 0.125s;
        }

        .spinner span:nth-child(2) {
          --left: 70px;
          animation-delay: 0.3s;
        }

        .spinner span:nth-child(3) {
          left: 60px;
          animation-delay: 0.425s;
        }

        .spinner span:nth-child(4) {
          animation-delay: 0.54s;
          left: 50px;
        }

        .spinner span:nth-child(5) {
          animation-delay: 0.665s;
          left: 40px;
        }

        .spinner span:nth-child(6) {
          animation-delay: 0.79s;
          left: 30px;
        }

        .spinner span:nth-child(7) {
          animation-delay: 0.915s;
          left: 20px;
        }

        .spinner span:nth-child(8) {
          left: 10px;
        }

        @keyframes dominos {
          50% {
            opacity: 0.7;
          }

          75% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
          }

          80% {
            opacity: 1;
          }
        }

        /* Photo Card Styles */
        .photo-card {
          position: relative;
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

        /* Scroll Indicator Styles */
        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .mouse {
          width: 30px;
          height: 50px;
          border: 2px solid #ffffff;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 8px;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background-color: #ffffff;
          border-radius: 2px;
          animation: scroll 2s infinite;
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-15px);
          }
        }

        .arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .arrow span {
          width: 2px;
          height: 8px;
          background-color: #ffffff;
          border-radius: 1px;
          animation: arrow 2s infinite;
        }

        .arrow span:nth-child(1) {
          animation-delay: 0s;
        }

        .arrow span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .arrow span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes arrow {
          0%, 100% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
        }

        /* Models Text Styles */
        .models-text {
          color: #000000;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: 'Oxygen', sans-serif;
          text-align: center;
        }

        .loading-text {
          color: #000000;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: none;
          font-family: 'Helvetica', sans-serif;
          text-align: center;
          margin-top: 8px;
        }

        /* Contact Section Styles */
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
