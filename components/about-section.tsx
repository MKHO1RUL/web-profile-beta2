'use client'

import { motion } from 'framer-motion'
import { Star, Award, Target, Heart } from 'lucide-react'

export default function AboutSection() {
  const stats = [
    { label: 'Chakra Control', value: 95, color: 'bg-blue-400' },
    { label: 'Code Jutsu', value: 90, color: 'bg-orange-400' },
    { label: 'Team Work', value: 88, color: 'bg-green-400' },
    { label: 'Problem Solving', value: 92, color: 'bg-purple-400' },
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
          Ninja Profile
        </h2>
        <p className="text-orange-200 text-lg">Scroll of Personal Information</p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Ninja Scroll */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 text-slate-800 p-8 rounded-lg shadow-2xl border-4 border-amber-600 relative overflow-hidden">
              {/* Parchment texture overlay */}
              <div className="absolute inset-0 bg-[url('/parchment-texture.png')] opacity-10" />
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-blue-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">K</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Khoirul</h3>
                    <p className="text-slate-600">Software Developer - Jounin Rank</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-3 text-orange-600" />
                    <span>Specialization: Full-Stack Development</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-3 text-blue-600" />
                    <span>Mission: Creating digital solutions</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 text-red-600" />
                    <span>Passion: Clean code & user experience</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-100 rounded border-l-4 border-orange-400">
                  <p className="text-sm italic">
                    "A true ninja never gives up, and neither does a true developer. 
                    Every bug is just another challenge to overcome on the path to mastery."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Ninja Stats
            </h3>

            {stats.map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-orange-200 font-medium">{stat.label}</span>
                  <span className="text-blue-400 font-bold">{stat.value}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-full ${stat.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 bg-slate-800/50 backdrop-blur-md border border-orange-400/30 rounded-lg">
              <h4 className="text-lg font-bold text-orange-400 mb-3">Current Mission Status</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-orange-200">Active Projects:</span>
                  <span className="ml-2 text-blue-400 font-bold">5</span>
                </div>
                <div>
                  <span className="text-orange-200">Completed:</span>
                  <span className="ml-2 text-green-400 font-bold">47</span>
                </div>
                <div>
                  <span className="text-orange-200">Success Rate:</span>
                  <span className="ml-2 text-yellow-400 font-bold">98%</span>
                </div>
                <div>
                  <span className="text-orange-200">Rank Points:</span>
                  <span className="ml-2 text-purple-400 font-bold">2,847</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
