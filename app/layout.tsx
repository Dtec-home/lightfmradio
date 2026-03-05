import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });
const dmSans = DM_Sans({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Light FM - Christian Ministry | Prepare for Christ\'s Return',
  description: 'Light FM Christian Ministry: Biblical teaching, worship, prayer, and Gospel truth. Prepare your heart for Jesus Christ\'s return. Accept Jesus today.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{
      '--font-serif': playfair.style.fontFamily,
      '--font-sans': dmSans.style.fontFamily,
    } as React.CSSProperties}>
      <body className={`${geist.className} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
