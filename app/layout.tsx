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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lightfmradio.org'
  ),
  // ── Core SEO ──────────────────────────────────────────────────────────────

  title: {
    default: 'Light FM – Christian Ministry Radio | Prepare for Christ\'s Return',
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
    siteName: 'Light FM – Christian Ministry Radio',
    title: 'Light FM – Prepare Your Heart for Christ\'s Return',
    description:
      'Welcome to the no. 1 leading online family christian radio station in east africa. Make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Light FM – Christian Ministry Radio – Prepare Your Heart for Christ\'s Return',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Light FM – Prepare Your Heart for Christ\'s Return',
    description:
      'Welcome to the no. 1 leading online family christian radio station in east africa. Make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel.',
    images: ['/og-image.png'],
  },

  // ── Favicons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },

  // ── Theme ─────────────────────────────────────────────────────────────────
  themeColor: '#faf9f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{
      '--font-serif': playfair.style.fontFamily,
      '--font-sans': dmSans.style.fontFamily,
    } as React.CSSProperties}>
      <body className={`${geist.className} font-sans antialiased bg-background text-foreground`}>
        <div className="noise-overlay" />
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
