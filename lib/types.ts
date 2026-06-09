export interface Word {
  title: string
  category: string      // 'idioms', 'phrases', 'vocabulary'
  partOfSpeech?: string // 'noun', 'verb', 'adjective', etc.
  difficulty?: 'easy' | 'medium' | 'hard'
  meaning: string
  example: string
}

export interface DailyLesson {
  day: number
  streak: number
  idioms: Word[]
  phrases: Word[]
  vocabulary: Word[]
}