"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AboutSection() {
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useIsMobile()

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
      { threshold: 0.5 },
    )

    observer.observe(videoElement)

    return () => {
      observer.unobserve(videoElement)
    }
  }, [])

  const animationDuration = isMobile ? 0.6 : 1

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent pb-3">
          My Profile
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: animationDuration, delay: isMobile ? 0.1 : 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg p-6 shadow-2xl relative overflow-hidden">
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

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
              </div>

              <div className="absolute top-2 left-2 px-2 py-1 bg-slate-900/80 rounded-full text-xs text-orange-400">
                {isVideoVisible ? "▶ Playing" : "⏸ Paused"}
              </div>

              <div className="text-center">
                <p className="text-orange-200 text-sm">
                  Just a few word from me..
                </p>
              </div>

              {!isMobile && (
                <>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse" />
                </>
              )}
            </div>

            <div className="hidden md:block p-6 bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">AI Engineer</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">Strong analytical skills</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">Chill & collaborative</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-orange-200">Continuous Learner</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: animationDuration, delay: isMobile ? 0.2 : 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4 text-orange-200 leading-relaxed">
              <p>
                Greetings! I'm Khoirul, a passionate AI Engineer from Sidoarjo, East Java, Indonesia. My journey into the world of programming began in 2021 when I first entered university. I graduated with a degree in Mathematics from Universitas Airlangga, where I focused on computational mathematics.
              </p>

              <p>
                I started learning programming with C++, which introduced me to object-oriented programming. My very first project during university was developing a full-stack online bookstore website using PHP and MySQL. As time went on, I took a course in artificial intelligence, and that was the moment I became deeply interested in the field of machine learning.
              </p>

              <p>
                Beyond academic projects, I have developed strong technical skills in modern frameworks and tools. I work extensively with React and Next.js for building responsive and dynamic user interfaces, while leveraging Node.js for backend services. I also utilize Tailwind CSS to streamline UI development and ensure clean, maintainable styling. These experiences have strengthened my ability to deliver full-stack applications efficiently.
              </p>

              <p>
                In addition, my focus lies in the field of machine learning and AI development. I am proficient in Python and its data science ecosystem, including libraries such as TensorFlow, PyTorch, and scikit-learn. I have experience in tasks ranging from forecasting and classification to image processing. I approach every project with a mindset of continuous learning, aiming to create solutions that are both technically sound and impactful.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: 0.3 }}
          viewport={{ once: true }}
          className="md:hidden mt-12 p-6 bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg"
        >
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
              <span className="text-orange-200">AI Engineer</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-orange-200">Strong analytical skills</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-orange-200">Chill & collaborative</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-orange-200">Continuous Learner</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
