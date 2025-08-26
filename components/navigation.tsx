"use client"

import { motion } from "framer-motion"
import { Scroll, User, Zap, FolderOpen, Mail } from "lucide-react"

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

export default function Navigation({ currentSection, setCurrentSection }: NavigationProps) {
  const navItems = [
    { id: "hero", label: "Home", icon: Scroll },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Jutsu", icon: Zap },
    { id: "projects", label: "Missions", icon: FolderOpen },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setCurrentSection(sectionId)
    }
  }

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
