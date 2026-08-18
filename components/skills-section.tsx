"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect, ComponentType } from "react"
import { Zap, CodeXml, Database, BrainCog, ChartArea, LucideProps, Sparkles } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  BrainCog,
  Database,
  CodeXml,
  ChartArea,
}

const colorMap: { [key: string]: string } = {
  naruto: "from-orange-400 to-orange-500 shadow-orange-500/20",
  sasuke: "from-blue-500 to-indigo-500 shadow-blue-500/20",
  kakashi: "from-emerald-500 to-teal-400 shadow-emerald-500/20",
  sakutrash: "from-pink-500 to-rose-400 shadow-pink-500/20",
}

interface Skill {
  name: string
  tech: string
  level: number
}

interface JutsuCategory {
  id: number
  title: string
  icon_name: string
  color: string
  skills: Skill[]
}

const SkillItem = ({
  skill,
  category,
  animationDuration,
  delay,
}: {
  skill: Skill
  category: JutsuCategory
  animationDuration: number
  delay: number
}) => {
  const textRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textHeight = textRef.current.scrollHeight
      const containerHeight = containerRef.current.clientHeight
      if (textHeight > containerHeight) {
        setShouldAnimate(true)
      }
    }
  }, [skill.tech])

  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: animationDuration,
        delay: delay,
      }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <div>
          <p className="text-orange-200 font-medium text-xs sm:text-sm">{skill.name}</p>
          <div ref={containerRef} className="relative h-4 overflow-hidden w-36 sm:w-44">
            <motion.p
              ref={textRef}
              className="text-blue-300/80 text-[11px] absolute whitespace-nowrap"
              animate={shouldAnimate ? { x: ["0%", "-50%", "0%"] } : {}}
              transition={shouldAnimate ? { duration: 10, repeat: Infinity, ease: "linear" } : {}}
            >
              {skill.tech}
            </motion.p>
          </div>
        </div>
        <span className="text-orange-400 font-bold text-xs sm:text-sm font-mono">{skill.level}%</span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{
            duration: isMobile ? 1 : 1.3,
            delay: delay + 0.2,
          }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${colorMap[category.color] || "from-gray-400 to-gray-500"} rounded-full relative shadow-sm`}
        >
          {!isMobile && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const isMobile = useIsMobile()
  const [jutsuCategories, setJutsuCategories] = useState<JutsuCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/skills")
        if (!res.ok) throw new Error("Failed to fetch skills")
        const data = await res.json()
        setJutsuCategories(data as JutsuCategory[])
      } catch (error) {
        console.error("Error fetching skills:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const animationDuration = isMobile ? 0.6 : 0.9
  const animationDelay = isMobile ? 0.08 : 0.15

  return (
    <div className="container mx-auto px-4 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent pb-3">
          Jutsu & Technical Skills
        </h2>
        <p className="text-orange-200/70 text-sm max-w-xl mx-auto">
          Specialized masteries across AI research, deep learning architectures, MLOps orchestration, and data analytics.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex gap-6 overflow-x-auto pb-6">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 border border-orange-400/20 rounded-xl p-6 w-80 flex-shrink-0 animate-pulse space-y-4"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-700"></div>
                <div className="h-5 bg-slate-700 rounded w-1/2 mx-auto"></div>
                <div className="space-y-3 pt-4">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="space-y-1.5">
                      <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-700 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-orange-400/50 hover:scrollbar-thumb-orange-400/80 pb-6">
            <div className="flex gap-6 min-w-max px-4">
              {jutsuCategories.map((category, categoryIndex) => {
                const Icon = iconMap[category.icon_name] || Zap
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationDuration, delay: categoryIndex * animationDelay }}
                    viewport={{ once: true }}
                    className="bg-slate-900/70 backdrop-blur-md border border-orange-400/30 rounded-2xl p-6 hover:border-orange-400/60 transition-all duration-300 flex-shrink-0 w-80 shadow-xl"
                  >
                    <div className="text-center mb-6">
                      <div
                        className={`w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-r ${
                          colorMap[category.color] || "from-gray-400 to-gray-500"
                        } flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-orange-400">{category.title}</h3>
                    </div>

                    <div className="space-y-4">
                      {(category.skills || []).map((skill, skillIndex) => (
                        <SkillItem
                          key={skill.name}
                          skill={skill}
                          category={category}
                          animationDuration={animationDuration}
                          delay={categoryIndex * animationDelay + skillIndex * (animationDelay / 2)}
                        />
                      ))}
                    </div>

                    <div className="mt-6 p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/60 text-center">
                      <p className="text-[11px] text-orange-200/80 flex items-center justify-center gap-1">
                        <Sparkles size={12} className="text-amber-400" />
                        <span>Chakra Mastery Verified</span>
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Supporting Foundations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: animationDelay * 3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-md border border-orange-400/30 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-orange-400 mb-2">Fundamental & Meta-Skills</h3>
            <p className="text-orange-200/70 text-xs mb-6 max-w-lg mx-auto">
              Theoretical underpinnings in applied mathematics, optimization, and collaboration.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Applied Mathematics", sub: "Calculus & Linear Algebra" },
                { name: "Metaheuristic Optimization", sub: "Harris Hawks & Genetic Algo" },
                { name: "Agile & Collaborative", sub: "Scrum, Git & Communication" },
                { name: "Continuous Learning", sub: "State-of-the-art AI Research" },
              ].map((technique, index) => (
                <motion.div
                  key={technique.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: animationDuration,
                    delay: animationDelay * 4 + index * (animationDelay / 2),
                  }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 border border-blue-400/30 rounded-xl p-4 hover:border-blue-400/70 transition-all duration-300"
                >
                  <div className="w-7 h-7 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-2" />
                  <p className="text-blue-200 text-xs sm:text-sm font-semibold">{technique.name}</p>
                  <p className="text-slate-400 text-[10px] sm:text-xs mt-0.5">{technique.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 7px;
        }
        .scrollbar-track-slate-900::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.7);
          border-radius: 4px;
        }
        .scrollbar-thumb-orange-400\/50::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.5);
          border-radius: 4px;
        }
        .hover\\:scrollbar-thumb-orange-400\/80::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.8);
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(251, 146, 60, 0.5) rgba(15, 23, 42, 0.7);
        }
      `}</style>
    </div>
  )
}
