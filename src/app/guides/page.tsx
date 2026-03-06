import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3, Sparkles } from 'lucide-react';
import { guideArticles } from '@/lib/site';
import { getRootAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Гайды и статьи | Converter Pro',
  description: 'Справочные материалы Converter Pro: давление, длина, данные и температура.',
  alternates: getRootAlternates('/guides'),
};

export default function GuidesPage() {
  return (
    <div className="space-y-12 py-8">
      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] px-6 py-10 sm:px-8">
        <div className="max-w-4xl space-y-5">
          <span className="inline-flex rounded-full bg-[var(--tertiary-container)] px-4 py-1 text-sm font-medium text-[var(--on-tertiary-container)]">Практические материалы</span>
          <h1 className="md3-display-medium text-[var(--on-surface)]">Гайды, которые объясняют конвертацию без воды</h1>
          <p className="max-w-3xl text-lg text-[var(--on-surface)]">
          Эти материалы помогают быстрее разобраться в единицах измерения и дают практическую пользу помимо самого калькулятора.
        </p>
          <div className="grid gap-4 pt-2 sm:grid-cols-3">
            {[
              { label: `${guideArticles.length}`, value: 'опубликованных гайда' },
              { label: '4+', value: 'жизненных сценария использования' },
              { label: 'RU / KK / EN', value: 'локализованные версии' },
            ].map((item) => (
              <div key={item.value} className="rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4">
                <div className="text-2xl font-extrabold text-[var(--on-surface)]">{item.label}</div>
                <div className="text-sm text-[var(--on-surface-variant)]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {guideArticles.slice(0, 3).map((article) => (
          <Link key={article.slug} href={`/guides/${article.slug}`} className="group md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center gap-2 text-sm text-[var(--primary)]">
              <Sparkles className="h-4 w-4" />
              Featured guide
            </div>
            <h2 className="mt-4 text-2xl font-bold text-[var(--on-surface)] transition group-hover:text-[var(--primary)]">{article.title}</h2>
            <p className="mt-3 text-[var(--on-surface)]">{article.description}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
              Читать гайд
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {guideArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/guides/${article.slug}`}
            className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[var(--primary)]">
                <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" />{article.category}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" />{article.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-[var(--on-surface)]">{article.title}</h2>
              <p className="text-[var(--on-surface)]">{article.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
        <h2 className="md3-headline-small text-[var(--on-surface)]">Что дают эти гайды</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            'Объясняют, зачем нужна конкретная конвертация в реальной жизни, а не только показывают формулу.',
            'Удерживают пользователя внутри тематического кластера через связи со статьями и калькуляторами.',
            'Дают контентный слой для доверия, глубины сайта и возврата из поиска по информационным запросам.',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4 text-sm leading-7 text-[var(--on-surface)]">{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
