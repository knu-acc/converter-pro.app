import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock3 } from 'lucide-react';
import { guideArticles } from '@/lib/site';
import { getLocaleAlternates } from '@/lib/seo';
import { getLocalizedGuide, getLocalePath, isLocale, locales, localeUi } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };

  return {
    title: `${localeUi[locale].guides} | Converter Pro`,
    description: localeUi[locale].heroDescription,
    alternates: getLocaleAlternates(locale, '/guides'),
  };
}

export default async function LocaleGuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="space-y-10 py-8">
      <section className="rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--primary-container)] px-6 py-8 shadow-lg sm:px-8">
        <div className="max-w-3xl space-y-4">
          <h1 className="md3-display-medium text-[var(--on-primary-container)]">{localeUi[locale].guides}</h1>
          <p className="text-lg text-[var(--on-primary-container)]/90">{localeUi[locale].heroDescription}</p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {guideArticles.map((article) => {
          const localized = getLocalizedGuide(locale, article.slug);
          if (!localized) return null;

          return (
            <Link key={article.slug} href={getLocalePath(locale, `/guides/${article.slug}`)} className="group md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[var(--primary)]">
                  <span>{localized.category}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" />{article.readTime}</span>
                </div>
                <h2 className="md3-title-large text-[var(--on-surface)] transition group-hover:text-[var(--primary)]">{localized.title}</h2>
                <p className="text-[var(--on-surface)]">{localized.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                  {locale === 'en' ? 'Read guide' : locale === 'kk' ? 'Нұсқаулықты оқу' : 'Читать гайд'}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
