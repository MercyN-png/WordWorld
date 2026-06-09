# WordWorld - Live Word API Integration

## Overview
WordWorld now uses the **Free Dictionary API** to fetch fresh words automatically every day, eliminating the need for a static word bank.

## API Details

### Free Dictionary API
- **Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Rate Limit**: Unlimited
- **No Authentication**: Required
- **Response**: Complete word definitions, examples, phonetics, parts of speech

### Features

#### 1. **Daily Word Fetching**
- Every day, 5 random words are selected from a curated list
- Words are fetched from the Free Dictionary API
- Results are cached with a date timestamp to prevent redundant requests
- If the API is unavailable, fallback words are used

#### 2. **Smart Difficulty Assignment**
- **Easy**: Words with ≤5 characters
- **Medium**: Words with 6-10 characters  
- **Hard**: Words with >10 characters

#### 3. **Data Caching**
- Results are cached in memory per day
- New cache is generated at midnight (UTC)
- Fallback data ensures the app works even if the API is down

#### 4. **Error Handling**
- If a word fetch fails, the function attempts to get the next word
- If all API requests fail, the app uses high-quality fallback words
- Console logs track any API failures for debugging

### Word Selection
The app randomly selects from this curated list of vocabulary words:
```
serendipity, eloquent, ephemeral, meticulous, perspicacious,
ameliorate, sagacious, nebulous, obfuscate, paradigm,
benevolent, candid, diligent, ambiguous, empathy
```

**Idioms and Phrases** remain static (5 each daily) for consistency and learning progression.

### How It Works

1. **Component Mount**: When the app loads, `useEffect` triggers `getDailyLesson()`
2. **Fetch Decision**: Checks if today's data is already cached
3. **API Calls**: If no cache exists, fetches 5 random words from the Free Dictionary API
4. **Data Transformation**: Converts API response to the Word format (title, meaning, example, difficulty)
5. **Caching**: Stores the lesson data with today's date
6. **Return**: Returns the complete DailyLesson with idioms, phrases, and vocabulary

### Performance
- ⚡ First load: ~1-2 seconds (API requests)
- ⚡ Subsequent loads: Instant (cached)
- ⚡ Daily refresh: Automatic at midnight UTC

### Fallback Behavior
If the API is unreachable:
1. Fallback words are used instead
2. Definitions are generic but functional
3. App remains fully operational
4. No manual intervention needed

### Future Enhancements
- Add caching to browser storage (localStorage) for persistence
- Integrate more varied word sources
- Add user preferences for word categories
- Implement progressive difficulty tracking
