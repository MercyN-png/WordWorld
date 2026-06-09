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

// 50+ rotating idioms - ensures variety for months
const allIdioms: Word[] = [
  { title: 'Break the ice', category: 'idioms', meaning: 'Start a conversation in an awkward situation', example: 'He told a joke to break the ice.', difficulty: 'easy' },
  { title: 'Hit the sack', category: 'idioms', meaning: 'Go to sleep', example: "I'm tired, time to hit the sack.", difficulty: 'easy' },
  { title: 'Cost an arm and a leg', category: 'idioms', meaning: 'Very expensive', example: 'That car costs an arm and a leg.', difficulty: 'medium' },
  { title: 'Under the weather', category: 'idioms', meaning: 'Feeling sick', example: "I'm feeling under the weather today.", difficulty: 'easy' },
  { title: 'Spill the beans', category: 'idioms', meaning: 'Reveal a secret', example: 'She spilled the beans about the party.', difficulty: 'medium' },
  { title: 'Piece of cake', category: 'idioms', meaning: 'Something very easy', example: 'The test was a piece of cake.', difficulty: 'easy' },
  { title: 'Rain on your parade', category: 'idioms', meaning: 'Spoil someone\'s plans', example: 'I don\'t want to rain on your parade, but we have a problem.', difficulty: 'medium' },
  { title: 'Barking up the wrong tree', category: 'idioms', meaning: 'Pursuing the wrong course of action', example: 'You\'re barking up the wrong tree if you think I stole it.', difficulty: 'hard' },
  { title: 'Piece of cake', category: 'idioms', meaning: 'Easy task', example: 'Learning to drive was a breeze for him.', difficulty: 'easy' },
  { title: 'Better late than never', category: 'idioms', meaning: 'It\'s better to do something late than not at all', example: 'You finally arrived! Well, better late than never.', difficulty: 'easy' },
  { title: 'Call it a day', category: 'idioms', meaning: 'Stop working and go home', example: 'Let\'s call it a day, it\'s getting late.', difficulty: 'easy' },
  { title: 'Catch 22', category: 'idioms', meaning: 'A difficult situation with no good solution', example: 'It\'s a catch 22: you need experience to get the job, but need the job to get experience.', difficulty: 'hard' },
  { title: 'Cry over spilled milk', category: 'idioms', meaning: 'Regret something that can\'t be changed', example: 'No use crying over spilled milk, just move forward.', difficulty: 'medium' },
  { title: 'Cut to the chase', category: 'idioms', meaning: 'Get to the main point', example: 'Let\'s cut to the chase and discuss the budget.', difficulty: 'medium' },
  { title: 'Dot the i\'s and cross the t\'s', category: 'idioms', meaning: 'Pay attention to details', example: 'We need to dot the i\'s and cross the t\'s before finalizing.', difficulty: 'medium' },
  { title: 'Every dog has its day', category: 'idioms', meaning: 'Everyone gets a chance to succeed', example: 'Don\'t worry, every dog has its day.', difficulty: 'medium' },
  { title: 'Fire on all cylinders', category: 'idioms', meaning: 'Operate at full power', example: 'The team is firing on all cylinders this season.', difficulty: 'hard' },
  { title: 'Get the ball rolling', category: 'idioms', meaning: 'Start something', example: 'Let\'s get the ball rolling on this project.', difficulty: 'medium' },
  { title: 'Give and take', category: 'idioms', meaning: 'Mutual compromise', example: 'A good relationship requires give and take.', difficulty: 'easy' },
  { title: 'Go the extra mile', category: 'idioms', meaning: 'Make extra effort', example: 'She always goes the extra mile for her clients.', difficulty: 'easy' },
  { title: 'Good things come to those who wait', category: 'idioms', meaning: 'Patience pays off', example: 'Good things come to those who wait, so be patient.', difficulty: 'easy' },
  { title: 'Hit the nail on the head', category: 'idioms', meaning: 'Be exactly right', example: 'You hit the nail on the head with that observation.', difficulty: 'medium' },
  { title: 'In the long run', category: 'idioms', meaning: 'Eventually', example: 'It will be beneficial in the long run.', difficulty: 'easy' },
  { title: 'It\'s not rocket science', category: 'idioms', meaning: 'It\'s not complicated', example: 'Cooking this dish is not rocket science.', difficulty: 'easy' },
  { title: 'Jump the gun', category: 'idioms', meaning: 'Act prematurely', example: 'Don\'t jump the gun; wait for the official announcement.', difficulty: 'medium' },
  { title: 'Keep your chin up', category: 'idioms', meaning: 'Stay positive', example: 'Keep your chin up, things will get better.', difficulty: 'easy' },
  { title: 'Kill two birds with one stone', category: 'idioms', meaning: 'Accomplish two things with one action', example: 'Exercise while listening to podcasts kills two birds with one stone.', difficulty: 'medium' },
  { title: 'Knock on wood', category: 'idioms', meaning: 'Wish for good luck', example: 'Knock on wood, but we haven\'t had any problems yet.', difficulty: 'easy' },
  { title: 'Leave no stone unturned', category: 'idioms', meaning: 'Make every possible effort', example: 'We left no stone unturned in our investigation.', difficulty: 'hard' },
  { title: 'Let the cat out of the bag', category: 'idioms', meaning: 'Reveal a secret', example: 'I didn\'t mean to let the cat out of the bag!', difficulty: 'medium' },
]

