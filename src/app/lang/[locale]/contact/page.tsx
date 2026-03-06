import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StaticRichPage from '@/components/StaticRichPage';
import { getLocalePath, isLocale, locales } from '@/lib/i18n';
import { getLocaleAlternates } from '@/lib/seo';
import { localizedStaticContent } from '@/lib/localized-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };
  const content = localizedStaticContent[locale].contact;
  return {
    title: `${content.title} | Converter Pro`,
    description: content.description,
    alternates: getLocaleAlternates(locale, '/contact'),
  };
}

export default async function LocalizedContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = localizedStaticContent[locale].contact;
  return <StaticRichPage badge="Contact" title={content.title} description={content.description} paragraphs={content.body} links={[{ href: getLocalePath(locale, '/about'), label: 'About the project' }, { href: getLocalePath(locale, '/guides'), label: 'Open guides' }]} asideItems={content.body} />;
}
