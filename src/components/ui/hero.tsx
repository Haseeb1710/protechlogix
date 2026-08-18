"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

export default function ShaderHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)
    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }
    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#111111] relative overflow-hidden flex flex-col justify-between">
      {/* SVG Filters & Shaders Definition */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c6fd50" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b4ee36" />
          </linearGradient>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#c6fd50" />
            <stop offset="70%" stopColor="#b4ee36" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ProTechlogix Vivid Green Mesh Shader Background */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#111111", "#1a2a06", "#c6fd50", "#0e1804", "#243a08"]}
        speed={0.3}
        backgroundColor="#111111"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#111111", "#ffffff", "#c6fd50", "#1a2a06"]}
        speed={0.2}
        wireframe="true"
        backgroundColor="transparent"
      />

      {/* Top Header Navigation */}
      <header className="relative z-20 flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <motion.div
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src="/logo-nav.png" alt="ProTechlogix" className="h-8 w-auto object-contain" />
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <a
            href="#services"
            className="text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Services
          </a>
          <a
            href="#process"
            className="text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Pricing
          </a>
          <a
            href="#faqs"
            className="text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            FAQs
          </a>
        </nav>

        {/* Action Button */}
        <div id="gooey-btn" className="relative flex items-center group">
          <a
            href="#contact"
            className="px-5 py-2 rounded-xl bg-[#c6fd50] text-[#111111] font-extrabold text-xs tracking-wider uppercase transition-all duration-200 hover:bg-[#b4ee36] shadow-[3px_3px_0px_#111111] border-2 border-[#111111] flex items-center gap-2"
          >
            <span>JOIN WAITLIST</span>
            <span className="w-5 h-5 bg-[#111111] text-white rounded flex items-center justify-center text-[10px]">→</span>
          </a>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-20 max-w-4xl mx-auto px-6 py-12 text-center flex flex-col items-center">
        <motion.div
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md mb-6 relative border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-[#c6fd50]/50 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <span className="text-[#c6fd50]">★</span> VERIFIED TOP GROWTH PARTNER
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          ONE Partner. ONE Engine.
          <motion.span
            className="block text-[#c6fd50] font-black mt-2"
            style={{
              filter: "url(#text-glow)",
            }}
          >
            Done right.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg font-normal text-white/70 mb-8 leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          A custom growth and operations engine, live in two weeks. Call center ops, verified insurance leads, 24/7 customer support, and custom web development. No freelancers. No generic templates. No hassles.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="h-12 px-6 rounded-xl bg-[#c6fd50] text-[#111111] font-extrabold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#b4ee36] shadow-[3.5px_3.5px_0px_#111111] border-2 border-[#111111] flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>JOIN WAITLIST</span>
            <span className="w-7 h-7 bg-[#111111] text-white rounded-lg flex items-center justify-center text-xs">→</span>
          </motion.a>
          
          <motion.a
            href="#pricing"
            className="h-12 px-6 rounded-xl bg-white text-[#111111] font-extrabold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#f7f7f5] shadow-[3.5px_3.5px_0px_#111111] border-2 border-[#111111] flex items-center cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            VIEW PRICING
          </motion.a>
        </motion.div>
      </main>

      {/* Pulsing Border Badge at Bottom Right */}
      <div className="absolute bottom-6 right-6 z-30 hidden sm:block">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <PulsingBorder
            colors={["#c6fd50", "#b4ee36", "#ffffff", "#1a2a06"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={4}
            spotsPerColor={4}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
            }}
          />
          {/* Rotating Text Around the Pulsing Border */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ transform: "scale(1.5)" }}
          >
            <defs>
              <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-[11px] fill-[#c6fd50] font-bold tracking-widest uppercase">
              <textPath href="#circle" startOffset="0%">
                ★ PROTECHLOGIX ★ LIVE IN 14 DAYS ★
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  )
}
