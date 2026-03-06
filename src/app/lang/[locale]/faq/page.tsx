import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import FaqAccordion from '@/components/FaqAccordion';
import { isLocale, locales } from '@/lib/i18n';
import { getLocaleAlternates, getBreadcrumbSchema } from '@/lib/seo';
import { localizedStaticContent } from '@/lib/localized-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };
  const content = localizedStaticContent[locale].faq;
  return {
    title: `${content.title} | Converter Pro`,
    description: content.description,
    alternates: getLocaleAlternates(locale, '/faq'),
  };
}

export default async function LocalizedFaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = localizedStaticContent[locale].faq;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  const basePath = locale === 'ru' ? '' : `/lang/${locale}`;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === 'ru' ? 'Главная' : locale === 'kk' ? 'Басты бет' : 'Home', url: basePath || '/' },
    { name: content.title, url: `${basePath || ''}/faq` },
  ]);

  return (
    <div className="space-y-10 py-8">
      <JsonLd data={[faqSchema, breadcrumbSchema]} />
      <section className="md3-card md3-card-elevated px-6 py-8 sm:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">FAQ</span>
          <h1 className="md3-display-small text-[var(--on-surface)]">{content.title}</h1>
          <p className="text-lg text-[var(--on-surface-variant)]">{content.description}</p>
        </div>
      </section>

      <section>
        <FaqAccordion items={content.items} />
      </section>
    </div>
  );
}
