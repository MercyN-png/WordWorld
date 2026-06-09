import { DailyLesson, Word } from './types'

// Backup words in case API fails
const fallbackWords = [
  'serendipity',
  'eloquent',
  'ephemeral',
  'meticulous',
  'perspicacious',
  'ameliorate',
  'sagacious',
  'nebulous',
  'obfuscate',
  'paradigm',
  'benevolent',
  'candid',
  'diligent',
  'ambiguous',
  'empathy',
]

interface CachedLesson {
  data: DailyLesson
  date: string
}

// In-memory cache
let cachedLesson: CachedLesson | null = null

function getTodayDate(): string {
  const now = new Date()
  return now.toISOString().split('T')[0] // YYYY-MM-DD
}

function getDayNumber(): number {
  // Calculate days since app launch (e.g., Jan 1, 2024)
  const launchDate = new Date('2024-01-01')
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - launchDate.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
}

async function fetchWordFromAPI(word: string): Promise<Word | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    if (!response.ok) {
      console.warn(`Dictionary API returned ${response.status} for word: ${word}`)
      return null
    }

    const data = await response.json() as Array<{ meanings?: Array<{ partOfSpeech?: string; definitions?: Array<{ definition?: string; example?: string }> }> }>
    const entry = data[0]

    if (!entry) return null

    // Extract meaning from first definition
    const meanings = entry.meanings || []
    const firstMeaning = meanings[0] || {}
    const definitions = firstMeaning.definitions || []
    const firstDef = definitions[0] || {}

    // Determine difficulty based on word length and complexity
    const wordLength = word.length
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium'
    if (wordLength < 6) difficulty = 'easy'
    else if (wordLength > 10) difficulty = 'hard'

    return {
      title: word.charAt(0).toUpperCase() + word.slice(1),
      category: 'vocabulary',
      partOfSpeech: firstMeaning.partOfSpeech || 'word',
      meaning: firstDef.definition || 'A meaningful word',
      example: firstDef.example || `This is an example with ${word}.`,
      difficulty,
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn(`API request timeout for word: ${word}`)
      } else {
        console.error(`Failed to fetch ${word}:`, error.message)
      }
    }
    return null
  }
}

async function generateDailyLesson(): Promise<DailyLesson> {
  const today = getTodayDate()

  // Return cached lesson if it's the same day
  if (cachedLesson && cachedLesson.date === today) {
    return cachedLesson.data
  }

  try {
    // Fetch random words from the list
    const randomWords = fallbackWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)

    const vocabularyWords: Word[] = []

    // Fetch each word from API
    for (const word of randomWords) {
      const fetchedWord = await fetchWordFromAPI(word)
      if (fetchedWord) {
        vocabularyWords.push(fetchedWord)
      }
    }

    // If we don't have enough words, use fallback
    if (vocabularyWords.length === 0) {
      vocabularyWords.push(
        ...fallbackWords.slice(0, 5).map(w => ({
          title: w.charAt(0).toUpperCase() + w.slice(1),
          category: 'vocabulary',
          partOfSpeech: 'adjective',
          meaning: 'An interesting word to learn',
          example: `Use ${w} in your daily conversation.`,
          difficulty: 'medium' as const,
        }))
      )
    }

    // Create varied lesson with some static idioms and phrases, plus API words
    const idioms: Word[] = [
      { title: 'Break the ice', category: 'idioms', meaning: 'Start a conversation in an awkward situation', example: 'He told a joke to break the ice.', difficulty: 'easy' },
      { title: 'Hit the sack', category: 'idioms', meaning: 'Go to sleep', example: "I'm tired, time to hit the sack.", difficulty: 'easy' },
      { title: 'Cost an arm and a leg', category: 'idioms', meaning: 'Very expensive', example: 'That car costs an arm and a leg.', difficulty: 'medium' },
      { title: 'Under the weather', category: 'idioms', meaning: 'Feeling sick', example: "I'm feeling under the weather today.", difficulty: 'easy' },
      { title: 'Spill the beans', category: 'idioms', meaning: 'Reveal a secret', example: 'She spilled the beans about the party.', difficulty: 'medium' },
    ]

    const phrases: Word[] = [
      { title: 'As a result', category: 'phrases', meaning: 'Consequently', example: 'He studied hard; as a result, he passed.', difficulty: 'easy' },
      { title: 'In order to', category: 'phrases', meaning: 'For the purpose of', example: 'She saved money in order to travel.', difficulty: 'easy' },
      { title: 'Due to', category: 'phrases', meaning: 'Because of', example: 'The game was canceled due to rain.', difficulty: 'easy' },
      { title: 'Even though', category: 'phrases', meaning: 'Although', example: 'Even though it was late, they continued.', difficulty: 'medium' },
      { title: 'On the other hand', category: 'phrases', meaning: 'Conversely', example: "I like dogs; on the other hand, cats are fine too.", difficulty: 'hard' },
    ]

    const lesson: DailyLesson = {
      day: getDayNumber(),
      streak: 1,
      idioms,
      phrases,
      vocabulary: vocabularyWords,
    }

    // Cache the lesson
    cachedLesson = {
      data: lesson,
      date: today,
    }

    return lesson
  } catch (error) {
    console.error('Failed to generate daily lesson:', error)
    // Return fallback lesson
    return {
      day: getDayNumber(),
      streak: 1,
      idioms: [
        { title: 'Break the ice', category: 'idioms', meaning: 'Start a conversation', example: 'He told a joke to break the ice.', difficulty: 'easy' },
        { title: 'Hit the sack', category: 'idioms', meaning: 'Go to sleep', example: "I'm tired, time to hit the sack.", difficulty: 'easy' },
        { title: 'Cost an arm and a leg', category: 'idioms', meaning: 'Very expensive', example: 'That car costs an arm and a leg.', difficulty: 'medium' },
        { title: 'Under the weather', category: 'idioms', meaning: 'Feeling sick', example: "I'm feeling under the weather.", difficulty: 'easy' },
        { title: 'Spill the beans', category: 'idioms', meaning: 'Reveal a secret', example: 'She spilled the beans.', difficulty: 'medium' },
      ],
      phrases: [
        { title: 'As a result', category: 'phrases', meaning: 'Consequently', example: 'As a result, he passed.', difficulty: 'easy' },
        { title: 'In order to', category: 'phrases', meaning: 'For the purpose of', example: 'She saved money in order to travel.', difficulty: 'easy' },
        { title: 'Due to', category: 'phrases', meaning: 'Because of', example: 'The game was canceled due to rain.', difficulty: 'easy' },
        { title: 'Even though', category: 'phrases', meaning: 'Although', example: 'Even though it was late, they continued.', difficulty: 'medium' },
        { title: 'On the other hand', category: 'phrases', meaning: 'Conversely', example: 'On the other hand, cats are fine too.', difficulty: 'hard' },
      ],
      vocabulary: fallbackWords.slice(0, 5).map(w => ({
        title: w.charAt(0).toUpperCase() + w.slice(1),
        category: 'vocabulary',
        partOfSpeech: 'word',
        meaning: 'An interesting word to learn',
        example: `Use ${w} in your daily conversation.`,
        difficulty: 'medium' as const,
      })),
    }
  }
}

export async function getDailyLesson(): Promise<DailyLesson> {
  return generateDailyLesson()
}