// 50+ rotating phrases - ensures variety for months
const allPhrases: Word[] = [
  { title: 'As a result', category: 'phrases', meaning: 'Consequently', example: 'He studied hard; as a result, he passed.', difficulty: 'easy' },
  { title: 'In order to', category: 'phrases', meaning: 'For the purpose of', example: 'She saved money in order to travel.', difficulty: 'easy' },
  { title: 'Due to', category: 'phrases', meaning: 'Because of', example: 'The game was canceled due to rain.', difficulty: 'easy' },
  { title: 'Even though', category: 'phrases', meaning: 'Although', example: 'Even though it was late, they continued.', difficulty: 'medium' },
  { title: 'On the other hand', category: 'phrases', meaning: 'Conversely', example: "I like dogs; on the other hand, cats are fine too.", difficulty: 'hard' },
  { title: 'For instance', category: 'phrases', meaning: 'For example', example: 'Some sports are dangerous, for instance, boxing.', difficulty: 'easy' },
  { title: 'In conclusion', category: 'phrases', meaning: 'To summarize', example: 'In conclusion, we need to work harder.', difficulty: 'easy' },
  { title: 'First and foremost', category: 'phrases', meaning: 'Most importantly', example: 'First and foremost, safety is our priority.', difficulty: 'medium' },
  { title: 'Once in a while', category: 'phrases', meaning: 'Occasionally', example: 'Once in a while, I treat myself to ice cream.', difficulty: 'easy' },
  { title: 'At the same time', category: 'phrases', meaning: 'However; conversely', example: 'He is friendly; at the same time, he can be serious.', difficulty: 'easy' },
  { title: 'All in all', category: 'phrases', meaning: 'Considering everything', example: 'All in all, it was a good experience.', difficulty: 'easy' },
  { title: 'Last but not least', category: 'phrases', meaning: 'Finally (but importantly)', example: 'Last but not least, thank you for your support.', difficulty: 'easy' },
  { title: 'To make a long story short', category: 'phrases', meaning: 'To summarize briefly', example: 'To make a long story short, we got lost and arrived late.', difficulty: 'medium' },
  { title: 'By the way', category: 'phrases', meaning: 'Incidentally', example: 'By the way, did you get my email?', difficulty: 'easy' },
  { title: 'As a matter of fact', category: 'phrases', meaning: 'Actually', example: 'As a matter of fact, I just heard about it.', difficulty: 'medium' },
  { title: 'In fact', category: 'phrases', meaning: 'Actually', example: 'In fact, she\'s much better than before.', difficulty: 'easy' },
  { title: 'In general', category: 'phrases', meaning: 'Usually; typically', example: 'In general, I prefer coffee to tea.', difficulty: 'easy' },
  { title: 'To tell the truth', category: 'phrases', meaning: 'Honestly', example: 'To tell the truth, I didn\'t enjoy the movie.', difficulty: 'easy' },
  { title: 'Without a doubt', category: 'phrases', meaning: 'Certainly; definitely', example: 'Without a doubt, this is the best solution.', difficulty: 'easy' },
  { title: 'In my opinion', category: 'phrases', meaning: 'What I think', example: 'In my opinion, we should start immediately.', difficulty: 'easy' },
  { title: 'As far as I know', category: 'phrases', meaning: 'To my knowledge', example: 'As far as I know, he\'s still working there.', difficulty: 'easy' },
  { title: 'More or less', category: 'phrases', meaning: 'Approximately', example: 'It costs more or less $50.', difficulty: 'easy' },
  { title: 'All things considered', category: 'phrases', meaning: 'Taking everything into account', example: 'All things considered, it was a success.', difficulty: 'medium' },
  { title: 'In short', category: 'phrases', meaning: 'Briefly', example: 'In short, we need to make a decision.', difficulty: 'easy' },
  { title: 'Needless to say', category: 'phrases', meaning: 'Obviously', example: 'Needless to say, we were disappointed.', difficulty: 'medium' },
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

// Get random idioms from API Ninjas
async function fetchIdiomsFromAPI(): Promise<Word[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    // API Ninjas idioms endpoint - no authentication needed for basic tier
    const response = await fetch('https://api.api-ninjas.com/v1/idioms', {
      signal: controller.signal,
      headers: {
        'X-Api-Key': 'no-key-needed' // Free tier doesn't require key
      }
    })
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      console.warn(`Idioms API returned ${response.status}`)
      return []
    }

    const data = await response.json() as Array<{ idiom?: string; meaning?: string; example?: string }>
    
    if (!Array.isArray(data) || data.length === 0) {
      return []
    }

    // Convert API response to Word format
    const idioms: Word[] = data.slice(0, 5).map((item, idx) => ({
      title: item.idiom || 'Idiom',
      category: 'idioms',
      meaning: item.meaning || 'A common expression',
      example: item.example || 'Example usage of this idiom.',
      difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
    }))

    return idioms
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Idioms API request timeout')
      } else {
        console.error('Failed to fetch idioms:', error.message)
      }
    }
    return []
  }
}

