import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.lightfmradio.org/sitemap.xml',
    host: 'https://www.lightfmradio.org',
  }
}
