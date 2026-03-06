import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Converter from '@/components/Converter';
import { units, type UnitType } from '@/lib/conversions';
import { getUnitPairs } from '@/lib/programmatic-seo';
import { getLocaleAlternates } from '@/lib/seo';
import { getLocalizedUnit, getLocalizedUnitOptionName, getLocalePath, isLocale, locales, localeUi } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.flatMap((locale) => Object.keys(units).map((unit) => ({ locale, unit })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; unit: string }> }): Promise<Metadata> {
  const { locale, unit } = await params;
  if (!isLocale(locale) || !units[unit as UnitType]) return { title: 'Not found' };
  const item = getLocalizedUnit(locale, unit as UnitType);

  return {
    title: `${item.title} | Converter Pro`,
    description: item.shortDescription,
    alternates: getLocaleAlternates(locale, `/${unit}`),
  };
}

export default async function LocaleUnitPage({ params }: { params: Promise<{ locale: string; unit: string }> }) {
  const { locale, unit } = await params;
  if (!isLocale(locale) || !units[unit as UnitType]) notFound();
  const typedUnit = unit as UnitType;
  const item = getLocalizedUnit(locale, typedUnit);
  const pairs = getUnitPairs(typedUnit).slice(0, 24);

  return (
    <div className="w-full min-w-0 space-y-10 py-10">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 text-sm text-[var(--on-surface-variant)]">
        <Link href={getLocalePath(locale)} className="hover:text-[var(--primary)]">{locale.toUpperCase()}</Link>
        <span>/</span>
        <Link href={getLocalePath(locale, '/konvertery')} className="hover:text-[var(--primary)]">{localeUi[locale].converters}</Link>
        <span>/</span>
        <span className="text-[var(--on-surface)]">{item.title}</span>
      </nav>

      <Converter type={typedUnit} title={item.title} description={item.shortDescription} locale={locale} />

      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <article className="md3-card md3-card-outlined md3-shape-panel p-8">
          <h2 className="md3-headline-small text-[var(--on-surface)]">{item.title}</h2>
          <p className="mt-4 text-[var(--on-surface)]">{item.shortDescription}</p>
        </article>
        <aside className="md3-card md3-card-outlined md3-shape-panel p-8">
          <h2 className="md3-headline-small text-[var(--on-surface)]">{localeUi[locale].relatedQueries}</h2>
          <div className="mt-5 space-y-3">
            {pairs.map((pair) => {
              const fromName = getLocalizedUnitOptionName(locale, typedUnit, pair.from);
              const toName = getLocalizedUnitOptionName(locale, typedUnit, pair.to);
              return (
                <Link key={pair.pair} href={getLocalePath(locale, `/${typedUnit}/${pair.pair}`)} className="md3-filled-tonal-surface md3-pressable block rounded-[28px] border border-[var(--outline-variant)] px-4 py-3 text-[var(--on-secondary-container)] transition hover:-translate-y-0.5 hover:shadow-sm">
                  {fromName} → {toName}
                </Link>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
}
