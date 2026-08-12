'use client'

import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useDevice } from '@/hooks/useDevice'
import MobileContact from '@/components/home/MobileContact'

const ColoredModel = dynamic(() => import('@/components/ui/ColoredModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-off-white/30 border-t-off-white rounded-full animate-spin" />
    </div>
  ),
})

const ALL_MODELS = [
  [
    { path: "/engine.stl", name: "Engine Model" },
    { path: "/babylon.stl", name: "Babylon Model" },
    { path: "/girl ring 01 f (~recovered).stl", name: "Girl Ring" },
    { path: "/Fixed cross (~recovered).stl", name: "Fixed Cross" }
  ],
  [
    { path: "/Bruno Size 7.75 US FINAL.stl", name: "Bruno Ring" },
    { path: "/jewelry-model.stl", name: "Jewelry Model" },
    { path: "/Miles Size 9 US.stl", name: "Miles Ring" },
    { path: "/A ring.stl", name: "A Ring Model" }
  ],
  [
    { path: "/Isabel (Size 7.5).stl", name: "Isabel Size" },
    { path: "/notre damn.stl", name: "Notre Damn" },
    { path: "/Ring (~recovered).stl", name: "Ring Recovered" },
    { path: "/rng.stl", name: "RNG Model" }
  ],
  [
    { path: "/sfg.stl", name: "SFG Model" },
    { path: "/Yay.stl", name: "Yay Model" },
    { path: "/TOS.stl", name: "TOS Model" },
    { path: "/Untitled.stl", name: "Untitled Model" }
  ]
]

const FLAT_MODELS = ALL_MODELS.flat()

