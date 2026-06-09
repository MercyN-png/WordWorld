'use client'
import { motion } from 'framer-motion'
import Character from './Character'
import { Word } from '@/lib/types'

export default function WordCard({ word, isActive }: { word: Word; isActive: boolean }) {
  const diffColors = {
    easy: 'bg-neon-green/20 text-neon-green border-neon-green',
    medium: 'bg-neon-yellow/20 text-yellow-600 border-yellow-500',
    hard: 'bg-neon-pink/20 text-neon-pink border-neon-pink',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 15 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        {/* Top badges - compact */}
        <div className="px-4 pt-3 pb-1 flex justify-between items-start">
          <div className="flex gap-1.5">
            <span className="text-[10px] font-black px-2 py-1 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow">
              {word.category.toUpperCase()}
            </span>
            {word.partOfSpeech && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/80 text-gray-700 shadow">
                {word.partOfSpeech}
              </span>
            )}
          </div>
          {word.difficulty && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${diffColors[word.difficulty]}`}>
              {word.difficulty}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-center bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent my-1">
          {word.title}
        </h2>

        {/* Character area - compact */}
        <div className="flex items-center justify-center gap-4 py-2 bg-gradient-to-r from-pink-100/30 to-purple-100/30 mx-3 rounded-xl my-1">
          <span className="text-2xl font-black text-neon-pink">❓</span>
          <div className="scale-75">
            <Character />
          </div>
          <span className="text-[10px] font-black bg-white px-2 py-1 rounded-full shadow text-neon-purple">
            👆 TAP
          </span>
        </div>

        {/* Meaning and example - only when active */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-3 space-y-2"
          >
            <div className="bg-rose-50 rounded-lg p-2 border-l-4 border-neon-pink">
              <p className="text-[10px] font-black uppercase text-neon-pink">📖 MEANING</p>
              <p className="text-xs text-gray-800 font-medium mt-0.5">{word.meaning}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-2 border-l-4 border-neon-cyan">
              <p className="text-[10px] font-black uppercase text-neon-cyan">✨ EXAMPLE</p>
              <p className="text-xs text-gray-800 italic mt-0.5">“{word.example}”</p>
            </div>
          </motion.div>
        )}

        {/* Small hint */}
        <div className="text-center text-[9px] text-neon-pink/60 pb-2 flex items-center justify-center gap-1">
          <span>⬅️</span> tap or use buttons <span>➡️</span>
        </div>
      </div>
    </motion.div>
  )
}