import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Converter from '@/components/Converter';
import JsonLd from '@/components/JsonLd';
import { units, type UnitType } from '@/lib/conversions';
import {
  calculatePairExamples,
  formatNumericValue,
  getAllPairPages,
  getPairPage,
  getRelatedPairPages,
} from '@/lib/programmatic-seo';
import { absoluteUrl, siteConfig, unitContent } from '@/lib/site';
import { getRootAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return getAllPairPages().map((page) => ({
    unit: page.unit,
    pair: page.pair,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ unit: string; pair: string }> }): Promise<Metadata> {
  const { unit, pair } = await params;

  if (!units[unit as UnitType]) {
    return { title: 'Страница не найдена' };
  }

  const page = getPairPage(unit as UnitType, pair);

  if (!page) {
    return { title: 'Страница не найдена' };
  }

  return {
    title: `${page.title} — онлайн конвертер`,
    description: page.description,
    keywords: [
      `${page.fromName.toLowerCase()} в ${page.toName.toLowerCase()}`,
      `${page.fromCode} в ${page.toCode}`,
      `${unitContent[page.unit].navLabel.toLowerCase()} онлайн`,
      ...unitContent[page.unit].keywords,
    ],
    alternates: getRootAlternates(`/${page.unit}/${page.pair}`),
    openGraph: {
      title: `${page.title} — онлайн конвертер`,
      description: page.description,
      url: absoluteUrl(`/${page.unit}/${page.pair}`),
      type: 'website',
      locale: 'ru_KZ',
      siteName: siteConfig.name,
    },
  };
}

export default async function PairLandingPage({ params }: { params: Promise<{ unit: string; pair: string }> }) {
  const { unit, pair } = await params;

  if (!units[unit as UnitType]) {
    notFound();
  }

  const typedUnit = unit as UnitType;
  const page = getPairPage(typedUnit, pair);

  if (!page) {
    notFound();
  }

  const examples = calculatePairExamples(typedUnit, page.from, page.to, page.examples);
  const relatedPages = getRelatedPairPages(typedUnit, page.pair, 18);
  const faq = [
    {
      question: `Как перевести ${page.fromName.toLowerCase()} в ${page.toName.toLowerCase()}?`,
      answer: `Откройте калькулятор ниже, введите значение в ${page.fromName.toLowerCase()} и сразу получите результат в ${page.toName.toLowerCase()}.`,
    },
    {
      question: `Подходит ли страница для запроса «${page.fromCode} в ${page.toCode}»?`,
      answer: `Да, это отдельный лендинг под конкретную пару конвертации: ${page.fromCode} → ${page.toCode}.`,
    },
    {
      question: 'Есть ли другие похожие страницы?',
      answer: `Да, внутри категории «${unitContent[typedUnit].navLabel}» доступны десятки дополнительных страниц под другие пары единиц.`,
    },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: unitContent[typedUnit].title,
          item: absoluteUrl(`/${typedUnit}`),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: page.title,
          item: absoluteUrl(`/${typedUnit}/${page.pair}`),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: absoluteUrl(`/${typedUnit}/${page.pair}`),
      inLanguage: 'ru-KZ',
    },
  ];

  return (
    <div className="space-y-10 py-10">
      <JsonLd data={schemas} />

      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 text-sm text-[var(--on-surface-variant)]">
        <Link href="/" className="hover:text-[var(--primary)]">Главная</Link>
        <span>/</span>
        <Link href={`/${typedUnit}`} className="hover:text-[var(--primary)]">{unitContent[typedUnit].title}</Link>
        <span>/</span>
        <span className="text-[var(--on-surface)]">{page.title}</span>
      </nav>

      <section className="mx-auto max-w-6xl space-y-5">
        <div className="max-w-4xl space-y-4">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            Готовая страница под точный запрос
          </span>
          <h1 className="md3-display-small text-[var(--on-surface)]">{page.title}</h1>
          <p className="text-lg text-[var(--on-surface-variant)]">{page.description}</p>
        </div>
      </section>

      <Converter
        type={typedUnit}
        title={`${page.fromName} в ${page.toName}`}
        description={`Быстрая конвертация ${page.fromName.toLowerCase()} → ${page.toName.toLowerCase()} в категории ${unitContent[typedUnit].navLabel.toLowerCase()}.`}
        defaultFrom={page.from.value}
        defaultTo={page.to.value}
        defaultAmount={typedUnit === 'pressure' ? 2 : 1}
      />

      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <article className="md3-card p-8">
          <h2 className="text-2xl font-bold text-[var(--on-surface)]">Популярные расчёты</h2>
          <p className="mt-3 text-[var(--on-surface-variant)]">
            Ниже собраны частые значения для запроса «{page.fromName.toLowerCase()} в {page.toName.toLowerCase()}». Это делает страницу полезнее и помогает быстро сориентироваться без лишних шагов.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {examples.map((item) => (
              <div key={item.value} className="rounded-[28px] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)]">
                <div className="text-sm text-[var(--on-surface-variant)]">Пример</div>
                <div className="mt-1 font-semibold">
                  {formatNumericValue(item.value)} {page.from.symbol} = {formatNumericValue(item.result)} {page.to.symbol}
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="md3-card md3-card-outlined p-8">
          <h2 className="text-2xl font-bold text-[var(--on-surface)]">Почему эта страница важна</h2>
          <ul className="mt-5 space-y-3 text-[var(--on-surface-variant)]">
            <li>• Быстро отвечает на конкретный запрос: «{page.fromCode} в {page.toCode}».</li>
            <li>• Содержит отдельный калькулятор с уже выбранной парой.</li>
            <li>• Даёт примеры значений, FAQ и внутренние ссылки на похожие страницы.</li>
            <li>• Помогает быстрее найти нужную пару внутри категории «{unitContent[typedUnit].navLabel}».</li>
          </ul>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl space-y-4">
        <h2 className="text-3xl font-bold text-[var(--on-surface)]">FAQ</h2>
        <div className="grid gap-4">
          {faq.map((item) => (
            <article key={item.question} className="md3-card p-6">
              <h3 className="text-xl font-bold text-[var(--on-surface)]">{item.question}</h3>
              <p className="mt-3 text-[var(--on-surface-variant)]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-5">
        <div>
          <h2 className="text-3xl font-bold text-[var(--on-surface)]">Похожие страницы</h2>
          <p className="mt-2 text-[var(--on-surface-variant)]">
            Внутри одной категории доступны десятки дополнительных страниц с готовыми парами единиц.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedPages.map((item) => (
            <Link
              key={item.pair}
              href={`/${typedUnit}/${item.pair}`}
              className="md3-card-outlined rounded-[28px] px-4 py-3 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="font-semibold">{item.title}</div>
              <div className="mt-1 text-sm text-[var(--on-surface-variant)]">{item.fromCode} → {item.toCode}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}