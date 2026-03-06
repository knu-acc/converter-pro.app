import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Search } from 'lucide-react';
import { units, type UnitType } from '@/lib/conversions';
import { getLocaleAlternates } from '@/lib/seo';
import { getLocalePath, getLocalizedUnit, isLocale, locales, localeUi } from '@/lib/i18n';
import { articleIntentTypes, getSearchArticles, intentMeta } from '@/lib/search-articles';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };

  return {
    title: `${localeUi[locale].articles} | Converter Pro`,
    description: localeUi[locale].heroDescription,
    alternates: getLocaleAlternates(locale, '/articles'),
  };
}

export default async function LocaleArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const articles = getSearchArticles();
  const unitsList = Object.keys(units) as UnitType[];

  return (
    <div className="space-y-10 py-8">
      <section className="rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--primary-container)] px-6 py-8 shadow-lg sm:px-8">
        <div className="max-w-3xl space-y-4">
          <h1 className="md3-display-medium text-[var(--on-primary-container)]">{localeUi[locale].articles}</h1>
          <p className="text-lg text-[var(--on-primary-container)]/90">{localeUi[locale].heroDescription}</p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={getLocalePath(locale, `/articles/${article.slug}`)} className="group md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="space-y-3">
              <div className="text-sm font-medium text-[var(--primary)]">{article.query}</div>
              <h2 className="md3-title-large text-[var(--on-surface)] transition group-hover:text-[var(--primary)]">{locale === 'en' ? `${article.query}: detailed guide and table` : locale === 'kk' ? `${article.query}: кеңейтілген кесте мен түсіндірме` : article.title}</h2>
              <p className="text-[var(--on-surface)]">{article.intent}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                {locale === 'en' ? 'Open article' : locale === 'kk' ? 'Мақаланы ашу' : 'Читать материал'}
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="md3-headline-small text-[var(--on-surface)]">{locale === 'en' ? 'Intent hubs' : locale === 'kk' ? 'Интент хабтары' : 'Хабы по интенту'}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {articleIntentTypes.map((intentType) => (
            <Link
              key={intentType}
              href={getLocalePath(locale, `/articles/intent/${intentType}`)}
              className="rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-5 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]"
            >
              <div className="font-semibold">{intentMeta[intentType].title}</div>
              <div className="mt-2 text-sm opacity-90">{intentMeta[intentType].description}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{localeUi[locale].articles}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {unitsList.map((unit) => (
            <Link
              key={unit}
              href={getLocalePath(locale, `/articles/category/${unit}`)}
              className="rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]"
            >
              <div className="font-semibold">{getLocalizedUnit(locale, unit).navLabel}</div>
              <div className="mt-1 text-sm opacity-90">{locale === 'en' ? 'Articles hub' : locale === 'kk' ? 'Мақалалар хабы' : 'Подборка статей'}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
