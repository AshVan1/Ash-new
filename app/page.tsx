'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ColoredModel from '@/components/ui/ColoredModel'
import MobileNav from '@/components/ui/MobileNav'
import ContactBlock from '@/components/ui/ContactBlock'

export default function Home() {
  const [selectedColor] = useState<string>("#C0C0C0") // Default silver
  const [currentPage, setCurrentPage] = useState(0) // Track which 4 models to show
  const [isLoading, setIsLoading] = useState(true) // Loading state
  const [modelsLoading, setModelsLoading] = useState(true) // 3D models loading state
  const [activeSection, setActiveSection] = useState<string>("portfolio")

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
    setModelsLoading(true)
  }

  const handleViewPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setModelsLoading(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setModelsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!modelsLoading) return
    const timer = setTimeout(() => {
      setModelsLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [currentPage, modelsLoading])

  // Handle scroll-based navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const portfolioSection = document.getElementById('portfolio')
      const aboutSection = document.getElementById('about')
      const contactSection = document.getElementById('contact')

      if (portfolioSection && aboutSection && contactSection) {
        const portfolioTop = portfolioSection.offsetTop
        const aboutTop = aboutSection.offsetTop
        const contactTop = contactSection.offsetTop

        if (scrollPosition >= aboutTop && scrollPosition < contactTop) {
          setActiveSection("about")
        } else if (scrollPosition >= contactTop) {
          setActiveSection("contact")
        } else {
          setActiveSection("portfolio")
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
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

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
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
            <div className="hidden xl:flex space-x-8 items-center ml-8">
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
            <div className="hidden xl:block w-32 md:w-40 lg:w-48"></div>
            <MobileNav
              items={[
                {
                  label: 'Portfolio',
                  active: activeSection === 'portfolio',
                  onClick: () => {
                    const element = document.getElementById('portfolio')
                    if (!element) return
                    const top = element.getBoundingClientRect().top + window.scrollY - 96
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
                  },
                },
                {
                  label: 'About',
                  active: activeSection === 'about',
                  onClick: () => {
                    const element = document.getElementById('about')
                    if (!element) return
                    const top = element.getBoundingClientRect().top + window.scrollY - 96
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
                  },
                },
                {
                  label: 'Contact',
                  active: activeSection === 'contact',
                  onClick: () => {
                    const element = document.getElementById('contact')
                    if (!element) return
                    const top = element.getBoundingClientRect().top + window.scrollY - 96
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
                  },
                },
              ]}
            />
          </div>
        </div>
      </motion.nav>

      {/* Portfolio — centered between nav and bottom of viewport */}
      <section
        id="portfolio"
        className="relative z-10 min-h-screen container mx-auto px-4 flex flex-col justify-center pt-28 pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto w-full items-center">
          {modelsLoading ? (
            <>
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group w-full"
                >
                  <div className="h-[min(52vh,420px)] flex items-center justify-center relative overflow-hidden w-full">
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
                <div className="h-[min(52vh,420px)] flex items-center justify-center relative overflow-hidden w-full">
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
        <div className="flex justify-center items-center mt-8 shrink-0">
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
      <section id="about" className="py-20 md:py-64 container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start pt-10 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="min-w-0 pt-0 md:pt-16"
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
            className="relative min-w-0 w-full pt-4 md:pt-12 flex justify-center lg:justify-end"
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
      <section id="contact" className="py-20 md:py-64 container mx-auto px-4 relative z-10">
        <div className="pt-10 md:pt-32">
          <ContactBlock />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <div>© 2025 Asher Delman. All rights reserved.</div>
              <div className="flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-gray-400">
                <span>Website developed and designed by Oscar Salerno</span>
                <a href="mailto:osalerno@Browning.edu" className="hover:text-white inline-flex items-center justify-center p-3 -m-3 md:p-0 md:m-0" title="Email Oscar" style={{fontSize: '1rem', display: 'flex', alignItems: 'center'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/oscar-salerno-406423341/" className="hover:text-white inline-flex items-center justify-center p-3 -m-3 md:p-0 md:m-0" title="Oscar's LinkedIn" target="_blank" rel="noopener noreferrer" style={{fontSize: '1rem', display: 'flex', alignItems: 'center'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/></svg>
                </a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/oscarasalerno/?next=%2F" className="inline-flex items-center py-3 text-gray-400 hover:text-white transition-colors duration-200 md:py-0" target="_blank" rel="noopener noreferrer">Instagram</a>
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
          width: 100%;
          max-width: 500px;
          aspect-ratio: 5 / 4;
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

        @media (max-width: 720px) {
          .custom-nav-button {
            --primary-color: #faf9f6;
            min-height: 44px;
            padding: 0.65rem 0.35rem;
          }
        }
      `}</style>
    </div>
  )
} 
