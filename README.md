# WordWorld - Daily English Learning App

A beautifully animated web application to learn English vocabulary, idioms, and phrases every day with fun cartoon animations.

## Features

- 🎯 **Daily Content**: 5 idioms, 5 phrases, and 5 vocabulary words every day
- ✨ **Smooth Animations**: Built with Framer Motion for delightful interactions
- 🎨 **Modern UI**: Beautiful gradient design with Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎭 **Animated Character**: Cute cartoon character that moves and interacts
- 🎪 **Interactive Cards**: Flip and reveal meanings and examples
- 📊 **Progress Tracking**: Day counter and streak tracking
- 🎓 **Educational**: Learn with examples and difficulty levels

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Runtime**: Node.js

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone or navigate to the project directory
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
wordworld/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Character.tsx         # Animated character
│   ├── WordCard.tsx          # Word display card
│   ├── Tabs.tsx              # Category tabs
│   └── Navigation.tsx        # Navigation buttons
├── lib/
│   ├── data.ts              # Daily lesson data
│   └── types.ts             # TypeScript types
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Features Explained

### Character Animation
The cute cartoon character at the center of the card has:
- Bobbing head motion
- Swinging arms
- Walking leg animation
- Smooth entrance animation

### Word Cards
Each word card displays:
- Word title
- Category badge (Idiom/Phrase/Vocabulary)
- Part of speech (for vocabulary)
- Difficulty level (Easy/Medium/Hard)
- Animated character
- Meaning section
- Example usage

### Tab Navigation
Switch between three categories:
- **Idioms**: Phrasal expressions with unique meanings
- **Phrases**: Common conversational phrases
- **Vocabulary**: Individual words with definitions

### Progress Indicators
- Day counter showing which day of learning
- Streak counter showing consecutive days
- Progress dots showing position in current category

## Customization

### Adding New Words

Edit `lib/data.ts` to add new words to the daily lesson:

```typescript
const idioms: Word[] = [
  {
    id: 'idiom-1',
    title: 'Your idiom',
    meaning: 'The meaning',
    example: 'An example sentence',
    category: 'idiom',
    difficulty: 'easy',
  },
  // ... more words
]
```

### Styling

Customize colors and animations in:
- `tailwind.config.js` - Color palette and animation settings
- `app/globals.css` - Global styles and utility classes
- Component files - Individual component styling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Server-side rendering with Next.js
- Optimized animations with Framer Motion
- CSS-in-JS with Tailwind for minimal bundle size
- Lazy component rendering

## Future Enhancements

- User authentication and progress tracking
- Spaced repetition algorithm
- Quiz and quiz modes
- Pronunciation audio
- Mobile app with React Native
- Dark mode support
- Multi-language support
- Offline mode with service workers

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or suggestions, please create an issue in the repository.

---

**Happy Learning! 🌟**
