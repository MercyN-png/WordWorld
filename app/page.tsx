'use client'
import { useState, useMemo, useEffect } from 'react'
import { BookOpen, Star, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Tabs from '@/components/Tabs'
import WordCard from '@/components/WordCard'
import Navigation from '@/components/Navigation'
import { getDailyLesson } from '@/lib/data'
import { DailyLesson } from '@/lib/types'

export default function Home() {
  const [lesson, setLesson] = useState<DailyLesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('vocabulary')
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch lesson on component mount
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getDailyLesson()
        setLesson(data)
      } catch (error) {
        console.error('Failed to load lesson:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLesson()
  }, [])

  const currentWords = useMemo(() => {
    if (!lesson) return []
    if (activeTab === 'idioms') return lesson.idioms
    if (activeTab === 'phrases') return lesson.phrases
    return lesson.vocabulary
  }, [activeTab, lesson])

  const tabs = lesson ? [
    { id: 'idioms', label: 'Idioms', count: lesson.idioms.length, isActive: activeTab === 'idioms', icon: <Star size={16} /> },
    { id: 'phrases', label: 'Phrases', count: lesson.phrases.length, isActive: activeTab === 'phrases', icon: <Sparkles size={16} /> },
    { id: 'vocabulary', label: 'Vocabulary', count: lesson.vocabulary.length, isActive: activeTab === 'vocabulary', icon: <BookOpen size={16} /> },
  ] : []

  const currentWord = currentWords[currentIndex]

  if (loading || !lesson) {
    return (
      <main className="h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-600 font-semibold">Loading today&apos;s words...</p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="h-screen flex flex-col items-center justify-between p-4 overflow-hidden relative">
      {/* Floating background shapes */}
      <div className="absolute top-10 left-5 w-32 h-32 bg-neon-pink/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-5 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header - fixed at top */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center flex-shrink-0 w-full"
      >
        <motion.h1
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
          className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent"
        >
          WordWorld 🌍
        </motion.h1>
        <div className="flex justify-center gap-2 text-xs font-bold text-gray-700 mt-1 bg-white/40 backdrop-blur-sm w-fit mx-auto px-3 py-0.5 rounded-full">
          <span>📅 Day {lesson.day}</span>
          <span>🔥 {lesson.streak} day streak</span>
        </div>
        <p className="text-[11px] text-gray-600 mt-1 font-medium">
          5 idioms · 5 phrases · 5 vocabulary daily
        </p>
      </motion.div>

      {/* Tabs - no extra margin */}
      <div className="flex-shrink-0 w-full mt-2">
        <Tabs tabs={tabs} onTabChange={(id: string) => { setActiveTab(id); setCurrentIndex(0) }} />
      </div>

      {/* Word Card - takes remaining space but does not overflow */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0 my-2">
        <WordCard word={currentWord} isActive />
      </div>

      {/* Navigation */}
      <div className="flex-shrink-0 w-full mb-2">
        <Navigation
          onBack={() => setCurrentIndex(i => Math.max(0, i-1))}
          onNext={() => setCurrentIndex(i => Math.min(currentWords.length-1, i+1))}
          currentIndex={currentIndex}
          total={currentWords.length}
          canGoBack={currentIndex > 0}
          canGoNext={currentIndex < currentWords.length-1}
        />
      </div>

      {/* Footer - fixed at bottom */}
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-center text-gray-500 text-[10px] flex items-center justify-center gap-1 font-medium flex-shrink-0"
      >
        ✨ Keep learning every day — you&apos;re amazing! ✨
      </motion.p>
    </main>
  )
}