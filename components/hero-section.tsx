"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Transition } from "framer-motion"
import { ChevronDown, X } from "lucide-react"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    // Set initial value on client-side to avoid hydration mismatch
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useIsMobile()

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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/header-back.jpg')] bg-cover bg-center opacity-20" />
      </div>

      {!isMobile && (
        <div className="absolute inset-0">
          <motion.div
            animate={chakraAnimation}
            transition={chakraTransition}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"
          />
        </div>
      )}

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 1 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 border-4 border-orange-400 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-2 border-2 border-blue-400 rounded-full"
            />
            <motion.div
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="absolute inset-4 bg-gradient-to-br from-orange-400 to-blue-400 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group"
            >
              <img
                src="/profile-img.jpg"
                alt="Profile Picture"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-bold">Click to enlarge</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.2 : 0.3 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent"
        >
          Hi, I'm Khoirul
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.3 : 0.6 }}
          className="text-xl md:text-2xl mb-8 text-orange-200"
        >
          An AI/Machine Learning Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.4 : 0.9 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg px-6 py-3">
            <span className="text-orange-400 font-semibold">Rank:</span>
            <span className="ml-2 text-blue-400">AI Engineer - Genin</span>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg px-6 py-3">
            <span className="text-orange-400 font-semibold">Village:</span>
            <span className="ml-2 text-blue-400">Sidoarjo, East Java - Indonesia</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.5 : 1.2 }}
          whileHover={!isMobile ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-400 to-blue-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get to Know Me!
        </motion.button>
      </div>

      <motion.div
        animate={{ y: isMobile ? [0, 5, 0] : [0, 10, 0] }}
        transition={{ duration: isMobile ? 3 : 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400"
      >
        <ChevronDown size={32} />
      </motion.div>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-2xl max-h-[80vh] bg-slate-800 rounded-2xl overflow-hidden border-4 border-orange-400/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 rounded-full flex items-center justify-center text-orange-400 hover:text-orange-300 transition-colors duration-300"
            >
              <X size={20} />
            </button>

            <div className="relative">
              <img
                src="/profile-expand.jpg"
                alt="Profile Picture - Enlarged"
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                <h3 className="text-2xl font-bold text-orange-400 mb-2">Muhammad Khoirul</h3>
                <p className="text-blue-400 mb-1">AI Engineer - Genin</p>
                <p className="text-orange-200 text-sm">AI/Machine Learning Developer from Sidoarjo, East Java</p>
              </div>

              {!isMobile && (
                <>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 left-4 w-8 h-8 bg-blue-400/30 rounded-full blur-sm"
                  />
                  <motion.div
                    animate={{
                      scale: [1.1, 1, 1.1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute top-8 right-8 w-6 h-6 bg-orange-400/30 rounded-full blur-sm"
                  />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
