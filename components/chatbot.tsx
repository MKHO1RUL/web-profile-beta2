"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Loader2, User } from "lucide-react"

interface Message {
  role: "user" | "model"
  text: string
}

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I'm Irul's AI assistant, powered by Gemini. Ask me anything about his skills, projects, or experience!",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", text: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: newMessages.slice(0, -1).map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
          })),
          message: input,
        }),
      })

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
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-80 h-[450px] bg-gray-900/80 backdrop-blur-md border border-blue-500/30 rounded-lg shadow-2xl shadow-blue-500/10 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-gray-900/50 border-b border-blue-500/30 flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="font-bold text-white">AI Assistant</h3>
                <p className="text-xs text-gray-400">Powered by Gemini</p>
              </div>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "model" && <Bot className="h-6 w-6 text-blue-400 flex-shrink-0" />}
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === "user" ? "bg-blue-600/50 text-white" : "bg-gray-800/60 text-gray-300"}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  {msg.role === "user" && <User className="h-6 w-6 text-gray-400 flex-shrink-0" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Bot className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-800/60 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse delay-0"></span>
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="p-4 bg-gray-900/50 border-t border-blue-500/30 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="p-2 rounded-full text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-blue-500/20 transition-colors">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="p-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* PERUBAHAN DI SINI: Mengganti MessageCircle dengan Bot */}
        {isChatOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>
    </div>
  )
}
