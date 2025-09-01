"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Scroll, User, Zap, FolderOpen, Mail, Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

export default function Navigation({ currentSection, setCurrentSection }: NavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useIsMobile()

  const navItems = [
    { id: "hero", label: "Home", icon: Scroll },
    { id: "about", label: "Profile", icon: User },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setCurrentSection(sectionId)
      if (isMobile) {
        setIsExpanded(false)
      }
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isMobile) {
    return (
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 bg-slate-800/80 backdrop-blur-md rounded-full p-2 border border-orange-400/30"
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-3 rounded-full transition-all duration-300 group relative ${
                  currentSection === item.id ? "bg-orange-400 text-slate-900" : "text-orange-400 hover:bg-orange-400/20"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-slate-800 text-orange-400 px-2 py-1 rounded text-sm whitespace-nowrap pointer-events-none"
                >
                  {item.label}
                </motion.span>
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    )
  }

  return (
    <>
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleExpanded}
        className={`fixed left-4 top-6 z-50 w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center ${
          isExpanded
            ? "bg-orange-400 text-slate-900 shadow-lg"
            : "bg-slate-800/80 backdrop-blur-md text-orange-400 border border-orange-400/30"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
            />

            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-4 top-20 z-50 bg-slate-800/95 backdrop-blur-md rounded-2xl p-4 border border-orange-400/30 shadow-2xl min-w-[200px]"
            >
              <div className="text-center mb-4 pb-3 border-b border-orange-400/20">
                <h3 className="text-orange-400 font-bold text-sm">Navigation</h3>
              </div>

              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 group ${
                        currentSection === item.id
                          ? "bg-orange-400 text-slate-900 shadow-lg"
                          : "text-orange-200 hover:bg-orange-400/20 hover:text-orange-400"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} className="mr-3 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>

                      {currentSection === item.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-slate-900 rounded-full"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-orange-400/20 text-center">
                <p className="text-orange-200/50 text-xs">MKII</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
