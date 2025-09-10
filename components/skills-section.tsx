"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect, ComponentType } from "react"
import { Zap, CodeXml, Database, BrainCog, ChartArea, LucideProps } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { supabase } from "@/lib/supabase"

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  BrainCog,
  Database,
  CodeXml,
  ChartArea,
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

// Komponen baru untuk menangani setiap item skill secara terpisah
// Ini akan menyelesaikan masalah pelanggaran "Rules of Hooks"
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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: animationDuration,
        delay: delay,
      }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-orange-200 font-medium text-sm">{skill.name}</p>
          <div ref={containerRef} className="relative h-5 overflow-hidden w-40">
            <motion.p
              ref={textRef}
              className="text-blue-400 text-xs absolute"
              animate={shouldAnimate ? { y: ["0%", "-100%", "0%"] } : {}}
              transition={shouldAnimate ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
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
            delay: delay + 0.3,
          }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
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

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from("skill_categories").select("*, skills(*)").order("display_order")
      if (error) console.error("Error fetching skills:", error)
      else if (data) setJutsuCategories(data as JutsuCategory[])
    }
    fetchSkills()
  }, [])

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
          My Skills
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-orange-400/60 hover:scrollbar-thumb-orange-400/80 pb-6">
          <div className="flex gap-8 min-w-max px-4">
            {jutsuCategories.map((category, categoryIndex) => {
              const Icon = iconMap[category.icon_name] || Zap
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

                  <motion.div
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    className="mt-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600 text-center cursor-pointer group"
                  >
                    <Zap
                      className={`w-5 h-5 mx-auto mb-1 text-yellow-400 ${!isMobile && "group-hover:animate-bounce"}`}
                    />
                    <p className="text-xs text-orange-200">Main Skills</p>
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
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Supporting Skills</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {["Mathematics & Statistics", "Optimization", "Chill & Collaborative", "Continuous Learning"].map(
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
