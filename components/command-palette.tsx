"use client"

import { useState, useEffect } from "react"
import { Command } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import {
  Scroll,
  User,
  Zap,
  FolderOpen,
  Mail,
  Bot,
  Github,
  Linkedin,
  ExternalLink,
  Search,
  Command as CommandIcon,
  X,
  Code2,
} from "lucide-react"

interface CommandPaletteProps {
  onSelectSection: (sectionId: string) => void
  onOpenChat: () => void
}

export default function CommandPalette({ onSelectSection, onOpenChat }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Listen to keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const executeAction = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Keyboard Shortcut Hint Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-orange-400/30 hover:border-orange-400/60 text-orange-200/80 hover:text-orange-200 text-xs px-3.5 py-2 rounded-full shadow-lg transition-all"
        title="Open Ninja Command Palette (Ctrl+K)"
      >
        <CommandIcon size={13} className="text-orange-400" />
        <span className="font-mono text-[11px]">Ctrl + K</span>
      </motion.button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-slate-900 border-2 border-orange-400/40 rounded-2xl shadow-[0_0_50px_rgba(251,146,60,0.2)] overflow-hidden"
            >
              <Command className="flex flex-col">
                <div className="flex items-center border-b border-orange-400/20 px-4 py-3 gap-3">
                  <Search className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <Command.Input
                    placeholder="Type a jutsu or command... (e.g., 'Projects', 'Forex', 'GitHub')"
                    className="w-full bg-transparent text-orange-100 placeholder-slate-500 text-sm focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-orange-400 p-1 rounded-md transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <Command.List className="max-h-[350px] overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-orange-400/40">
                  <Command.Empty className="py-6 text-center text-xs text-orange-200/60">
                    No matching shinobi commands found.
                  </Command.Empty>

                  {/* Navigation Group */}
                  <Command.Group heading="Navigation" className="text-[11px] font-bold uppercase text-orange-400/70 px-2 py-1">
                    <Command.Item
                      onSelect={() => executeAction(() => onSelectSection("hero"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <Scroll size={16} className="text-orange-400" />
                      <span>Home / Overview</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => executeAction(() => onSelectSection("about"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <User size={16} className="text-blue-400" />
                      <span>About Khoirul</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => executeAction(() => onSelectSection("skills"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <Zap size={16} className="text-amber-400" />
                      <span>Skills & Jutsu</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => executeAction(() => onSelectSection("projects"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <FolderOpen size={16} className="text-teal-400" />
                      <span>Missions & Projects</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => executeAction(() => onSelectSection("contact"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <Mail size={16} className="text-pink-400" />
                      <span>Contact / Messenger Bird</span>
                    </Command.Item>
                  </Command.Group>

                  {/* AI & Interactive Group */}
                  <Command.Group heading="AI & Research" className="text-[11px] font-bold uppercase text-orange-400/70 px-2 py-1">
                    <Command.Item
                      onSelect={() => executeAction(() => onOpenChat())}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <Bot size={16} className="text-orange-400" />
                      <span>Ask AI Shinobi Assistant</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => executeAction(() => window.open("https://mkii-forecast.vercel.app/", "_blank"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <ExternalLink size={16} className="text-green-400" />
                      <span>Open GRU-HHO Forex Live Demo</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => executeAction(() => window.open("https://github.com/MKHO1RUL/forecast-gru-hho", "_blank"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <Code2 size={16} className="text-blue-400" />
                      <span>View GRU-HHO Research Repo</span>
                    </Command.Item>
                  </Command.Group>

                  {/* External Links */}
                  <Command.Group heading="Socials" className="text-[11px] font-bold uppercase text-orange-400/70 px-2 py-1">
                    <Command.Item
                      onSelect={() => executeAction(() => window.open("https://github.com/MKHO1RUL", "_blank"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <Github size={16} className="text-slate-300" />
                      <span>GitHub (@MKHO1RUL)</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => executeAction(() => window.open("https://linkedin.com/in/mkhoirulii", "_blank"))}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-orange-100 hover:bg-orange-500/20 hover:text-orange-300 cursor-pointer transition-all"
                    >
                      <Linkedin size={16} className="text-blue-400" />
                      <span>LinkedIn Profile</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className="border-t border-orange-400/20 px-4 py-2 bg-slate-950/80 flex items-center justify-between text-[11px] text-orange-200/60">
                  <span>Navigation: ↑ ↓ Enter</span>
                  <span>Close: ESC</span>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
