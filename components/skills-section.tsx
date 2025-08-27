"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Zap, CodeXml, Database, BrainCog, ChartArea } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function SkillsSection() {
  const isMobile = useIsMobile()

  const jutsuCategories = [
    {
      title: "Core AI & ML",
      icon: BrainCog,
      color: "from-orange-400 to-red-400",
      skills: [
        { name: "Machine Learning", tech: "Forecasting, Classification, Clustering, Computer Vision", level: 95 },
        { name: "CSS/Tailwind", tech: "CSS/Tailwind", level: 90 },
        { name: "Next.js", tech: "Next.js", level: 88 },
        { name: "TypeScript", tech: "TypeScript", level: 85 },
      ],
    },
    {
      title: "MLOps & Deployment",
      icon: Database,
      color: "from-blue-400 to-purple-400",
      skills: [
        { name: "Python", tech: "Python", level: 92 },
        { name: "Node.js", tech: "Node.js", level: 87 },
        { name: "PostgreSQL", tech: "PostgreSQL", level: 83 },
        { name: "API Design", tech: "API Design", level: 89 },
      ],
    },
    {
      title: "Programming & Tools",
      icon: CodeXml,
      color: "from-green-400 to-teal-400",
      skills: [
        { name: "Machine Learning", tech: "Machine Learning", level: 78 },
        { name: "Data Analysis", tech: "Data Analysis", level: 82 },
        { name: "Problem Solving", tech: "Problem Solving", level: 94 },
        { name: "DevOps", tech: "DevOps", level: 75 },
      ],
    },
    {
      title: "Data Science & Analytics",
      icon: ChartArea,
      color: "from-purple-400 to-pink-400",
      skills: [
        { name: "Data Visualization", tech: "Data Visualization", level: 88 },
        { name: "Statistical Analysis", tech: "Statistical Analysis", level: 85 },
        { name: "Big Data Processing", tech: "Big Data Processing", level: 80 },
        { name: "Business Intelligence", tech: "Business Intelligence", level: 82 },
      ],
    },
  ]

  const animationDuration = isMobile ? 0.6 : 1
  const animationDelay = isMobile ? 0.1 : 0.2

  return (
    <div className="container mx-auto px-4 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
          Jutsu Techniques
        </h2>
        <p className="text-orange-200 text-lg">My Arsenal of Development Skills</p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-orange-400/60 hover:scrollbar-thumb-orange-400/80 pb-6">
          <div className="flex gap-8 min-w-max px-4">
            {jutsuCategories.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: animationDuration, delay: categoryIndex * animationDelay }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg p-6 hover:border-orange-400/60 transition-all duration-300 flex-shrink-0 w-80"
                >
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-400">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: animationDuration,
                          delay: categoryIndex * animationDelay + skillIndex * (animationDelay / 2),
                        }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="text-orange-200 font-medium text-sm">{skill.name}</p>
                            <div className="relative h-5 overflow-hidden w-40">
                              <motion.p
                                className="text-blue-400 text-xs"
                                animate={{ y: ["0%", "-100%"] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                              >
                                {skill.tech}
                              </motion.p>
                            </div>
                          </div>
                          <span className="text-orange-400 font-bold text-sm">{skill.level}%</span>
                        </div>

                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              duration: isMobile ? 1 : 1.5,
                              delay: categoryIndex * animationDelay + skillIndex * (animationDelay / 2) + 0.3,
                            }}
                            viewport={{ once: true }}
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                          >
                            {!isMobile && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    className="mt-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600 text-center cursor-pointer group"
                  >
                    <Zap
                      className={`w-5 h-5 mx-auto mb-1 text-yellow-400 ${!isMobile && "group-hover:animate-bounce"}`}
                    />
                    <p className="text-xs text-orange-200">Master Level Achieved</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: animationDelay * 4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md border border-orange-400/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Secret Techniques</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {["Clean Code Mastery", "Agile Methodology", "Team Leadership", "Continuous Learning"].map(
                (technique, index) => (
                  <motion.div
                    key={technique}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: animationDuration,
                      delay: animationDelay * 5 + index * (animationDelay / 2),
                    }}
                    viewport={{ once: true }}
                    className="bg-slate-800/50 border border-blue-400/30 rounded-lg p-4 hover:border-blue-400/60 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-2" />
                    <p className="text-blue-200 text-sm font-medium">{technique}</p>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
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