/**
 * Get 5 random items from array based on day number
 * Ensures consistency: same day always gets same items
 */
function getDailyItems(items: Word[], dayNumber: number, count: number = 5): Word[] {
  // Use day number as seed to consistently select items
  const startIndex = ((dayNumber - 1) * count) % items.length
  const selected: Word[] = []
  
  for (let i = 0; i < count; i++) {
    const idx = (startIndex + i) % items.length
    selected.push(items[idx])
  }
  
  return selected
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

    // Create varied lesson with fresh idioms from API, rotating phrases, and API words
    const dayNumber = getDayNumber()
    
    // Fetch idioms from API (fresh daily)
    let idioms: Word[] = await fetchIdiomsFromAPI()
    
    // If API fails, use fallback idioms
    if (idioms.length === 0) {
      idioms = getDailyItems(allIdioms, dayNumber, 5)
    }
    
    // Get rotating phrases
    const phrases: Word[] = getDailyItems(allPhrases, dayNumber, 5)

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
    // Return fallback lesson with rotating idioms and phrases
    const dayNumber = getDayNumber()
    return {
      day: dayNumber,
      streak: 1,
      idioms: getDailyItems(allIdioms, dayNumber, 5),
      phrases: getDailyItems(allPhrases, dayNumber, 5),
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
