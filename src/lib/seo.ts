import type { Locale } from '@/lib/i18n';
import { absoluteUrl, siteConfig } from '@/lib/site';

const languageMap = {
  'ru-KZ': '',
  'kk-KZ': '/lang/kk',
  en: '/lang/en',
  'x-default': '',
} as const;

function normalizePath(path = '/') {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function joinPath(prefix: string, path: string) {
  if (path === '/') return prefix || '/';
  return `${prefix}${path}`;
}

export function getRootAlternates(path = '/') {
  const normalizedPath = normalizePath(path);

  return {
    canonical: absoluteUrl(normalizedPath),
    languages: Object.fromEntries(
      Object.entries(languageMap).map(([language, prefix]) => [language, absoluteUrl(joinPath(prefix, normalizedPath))])
    ),
  };
}

export function getLocaleAlternates(locale: Locale, path = '/') {
  const normalizedPath = normalizePath(path);
  const canonicalPath = locale === 'ru' ? normalizedPath : joinPath(`/lang/${locale}`, normalizedPath);

  return {
    canonical: absoluteUrl(canonicalPath),
    languages: getRootAlternates(normalizedPath).languages,
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl('/favicon.ico'),
    areaServed: {
      '@type': 'Country',
      name: 'Kazakhstan',
    },
    availableLanguage: ['ru-KZ', 'kk-KZ', 'en'],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: ['ru-KZ', 'kk-KZ', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/articles/intent/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function getWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    url: siteConfig.url,
    inLanguage: ['ru-KZ', 'kk-KZ', 'en'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KZT',
    },
  };
}
