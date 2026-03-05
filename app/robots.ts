import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://lightfmradio.org/sitemap.xml',
    host: 'https://lightfmradio.org',
  }
}
