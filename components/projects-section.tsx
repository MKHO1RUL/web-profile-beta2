"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Filter, Star, Sparkles, FolderSearch } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

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
  const [openScrolls, setOpenScrolls] = useState<number[]>([1]) // Default open first scroll for great initial UX
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useIsMobile()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/projects")
        if (!res.ok) throw new Error("Failed to fetch projects")
        const data = await res.json()
        setProjects(data as Project[])
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filters = useMemo(() => {
    if (projects.length === 0) return []
    return [
      { id: "all", label: "All Missions", count: projects.length },
      { id: "ai", label: "AI/ML", count: projects.filter((p) => p.category === "ai").length },
      { id: "blockchain", label: "Blockchain & Cryptography", count: projects.filter((p) => p.category === "blockchain").length },
      { id: "web", label: "Web Development", count: projects.filter((p) => p.category === "web").length },
      { id: "data", label: "Data Science", count: projects.filter((p) => p.category === "data").length },
    ].filter((f) => f.id === "all" || f.count > 0)
  }, [projects])

  const filteredProjects =
    selectedFilter === "all" ? projects : projects.filter((project) => project.category === selectedFilter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "S-Rank":
        return "from-red-500 to-pink-500 shadow-red-500/20"
      case "A-Rank":
        return "from-orange-500 to-amber-500 shadow-orange-500/20"
      case "B-Rank":
        return "from-blue-500 to-cyan-500 shadow-blue-500/20"
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
          Ninja Missions & Projects
        </h2>
        <p className="text-orange-200/70 text-sm max-w-xl mx-auto">
          Production AI models, metaheuristic optimizations, and cryptographic systems deployed to the cloud.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      {!isLoading && filters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: animationDelay }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                selectedFilter === filter.id
                  ? "bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.3)]"
                  : "bg-slate-800/60 text-orange-200 border-orange-400/30 hover:border-orange-400/60 hover:bg-slate-800"
              }`}
            >
              <Filter className="w-3.5 h-3.5 inline mr-1.5" />
              {filter.label}
              <span className="ml-1.5 text-xs opacity-75 font-mono">({filter.count})</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Projects Grid / Skeletons */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((idx) => (
              <div key={idx} className="w-full max-w-md mx-auto animate-pulse">
                <div className="h-16 bg-slate-800 rounded-lg border border-orange-400/20 mb-2 flex items-center justify-between px-6">
                  <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                  <div className="h-6 bg-slate-700 rounded-full w-16"></div>
                </div>
                <div className="h-64 bg-slate-800/60 rounded-b-lg border-2 border-slate-700/50 p-6 space-y-4">
                  <div className="h-28 bg-slate-700/50 rounded-lg"></div>
                  <div className="h-3 bg-slate-700/50 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-700/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: isMobile ? 0.3 : 0.5 }}
              className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredProjects.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-orange-200/70 flex flex-col items-center gap-3">
                  <FolderSearch className="w-10 h-10 text-orange-400/50" />
                  <p>No missions found in this category.</p>
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationDuration, delay: index * animationDelay }}
                    className="group relative flex justify-center"
                  >
                    <div className="w-full max-w-md">
                      {/* Scroll Header */}
                      <motion.div
                        onClick={() => toggleScroll(project.id)}
                        className={`cursor-pointer transition-transform duration-300 relative z-10 ${
                          isScrollOpen(project.id) ? "scale-[1.02]" : !isMobile && "hover:scale-[1.02]"
                        }`}
                      >
                        <div className="relative w-full h-16">
                          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-red-600 to-red-700 rounded-l-lg border-2 border-red-800 shadow-lg">
                            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
                          </div>

                          <div className="absolute left-3 top-0 right-3 h-full bg-gradient-to-b from-teal-700 to-teal-800 border-y-2 border-teal-600 shadow-lg flex items-center justify-between px-4">
                            <div className="flex-1 text-center truncate pr-2">
                              <div className="text-white text-sm font-bold truncate">{project.title}</div>
                            </div>

                            <div
                              className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor(
                                project.difficulty
                              )} shadow-md ml-2 flex-shrink-0`}
                            >
                              {project.difficulty}
                            </div>
                          </div>

                          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-red-600 to-red-700 rounded-r-lg border-2 border-red-800 shadow-lg">
                            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-l from-red-400 to-red-500 rounded-full" />
                          </div>

                          {!isMobile && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-orange-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {isScrollOpen(project.id) ? "Click to roll up scroll" : "Click to unfurl scroll"}
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Scroll Content Unfurl */}
                      <AnimatePresence>
                        {isScrollOpen(project.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: isMobile ? 0.35 : 0.5, ease: "easeInOut" }}
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
                                    <div key={i} className="w-1.5 h-1.5 bg-teal-700 rounded-full opacity-60" />
                                  ))}
                                </div>
                              </div>

                              <div className="relative z-10 px-8 py-6 flex flex-col h-[500px]">
                                <div className="text-center mb-3 flex-shrink-0 flex flex-col justify-center">
                                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{project.title}</h3>
                                </div>

                                <div className="relative h-32 overflow-hidden rounded-lg mb-3 border-2 border-amber-600 flex-shrink-0 bg-slate-900 shadow-inner">
                                  <img
                                    src={project.image || "/proj-forecast.png"}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>

                                <p className="text-slate-800 text-xs sm:text-sm mb-3 leading-relaxed text-left flex-1 overflow-y-auto scrollbar-thin scrollbar-track-amber-200 scrollbar-thumb-amber-600 pr-2">
                                  {project.description}
                                </p>

                                <div className="flex-shrink-0 pt-1 pb-3">
                                  <div className="flex items-center flex-nowrap gap-1.5 overflow-x-auto scrollbar-thin scrollbar-track-amber-200 scrollbar-thumb-amber-600 pb-1.5">
                                    {(project.tech || []).map((tech) => (
                                      <span
                                        key={tech}
                                        className="flex-shrink-0 px-2.5 py-0.5 bg-amber-200/80 text-slate-900 font-semibold text-[11px] rounded-full border border-amber-400"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-auto pt-3 border-t border-amber-300/80 space-y-3 flex-shrink-0">
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        project.status === "Completed"
                                          ? "bg-green-200 text-green-900 border border-green-400"
                                          : "bg-yellow-200 text-yellow-900 border border-yellow-400"
                                      }`}
                                    >
                                      ✓ {project.status}
                                    </span>
                                    <div className="flex items-center text-amber-600">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex gap-2.5">
                                    {project.github && (
                                      <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={!isMobile ? { scale: 1.03 } : {}}
                                        whileTap={{ scale: 0.96 }}
                                        className="flex-1 bg-slate-900 text-white py-2.5 px-3 rounded-lg text-center text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center shadow"
                                      >
                                        <Github className="w-3.5 h-3.5 mr-1.5" />
                                        Code
                                      </motion.a>
                                    )}
                                    {project.live && (
                                      <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={!isMobile ? { scale: 1.03 } : {}}
                                        whileTap={{ scale: 0.96 }}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-2.5 px-3 rounded-lg text-center text-xs font-semibold hover:shadow-lg transition-all flex items-center justify-center shadow"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                        Live App
                                      </motion.a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-track-amber-200::-webkit-scrollbar-track {
          background: #fde68a;
          border-radius: 10px;
        }
        .scrollbar-thumb-amber-600::-webkit-scrollbar-thumb {
          background: #d97706;
          border-radius: 10px;
        }
        .scrollbar-thumb-amber-600::-webkit-scrollbar-thumb:hover {
          background: #b45309;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d97706 #fde68a;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-orange-200/60 text-xs">
          {isMobile ? "Tap the ninja scrolls to view mission details" : "Click on any scroll to unfurl details"}
        </p>
      </motion.div>
    </div>
  )
}
