"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Filter, Star } from "lucide-react"

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [openScrolls, setOpenScrolls] = useState<number[]>([])

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      subtitle: "S-Rank Mission",
      description:
        "A full-stack e-commerce platform with advanced features like real-time inventory, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      category: "web",
      difficulty: "S-Rank",
      status: "Completed",
      image: "/modern-ecommerce-website.png",
      github: "#",
      live: "#",
    },
    {
      id: 2,
      title: "AI Chat Assistant",
      subtitle: "A-Rank Mission",
      description:
        "An intelligent chatbot using natural language processing to provide customer support and assistance.",
      tech: ["Python", "TensorFlow", "FastAPI", "React"],
      category: "ai",
      difficulty: "A-Rank",
      status: "Completed",
      image: "/ai-chatbot-interface.png",
      github: "#",
      live: "#",
    },
    {
      id: 3,
      title: "Task Management App",
      subtitle: "B-Rank Mission",
      description:
        "A collaborative task management application with real-time updates, team collaboration, and progress tracking.",
      tech: ["Next.js", "Supabase", "Tailwind CSS"],
      category: "web",
      difficulty: "B-Rank",
      status: "In Progress",
      image: "/task-management-dashboard.png",
      github: "#",
      live: "#",
    },
    {
      id: 4,
      title: "Data Visualization Tool",
      subtitle: "A-Rank Mission",
      description:
        "Interactive data visualization platform for analyzing complex datasets with custom charts and reports.",
      tech: ["D3.js", "Python", "Flask", "PostgreSQL"],
      category: "data",
      difficulty: "A-Rank",
      status: "Completed",
      image: "/data-visualization-charts.png",
      github: "#",
      live: "#",
    },
    {
      id: 5,
      title: "Mobile Fitness App",
      subtitle: "B-Rank Mission",
      description:
        "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
      tech: ["React Native", "Firebase", "Redux"],
      category: "mobile",
      difficulty: "B-Rank",
      status: "Completed",
      image: "/fitness-mobile-app-interface.png",
      github: "#",
      live: "#",
    },
    {
      id: 6,
      title: "Blockchain Voting System",
      subtitle: "S-Rank Mission",
      description: "Secure and transparent voting system built on blockchain technology with smart contracts.",
      tech: ["Solidity", "Web3.js", "React", "Ethereum"],
      category: "blockchain",
      difficulty: "S-Rank",
      status: "Completed",
      image: "/blockchain-voting-interface.png",
      github: "#",
      live: "#",
    },
  ]

  const filters = [
    { id: "all", label: "All Missions", count: projects.length },
    { id: "web", label: "Web Development", count: projects.filter((p) => p.category === "web").length },
    { id: "ai", label: "AI/ML", count: projects.filter((p) => p.category === "ai").length },
    { id: "mobile", label: "Mobile", count: projects.filter((p) => p.category === "mobile").length },
    { id: "data", label: "Data Science", count: projects.filter((p) => p.category === "data").length },
    { id: "blockchain", label: "Blockchain", count: projects.filter((p) => p.category === "blockchain").length },
  ]

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
          Missions Completed
        </h2>
        <p className="text-orange-200 text-lg">Portfolio of Successful Operations</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            whileHover={{ scale: 1.05 }}
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

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative flex justify-center"
              >
                <div className="w-full max-w-md">
                  {/* Closed Scroll - Always Visible */}
                  <motion.div
                    onClick={() => toggleScroll(project.id)}
                    className={`cursor-pointer transition-transform duration-300 relative z-10 ${
                      isScrollOpen(project.id) ? "scale-105" : "hover:scale-105"
                    }`}
                  >
                    {/* Horizontal Cylindrical Scroll - Wider */}
                    <div className="relative w-full h-16">
                      {/* Left Cap - Smaller */}
                      <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-red-600 to-red-700 rounded-l-lg border-2 border-red-800 shadow-lg">
                        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
                      </div>

                      {/* Main Body - Wider content area */}
                      <div className="absolute left-3 top-0 right-3 h-full bg-gradient-to-b from-teal-600 to-teal-700 border-y-2 border-teal-800 shadow-lg flex items-center justify-between px-4">
                        {/* Project Title */}
                        <div className="flex-1 text-center">
                          <div className="text-white text-sm font-bold">{project.title}</div>
                        </div>

                        {/* Level Badge */}
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor(project.difficulty)} ml-4`}
                        >
                          {project.difficulty}
                        </div>
                      </div>

                      {/* Right Cap - Smaller */}
                      <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-red-600 to-red-700 rounded-r-lg border-2 border-red-800 shadow-lg">
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-l from-red-400 to-red-500 rounded-full" />
                      </div>

                      {/* Click indicator */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-orange-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {isScrollOpen(project.id) ? "Click to close" : "Click to open"}
                      </div>
                    </div>
                  </motion.div>

                  {/* Open Scroll Content - Expands downward */}
                  <AnimatePresence>
                    {isScrollOpen(project.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {/* Expanded Parchment Content */}
                        <div className="relative w-full bg-gradient-to-br from-amber-50 to-amber-100 border-4 border-amber-600 border-t-0 rounded-b-lg shadow-2xl">
                          {/* Left Cap Extension */}
                          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-red-600 to-red-700 border-r-2 border-red-800">
                            <div className="absolute left-1 top-4 w-1 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
                          </div>

                          {/* Right Cap Extension */}
                          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-red-600 to-red-700 border-l-2 border-red-800">
                            <div className="absolute right-1 top-4 w-1 h-16 bg-gradient-to-l from-red-400 to-red-500 rounded-full" />
                          </div>

                          {/* Decorative Border */}
                          <div className="absolute inset-0 mx-4">
                            {/* Bottom Border Pattern */}
                            <div className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-amber-300 to-amber-400 flex items-center justify-around rounded">
                              {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-teal-600 rounded-full opacity-60" />
                              ))}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10 px-8 py-6">
                            {/* Header */}
                            <div className="text-center mb-4">
                              <h3 className="text-xl font-bold text-slate-800 mb-1">{project.title}</h3>
                              <p className="text-slate-600 text-sm">{project.subtitle}</p>
                            </div>

                            {/* Project Image */}
                            <div className="relative h-32 overflow-hidden rounded-lg mb-4 border-2 border-amber-600">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Description */}
                            <p className="text-slate-700 text-sm mb-4 leading-relaxed text-center">
                              {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 bg-slate-200 text-slate-700 text-xs rounded-full border border-slate-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Status and Rating */}
                            <div className="flex items-center justify-between mb-4">
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

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <motion.a
                                href={project.github}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-slate-800 text-white py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-slate-700 transition-colors duration-300 flex items-center justify-center"
                              >
                                <Github className="w-4 h-4 mr-2" />
                                Code
                              </motion.a>
                              <motion.a
                                href={project.live}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-gradient-to-r from-orange-400 to-blue-400 text-white py-3 px-4 rounded-lg text-center text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live
                              </motion.a>
                            </div>
                          </div>

                          {/* Side Text */}
                          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 rotate-90 text-slate-600 text-xs font-bold">
                            Mission
                          </div>
                          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-slate-600 text-xs font-bold">
                            Report
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

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-orange-200/70 text-sm">
          Click the scrolls to unfurl mission details • The scroll header remains visible when opened
        </p>
      </motion.div>
    </div>
  )
}
