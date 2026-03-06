import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { type UnitType, units } from '@/lib/conversions';
import { getLocalePath, getLocalizedUnit, isLocale, locales, localeUi } from '@/lib/i18n';
import { getUnitPairs } from '@/lib/programmatic-seo';
import { getLocaleAlternates } from '@/lib/seo';
import { getSearchArticlesByUnit } from '@/lib/search-articles';

export function generateStaticParams() {
  return locales.flatMap((locale) => (Object.keys(units) as UnitType[]).map((unit) => ({ locale, unit })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; unit: string }> }): Promise<Metadata> {
  const { locale, unit } = await params;
  if (!isLocale(locale) || !units[unit as UnitType]) return { title: 'Not found' };
  const content = getLocalizedUnit(locale, unit as UnitType);

  return {
    title: `${localeUi[locale].articles}: ${content.title}`,
    description: content.shortDescription,
    alternates: getLocaleAlternates(locale, `/articles/category/${unit}`),
  };
}

export default async function LocalizedUnitArticleHubPage({ params }: { params: Promise<{ locale: string; unit: string }> }) {
  const { locale, unit } = await params;
  if (!isLocale(locale) || !units[unit as UnitType]) notFound();

  const typedUnit = unit as UnitType;
  const articles = getSearchArticlesByUnit(typedUnit);
  const pairs = getUnitPairs(typedUnit).slice(0, 24);
  const content = getLocalizedUnit(locale, typedUnit);

  return (
    <div className="space-y-10 py-8">
      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] px-6 py-8 sm:px-8">
        <div className="max-w-4xl space-y-4">
          <Link href={getLocalePath(locale, '/articles')} className="text-sm font-medium text-[var(--primary)] hover:opacity-80">
            ← {localeUi[locale].articles}
          </Link>
          <h1 className="md3-display-small text-[var(--on-surface)]">{content.title}</h1>
          <p className="text-lg text-[var(--on-surface)]">{content.shortDescription}</p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={getLocalePath(locale, `/articles/${article.slug}`)}
            className="group md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="text-sm font-medium text-[var(--primary)]">{article.query}</div>
              <h2 className="md3-title-large text-[var(--on-surface)] transition group-hover:text-[var(--primary)]">{article.title}</h2>
              <p className="text-[var(--on-surface)]">{article.intent}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">{locale === 'en' ? 'Open article' : locale === 'kk' ? 'Мақаланы ашу' : 'Читать материал'} <ArrowRight className="h-4 w-4" /></div>
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{localeUi[locale].relatedQueries}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pairs.map((pair) => (
            <Link
              key={pair.pair}
              href={getLocalePath(locale, `/${typedUnit}/${pair.pair}`)}
              className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]"
            >
              <div className="font-semibold">{pair.title}</div>
              <div className="mt-1 text-sm opacity-90">{pair.fromCode} → {pair.toCode}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}