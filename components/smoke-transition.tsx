'use client'

import { motion } from 'framer-motion'

export default function SmokeTransition() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-orange-400 text-xl font-bold"
        >
          Entering the Hidden Leaf Village...
        </motion.p>
      </div>
    </motion.div>
  )
}
