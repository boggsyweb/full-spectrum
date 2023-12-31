import Header from '@/components/Header'
import Aside from '@/components/Aside'
import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Full-Spectrum',
  description: 'A blog about neurodivergence and tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className='max-w-screen-2xl'>
        <Header />
        <div className='grid grid-cols-1 md:grid-cols-[4fr_1fr] px-10 md:px-20 max-w-screen-2xl'>
        {children}
        <Aside />
        </div>
        </div>
        </body>
        
    </html>
  )
}
