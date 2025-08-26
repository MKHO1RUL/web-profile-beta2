"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Github, Linkedin, Twitter, MessageCircle } from "lucide-react"
import { sendContactEmail } from "@/app/actions" // Import Server Action

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("") // Clear previous messages

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const result = await sendContactEmail(formData)

    setIsSubmitting(false)
    setIsSubmitted(true)
    setIsSuccess(result.success)
    setSubmitMessage(result.message)

    // Reset form and message after a delay
    setTimeout(() => {
      setIsSubmitted(false)
      setSubmitMessage("")
      if (result.success) {
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "irulkhoirul414@gmail.com",
      href: "mailto:irulkhoirul414@gmail.com",
      newTab: false,
    },
    {
      icon: MessageCircle,
      label: "Whatsapp",
      value: "+6287896218227",
      href: "https://wa.me/6287896218227",
      newTab: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Sidoarjo, East Java - Indonesia",
      href: "https://maps.app.goo.gl/vLLojd8wQyWDhkRR7",
      newTab: true,
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/MKHO1RUL",
      color: "hover:text-slate-300",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/mkhoirulii",
      color: "hover:text-blue-300",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/m_khoiruli",
      color: "hover:text-sky-300",
    },
  ]

  // Reduced animation duration for mobile
  const animationDuration = isMobile ? 0.6 : 1
  const animationDelay = isMobile ? 0.1 : 0.2

  return (
    <div className="bg-gradient-to-b from-orange-400 to-orange-500 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-20 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Send a Messenger Bird</h2>
          <p className="text-slate-800 text-lg font-medium">Ready for your next mission? Let's connect!</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form - Summoning Circle */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: animationDuration, delay: animationDelay }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Summoning Circle Background - Simplified for mobile */}
              {!isMobile && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-96 h-96 border-2 border-slate-800/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute w-80 h-80 border border-white/40 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute w-64 h-64 border border-slate-800/20 rounded-full"
                  />
                </div>
              )}

              <div className="relative z-10 bg-white/95 backdrop-blur-md border-2 border-slate-800 rounded-lg p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Summoning Jutsu: Contact Form</h3>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-slate-700 text-sm font-medium mb-2">
                          Ninja Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:border-slate-800 focus:outline-none transition-colors duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-slate-700 text-sm font-medium mb-2">
                          Messenger Bird Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:border-slate-800 focus:outline-none transition-colors duration-300"
                          placeholder="your.email@village.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-slate-700 text-sm font-medium mb-2">
                        Mission Type
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:border-slate-800 focus:outline-none transition-colors duration-300"
                        placeholder="Project collaboration, job opportunity, etc."
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-slate-700 text-sm font-medium mb-2">
                        Mission Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:border-slate-800 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Tell me about your project or how we can work together..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isMobile ? { scale: 1.05 } : {}}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-slate-800 text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:bg-slate-700 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Summoning Messenger Bird...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={!isMobile ? { y: [0, -10, 0] } : {}}
                      transition={!isMobile ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : {}}
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isSuccess ? "bg-green-600" : "bg-red-600"}`}
                    >
                      <Send className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className={`text-xl font-bold mb-2 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                      {isSuccess ? "Message Sent!" : "Submission Failed"}
                    </h4>
                    <p className="text-slate-700">{submitMessage}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: animationDuration, delay: animationDelay * 2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                  Alternative Communication Channels
                </h3>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        target={info.newTab ? "_blank" : "_self"}
                        rel={info.newTab ? "noopener noreferrer" : ""}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: animationDuration, delay: animationDelay * 3 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                        className="flex items-center p-4 bg-white/95 backdrop-blur-md border-2 border-slate-800 rounded-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold">{info.label}</p>
                          <p className="text-slate-600 text-sm">{info.value}</p>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: animationDuration, delay: animationDelay * 4 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Follow My Ninja Path</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: animationDuration, delay: animationDelay * 4 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={!isMobile ? { scale: 1.2 } : {}}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 bg-white/95 border-2 border-slate-800 rounded-full flex items-center justify-center text-slate-800 ${social.color} hover:bg-white hover:shadow-lg transition-all duration-300`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration, delay: animationDelay * 5 }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur-md border-2 border-slate-800 rounded-lg p-6 shadow-xl"
              >
                <h4 className="text-lg font-bold text-slate-800 mb-3">Current Availability</h4>
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
                  <span className="text-green-600 font-bold">Available for new missions</span>
                </div>
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                  Currently accepting freelance projects and full-time opportunities. Response time: Usually within 24
                  hours.
                </p>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>🕐 Timezone: UTC+7 (WIB)</p>
                  <p>📅 Best contact days: Monday - Friday</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
