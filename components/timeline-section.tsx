'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, BookOpen } from 'lucide-react'

export default function TimelineSection() {
  const journeySteps = [
    {
      year: '2018',
      title: 'Academy Enrollment',
      subtitle: 'Started Programming Journey',
      description: 'Began learning the fundamentals of programming at the Code Academy. Mastered basic jutsu like HTML, CSS, and JavaScript.',
      icon: BookOpen,
      color: 'from-blue-400 to-cyan-400',
      location: 'Self-Taught Village'
    },
    {
      year: '2019',
      title: 'Genin Promotion',
      subtitle: 'First Development Role',
      description: 'Achieved Genin rank by landing first junior developer position. Learned teamwork and collaboration while working on real projects.',
      icon: Award,
      color: 'from-green-400 to-teal-400',
      location: 'TechCorp Industries'
    },
    {
      year: '2020',
      title: 'Chunin Exams',
      subtitle: 'Full-Stack Mastery',
      description: 'Passed the challenging Chunin exams by mastering both frontend and backend technologies. Specialized in React and Node.js.',
      icon: Award,
      color: 'from-orange-400 to-yellow-400',
      location: 'Hidden Leaf Tech'
    },
    {
      year: '2021',
      title: 'Special Jounin',
      subtitle: 'Team Leadership',
      description: 'Promoted to Special Jounin rank, leading a team of developers on complex missions. Introduced Agile methodologies and mentored junior ninjas.',
      icon: Award,
      color: 'from-purple-400 to-pink-400',
      location: 'Innovation Labs'
    },
    {
      year: '2022',
      title: 'Jounin Rank',
      subtitle: 'Senior Developer',
      description: 'Achieved Jounin rank through exceptional performance and leadership. Specialized in AI/ML integration and cloud architecture.',
      icon: Award,
      color: 'from-red-400 to-orange-400',
      location: 'Cloud Nine Solutions'
    },
    {
      year: '2023',
      title: 'Elite Ninja',
      subtitle: 'Technical Architect',
      description: 'Currently serving as a Technical Architect, designing scalable systems and mentoring the next generation of code ninjas.',
      icon: Award,
      color: 'from-indigo-400 to-purple-400',
      location: 'Present Day'
    }
  ]

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
          Ninja Journey
        </h2>
        <p className="text-orange-200 text-lg">The Path to Code Mastery</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 via-blue-400 to-purple-400 rounded-full" />

          {/* Timeline Steps */}
          <div className="space-y-16">
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg p-6 shadow-xl hover:border-orange-400/60 transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mr-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-orange-400">{step.title}</h3>
                          <p className="text-blue-400 text-sm">{step.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-orange-200 mb-4 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-orange-300">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {step.year}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {step.location}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center border-4 border-slate-900 shadow-lg`}
                    >
                      <span className="text-white font-bold text-sm">{step.year}</span>
                    </motion.div>
                  </div>

                  {/* Footprint/Kunai Trail */}
                  <div className={`w-5/12 ${isEven ? 'pl-8' : 'pr-8'} flex ${isEven ? 'justify-start' : 'justify-end'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="text-orange-400/30"
                    >
                      {/* Ninja Footprint */}
                      <div className="w-8 h-12 relative">
                        <div className="absolute inset-0 bg-orange-400/20 rounded-full transform rotate-12" />
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400/30 rounded-full" />
                        <div className="absolute bottom-2 left-1 w-2 h-2 bg-orange-400/30 rounded-full" />
                        <div className="absolute bottom-2 right-1 w-2 h-2 bg-orange-400/30 rounded-full" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md border border-orange-400/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Current Mission Status</h3>
            <p className="text-orange-200 mb-6">
              Continuing the journey as a Jounin-level developer, always learning new techniques and sharing knowledge with fellow ninjas.
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">5+</div>
                <div className="text-sm text-orange-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">50+</div>
                <div className="text-sm text-orange-200">Missions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">15+</div>
                <div className="text-sm text-orange-200">Ninjas Mentored</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
