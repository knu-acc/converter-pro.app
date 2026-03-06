import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getLocaleAlternates } from '@/lib/seo';
import { getLocalePath, isLocale, locales } from '@/lib/i18n';
import { articleIntentTypes, type ArticleIntentType, getSearchArticlesByIntent, intentMeta } from '@/lib/search-articles';

export function generateStaticParams() {
  return locales.flatMap((locale) => articleIntentTypes.map((intent) => ({ locale, intent })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; intent: string }> }): Promise<Metadata> {
  const { locale, intent } = await params;
  if (!isLocale(locale) || !articleIntentTypes.includes(intent as ArticleIntentType)) return { title: 'Not found' };
  const meta = intentMeta[intent as ArticleIntentType];

  return {
    title: `${meta.title} | Converter Pro`,
    description: meta.description,
    alternates: getLocaleAlternates(locale, `/articles/intent/${intent}`),
  };
}

export default async function LocalizedArticleIntentHubPage({ params }: { params: Promise<{ locale: string; intent: string }> }) {
  const { locale, intent } = await params;
  if (!isLocale(locale) || !articleIntentTypes.includes(intent as ArticleIntentType)) notFound();

  const typedIntent = intent as ArticleIntentType;
  const meta = intentMeta[typedIntent];
  const articles = getSearchArticlesByIntent(typedIntent);

  return (
    <div className="space-y-10 py-8">
      <section className="md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] px-6 py-8 sm:px-8">
        <div className="max-w-4xl space-y-4">
          <Link href={getLocalePath(locale, '/articles')} className="text-sm font-medium text-[var(--primary)] hover:opacity-80">
            ← {locale === 'en' ? 'SEO articles' : locale === 'kk' ? 'Мақалалар' : 'Ко всем статьям'}
          </Link>
          <h1 className="md3-display-small text-[var(--on-surface)]">{meta.title}</h1>
          <p className="text-lg text-[var(--on-surface)]">{meta.description}</p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={getLocalePath(locale, `/articles/${article.slug}`)} className="group md3-card md3-card-outlined border-[var(--outline)] bg-[var(--surface-container)] p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="space-y-3">
              <div className="text-sm font-medium text-[var(--primary)]">{intentMeta[article.intentType].label}</div>
              <h2 className="md3-title-large text-[var(--on-surface)] transition group-hover:text-[var(--primary)]">{article.title}</h2>
              <p className="text-[var(--on-surface)]">{article.intent}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">{locale === 'en' ? 'Open article' : locale === 'kk' ? 'Мақаланы ашу' : 'Открыть материал'} <ArrowRight className="h-4 w-4" /></div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}