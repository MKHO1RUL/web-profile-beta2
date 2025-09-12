"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Filter, Star } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { supabase } from "@/lib/supabase"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  category: string
  difficulty: string
  status: string
  image: string
  github: string
  live: string
}

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [openScrolls, setOpenScrolls] = useState<number[]>([])
  const isMobile = useIsMobile()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*").order("display_order")
      if (error) console.error("Error fetching projects:", error)
      else if (data) setProjects(data as Project[])
    }
    fetchProjects()
  }, [])

  const filters = useMemo(() => {
    if (projects.length === 0) return []
    return [
      { id: "all", label: "All Missions", count: projects.length },
      { id: "web", label: "Web Development", count: projects.filter((p) => p.category === "web").length },
      { id: "ai", label: "AI/ML", count: projects.filter((p) => p.category === "ai").length },
      { id: "mobile", label: "Mobile", count: projects.filter((p) => p.category === "mobile").length },
      { id: "data", label: "Data Science", count: projects.filter((p) => p.category === "data").length },
      { id: "blockchain", label: "Blockchain", count: projects.filter((p) => p.category === "blockchain").length },
    ]
  }, [projects])

  const filteredProjects =
    selectedFilter === "all" ? projects : projects.filter((project) => project.category === selectedFilter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "S-Rank":
        return "from-red-400 to-pink-400"
      case "A-Rank":
        return "from-orange-400 to-yellow-400"
      case "B-Rank":
        return "from-blue-400 to-cyan-400"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const toggleScroll = (projectId: number) => {
    setOpenScrolls((prev) => (prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]))
  }

  const isScrollOpen = (projectId: number) => openScrolls.includes(projectId)

  const animationDuration = isMobile ? 0.6 : 1
  const animationDelay = isMobile ? 0.05 : 0.1

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent pb-3">
          My Projects
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration, delay: animationDelay }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full border transition-all duration-300 ${
              selectedFilter === filter.id
                ? "bg-orange-400 text-slate-900 border-orange-400"
                : "bg-slate-800/50 text-orange-200 border-orange-400/30 hover:border-orange-400/60"
            }`}
          >
            <Filter className="w-4 h-4 inline mr-2" />
            {filter.label}
            <span className="ml-2 text-xs opacity-75">({filter.count})</span>
          </motion.button>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: isMobile ? 0.3 : 0.5 }}
            className="grid md:grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration, delay: index * animationDelay }}
                className="group relative flex justify-center"
              >
                <div className="w-full max-w-md">
                  <motion.div
                    onClick={() => toggleScroll(project.id)}
                    className={`cursor-pointer transition-transform duration-300 relative z-10 ${
                      isScrollOpen(project.id) ? "scale-105" : !isMobile && "hover:scale-105"
                    }`}
                  >
                    <div className="relative w-full h-16">
                      <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-red-600 to-red-700 rounded-l-lg border-2 border-red-800 shadow-lg">
                        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
                      </div>

                      <div className="absolute left-3 top-0 right-3 h-full bg-gradient-to-b from-teal-600 to-teal-700 border-y-2 border-teal-800 shadow-lg flex items-center justify-between px-4">
                        <div className="flex-1 text-center">
                          <div className="text-white text-sm font-bold">{project.title}</div>
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor(project.difficulty)} ml-4`}
                        >
                          {project.difficulty}
                        </div>
                      </div>

                      <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-red-600 to-red-700 rounded-r-lg border-2 border-red-800 shadow-lg">
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-l from-red-400 to-red-500 rounded-full" />
                      </div>

                      {!isMobile && (
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-orange-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {isScrollOpen(project.id) ? "Click to close" : "Click to open"}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isScrollOpen(project.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="relative w-full bg-gradient-to-br from-amber-50 to-amber-100 border-4 border-amber-600 border-t-0 rounded-b-lg shadow-2xl">
                          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-red-600 to-red-700 border-r-2 border-red-800">
                            <div className="absolute left-1 top-4 w-1 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
                          </div>

                          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-red-600 to-red-700 border-l-2 border-red-800">
                            <div className="absolute right-1 top-4 w-1 h-16 bg-gradient-to-l from-red-400 to-red-500 rounded-full" />
                          </div>

                          <div className="absolute inset-0 mx-4">
                            <div className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-amber-300 to-amber-400 flex items-center justify-around rounded">
                              {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-teal-600 rounded-full opacity-60" />
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 px-8 py-6 flex flex-col h-[500px]">
                            <div className="text-center mb-4 flex-shrink-0 h-16 flex flex-col justify-center">
                              <h3 className="text-xl font-bold text-slate-800 mb-1">{project.title}</h3>
                            </div>

                            <div className="relative h-32 overflow-hidden rounded-lg mb-4 border-2 border-amber-600 flex-shrink-0">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>

                            <p className="text-slate-700 text-sm mb-4 leading-relaxed text-center flex-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-amber-600 pr-2">
                              {project.description}
                            </p>

                            <div className="flex-shrink-0 pt-2 pb-4">
                              <div className="flex items-center flex-nowrap gap-2 overflow-x-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-amber-600 pb-2">
                                {(project.tech || []).map((tech) => (
                                  <span
                                    key={tech}
                                    className="flex-shrink-0 px-3 py-1 bg-slate-200 text-slate-700 text-xs rounded-full border border-slate-300"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-300 space-y-4 flex-shrink-0">
                              <div className="flex items-center justify-between">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    project.status === "Completed"
                                      ? "bg-green-100 text-green-800 border border-green-300"
                                      : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                  }`}
                                >
                                  {project.status}
                                </span>
                                <div className="flex items-center text-orange-600">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <motion.a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1 bg-slate-800 text-white py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-slate-700 transition-colors duration-300 flex items-center justify-center"
                                >
                                  <Github className="w-4 h-4 mr-2" />
                                  Code
                                </motion.a>
                                <motion.a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1 bg-gradient-to-r from-orange-400 to-blue-400 text-white py-3 px-4 rounded-lg text-center text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live
                                </motion.a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-track-slate-200::-webkit-scrollbar-track {
          background: #e2e8f0; /* slate-200 */
          border-radius: 10px;
        }
        .scrollbar-thumb-amber-600::-webkit-scrollbar-thumb {
          background: #d97706; /* amber-600 */
          border-radius: 10px;
        }
        .scrollbar-thumb-amber-600::-webkit-scrollbar-thumb:hover {
          background: #b45309; /* amber-700 */
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d97706 #e2e8f0;
        }`}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-orange-200/70 text-sm">
          {isMobile ? "Tap the scrolls to view projects details" : "Click the scrolls to unfurl projects details"}
        </p>
      </motion.div>
    </div>
  )
}
