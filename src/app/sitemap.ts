import type { MetadataRoute } from 'next';
import { getAllPairPages } from '@/lib/programmatic-seo';
import { indexedLocales } from '@/lib/i18n';
import { articleIntentTypes, getSearchArticles } from '@/lib/search-articles';
import { absoluteUrl, guideArticles, unitContent } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/konvertery', '/guides', '/faq', '/about', '/contact', '/privacy', '/terms'];
  const now = new Date();
  const pairPages = getAllPairPages();
  const articles = getSearchArticles();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || '/'),
      lastModified: now,
      changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...Object.keys(unitContent).map((unit) => ({
      url: absoluteUrl(`/${unit}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...pairPages.map((page) => ({
      url: absoluteUrl(`/${page.unit}/${page.pair}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...articleIntentTypes.map((intent) => ({
      url: absoluteUrl(`/articles/intent/${intent}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.78,
    })),
    ...Object.keys(unitContent).map((unit) => ({
      url: absoluteUrl(`/articles/category/${unit}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.79,
    })),
    ...guideArticles.map((article) => ({
      url: absoluteUrl(`/guides/${article.slug}`),
      lastModified: article.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...indexedLocales.flatMap((locale) => [
      {
        url: absoluteUrl(`/lang/${locale}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: absoluteUrl(`/lang/${locale}/konvertery`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      },
      {
        url: absoluteUrl(`/lang/${locale}/guides`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      },
      {
        url: absoluteUrl(`/lang/${locale}/articles`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      },
      {
        url: absoluteUrl(`/lang/${locale}/about`),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: absoluteUrl(`/lang/${locale}/faq`),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: absoluteUrl(`/lang/${locale}/contact`),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.55,
      },
      {
        url: absoluteUrl(`/lang/${locale}/privacy`),
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.45,
      },
      {
        url: absoluteUrl(`/lang/${locale}/terms`),
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.45,
      },
      ...Object.keys(unitContent).map((unit) => ({
        url: absoluteUrl(`/lang/${locale}/${unit}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.74,
      })),
      ...Object.keys(unitContent).map((unit) => ({
        url: absoluteUrl(`/lang/${locale}/articles/category/${unit}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.73,
      })),
      ...pairPages.map((page) => ({
        url: absoluteUrl(`/lang/${locale}/${page.unit}/${page.pair}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.73,
      })),
      ...guideArticles.map((article) => ({
        url: absoluteUrl(`/lang/${locale}/guides/${article.slug}`),
        lastModified: article.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.72,
      })),
      ...articles.map((article) => ({
        url: absoluteUrl(`/lang/${locale}/articles/${article.slug}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.71,
      })),
      ...articleIntentTypes.map((intent) => ({
        url: absoluteUrl(`/lang/${locale}/articles/intent/${intent}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
    ]),
  ];
}
