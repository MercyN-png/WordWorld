'use client'
import { motion } from 'framer-motion'

interface Tab {
  id: string
  label: string
  count: number
  isActive: boolean
  icon: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  onTabChange: (id: string) => void
}

export default function Tabs({ tabs, onTabChange }: TabsProps) {
  return (
    <div className="flex justify-center gap-2 bg-white/30 p-1 rounded-xl backdrop-blur-md w-fit mx-auto shadow-inner">
      {tabs.map((tab: any) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative px-3 py-1.5 rounded-lg font-bold text-xs transition-all"
        >
          {tab.isActive && (
            <motion.span
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg shadow-md"
              transition={{ type: 'spring', duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1 text-white drop-shadow-md text-xs">
            {tab.icon}
            {tab.label}
            <span className="bg-white/30 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
              {tab.count}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}