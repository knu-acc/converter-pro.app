import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { type UnitType, units } from '@/lib/conversions';
import { getUnitPairs } from '@/lib/programmatic-seo';
import { absoluteUrl, unitContent } from '@/lib/site';
import { getRootAlternates } from '@/lib/seo';
import { getSearchArticlesByUnit } from '@/lib/search-articles';

export function generateStaticParams() {
  return (Object.keys(units) as UnitType[]).map((unit) => ({ unit }));
}

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const { unit } = await params;
  if (!units[unit as UnitType]) return { title: 'Страница не найдена' };

  return {
    title: `Статьи: ${unitContent[unit as UnitType].title}`,
    description: `Подборка статей по теме «${unitContent[unit as UnitType].title.toLowerCase()}» с частыми запросами, таблицами и связанными материалами.`,
    alternates: getRootAlternates(`/articles/category/${unit}`),
  };
}

export default async function UnitArticleHubPage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;
  if (!units[unit as UnitType]) notFound();

  const typedUnit = unit as UnitType;
  const articles = getSearchArticlesByUnit(typedUnit);
  const pairLinks = getUnitPairs(typedUnit).slice(0, 36);

  return (
    <div className="space-y-10 py-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Статьи: ${unitContent[typedUnit].title}`,
          url: absoluteUrl(`/articles/category/${typedUnit}`),
        }}
      />

      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] px-6 py-8 sm:px-8">
        <div className="max-w-4xl space-y-4">
          <Link href="/articles" className="text-sm font-medium text-[var(--primary)] hover:opacity-80">
            ← Ко всем статьям
          </Link>
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            Кластер категории
          </span>
          <h1 className="md3-display-small text-[var(--on-surface)]">{unitContent[typedUnit].title}: статьи и запросы</h1>
          <p className="text-lg text-[var(--on-surface)]">
            Подборка материалов по категории. Здесь собраны частые статьи, точечные страницы и популярные пары конвертации.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="text-sm font-medium text-[var(--primary)]">{article.query}</div>
              <h2 className="text-2xl font-bold text-[var(--on-surface)]">{article.title}</h2>
              <p className="text-[var(--on-surface)]">{article.intent}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                Читать материал
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">Ещё больше запросов</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pairLinks.map((pair) => (
            <Link
              key={pair.pair}
              href={`/${typedUnit}/${pair.pair}`}
              className="rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]"
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