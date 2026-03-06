import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calculator, Table2 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/site';
import { formatNumericValue } from '@/lib/programmatic-seo';
import { getLocalePath, isLocale, locales, localeUi } from '@/lib/i18n';
import { getLocaleAlternates } from '@/lib/seo';
import { getSearchArticle, getSearchArticleContent, getSearchArticles, intentMeta } from '@/lib/search-articles';

export function generateStaticParams() {
  return locales.flatMap((locale) => getSearchArticles().map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };
  const article = getSearchArticle(slug);
  if (!article) return { title: 'Not found' };

  return {
    title: locale === 'en' ? `${article.query}: detailed guide` : locale === 'kk' ? `${article.query}: толық нұсқаулық` : article.title,
    description: article.intent,
    alternates: getLocaleAlternates(locale, `/articles/${slug}`),
  };
}

export default async function LocaleArticleDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSearchArticleContent(slug);
  if (!content) notFound();

  const { article, page, examples, relatedPairs, relatedArticles } = content;
  const meta = intentMeta[article.intentType];
  const title = locale === 'en' ? `${article.query}: detailed guide and table` : locale === 'kk' ? `${article.query}: кеңейтілген кесте мен түсіндірме` : article.title;

  return (
    <article className="space-y-10 py-8">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: article.intent,
        mainEntityOfPage: absoluteUrl(getLocalePath(locale, `/articles/${slug}`)),
      }} />
      <header className="rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--primary-container)] px-6 py-8 shadow-lg sm:px-8">
        <div className="max-w-4xl space-y-4">
          <Link href={getLocalePath(locale, '/articles')} className="text-sm font-medium text-[var(--primary)] hover:text-[var(--on-primary-container)]">
            ← {localeUi[locale].articles}
          </Link>
          <span className="inline-flex rounded-full border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            {article.query} • {meta.label}
          </span>
          <h1 className="md3-display-medium text-[var(--on-primary-container)]">{title}</h1>
          <p className="text-lg text-[var(--on-primary-container)]/90">{article.intent}</p>
          <div className="grid gap-4 pt-2 sm:grid-cols-3">
            {[
              { icon: Table2, label: `${examples.length} rows` },
              { icon: Calculator, label: 'Focused calculator' },
              { icon: ArrowRight, label: `${relatedArticles.length} related articles` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4 text-sm font-medium text-[var(--on-surface)]">
                <Icon className="h-4 w-4 text-[var(--primary)]" />
                <div className="mt-3">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{localeUi[locale].valueTable}</h2>
        <div className="overflow-hidden rounded-3xl border border-[var(--outline-variant)] bg-[var(--surface-container)] shadow-sm">
          <div className="grid grid-cols-2 border-b border-[var(--outline-variant)] bg-[var(--card-bg)] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--on-surface)]">
            <div>{page.fromName}</div>
            <div>{page.toName}</div>
          </div>
          {examples.map((item) => (
            <div key={item.value} className="grid grid-cols-2 border-b border-[var(--outline-variant)] bg-[var(--surface-container)] px-6 py-4 text-[var(--on-surface)] last:border-none">
              <div>{formatNumericValue(item.value)} {page.from.symbol}</div>
              <div className="font-semibold">{formatNumericValue(item.result)} {page.to.symbol}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{localeUi[locale].relatedQueries}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedPairs.map((item) => (
            <Link key={item.pair} href={getLocalePath(locale, `/${article.unit}/${item.pair}`)} className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]">
              <div className="font-semibold">{item.title}</div>
              <div className="mt-1 text-sm opacity-90">{item.fromCode} → {item.toCode}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="md3-headline-small text-[var(--on-surface)]">{locale === 'en' ? 'Related articles' : locale === 'kk' ? 'Ұқсас мақалалар' : 'Похожие статьи'}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((item) => (
            <Link key={item.slug} href={getLocalePath(locale, `/articles/${item.slug}`)} className="rounded-[24px] border border-[var(--outline-variant)] bg-[var(--card-bg)] px-4 py-4 text-[var(--on-surface)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)]">
              <div className="text-sm text-[var(--primary)]">{intentMeta[item.intentType].label}</div>
              <div className="mt-1 font-semibold">{item.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
