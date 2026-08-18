"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Bot, User, Loader2, Sparkles, RotateCcw, Copy, Check } from "lucide-react"

interface Message {
  role: "user" | "model"
  text: string
}

const QUICK_PROMPTS = [
  "📈 Tell me about the GRU-HHO Forex project",
  "⚡ What are your core AI & Machine Learning skills?",
  "🎓 What is your background in Mathematics?",
  "🔐 How does your RSA-OTP authentication work?",
]

// Simple helper to render basic markdown without extra heavy dependencies
function renderFormattedText(text: string) {
  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g)

  return parts.map((part, index) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const firstLineEnd = part.indexOf("\n")
      const lang = firstLineEnd !== -1 ? part.slice(3, firstLineEnd).trim() : ""
      const code = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1, -3) : part.slice(3, -3)
      return (
        <div key={index} className="my-2 bg-slate-900/90 rounded-lg p-3 border border-orange-400/20 font-mono text-xs overflow-x-auto text-amber-200">
          {lang && <div className="text-[10px] uppercase text-orange-400/70 mb-1">{lang}</div>}
          <pre className="whitespace-pre-wrap">{code}</pre>
        </div>
      )
    }

    // Process line-by-line for bullet points, bold, inline code, and links
    const lines = part.split("\n")
    return (
      <div key={index} className="space-y-1">
        {lines.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-2" />

          const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ")
          const cleanLine = isBullet ? line.trim().slice(2) : line

          // Parse bold (**text**) and inline code (`code`)
          const formattedContent = cleanLine
            .split(/(\*\*.*?\*\*|`.*?`)/g)
            .map((chunk, cIdx) => {
              if (chunk.startsWith("**") && chunk.endsWith("**")) {
                return (
                  <strong key={cIdx} className="font-semibold text-orange-300">
                    {chunk.slice(2, -2)}
                  </strong>
                )
              }
              if (chunk.startsWith("`") && chunk.endsWith("`")) {
                return (
                  <code key={cIdx} className="px-1.5 py-0.5 rounded bg-slate-900/80 text-blue-300 font-mono text-xs">
                    {chunk.slice(1, -1)}
                  </code>
                )
              }
              return chunk
            })

          if (isBullet) {
            return (
              <div key={lIdx} className="flex items-start gap-2 pl-1">
                <span className="text-orange-400 font-bold mt-1 text-xs">•</span>
                <span className="flex-1">{formattedContent}</span>
              </div>
            )
          }

          return <p key={lIdx}>{formattedContent}</p>
        })}
      </div>
    )
  })
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Greetings, shinobi! I am Khoirul's AI Assistant. Ask me anything about his AI/ML models, forecasting research, skills, or portfolio missions!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Manage client-side cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleSend = async (messageText?: string) => {
    const query = (messageText || input).trim()
    if (!query || isLoading || cooldown > 0) return

    const userMessage: Message = { role: "user", text: query }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Short local cooldown
    setCooldown(3)

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: query }),
      })

      if (res.status === 429) {
        const errorText = await res.text()
        const resetSecondsHeader = res.headers.get("X-RateLimit-Reset")
        const resetSec = resetSecondsHeader ? parseInt(resetSecondsHeader, 10) : 30

        setCooldown(resetSec)
        setMessages((prev) => [...prev, { role: "model", text: errorText }])
        setIsLoading(false)
        return
      }

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to get response from server")
      }

      if (!res.body) {
        throw new Error("Response body is null")
      }

      setMessages((prev) => [...prev, { role: "model", text: "" }])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1]
          const updatedLastMessage = {
            ...lastMessage,
            text: lastMessage.text + chunk,
          }
          return [...prev.slice(0, -1), updatedLastMessage]
        })
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      const displayError = error instanceof Error ? error.message : "An unknown error occurred."
      setMessages((prev) => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]

        if (lastMessage?.role === "model" && lastMessage.text === "") {
          lastMessage.text = `Oops! An error occurred: ${displayError}`
          return newMessages
        }
        return [...newMessages, { role: "model", text: `Oops! An error occurred: ${displayError}` }]
      })
    }
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleResetChat = () => {
    setMessages([
      {
        role: "model",
        text: "Greetings, shinobi! I am Khoirul's AI Assistant. Ask me anything about his AI/ML models, forecasting research, skills, or portfolio missions!",
      },
    ])
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-orange-400 via-amber-500 to-blue-500 rounded-full text-white flex items-center justify-center shadow-[0_0_25px_rgba(251,146,60,0.4)] z-50 border border-orange-300/40 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <Bot size={28} className="group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[75vh] max-h-[620px] bg-slate-900/90 backdrop-blur-xl border border-orange-400/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-orange-400/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-400 text-sm flex items-center gap-1.5">
                    Khoirul AI Shinobi
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-orange-200/70">Powered by Gemini 3.5 flash lite</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Clear chat history"
                  className="p-1.5 text-slate-400 hover:text-orange-400 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-orange-400 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-orange-400/50 hover:scrollbar-thumb-orange-400/80"
            >
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"} group`}>
                  {msg.role === "model" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex-shrink-0 flex items-center justify-center mt-1 shadow">
                      <Bot size={15} className="text-slate-950" />
                    </div>
                  )}

                  <div className="relative max-w-[82%]">
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none shadow-md shadow-blue-500/10"
                          : "bg-slate-800/90 text-orange-50 rounded-tl-none border border-orange-400/20 shadow-md"
                        }`}
                    >
                      {msg.role === "model" ? renderFormattedText(msg.text) : <p className="whitespace-pre-wrap">{msg.text}</p>}
                    </div>

                    {msg.role === "model" && msg.text && (
                      <button
                        onClick={() => handleCopy(msg.text, index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 right-1 text-[11px] text-slate-400 hover:text-orange-300 flex items-center gap-1"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={12} className="text-green-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-blue-500/30 border border-blue-400/40 flex-shrink-0 flex items-center justify-center mt-1">
                      <User size={15} className="text-blue-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot size={15} className="text-slate-950" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-800/90 text-orange-200 border border-orange-400/20 rounded-tl-none flex items-center gap-2 text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                    <span>Gathering chakra & formulating response...</span>
                  </div>
                </div>
              )}

              {/* Quick Prompts on initial view */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-300/70 flex items-center gap-1">
                    <Sparkles size={12} /> Suggested Questions
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {QUICK_PROMPTS.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-orange-400/20 hover:border-orange-400/60 text-orange-200 hover:text-orange-300 transition-all duration-200"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3.5 bg-slate-900/95 border-t border-orange-400/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={cooldown > 0 ? `Chakra refilling... (${cooldown}s)` : "Ask about skills, projects, or research..."}
                  className={`flex-1 px-4 py-2.5 text-sm bg-slate-800/90 border rounded-full text-orange-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all ${cooldown > 0 ? "border-orange-400/50 cursor-not-allowed opacity-75" : "border-slate-700 hover:border-slate-600"
                    }`}
                  disabled={isLoading || cooldown > 0}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={isLoading || cooldown > 0 || input.trim() === ""}
                  className="w-10 h-10 flex-shrink-0 bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 active:scale-95"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
