import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, guideArticles, siteConfig } from '@/lib/site';
import { getRootAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return guideArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = guideArticles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: 'Статья не найдена | Converter Pro',
    };
  }

  return {
    title: `${article.title} | Converter Pro`,
    description: article.description,
    alternates: getRootAlternates(`/guides/${article.slug}`),
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: absoluteUrl(`/guides/${article.slug}`),
      locale: 'ru',
    },
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = guideArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    mainEntityOfPage: absoluteUrl(`/guides/${article.slug}`),
  };
  const guideLinks = guideArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <article className="space-y-10 py-8">
      <JsonLd data={schema} />
      <header className="rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--primary-container)] px-6 py-10 shadow-lg sm:px-8">
        <div className="max-w-4xl space-y-5">
          <Link href="/guides" className="text-sm font-medium text-[var(--primary)] hover:text-[var(--on-primary-container)]">
            ← Ко всем гайдам
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--on-primary-container)]">
            <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" />{article.category}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" />{article.readTime}</span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>
          <h1 className="md3-display-medium text-[var(--on-primary-container)]">{article.title}</h1>
          <p className="max-w-3xl text-lg text-[var(--on-primary-container)]/90">{article.description}</p>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <article className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
          <h2 className="md3-title-large text-[var(--on-surface)]">Что вы получите из этого гайда</h2>
          <div className="mt-5 grid gap-4">
            {[
              'Короткое практическое объяснение без перегруза формулами и лишней теорией.',
              'Контекст, где конкретная конвертация реально используется в быту, поездках, технике или работе.',
              'Быстрые переходы к смежным материалам и калькуляторам, чтобы не уходить назад в поиск.',
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4 text-sm leading-7 text-[var(--on-surface)]">{item}</div>
            ))}
          </div>
        </article>
        <aside className="md3-card md3-card-tonal p-8">
          <h2 className="md3-title-large text-[var(--on-secondary-container)]">Читайте дальше</h2>
          <div className="mt-5 grid gap-3">
            {guideLinks.map((item) => (
              <Link key={item.slug} href={`/guides/${item.slug}`} className="flex items-center justify-between rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]">
                <span>{item.title}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
            <Link href="/konvertery" className="flex items-center justify-between rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]">
              <span>Перейти ко всем конвертерам</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </section>

      <div className="grid gap-6">
        {article.sections.map((section) => (
          <section key={section.title} className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
            <h2 className="md3-title-large text-[var(--on-surface)]">{section.title}</h2>
            <p className="mt-4 leading-8 text-[var(--on-surface)]">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
        <h2 className="md3-headline-small text-[var(--on-surface)]">Короткий вывод</h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--on-surface)]">
          Этот материал дополняет калькулятор: сначала даёт контекст и объяснение, а затем помогает быстрее перейти к точному расчёту или смежной теме. Так страницы гайдов остаются полезной частью продукта, а не декоративным довеском.
        </p>
      </section>
    </article>
  );
}
