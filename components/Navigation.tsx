'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navigation({ onBack, onNext, currentIndex, total, canGoBack, canGoNext }: any) {
  return (
    <div className="flex items-center justify-between max-w-sm mx-auto w-full gap-2">
      <motion.button
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        disabled={!canGoBack}
        className={`btn-glow flex items-center gap-0.5 px-3 py-1.5 rounded-full font-bold text-xs ${
          canGoBack ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <ChevronLeft size={14} /> Back
      </motion.button>

      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === currentIndex ? 24 : 6,
              backgroundColor: i === currentIndex ? '#ff2e63' : '#ffb3c6',
              boxShadow: i === currentIndex ? '0 0 6px #ff2e63' : 'none',
            }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05, x: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        disabled={!canGoNext}
        className={`btn-glow flex items-center gap-0.5 px-3 py-1.5 rounded-full font-bold text-xs ${
          canGoNext ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next <ChevronRight size={14} />
      </motion.button>
    </div>
  )
}