import type { Metadata } from 'next';
import Link from 'next/link';
import { getRootAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'О проекте | Converter Pro',
  description: 'О сервисе Converter Pro: зачем он создан, для кого подходит и какие сценарии закрывает.',
  alternates: getRootAlternates('/about'),
};

const principles = [
  'Быстрый доступ к популярным конвертациям без регистрации.',
  'Понятная структура и удобная навигация без лишнего шума.',
  'Чистый интерфейс, удобный на мобильных и десктопе.',
  'Справочные материалы и быстрые переходы к популярным парам единиц.',
];

export default function AboutPage() {
  return (
    <div className="space-y-10 py-8">
      <section className="md3-card md3-card-elevated px-6 py-10 sm:px-8">
        <div className="max-w-4xl space-y-5">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">О продукте</span>
          <h1 className="md3-display-medium text-[var(--on-surface)]">О проекте Converter Pro</h1>
          <p className="max-w-3xl text-lg text-[var(--on-surface-variant)]">
          Converter Pro создан как быстрый и удобный онлайн-конвертер величин. Сервис объединяет понятный интерфейс, практическую пользу и полезные материалы.
        </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <article className="md3-card p-8">
          <h2 className="md3-headline-small text-[var(--on-surface)]">Что уже умеет сервис</h2>
          <p className="mt-4 text-[var(--on-surface-variant)]">
            Проект покрывает десять ключевых категорий конвертации, популярные пары единиц, FAQ-блоки, справочные статьи и быстрые переходы к нужным разделам.
          </p>
          <p className="mt-4 text-[var(--on-surface-variant)]">
            Это делает сайт полезным не только как инструмент, но и как удобную справочную площадку для повседневных и рабочих задач.
          </p>
        </article>

        <aside className="md3-card md3-card-outlined p-8">
          <h2 className="md3-headline-small text-[var(--on-surface)]">Принципы</h2>
          <ul className="mt-4 space-y-3 text-[var(--on-surface-variant)]">
            {principles.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <Link href="/konvertery" className="md3-button md3-button-outlined justify-start">Перейти к конвертерам</Link>
            <Link href="/guides" className="md3-button md3-button-outlined justify-start">Открыть гайды</Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
