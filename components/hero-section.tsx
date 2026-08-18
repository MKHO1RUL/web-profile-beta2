"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Transition } from "framer-motion"
import { ChevronDown, X, Sparkles, Terminal } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const ROLES = [
  "AI & Machine Learning Engineer",
  "Computational Mathematician",
  "Time-Series Forecasting Specialist",
  "Generative AI & RAG Builder",
]

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  const chakraAnimation = isMobile
    ? {
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
      }
    : {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }

  const chakraTransition: Transition = isMobile
    ? {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }
    : {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[url('/header-back.jpg')] bg-cover bg-center opacity-25 mix-blend-luminosity" />
      </div>

      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={chakraAnimation}
            transition={chakraTransition}
            style={{ willChange: "transform, opacity" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[radial-gradient(circle,_rgba(59,130,246,0.22)_0%,_rgba(59,130,246,0)_70%)] rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{ willChange: "transform, opacity" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[radial-gradient(circle,_rgba(249,115,22,0.22)_0%,_rgba(249,115,22,0)_70%)] rounded-full blur-lg"
          />
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Avatar with Chakra Rings */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 0.9 }}
          className="mb-8"
        >
          <div className="w-32 h-32 md:w-36 md:h-36 mx-auto mb-6 relative">
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 border-4 border-orange-400 rounded-full shadow-[0_0_20px_rgba(251,146,60,0.5)]"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-2 border-2 border-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.4)]"
            />
            <motion.div
              whileHover={!isMobile ? { scale: 1.08 } : {}}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="absolute inset-3 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group shadow-xl"
            >
              <img
                src="/profile-img.jpg"
                alt="Muhammad Khoirul"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                <span className="text-white text-xs font-semibold tracking-wide">Enlarge</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 0.9, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-amber-300 to-blue-500 bg-clip-text text-transparent tracking-tight"
        >
          Hi, I'm Khoirul
        </motion.h1>

        {/* Rotating Roles (Typewriter / Flip effect) */}
        <div className="h-10 md:h-12 mb-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-medium text-orange-200"
            >
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin flex-shrink-0" style={{ animationDuration: "8s" }} />
              <span>{ROLES[roleIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ninja Rank & Origin Badges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 0.9, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 text-xs sm:text-sm"
        >
          <div className="bg-slate-800/70 backdrop-blur-md border border-orange-400/30 rounded-xl px-5 py-2.5 shadow-lg flex items-center gap-2">
            <span className="text-orange-400 font-semibold">Shinobi Rank:</span>
            <span className="text-blue-300 font-medium">AI Engineer - Genin</span>
          </div>
          <div className="bg-slate-800/70 backdrop-blur-md border border-orange-400/30 rounded-xl px-5 py-2.5 shadow-lg flex items-center gap-2">
            <span className="text-orange-400 font-semibold">Origin Village:</span>
            <span className="text-blue-300 font-medium">Sidoarjo, East Java (ID)</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: isMobile ? 0.6 : 0.9, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-400 via-amber-500 to-blue-500 text-slate-950 px-8 py-3.5 rounded-full font-bold text-base shadow-[0_0_25px_rgba(251,146,60,0.35)] hover:shadow-[0_0_35px_rgba(251,146,60,0.5)] transition-all duration-300"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Profile
          </motion.button>
          <motion.button
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-800/80 hover:bg-slate-800 text-orange-200 border border-orange-400/40 hover:border-orange-400/70 px-6 py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center gap-2"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Missions
          </motion.button>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: isMobile ? [0, 6, 0] : [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-orange-400/80 cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={30} />
      </motion.div>

      {/* Profile Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative max-w-xl max-h-[85vh] bg-slate-900 rounded-2xl overflow-hidden border-2 border-orange-400/60 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-950/80 hover:bg-slate-900 rounded-full flex items-center justify-center text-orange-400 hover:text-orange-300 transition-colors border border-orange-400/30"
              >
                <X size={18} />
              </button>

              <div className="relative">
                <img
                  src="/profile-expand.jpg"
                  alt="Muhammad Khoirul - Enlarged"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-orange-400 mb-1">Muhammad Khoirul Irsyadul Ibad</h3>
                  <p className="text-blue-400 text-sm font-medium mb-1">AI & Machine Learning Engineer</p>
                  <p className="text-orange-200/80 text-xs">Mathematics Graduate · Airlangga University · Sidoarjo, East Java</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
