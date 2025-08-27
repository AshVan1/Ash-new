'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import ColoredModel from '@/components/ui/ColoredModel'
import ChromeSignature3D from '@/components/ui/ChromeSignature3D'

const portfolioItems = [
  {
    id: 1,
    title: "Celestial Diamond Ring",
    category: "Fine Jewelry",
    type: "Ring",
    materials: "18K White Gold, Lab-Grown Diamond",
    modelPath: "/jewelry-model.stl",
    description: "A stunning solitaire featuring a 2-carat lab-grown diamond set in ethically sourced white gold.",
    year: "2024",
    featured: true
  },
  {
    id: 2,
    title: "Aurora Pendant",
    category: "Contemporary",
    type: "Necklace", 
    materials: "Sterling Silver, Cultured Pearl",
    modelPath: "/jewelry-model.stl",
    description: "Inspired by the northern lights, this pendant captures movement and light.",
    year: "2024",
    featured: true
  },
  {
    id: 3,
    title: "Heritage Cufflinks",
    category: "Traditional",
    type: "Accessories",
    materials: "18K Yellow Gold, Onyx",
    modelPath: "/jewelry-model.stl",
    description: "Classic design meets modern craftsmanship in these timeless cufflinks.",
    year: "2023",
    featured: false
  },
  {
    id: 4,
    title: "Geometric Tennis Bracelet",
    category: "Contemporary",
    type: "Bracelet",
    materials: "Platinum, Lab-Grown Diamonds",
    modelPath: "/jewelry-model.stl", 
    description: "A modern interpretation of the classic tennis bracelet with angular settings.",
    year: "2024",
    featured: true
  },
  {
    id: 5,
    title: "Botanical Earrings",
    category: "Fine Jewelry",
    type: "Earrings",
    materials: "Rose Gold, Emeralds, Diamonds",
    modelPath: "/jewelry-model.stl",
    description: "Nature-inspired design featuring hand-carved leaf motifs and ethically sourced gems.",
    year: "2023",
    featured: false
  },
  {
    id: 6,
    title: "Minimalist Band Set",
    category: "Modern",
    type: "Ring",
    materials: "Titanium, Sapphire Accents",
    modelPath: "/jewelry-model.stl",
    description: "Clean lines and subtle details define this contemporary wedding band set.",
    year: "2024",
    featured: false
  },
  {
    id: 7,
    title: "Statement Choker",
    category: "Contemporary",
    type: "Necklace",
    materials: "Sterling Silver, Tourmaline",
    modelPath: "/jewelry-model.stl",
    description: "Bold architectural design that makes a powerful statement.",
    year: "2023",
    featured: true
  },
  {
    id: 8,
    title: "Vintage Revival Brooch",
    category: "Traditional",
    type: "Brooch",
    materials: "14K Gold, Vintage Diamonds",
    modelPath: "/jewelry-model.stl",
    description: "Art Deco-inspired piece featuring reclaimed diamonds in a new setting.",
    year: "2023",
    featured: false
  }
]

const types = ["All", "Ring", "Necklace", "Earrings", "Bracelet", "Accessories", "Brooch"]

