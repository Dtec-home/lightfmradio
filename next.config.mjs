/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Album/track art (`song.art`) is served by the AzuraCast station API at
    // app.lightfmradio.org (see NEXT_PUBLIC_API_URL / NEXT_PUBLIC_STREAM_URL
    // in .env.example, consumed in context/PlayerContext.tsx and rendered via
    // next/image in components/Player.tsx, UpNext.tsx, RecentlyPlayed.tsx).
    // All other next/image usages in the app point at local /public assets.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.lightfmradio.org',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
