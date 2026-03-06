import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPairPages } from '@/lib/programmatic-seo';
import { unitContent, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Все конвертеры | Converter Pro',
  description: 'Полный каталог конвертеров Converter Pro: давление, вес, длина, площадь, объём, температура, скорость, время, данные и энергия.',
  alternates: {
    canonical: absoluteUrl('/konvertery'),
  },
};

export default function ConvertersPage() {
  const items = Object.entries(unitContent);
  const pairPages = getAllPairPages().slice(0, 24);

  return (
    <div className="space-y-10 py-8">
      <section className="md3-card md3-card-elevated mx-auto max-w-3xl space-y-4 px-6 py-8 text-center sm:px-8">
        <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
          Каталог страниц
        </span>
        <h1 className="md3-display-medium text-[var(--on-surface)]">Все конвертеры в одном месте</h1>
        <p className="text-lg text-[var(--on-surface-variant)]">
          Выберите нужную категорию и переходите к быстрой конвертации. На страницах есть FAQ, связанные материалы и готовые примеры.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([slug, item]) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="md3-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">{item.navLabel}</div>
              <h2 className="text-2xl font-bold text-[var(--on-surface)]">{item.title}</h2>
              <p className="text-[var(--on-surface-variant)]">{item.shortDescription}</p>
              <ul className="space-y-2 text-sm text-[var(--on-surface-variant)]">
                {item.examples.slice(0, 3).map((example) => (
                  <li key={example}>• {example}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-3xl font-bold text-[var(--on-surface)]">Популярные парные лендинги</h2>
          <p className="mt-2 text-[var(--on-surface-variant)]">
            Ниже — часть автоматически собранных страниц под популярные пары единиц.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pairPages.map((item) => (
            <Link
              key={`${item.unit}-${item.pair}`}
              href={`/${item.unit}/${item.pair}`}
              className="md3-card-outlined rounded-[28px] px-4 py-3 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="font-semibold">{item.title}</div>
              <div className="mt-1 text-sm text-[var(--on-surface-variant)]">/{item.unit}/{item.pair}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
