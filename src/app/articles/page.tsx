import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, FolderKanban, Search } from 'lucide-react';
import { units, type UnitType } from '@/lib/conversions';
import { getRootAlternates } from '@/lib/seo';
import { articleIntentTypes, getSearchArticles, intentMeta } from '@/lib/search-articles';

export const metadata: Metadata = {
  title: 'Статьи | Converter Pro',
  description: 'Подборка статей о популярных конвертациях: пояснения, таблицы значений и связанные материалы.',
  alternates: getRootAlternates('/articles'),
};

export default function ArticlesPage() {
  const articles = getSearchArticles();
  const unitsList = Object.keys(units) as UnitType[];
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="space-y-12 py-8">
      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] px-6 py-10 sm:px-8">
        <div className="max-w-4xl space-y-5">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            Полезные статьи
          </span>
          <h1 className="md3-display-medium text-[var(--on-surface)]">Статьи по популярным конвертациям</h1>
          <p className="max-w-3xl text-lg text-[var(--on-surface)]">
            Здесь собраны материалы по частым запросам вроде «kg в lb», «bar в psi» или «°C в °F». Внутри — пояснения, большие таблицы значений и переходы к связанным расчётам.
          </p>
          <div className="grid gap-4 pt-3 sm:grid-cols-3">
            {[
              { label: `${articles.length}+`, value: 'материалов под запросы' },
              { label: `${articleIntentTypes.length}`, value: 'интент-хабов' },
              { label: `${unitsList.length}`, value: 'категорий конвертации' },
            ].map((item) => (
              <div key={item.value} className="rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4">
                <div className="text-2xl font-extrabold text-[var(--on-surface)]">{item.label}</div>
                <div className="text-sm text-[var(--on-surface)]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {featuredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="inline-flex rounded-full bg-[var(--secondary-container)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--on-secondary-container)]">
              Featured
            </div>
            <h2 className="mt-4 text-2xl font-bold text-[var(--on-surface)] transition group-hover:text-[var(--primary)]">{article.title}</h2>
            <p className="mt-3 text-sm text-[var(--on-surface)]">{article.intent}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
              Читать материал
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="text-sm font-medium text-[var(--primary)]">{article.query}</div>
              <h2 className="text-2xl font-bold text-[var(--on-surface)]">{article.title}</h2>
              <p className="text-[var(--on-surface)]">{article.intent}</p>
              <div className="pt-2 text-sm font-semibold text-[var(--on-surface)]">Категория: {article.unit}</div>
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-3xl font-bold text-[var(--on-surface)]">Хабы по интенту</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {articleIntentTypes.map((intentType) => (
            <Link
              key={intentType}
              href={`/articles/intent/${intentType}`}
              className="md3-card-outlined rounded-[28px] p-5 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="font-semibold">{intentMeta[intentType].title}</div>
              <div className="mt-2 text-sm text-[var(--on-surface)]">{intentMeta[intentType].description}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <FolderKanban className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-3xl font-bold text-[var(--on-surface)]">Хабы по категориям</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {unitsList.map((unit) => (
            <Link
              key={unit}
              href={`/articles/category/${unit}`}
              className="md3-card-outlined rounded-[28px] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="font-semibold">{unit}</div>
              <div className="mt-1 text-sm text-[var(--on-surface)]">Подборка материалов</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="md3-headline-small text-[var(--on-surface)]">Как использовать этот раздел</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            'Ищете конкретную пару: открывайте точечную статью и сразу переходите к таблице и калькулятору.',
            'Нужны группы запросов: используйте intent-хабы, чтобы быстро найти материалы одного типа.',
            'Работаете с одной категорией: переходите в подборку по категории и собирайте релевантные страницы в одном месте.',
          ].map((item) => (
            <div key={item} className="rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4 text-sm leading-7 text-[var(--on-surface)]">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
