import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Converter from '@/components/Converter';
import JsonLd from '@/components/JsonLd';
import { units, type UnitType } from '@/lib/conversions';
import { getUnitPairs } from '@/lib/programmatic-seo';
import { absoluteUrl, siteConfig, unitContent } from '@/lib/site';
import { getRootAlternates } from '@/lib/seo';
import { 
  Scale, 
  Ruler, 
  Activity, 
  Square, 
  Box, 
  Thermometer, 
  Gauge, 
  Clock, 
  Database, 
  Zap,
} from 'lucide-react';
import { Metadata } from 'next';

const unitInfo: Record<UnitType, { title: string; description: string; icon: ReactNode }> = {
  weight: { 
    title: unitContent.weight.title,
    description: unitContent.weight.heroDescription,
    icon: <Scale className="w-8 h-8 text-white" />
  },
  length: { 
    title: unitContent.length.title,
    description: unitContent.length.heroDescription,
    icon: <Ruler className="w-8 h-8 text-white" />
  },
  pressure: { 
    title: unitContent.pressure.title,
    description: unitContent.pressure.heroDescription,
    icon: <Activity className="w-8 h-8 text-white" />
  },
  area: { 
    title: unitContent.area.title,
    description: unitContent.area.heroDescription,
    icon: <Square className="w-8 h-8 text-white" />
  },
  volume: { 
    title: unitContent.volume.title,
    description: unitContent.volume.heroDescription,
    icon: <Box className="w-8 h-8 text-white" />
  },
  temperature: { 
    title: unitContent.temperature.title,
    description: unitContent.temperature.heroDescription,
    icon: <Thermometer className="w-8 h-8 text-white" />
  },
  speed: { 
    title: unitContent.speed.title,
    description: unitContent.speed.heroDescription,
    icon: <Gauge className="w-8 h-8 text-white" />
  },
  time: { 
    title: unitContent.time.title,
    description: unitContent.time.heroDescription,
    icon: <Clock className="w-8 h-8 text-white" />
  },
  data: { 
    title: unitContent.data.title,
    description: unitContent.data.heroDescription,
    icon: <Database className="w-8 h-8 text-white" />
  },
  energy: { 
    title: unitContent.energy.title,
    description: unitContent.energy.heroDescription,
    icon: <Zap className="w-8 h-8 text-white" />
  },
};

export async function generateStaticParams() {
  return Object.keys(units).map((unit) => ({
    unit: unit,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const { unit } = await params;
  const info = unitInfo[unit as UnitType];
  const content = unitContent[unit as UnitType];
  
  if (!info) {
    return {
      title: 'Страница не найдена',
    };
  }

  return {
    title: info.title,
    description: content.seoDescription,
    keywords: content.keywords,
    alternates: getRootAlternates(`/${unit}`),
    openGraph: {
      title: info.title,
      description: content.seoDescription,
      url: absoluteUrl(`/${unit}`),
      type: 'website',
      locale: 'ru_KZ',
      siteName: siteConfig.name,
    },
  };
}

export default async function UnitPage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;

  if (!units[unit as UnitType]) {
    notFound();
  }

  const typedUnit = unit as UnitType;
  const info = unitInfo[typedUnit];
  const content = unitContent[typedUnit];
  const pairPages = getUnitPairs(typedUnit).slice(0, 18);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  const breadcrumbSchema = {
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
        name: 'Все конвертеры',
        item: absoluteUrl('/konvertery'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: info.title,
        item: absoluteUrl(`/${typedUnit}`),
      },
    ],
  };
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: info.title,
    description: content.seoDescription,
    url: absoluteUrl(`/${typedUnit}`),
    about: content.examples,
  };

  return (
    <div className="py-10 space-y-10">
      <JsonLd data={[faqSchema, breadcrumbSchema, collectionSchema]} />
      <nav className="mx-auto flex max-w-5xl items-center gap-2 text-sm text-[var(--on-surface-variant)]">
        <Link href="/" className="hover:text-[var(--primary)]">Главная</Link>
        <span>/</span>
        <Link href="/konvertery" className="hover:text-[var(--primary)]">Все конвертеры</Link>
        <span>/</span>
        <span className="text-[var(--on-surface)]">{info.title}</span>
      </nav>

      <Converter 
        type={typedUnit} 
        title={info.title} 
        description={info.description}
        icon={info.icon}
      />
      
      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <article className="md3-card p-8">
          <h2 className="text-2xl font-bold text-[var(--on-surface)]">О странице</h2>
          <p className="mt-4 text-[var(--on-surface-variant)]">{content.intro}</p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[var(--on-surface)]">Популярные запросы</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {content.examples.map((example) => (
                <li key={example} className="rounded-[28px] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--on-surface)]">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="md3-card md3-card-outlined md3-shape-panel p-8">
          <h2 className="md3-headline-small text-[var(--on-surface)]">Связанные разделы</h2>
          <div className="mt-5 space-y-3">
            {content.related.map((relatedUnit) => (
              <Link
                key={relatedUnit}
                href={`/${relatedUnit}`}
                className="md3-filled-tonal-surface md3-pressable block rounded-[28px] border border-[var(--outline-variant)] px-4 py-3 text-[var(--on-secondary-container)] transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                {unitContent[relatedUnit].title}
              </Link>
            ))}
            <Link href="/guides" className="md3-button md3-button-tonal justify-start">
              Смотреть гайды и статьи
            </Link>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-5xl space-y-4">
        <h2 className="md3-headline-small text-[var(--on-surface)]">FAQ по теме</h2>
        <div className="grid gap-4">
          {content.faq.map((item) => (
            <article key={item.question} className="md3-card md3-card-outlined md3-shape-panel p-6">
              <h3 className="text-xl font-bold text-[var(--on-surface)]">{item.question}</h3>
              <p className="mt-3 text-[var(--on-surface-variant)]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Популярные пары конвертации</h2>
            <p className="mt-2 text-[var(--on-surface-variant)]">
              Отдельные страницы под частые пары конвертации внутри категории.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pairPages.map((item) => (
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
