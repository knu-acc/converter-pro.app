import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calculator, FileText, Table2 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/site';
import { formatNumericValue } from '@/lib/programmatic-seo';
import { getRootAlternates } from '@/lib/seo';
import { getSearchArticle, getSearchArticleContent, getSearchArticles, intentMeta } from '@/lib/search-articles';

export function generateStaticParams() {
  return getSearchArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getSearchArticle(slug);

  if (!article) {
    return { title: 'Статья не найдена' };
  }

  return {
    title: article.title,
    description: article.intent,
    alternates: getRootAlternates(`/articles/${article.slug}`),
    openGraph: {
      title: article.title,
      description: article.intent,
      type: 'article',
      url: absoluteUrl(`/articles/${article.slug}`),
      locale: 'ru',
    },
  };
}

export default async function SearchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getSearchArticleContent(slug);

  if (!content) {
    notFound();
  }

  const { article, page, examples, relatedPairs, relatedArticles } = content;
  const meta = intentMeta[article.intentType];
  const faq = [
    {
      question: `Как быстро считать ${page.fromCode} в ${page.toCode}?`,
      answer: `Используйте отдельную посадочную страницу и таблицу ниже: она помогает быстро получить типовые значения и перейти к калькулятору.`,
    },
    {
      question: `Чем эта статья отличается от обычной страницы конвертера?`,
      answer: 'Здесь больше контента под поисковый интент: расширенная таблица, объяснение сценариев использования и дополнительная перелинковка.',
    },
  ];
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.intent,
      mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    },
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
          name: 'Статьи',
          item: absoluteUrl('/articles'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: absoluteUrl(`/articles/${article.slug}`),
        },
      ],
    },
  ];

  return (
    <article className="space-y-10 py-8">
      <JsonLd data={schema} />

      <header className="rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--primary-container)] px-6 py-10 shadow-lg sm:px-8">
        <div className="max-w-4xl space-y-5">
          <div className="flex flex-wrap gap-3 text-sm font-medium text-[var(--on-primary-container)]">
            <Link href="/articles" className="hover:underline">← Ко всем статьям</Link>
            <span>•</span>
            <Link href={`/articles/intent/${article.intentType}`} className="hover:underline">{meta.title}</Link>
          </div>
          <span className="inline-flex rounded-full border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            {article.query} • {meta.label}
          </span>
          <h1 className="md3-display-medium text-[var(--on-primary-container)]">{article.title}</h1>
          <p className="max-w-3xl text-lg text-[var(--on-primary-container)]/90">{article.intent}</p>
          <div className="grid gap-4 pt-2 sm:grid-cols-3">
            {[
              { icon: Table2, label: `${examples.length} значений`, value: 'в таблице' },
              { icon: Calculator, label: page.title, value: 'точечный калькулятор' },
              { icon: FileText, label: relatedArticles.length, value: 'связанных статей' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={`${label}-${value}`} className="rounded-2xl border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4 text-[var(--on-surface)]">
                <Icon className="h-5 w-5 text-[var(--primary)]" />
                <div className="mt-3 text-sm text-[var(--on-surface-variant)]">{value}</div>
                <div className="font-medium text-[var(--on-surface)]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <article className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
          <h2 className="md3-title-large text-[var(--on-surface)]">Когда эта конвертация нужна чаще всего</h2>
          <p className="mt-4 leading-8 text-[var(--on-surface)]">
            Запрос «{page.fromName.toLowerCase()} в {page.toName.toLowerCase()}» обычно приходит от пользователей с чётким намерением: быстро сравнить показатели, проверить инструкцию, перевести данные из документации или оценить бытовой параметр. Поэтому отдельная статья усиливает полезность страницы и закрывает интент глубже обычного калькулятора.
          </p>
          <p className="mt-4 leading-8 text-[var(--on-surface)]">
            Этот материал относится к кластеру «{meta.label.toLowerCase()}» и помогает закрыть отдельный тип поискового интента: объяснение, готовые значения или формульный сценарий.
          </p>
        </article>

        <aside className="md3-card md3-card-tonal p-8">
          <h2 className="md3-title-large text-[var(--on-secondary-container)]">Полезные переходы</h2>
          <div className="mt-5 space-y-3">
            <Link href={`/${article.unit}/${article.pair}`} className="block rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:bg-[var(--card-bg-hover)]">
              Открыть страницу {page.fromCode} → {page.toCode}
            </Link>
            <Link href={`/${article.unit}`} className="block rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:bg-[var(--card-bg-hover)]">
              Перейти в категорию {article.unit}
            </Link>
            <Link href={`/articles/category/${article.unit}`} className="block rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:bg-[var(--card-bg-hover)]">
              Открыть хаб статей категории
            </Link>
          </div>
          <div className="mt-6 rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-5 text-sm leading-7 text-[var(--on-surface)]">
            Быстрый маршрут: статья → таблица → калькулятор → соседние пары. Это даёт пользователю короткий путь к ответу без блуждания по сайту.
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <article className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
          <h2 className="md3-title-large text-[var(--on-surface)]">Как быстро проверить результат</h2>
          <div className="mt-4 grid gap-4">
            {[
              `Сравните несколько типовых значений: 1 ${page.from.symbol}, 10 ${page.from.symbol}, 100 ${page.from.symbol}.`,
              `Сверьте результат с привычными единицами, если переходите из инструкции, таблицы или манометра.`,
              `Если нужен расчёт под свой ввод, переходите на лендинг ${page.fromCode} → ${page.toCode} и используйте калькулятор.`,
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4 text-sm leading-7 text-[var(--on-surface)]">{item}</div>
            ))}
          </div>
        </article>
        <article className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
          <h2 className="md3-title-large text-[var(--on-surface)]">Что делать дальше</h2>
          <div className="mt-4 grid gap-3">
            {[
              { href: `/${article.unit}/${article.pair}`, text: `Открыть калькулятор ${page.fromCode} → ${page.toCode}` },
              { href: `/articles/intent/${article.intentType}`, text: `Посмотреть ещё материалы с интентом «${meta.label}»` },
              { href: `/articles/category/${article.unit}`, text: `Открыть весь кластер категории ${article.unit}` },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]">
                <span>{item.text}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">Таблица популярных значений</h2>
        <div className="overflow-hidden rounded-[32px] border border-[var(--outline-variant)] bg-[var(--surface-container)] shadow-sm">
          <div className="grid grid-cols-2 border-b border-[var(--outline-variant)] bg-[var(--card-bg)] px-6 py-4 text-sm font-medium uppercase tracking-wide text-[var(--on-surface)]">
            <div>{page.fromName}</div>
            <div>{page.toName}</div>
          </div>
          {examples.map((item) => (
            <div key={item.value} className="grid grid-cols-2 border-b border-[var(--outline-variant)] bg-[var(--surface-container)] px-6 py-4 text-[var(--on-surface)] last:border-none">
              <div>{formatNumericValue(item.value)} {page.from.symbol}</div>
              <div className="font-medium text-[var(--on-surface)]">{formatNumericValue(item.result)} {page.to.symbol}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="md3-headline-small text-[var(--on-surface)]">FAQ</h2>
        <div className="grid gap-4">
          {faq.map((item) => (
            <article key={item.question} className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6">
              <h3 className="md3-title-medium text-[var(--on-surface)]">{item.question}</h3>
              <p className="mt-3 text-[var(--on-surface)]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">Похожие запросы</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedPairs.map((item) => (
            <Link
              key={item.pair}
              href={`/${article.unit}/${item.pair}`}
              className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]"
            >
              <div className="font-medium">{item.title}</div>
              <div className="mt-1 text-sm opacity-90">{item.fromCode} → {item.toCode}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">Похожие статьи</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((item) => (
            <Link
              key={item.slug}
              href={`/articles/${item.slug}`}
              className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]"
            >
              <div className="text-sm text-[var(--primary)]">{intentMeta[item.intentType].label}</div>
              <div className="mt-1 font-medium">{item.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
