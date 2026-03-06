import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { guideArticles, absoluteUrl } from '@/lib/site';
import { getLocalizedGuide, getLocalePath, isLocale, locales } from '@/lib/i18n';
import { getLocaleAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return locales.flatMap((locale) => guideArticles.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };
  const article = getLocalizedGuide(locale, slug);
  if (!article) return { title: 'Not found' };

  return {
    title: `${article.title} | Converter Pro`,
    description: article.description,
    alternates: getLocaleAlternates(locale, `/guides/${slug}`),
  };
}

export default async function LocaleGuideDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getLocalizedGuide(locale, slug);
  if (!article) notFound();
  const relatedGuides = guideArticles.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <article className="space-y-10 py-8">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        mainEntityOfPage: absoluteUrl(getLocalePath(locale, `/guides/${slug}`)),
      }} />
      <header className="rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--primary-container)] px-6 py-8 shadow-lg sm:px-8">
        <div className="max-w-3xl space-y-4">
          <Link href={getLocalePath(locale, '/guides')} className="text-sm font-medium text-[var(--primary)] hover:text-[var(--on-primary-container)]">
            ← {locale === 'en' ? 'Back to guides' : locale === 'kk' ? 'Нұсқаулықтарға оралу' : 'Ко всем гайдам'}
          </Link>
          <div className="text-sm text-[var(--on-primary-container)]">{article.category}</div>
          <h1 className="md3-display-medium text-[var(--on-primary-container)]">{article.title}</h1>
          <p className="text-lg text-[var(--on-primary-container)]/90">{article.description}</p>
        </div>
      </header>

      <div className="grid gap-6">
        {article.sections.map((section) => (
          <section key={section.title} className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
            <h2 className="md3-title-large text-[var(--on-surface)]">{section.title}</h2>
            <p className="mt-4 leading-8 text-[var(--on-surface)]">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-8">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{locale === 'en' ? 'More guides' : locale === 'kk' ? 'Тағы нұсқаулықтар' : 'Ещё гайды'}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {relatedGuides.map((item) => (
            <Link key={item.slug} href={getLocalePath(locale, `/guides/${item.slug}`)} className="flex items-center justify-between rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]">
              <span>{getLocalizedGuide(locale, item.slug)?.title ?? item.slug}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
