import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Converter from '@/components/Converter';
import { units, type UnitType } from '@/lib/conversions';
import { calculatePairExamples, formatNumericValue, getAllPairPages, getPairPage, getRelatedPairPages } from '@/lib/programmatic-seo';
import { getLocalePath, getLocalizedPairCopy, getLocalizedUnit, getLocalizedUnitOptionName, isLocale, locales, localeUi } from '@/lib/i18n';
import { getLocaleAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllPairPages().map((page) => ({ locale, unit: page.unit, pair: page.pair })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; unit: string; pair: string }> }): Promise<Metadata> {
  const { locale, unit, pair } = await params;
  if (!isLocale(locale) || !units[unit as UnitType]) return { title: 'Not found' };
  const page = getPairPage(unit as UnitType, pair);
  if (!page) return { title: 'Not found' };
  const copy = getLocalizedPairCopy(locale, page, unit as UnitType);

  return {
    title: copy.title,
    description: copy.description,
    alternates: getLocaleAlternates(locale, `/${unit}/${pair}`),
  };
}

export default async function LocalePairPage({ params }: { params: Promise<{ locale: string; unit: string; pair: string }> }) {
  const { locale, unit, pair } = await params;
  if (!isLocale(locale) || !units[unit as UnitType]) notFound();
  const typedUnit = unit as UnitType;
  const page = getPairPage(typedUnit, pair);
  if (!page) notFound();

  const localizedUnit = getLocalizedUnit(locale, typedUnit);
  const copy = getLocalizedPairCopy(locale, page, typedUnit);
  const examples = calculatePairExamples(typedUnit, page.from, page.to, typedUnit === 'temperature' ? [0, 10, 20, 37, 50, 100, 150, 273.15] : [1, 2, 3, 5, 10, 20, 25, 50, 100, 250, 500, 1000]);
  const related = getRelatedPairPages(typedUnit, page.pair, 24);

  return (
    <div className="w-full min-w-0 space-y-10 py-10">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 text-sm text-[var(--on-surface-variant)]">
        <Link href={getLocalePath(locale)} className="hover:text-[var(--primary)]">{locale.toUpperCase()}</Link>
        <span>/</span>
        <Link href={getLocalePath(locale, `/${typedUnit}`)} className="hover:text-[var(--primary)]">{localizedUnit.title}</Link>
        <span>/</span>
        <span className="text-[var(--on-surface)]">{copy.heading}</span>
      </nav>

      <section className="mx-auto max-w-6xl space-y-5">
        <div className="max-w-4xl space-y-4">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            {locale === 'en' ? 'Focused converter' : locale === 'kk' ? 'Нақты сұраныс беті' : 'Готовая страница под запрос'}
          </span>
          <h1 className="md3-display-small text-[var(--on-surface)]">{copy.heading}</h1>
          <p className="text-lg text-[var(--on-surface)]">{copy.description}</p>
        </div>
      </section>

      <Converter type={typedUnit} title={copy.title} description={copy.description} locale={locale} defaultFrom={page.from.value} defaultTo={page.to.value} defaultAmount={typedUnit === 'pressure' ? 2 : 1} />

      <section className="mx-auto max-w-6xl space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{localeUi[locale].valueTable}</h2>
        <div className="overflow-hidden rounded-[32px] border border-[var(--outline-variant)] bg-[var(--surface-container)] shadow-sm">
          <div className="grid grid-cols-2 border-b border-[var(--outline-variant)] bg-[var(--card-bg)] px-6 py-4 text-sm font-medium uppercase tracking-wide text-[var(--on-surface)]">
            <div>{getLocalizedUnitOptionName(locale, typedUnit, page.from)}</div>
            <div>{getLocalizedUnitOptionName(locale, typedUnit, page.to)}</div>
          </div>
          {examples.map((item) => (
            <div key={item.value} className="grid grid-cols-2 border-b border-[var(--outline-variant)] bg-[var(--surface-container)] px-6 py-4 text-[var(--on-surface)] last:border-none">
              <div>{formatNumericValue(item.value)} {page.from.symbol}</div>
              <div className="font-medium">{formatNumericValue(item.result)} {page.to.symbol}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{localeUi[locale].relatedQueries}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {related.map((item) => {
            const fromName = getLocalizedUnitOptionName(locale, typedUnit, item.from);
            const toName = getLocalizedUnitOptionName(locale, typedUnit, item.to);
            return (
              <Link key={item.pair} href={getLocalePath(locale, `/${typedUnit}/${item.pair}`)} className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-3 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)] hover:text-[var(--on-surface)]">
                <div className="font-medium">{fromName} → {toName}</div>
                <div className="mt-1 text-sm opacity-90">{item.fromCode} → {item.toCode}</div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
