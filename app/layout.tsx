import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: 'WordWorld – Spark Your English',
  description: '5 idioms, 5 phrases, 5 vocab every day with fun animations',
  metadataBase: new URL('https://wordworld.vercel.app'),
  openGraph: {
    title: 'WordWorld – Daily English Learning',
    description: 'Learn 5 idioms, 5 phrases, and 5 new vocabulary words every day with animated characters',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}