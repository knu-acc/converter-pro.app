import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePageView from '@/components/HomePageView';
import { isLocale, localeInfo, locales, type Locale } from '@/lib/i18n';
import { getLocaleAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };

  return {
    title: localeInfo[locale].siteTitle,
    description: localeInfo[locale].siteTitle + ' — ' + (locale === 'ru' ? 'конвертер единиц' : locale === 'kk' ? 'өлшем конвертері' : 'unit converter'),
    alternates: getLocaleAlternates(locale, '/'),
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <HomePageView locale={locale as Locale} />;
}
