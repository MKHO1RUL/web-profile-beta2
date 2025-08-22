"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function AboutSection() {
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true)
            videoElement.play().catch(console.error)
          } else {
            setIsVideoVisible(false)
            videoElement.pause()
          }
        })
      },
      { threshold: 0.5 }, // Video akan play ketika 50% terlihat
    )

    observer.observe(videoElement)

    return () => {
      observer.unobserve(videoElement)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
          My Profile
        </h2>
        <p className="text-orange-200 text-lg">A little about me..</p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg p-6 shadow-2xl relative overflow-hidden">
              {/* Video Container */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  controls
                  muted
                  loop
                  poster="/video-thumbnail.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/introduction-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
              </div>

              {/* Video Status Indicator */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-slate-900/80 rounded-full text-xs text-orange-400">
                {isVideoVisible ? "▶ Playing" : "⏸ Paused"}
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-orange-400 mb-2">Video Introduction</h3>
                <p className="text-orange-200 text-sm">
                  Watch my personal introduction and learn about my journey as an AI engineer
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Biography */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <div className="space-y-4 text-orange-200 leading-relaxed">
              <p>
                Greetings! I'm Khoirul, a passionate software developer from Sidoarjo, East Java, Indonesia. My journey
                into the world of programming began in 2018 when I first discovered the art of coding, much like a young
                ninja discovering their chakra.
              </p>

              <p>
                What started as curiosity quickly evolved into a deep passion for creating digital solutions. I
                specialize in full-stack development, with expertise in modern technologies like React, Node.js, Python,
                and various databases. Every project I undertake is approached with the dedication and precision of a
                true shinobi.
              </p>

              <p>
                Beyond technical skills, I believe in the power of continuous learning and collaboration. Just as ninjas
                train together to become stronger, I thrive in team environments where knowledge is shared and
                innovative solutions are born. My goal is to create applications that not only function flawlessly but
                also provide exceptional user experiences.
              </p>

              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or mentoring fellow developers on their own ninja path. I'm always excited to take on new challenges and
                turn complex problems into elegant solutions.
              </p>
            </div>

            {/* Personal Highlights */}
            <div className="mt-8 p-6 bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg">
              <h4 className="text-lg font-bold text-orange-400 mb-4">Quick Facts</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">Based in Sidoarjo, East Java</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">5+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">Full-Stack Developer</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">Open Source Contributor</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