export default function Home() {
  const { isMobile } = useDevice()
  const [selectedColor] = useState<string>("#C0C0C0") // Default silver
  const [currentPage, setCurrentPage] = useState(0) // Track which models to show
  const [isLoading, setIsLoading] = useState(true) // Loading state
  const [modelsLoading, setModelsLoading] = useState(true) // 3D models loading state
  const [activeSection, setActiveSection] = useState<string>("portfolio")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const modelsPerView = isMobile ? 1 : 4
  const totalPages = isMobile ? FLAT_MODELS.length : ALL_MODELS.length
  const currentModels = isMobile
    ? [FLAT_MODELS[currentPage % FLAT_MODELS.length]]
    : ALL_MODELS[currentPage]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: isMobile ? 'start' : 'center',
      })
    }
    setMobileMenuOpen(false)
  }

  const handleViewMore = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setModelsLoading(true)
  }

  const handleViewPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setModelsLoading(true)
  }

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages - 1))
  }, [isMobile, totalPages])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
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
        className="fixed top-0 w-full z-50 py-3 md:py-6 bg-slate-950/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-slate-800/40 md:border-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center gap-4">
            {/* Left side - AD Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative shrink-0"
            >
              <button
                type="button"
                onClick={() => scrollToSection('portfolio')}
                className="h-10 md:h-20 lg:h-24 flex items-center justify-start"
              >
                <span className="text-off-white text-lg md:text-3xl lg:text-4xl font-bold tracking-wide hover:text-white transition-colors duration-200 uppercase font-['Oxygen', sans-serif]">
                  AD
                </span>
              </button>
            </motion.div>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-8 items-center ml-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => scrollToSection('portfolio')}
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
                onClick={() => scrollToSection('about')}
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
                onClick={() => scrollToSection('contact')}
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

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 shrink-0 rounded-lg border border-white/10"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className={`block h-0.5 w-6 bg-off-white transition-transform duration-200 ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-off-white transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-off-white transition-transform duration-200 ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>

            {/* Right side - Empty space for balance on desktop */}
            <div className="hidden md:block w-32 md:w-40 lg:w-48"></div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-slate-950/98 backdrop-blur-md z-40"
            >
              <div className="px-6 py-8 flex flex-col gap-2 h-full">
                {(['portfolio', 'about', 'contact'] as const).map((section) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => scrollToSection(section)}
                    className={`text-left text-2xl font-bold tracking-wide uppercase font-['Oxygen', sans-serif] py-4 border-b border-white/10 ${
                      activeSection === section ? 'text-white' : 'text-off-white/70'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Portfolio */}
      <section
        id="portfolio"
        className="relative z-10 w-full min-h-[100dvh] md:min-h-screen max-w-full mx-auto px-4 md:px-6 flex flex-col justify-center pt-[4.5rem] md:pt-28 pb-8 md:pb-10"
      >
        <div className="md:hidden text-center mb-4">
          <p className="text-xs uppercase tracking-[0.35em] text-off-white/50 font-['Oxygen', sans-serif]">
            Portfolio
          </p>
          {!modelsLoading && currentModels[0] && (
            <h2 className="text-lg text-off-white mt-2 font-['Oxygen', sans-serif] uppercase tracking-wide">
              {currentModels[0].name}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full max-w-7xl mx-auto items-center">
          {modelsLoading ? (
            <>
              {Array.from({ length: modelsPerView }).map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group w-full"
                >
                  <div className="flex items-center justify-center relative overflow-hidden w-full h-[55dvh] md:h-[min(52vh,420px)]">
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
                <div className="flex items-center justify-center relative overflow-hidden w-full h-[55dvh] md:h-[min(52vh,420px)]">
                  <div className="w-full h-full">
                    <ColoredModel 
                      modelPath={model.path}
                      scale={1.2}
                      rotationSpeed={isMobile ? 0.2 : 0.3}
                      color={selectedColor}
                      className="w-full h-full"
                      lowPower={isMobile}
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between md:justify-center items-center mt-6 md:mt-8 shrink-0 w-full max-w-sm md:max-w-none mx-auto px-2">
          <button
            onClick={handleViewPrevious}
            className="custom-nav-button mobile-nav-button"
            aria-label="Previous model"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p data-text="Back" className="hidden sm:block">Back</p>
          </button>

          <div className="text-off-white text-base md:text-lg font-bold px-4 tabular-nums">
            {currentPage + 1} / {totalPages}
          </div>

          <button
            onClick={handleViewMore}
            className="custom-nav-button mobile-nav-button"
            aria-label="Next model"
          >
            <p data-text="Next" className="hidden sm:block">Next</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-64 w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16 items-start pt-8 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 w-full"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8 font-['Helvetica']">
              My Journey in Jewelry Design
            </h2>
            <div className="space-y-4 md:space-y-6 text-gray-300 leading-relaxed text-base md:text-xl font-['Helvetica']">
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
            className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end"
          >
            <div className="photo-card w-full">
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
      <section id="contact" className="py-16 md:py-64 w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 scroll-mt-20">
        <div className="md:hidden pt-4">
          <MobileContact />
        </div>

        <div className="hidden md:flex justify-center items-center pt-12 md:pt-24">
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
      <footer className="py-8 md:py-12 border-t border-slate-800/50 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center md:text-left gap-4">
            <div className="text-gray-400 text-sm md:text-base">
              <div>© 2025 Asher Delman. All rights reserved.</div>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2 mt-2 text-gray-400">
                <span className="max-w-xs sm:max-w-none">Website developed and designed by Oscar Salerno</span>
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
          --primary-color: #FAF9F6;
          --hovered-color: #FFFFFF;
          position: relative;
          display: flex;
          font-weight: 600;
          font-size: 20px;
          gap: 0.5rem;
          align-items: center;
          min-height: 44px;
          min-width: 44px;
          padding: 0.5rem;
        }

        .mobile-nav-button {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 0.65rem 1rem;
          background: rgba(255, 255, 255, 0.04);
        }

        @media (min-width: 768px) {
          .mobile-nav-button {
            border: none;
            border-radius: 0;
            padding: 0.5rem;
            background: transparent;
          }
        }

        .custom-nav-button p {
          margin: 0;
          position: relative;
          font-size: 16px;
          color: var(--primary-color);
        }

        @media (min-width: 768px) {
          .custom-nav-button p {
            font-size: 20px;
          }
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
          margin-left: 0;
        }

        @media (min-width: 768px) {
          .spinner {
            margin-left: -75px;
          }
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
          aspect-ratio: 4 / 3;
          border-radius: 10px;
          overflow: hidden;
          perspective: 1000px;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @media (min-width: 768px) {
          .photo-card {
            height: min(400px, 70vw);
            aspect-ratio: auto;
          }
        }

        .photo-card:hover {
          transform: scale(1.02);
        }

        @media (min-width: 768px) {
          .photo-card:hover {
            transform: scale(1.05);
          }
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

        /* Contact Section Styles */
        .outer {
          width: min(600px, 100%);
          height: min(500px, 85vw);
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
          gap: 1rem;
          padding: 0;
          width: 100%;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .contact-item {
            gap: 2rem;
          }
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
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        @media (min-width: 768px) {
          .contact-info h3 {
            font-size: 1.5rem;
          }
        }
        
        .contact-info p {
          font-size: 0.95rem;
          color: #ccc;
          margin: 0;
          word-break: break-word;
        }

        @media (min-width: 768px) {
          .contact-info p {
            font-size: 1.2rem;
          }
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
