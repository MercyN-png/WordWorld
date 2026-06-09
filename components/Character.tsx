'use client'
import { motion } from 'framer-motion'

export default function Character() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      className="flex flex-col items-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
    >
      {/* Face with big eyes */}
      <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg flex items-center justify-center relative">
        <div className="flex gap-3">
          <motion.div
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 3 }}
            className="w-3 h-3 bg-black rounded-full"
          />
          <motion.div
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 3 }}
            className="w-3 h-3 bg-black rounded-full"
          />
        </div>
        {/* Blush */}
        <div className="absolute -bottom-1 w-3 h-2 bg-pink-500/60 rounded-full blur-sm" />
        {/* Tongue sometimes */}
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
          className="absolute bottom-0 w-2 h-2 bg-red-400 rounded-full"
        />
      </div>
      {/* Body */}
      <div className="w-12 h-10 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-b-xl -mt-1 shadow" />
      {/* Arms waving */}
      <div className="flex gap-8 -mt-6">
        <motion.div
          animate={{ rotate: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-5 h-3 bg-orange-400 rounded-full"
        />
        <motion.div
          animate={{ rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-5 h-3 bg-orange-400 rounded-full"
        />
      </div>
    </motion.div>
  )
}