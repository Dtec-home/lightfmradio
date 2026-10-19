import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientProviders } from '@/components/ClientProviders'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#fcfaf6',
}

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lightfmradio.org'
  ),
  // ── Core SEO ──────────────────────────────────────────────────────────────

  title: {
    default: 'Light FM, Edifying with the truth',
    template: '%s | Light FM',
  },
  description:
    'Welcome to the no. 1 leading online family christian radio station in east africa. Make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel.',
  keywords: [
    'Christian radio',
    'Light FM',
    'Gospel music',
    'biblical teaching',
    'Christian ministry',
    'Jesus Christ',
    'second coming',
    'Christian worship',
    'prayer',
    'faith',
    'salvation',
    'spiritual growth',
    'Bible study',
    'Christian online radio',
    'revival',
  ],
  authors: [{ name: 'Light FM Ministry' }],
  creator: 'Light FM Ministry',
  publisher: 'Light FM Ministry',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // ── Open Graph (WhatsApp, Facebook, LinkedIn, etc.) ───────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Light FM',
    title: 'Light FM, Edifying with the truth',
    description:
      'Welcome to the no. 1 leading online family christian radio station in east africa. Make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Light FM, Edifying with the truth',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Light FM, edifying with the truth',
    description:
      'Welcome to the no. 1 leading online family christian radio station in east africa. Make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel.',
    images: ['/logo.png'],
  },

  // ── Favicons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <ClientProviders>
            {children}
          </ClientProviders>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
