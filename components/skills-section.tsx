"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Zap, CodeXml, Database, BrainCog, ChartArea } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function SkillsSection() {
  const isMobile = useIsMobile()

  const jutsuCategories = [
    {
      title: "AI & ML",
      icon: BrainCog,
      color: "from-orange-400 to-red-400",
      skills: [
        { name: "Machine Learning", tech: "Forecasting, Classification, Clustering, Computer Vision", level: 95 },
        { name: "Deep Learning", tech: "RNN/LSTM/GRU, CNN, Transformer", level: 90 },
        { name: "NLP", tech: "Text Classification, Sentiment Analysis, Chatbot", level: 95 },
        { name: "Generative AI", tech: "LLM Fine-tuning, RAG", level: 85 },
      ],
    },
    {
      title: "MLOps & Deployment",
      icon: Database,
      color: "from-blue-400 to-purple-400",
      skills: [
        { name: "Model Deployment", tech: "FastAPI, Flask", level: 80 },
        { name: "Model Monitoring & Logging", tech: "Grafana, ELK Stack", level: 70 },
        { name: "Experiment Tracking & Workflow", tech: "MLflow, DVC, Airflow", level: 70 },
        { name: "Vector Database & Orchestration", tech: "Pinecone, LangChain", level: 85 },
      ],
    },
    {
      title: "Programming & Tools",
      icon: CodeXml,
      color: "from-green-400 to-teal-400",
      skills: [
        { name: "Programming Language", tech: "Python, C++, PHP, JavaScript", level: 90 },
        { name: "Libraries", tech: "NumPy, Pandas, Scikit-learn", level: 90 },
        { name: "Version Control", tech: "Git, Github", level: 95 },
        { name: "Dev Tools", tech: "VS Code, Jupyter Notebook", level: 90 },
      ],
    },
    {
      title: "Data Science & Analytics",
      icon: ChartArea,
      color: "from-purple-400 to-pink-400",
      skills: [
        { name: "Data Collection & Cleaning", tech: "Pandas, NumPy", level: 95 },
        { name: "Exploratory Data Analysis", tech: "Matplotlib, Seaborn, Pandas Profiling", level: 85 },
        { name: "Feature Engineering", tech: "Scikit-learn, Featuretools", level: 70 },
        { name: "Data Visualization", tech: "Matplotlib, Seaborn, Plotly", level: 85 },
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
          My Skills
        </h2>
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
                    {category.skills.map((skill, skillIndex) => {
                      const textRef = useRef<HTMLParagraphElement>(null)
                      const containerRef = useRef<HTMLDivElement>(null)
                      const [shouldAnimate, setShouldAnimate] = useState(false)

                      useEffect(() => {
                        if (textRef.current && containerRef.current) {
                          const textHeight = textRef.current.scrollHeight
                          const containerHeight = containerRef.current.clientHeight
                          if (textHeight > containerHeight) {
                            setShouldAnimate(true)
                          }
                        }
                      }, [])

                      return (
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
                              <div ref={containerRef} className="relative h-5 overflow-hidden w-40">
                                <motion.p
                                  ref={textRef}
                                  className="text-blue-400 text-xs"
                                  animate={shouldAnimate ? { y: ["0%", "-100%"] } : {}}
                                  transition={shouldAnimate ? { duration: 6, repeat: Infinity, ease: "linear" } : {}}
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
                      )
                    })}
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
