'use client'

import { motion } from 'framer-motion'
import { Quote, Star, User } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Kakashi Hatake',
      title: 'Senior Technical Lead',
      company: 'Hidden Leaf Technologies',
      message: 'Khoirul possesses exceptional skills in both frontend and backend development. His ability to solve complex problems with elegant solutions reminds me of the Copy Ninja techniques - precise and effective.',
      rating: 5,
      avatar: '/professional-male-avatar.png',
      seal: 'hokage'
    },
    {
      id: 2,
      name: 'Tsunade Senju',
      title: 'Project Manager',
      company: 'Medical Ninja Systems',
      message: 'Working with Khoirul has been like having a reliable teammate who never gives up. His dedication to clean code and user experience is truly remarkable. A true asset to any development team.',
      rating: 5,
      avatar: '/professional-female-avatar.png',
      seal: 'medical'
    },
    {
      id: 3,
      name: 'Jiraiya',
      title: 'Chief Technology Officer',
      company: 'Sage Mode Solutions',
      message: 'Khoirul has the rare combination of technical expertise and creative thinking. His approach to problem-solving is methodical yet innovative, much like mastering sage techniques.',
      rating: 5,
      avatar: '/professional-avatar-senior.png',
      seal: 'sage'
    },
    {
      id: 4,
      name: 'Itachi Uchiha',
      title: 'Security Architect',
      company: 'Sharingan Security',
      message: 'His attention to detail and security-first mindset is exceptional. Khoirul writes code that is not only functional but also secure and maintainable. A true professional.',
      rating: 5,
      avatar: '/professional-avatar-developer.png',
      seal: 'security'
    }
  ]

  const getSealColor = (seal: string) => {
    switch (seal) {
      case 'hokage': return 'from-red-400 to-orange-400'
      case 'medical': return 'from-green-400 to-teal-400'
      case 'sage': return 'from-purple-400 to-pink-400'
      case 'security': return 'from-blue-400 to-indigo-400'
      default: return 'from-gray-400 to-gray-500'
    }
  }

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
          Sensei Wisdom
        </h2>
        <p className="text-orange-200 text-lg">Words from Fellow Ninjas & Mentors</p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Ninja Scroll Design */}
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 text-slate-800 rounded-lg shadow-2xl border-4 border-amber-600 p-8 relative overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                {/* Parchment texture overlay */}
                <div className="absolute inset-0 bg-[url('/parchment-texture.png')] opacity-10" />
                
                {/* Seal Stamp */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${getSealColor(testimonial.seal)} flex items-center justify-center border-4 border-amber-600 shadow-lg`}
                  >
                    <div className="text-white text-xs font-bold text-center">
                      <div>NINJA</div>
                      <div>SEAL</div>
                    </div>
                  </motion.div>
                </div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-amber-600 mb-4" />

                  {/* Message */}
                  <p className="text-slate-700 mb-6 italic leading-relaxed">
                    "{testimonial.message}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.7 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-600 mr-4">
                      <img 
                        src={testimonial.avatar || "/placeholder.svg"} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                      <p className="text-slate-600 text-sm">{testimonial.title}</p>
                      <p className="text-slate-500 text-xs">{testimonial.company}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-600/20 rounded-full" />
                <div className="absolute bottom-4 left-6 w-2 h-2 bg-amber-600/30 rounded-full" />
                <div className="absolute top-2 left-2 w-3 h-3 bg-amber-600/20 rounded-full" />
              </div>

              {/* Floating Kunai */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: -45 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
                className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 transform rotate-45"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md border border-orange-400/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-6">Testimonial Summary</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">5.0</div>
                <div className="text-sm text-orange-200">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-sm text-orange-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-sm text-orange-200">Project Success</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">3+</div>
                <div className="text-sm text-orange-200">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
