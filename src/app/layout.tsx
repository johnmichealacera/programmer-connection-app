import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Programmer Connection - Real Connections, No Vanity',
  description: 'Connect with fellow programmers through genuine resonance, not likes or followers.',
  manifest: '/manifest.json',
  icons: {
    icon: '/resonance-logo.ico',
    shortcut: '/resonance-logo.ico',
    apple: '/resonance-logo.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
