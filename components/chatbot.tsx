"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Bot, User, Loader } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, newMessage])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "This is a demo response." },
      ])
    }, 1000)

    setInput("")
  }

  return (
    <div className="flex flex-col h-[500px] w-full max-w-lg mx-auto bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg overflow-hidden">
      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-orange-400/60 hover:scrollbar-thumb-orange-400/80"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-orange-500/20 text-orange-200 ml-auto"
                : "bg-slate-700/50 text-blue-200"
            }`}
          >
            {msg.content}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 transition"
        >
          <Send className="w-5 h-5 text-orange-400" />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-track-slate-800\/50::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .scrollbar-thumb-orange-400\/60::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.6);
          border-radius: 4px;
        }
        .hover\\:scrollbar-thumb-orange-400\/80::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.8);
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(251, 146, 60, 0.6) rgba(30, 41, 59, 0.5);
        }
      `}</style>
    </div>
  )
}