export default function Portfolio() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("#E0E0E0") // Default silver

  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      const typeMatch = selectedType === "All" || item.type === selectedType
      return typeMatch
    })
  }, [selectedType])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 py-6"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Left side - 3D Signature */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer"
              >
                <div className="h-16 md:h-20 lg:h-24 w-32 md:w-40 lg:w-48">
                  <ChromeSignature3D 
                    text="Asher Delman"
                    size={0.7}
                    height={0.08}
                    className="w-full h-full"
                  />
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
                <div className="h-18 w-44">
                  <ChromeSignature3D 
                    text="Portfolio"
                    size={1.0}
                    height={0.12}
                    className="w-full h-full"
                  />
                </div>
                </motion.div>
              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <div className="h-18 w-40">
                    <ChromeSignature3D 
                      text="About"
                      size={1.0}
                      height={0.12}
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <div className="h-18 w-44">
                    <ChromeSignature3D 
                      text="Contact"
                      size={1.0}
                      height={0.12}
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Right side - Empty space for balance */}
            <div className="w-32 md:w-40 lg:w-48"></div>
          </div>
        </div>
      </motion.nav>

      {/* Header */}
      <section className="pt-32 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-silver-400 via-gray-500 to-silver-600 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated selection of designs showcasing versatility and attention to detail
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="flex flex-wrap gap-4 justify-center items-center bg-slate-900/50 backdrop-blur-md rounded-full p-4 border border-slate-700/30">
            <span className="text-gray-300 font-medium px-4">Filter by Type:</span>
            {types.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-silver-600 to-gray-600 text-white shadow-lg shadow-silver-500/25'
                    : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/30'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-4 pb-24">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -15, 
                scale: 1.02, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer perspective-1000"
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="relative overflow-hidden rounded-3xl">
                {/* 3D Model Viewer - Floating naturally */}
                <div className="aspect-[3/4] flex items-center justify-center relative overflow-hidden rounded-3xl">
                  <div className="w-full h-full">
                    <ColoredModel 
                      modelPath={item.modelPath}
                      scale={1}
                      rotationSpeed={0.4}
                      color={selectedColor}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Content - Minimal and elegant */}
                <div className="mt-6 text-center">
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-lg">
              No items match your current filters.
            </div>
            <button
              onClick={() => {
                setSelectedType("All")
              }}
              className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Detailed View Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateY: 15 }}
            className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const item = portfolioItems.find(i => i.id === selectedItem)
              if (!item) return null
              
              return (
                <>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-4xl font-bold text-black mb-3">{item.title}</h2>
                      <div className="text-gray-600 font-medium bg-gray-100 px-4 py-2 rounded-full inline-block">{item.type}</div>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-500 hover:text-black text-3xl bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="aspect-[3/4] rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-600/30">
                      <div className="w-full h-full">
                        <ColoredModel 
                          modelPath={item.modelPath}
                          scale={1.2}
                          rotationSpeed={0.5}
                          color={selectedColor}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-black font-bold text-2xl mb-4">Description</h3>
                        <p className="text-gray-800 leading-relaxed text-lg">{item.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-black font-bold text-2xl mb-6">Details</h3>
                        <div className="space-y-4">
                          <div>
                            <strong className="text-gray-600 text-sm uppercase tracking-wide">Type</strong> 
                            <p className="text-black mt-1 text-lg">{item.type}</p>
                          </div>
                          <div>
                            <strong className="text-gray-600 text-sm uppercase tracking-wide">Year</strong> 
                            <p className="text-black mt-1 text-lg">{item.year}</p>
                          </div>
                          
                          {/* Glass Radio Group for Material Selection */}
                          <div className="mb-4">
                            <strong className="text-gray-600 text-sm uppercase tracking-wide mb-4 block">Material</strong>
                            <div className="glass-radio-group">
                              <input type="radio" id="glass-silver" name="material" defaultChecked onChange={() => setSelectedColor("#E0E0E0")} />
                              <label htmlFor="glass-silver">Silver</label>
                              
                              <input type="radio" id="glass-gold" name="material" onChange={() => setSelectedColor("#FFD700")} />
                              <label htmlFor="glass-gold">Gold</label>
                              
                              <input type="radio" id="glass-platinum" name="material" onChange={() => setSelectedColor("#F0F8FF")} />
                              <label htmlFor="glass-platinum">Platinum</label>
                              
                              <div className="glass-glider"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 pt-6">
                        <button className="bg-gray-800 text-white font-bold py-4 px-8 rounded-full hover:bg-gray-900 transition-all duration-300 flex-1">
                          Inquire About Piece
                        </button>
                        <button className="border border-gray-800 text-gray-800 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 flex-1">
                          View Process
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .glass-radio-group {
          --bg: rgba(0, 0, 0, 0.06);
          --text: #333333;

          display: flex;
          position: relative;
          background: var(--bg);
          border-radius: 1rem;
          backdrop-filter: blur(12px);
          box-shadow:
            inset 1px 1px 4px rgba(0, 0, 0, 0.1),
            inset -1px -1px 6px rgba(255, 255, 255, 0.8),
            0 4px 12px rgba(0, 0, 0, 0.1);
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
          color: #000;
        }

        .glass-radio-group input:checked + label {
          color: #000;
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
      `}</style>
    </div>
  )
} 