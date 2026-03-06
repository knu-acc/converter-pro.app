import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { units, type UnitType } from '@/lib/conversions';
import { getAllPairPages } from '@/lib/programmatic-seo';
import { getLocaleAlternates } from '@/lib/seo';
import { getLocalizedUnit, getLocalePath, isLocale, locales, localeUi } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };

  return {
    title: `${localeUi[locale].converters} | Converter Pro`,
    description: localeUi[locale].heroDescription,
    alternates: getLocaleAlternates(locale, '/konvertery'),
  };
}

export default async function LocaleConvertersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const unitKeys = Object.keys(units) as UnitType[];
  const pairPages = getAllPairPages().slice(0, 24);

  return (
    <div className="space-y-12 py-8">
      <section className="mx-auto max-w-3xl space-y-4 text-center">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
          {localeUi[locale].convertersBadge}
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{localeUi[locale].converters}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{localeUi[locale].heroDescription}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {unitKeys.map((unit) => {
          const item = getLocalizedUnit(locale, unit);
          return (
            <Link
              key={unit}
              href={getLocalePath(locale, `/${unit}`)}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="space-y-3">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{item.navLabel}</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{item.shortDescription}</p>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{localeUi[locale].popularPairs}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{localeUi[locale].popularPairsDesc}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pairPages.map((item) => (
            <Link
              key={`${item.unit}-${item.pair}`}
              href={getLocalePath(locale, `/${item.unit}/${item.pair}`)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-800"
            >
              <div className="font-semibold">{item.title}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">/{item.unit}/{item.pair}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
