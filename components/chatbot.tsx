"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Bot, User, Loader } from "lucide-react"

interface Message {
  role: "user" | "model"
  text: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Greetings! I am Khoirul's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return

    const userMessage: Message = { role: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: input }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to get response from server")
      }

      if (!res.body) {
        throw new Error("Response body is null")
      }

      // Add a placeholder for the model's response
      setMessages((prev) => [...prev, { role: "model", text: "" }])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let isFirst = true

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (isFirst) {
          setIsLoading(false)
          isFirst = false
        }
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
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      const displayError = error instanceof Error ? error.message : "An unknown error occurred."
      setMessages((prev) => {
        const lastMessage = prev[prev.length -1];
        if (lastMessage && lastMessage.role === 'model' && lastMessage.text === '') {
          const updatedLastMessage = { ...lastMessage, text: `Oops! Something went wrong. ${displayError}` };
          return [...prev.slice(0, -1), updatedLastMessage];
        }
        return [...prev, { role: "model", text: `Oops! Something went wrong. ${displayError}` }];
      });

    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full text-white flex items-center justify-center shadow-lg z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={30} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={30} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-md h-[70vh] max-h-[600px] bg-slate-800/80 backdrop-blur-md border border-orange-400/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-orange-400/20 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                <Bot className="text-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-orange-400">Khoirul's AI Assistant</h3>
                <p className="text-xs text-blue-300">Ready for your mission</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-orange-400/60">
              <div className="p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "model" && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                        <Bot size={18} className="text-orange-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-xl ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-slate-700 text-orange-100 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                        <User size={18} className="text-blue-300" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                      <Bot size={18} className="text-orange-400" />
                    </div>
                    <div className="max-w-[80%] p-3 rounded-xl bg-slate-700 text-orange-100 rounded-bl-none flex items-center">
                      <Loader className="w-5 h-5 animate-spin text-orange-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-orange-400/20">
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
                  placeholder="Ask about my skills..."
                  className="flex-1 w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-full text-orange-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-10 h-10 flex-shrink-0 bg-orange-400 text-slate-900 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send size={18} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}