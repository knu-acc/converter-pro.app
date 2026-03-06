import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/lang/ru', '/lang/ru/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
