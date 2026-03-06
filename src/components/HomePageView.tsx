import type { Locale } from '@/lib/i18n';
import type { UnitType } from '@/lib/conversions';
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
  ArrowRight,
  Info,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { getLocalePath, getLocalizedUnit, localeUi, homeUtilityKeys } from '@/lib/i18n';
import { guideArticles, homepageFaq, utilityPages } from '@/lib/site';

const unitKeys: UnitType[] = [
  'weight',
  'length',
  'pressure',
  'area',
  'volume',
  'temperature',
  'speed',
  'time',
  'data',
  'energy',
];

const categoryIcons: Record<UnitType, React.ReactNode> = {
  weight: <Scale className="w-7 h-7 stroke-[1.5]" />,
  length: <Ruler className="w-7 h-7 stroke-[1.5]" />,
  pressure: <Activity className="w-7 h-7 stroke-[1.5]" />,
  area: <Square className="w-7 h-7 stroke-[1.5]" />,
  volume: <Box className="w-7 h-7 stroke-[1.5]" />,
  temperature: <Thermometer className="w-7 h-7 stroke-[1.5]" />,
  speed: <Gauge className="w-7 h-7 stroke-[1.5]" />,
  time: <Clock className="w-7 h-7 stroke-[1.5]" />,
  data: <Database className="w-7 h-7 stroke-[1.5]" />,
  energy: <Zap className="w-7 h-7 stroke-[1.5]" />,
};

const popularPairHrefs = [
  '/pressure/bar-to-psi',
  '/weight/kg-to-lb',
  '/temperature/degc-to-degf',
  '/energy/kwh-to-j',
];

export default function HomePageView({ locale }: { locale: Locale }) {
  const ui = localeUi[locale];
  const categoryCount = unitKeys.length;
  const guideCount = guideArticles.length;
  const utilityCount = utilityPages.length;

  const benefits = [ui.homeBenefit1, ui.homeBenefit2, ui.homeBenefit3, ui.homeBenefit4];
  const whyList = [ui.homeWhy1, ui.homeWhy2, ui.homeWhy3, ui.homeWhy4];

  const stats = [
    { label: `${categoryCount} ${ui.homeStatCategories}`, value: ui.homeStatCategoriesVal },
    { label: `${guideCount} ${ui.homeStatGuides}`, value: ui.homeStatGuidesVal },
    { label: `${utilityCount} ${ui.homeStatSections}`, value: ui.homeStatSectionsVal },
  ];

  const popularPairs = popularPairHrefs.map((href, i) => ({
    href: getLocalePath(locale, href),
    label: ui[`homePair${i + 1}Label` as keyof typeof ui] as string,
    description: ui[`homePair${i + 1}Desc` as keyof typeof ui] as string,
  }));

  return (
    <div className="space-y-10 py-6 sm:space-y-12 sm:py-8">
      <section className="md3-card md3-card-elevated md3-google-block md3-reveal overflow-hidden px-6 py-8 text-center sm:px-10 sm:py-12">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--primary-container)] px-4 py-2 text-sm font-medium text-[var(--on-primary-container)]">
          <Sparkles className="h-4 w-4" />
          {ui.homeHeroBadge}
        </div>
        <h1 className="md3-display-medium text-[var(--on-surface)] tracking-tight mt-5">
          {ui.homeHeroTitle} <br className="hidden sm:block" />
          <span className="text-[var(--primary)]">{ui.homeHeroTitleAccent}</span>
        </h1>
        <p className="md3-body-large mx-auto mt-4 max-w-2xl text-[var(--on-surface-variant)] sm:text-[1.125rem]">
          {ui.homeHeroLead}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={getLocalePath(locale, '/pressure')} className="md3-button md3-button-filled md3-pressable">
            <span>{ui.homeCtaPressure}</span>
            <ArrowRight size={18} />
          </Link>
          <Link href={getLocalePath(locale, '/konvertery')} className="md3-button md3-button-tonal md3-pressable">
            {ui.homeCtaAll}
          </Link>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="md3-google-block md3-reveal md3-reveal-delay-1 border border-[var(--outline-variant)] bg-[var(--surface-container)] p-4 text-left">
              <div className="text-base font-medium text-[var(--on-surface)]">{stat.label}</div>
              <div className="mt-0.5 text-sm text-[var(--on-surface-variant)]">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {unitKeys.map((unit) => {
          const item = getLocalizedUnit(locale, unit);
          return (
            <Link
              key={unit}
              href={getLocalePath(locale, `/${unit}`)}
              className="md3-card md3-card-outlined md3-google-block md3-pressable md3-lift-subtle group p-6 bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="md3-google-icon flex items-center justify-center bg-[var(--primary-container)] p-2.5 text-[var(--on-primary-container)]">
                  {categoryIcons[unit]}
                </div>
                <div className="rounded-full bg-[var(--surface-container)] p-2 text-[var(--on-surface-variant)] opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight size={16} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 md3-title-large text-[var(--on-surface)] transition-colors group-hover:text-[var(--primary)]">
                  {item.title}
                </h3>
                <p className="md3-body-medium text-[var(--on-surface-variant)]">{item.shortDescription}</p>
                <p className="mt-4 text-sm font-medium text-[var(--primary)]">{ui.homeOpenPage}</p>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="md3-card md3-google-block md3-reveal md3-reveal-delay-1 p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            <Info className="h-4 w-4" />
            {ui.homeWhyConvenient}
          </div>
          <h2 className="md3-display-small text-[var(--on-surface)] tracking-tight">{ui.homeBenefitsTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {benefits.map((item) => (
              <div key={item} className="rounded-[28px] bg-[var(--card-bg)] shadow-sm p-4 text-[var(--on-surface)]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="md3-card md3-google-block md3-reveal md3-reveal-delay-2 p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--tertiary-container)] px-4 py-1 text-sm font-medium text-[var(--on-tertiary-container)]">
            <Sparkles className="h-4 w-4" />
            {ui.homeAllNearby}
          </div>
          <h2 className="md3-display-small text-[var(--on-surface)] tracking-tight">{ui.homeAllNearby}</h2>
          <div className="mt-6 space-y-3 text-[var(--on-surface-variant)]">
            {utilityPages.map((page) => {
              const keys = homeUtilityKeys[page.href];
              const label = keys ? (ui[keys.labelKey as keyof typeof ui] as string) : page.label;
              const desc = keys ? (ui[keys.descKey as keyof typeof ui] as string) : page.description;
              return (
                <Link
                  key={page.href}
                  href={getLocalePath(locale, page.href)}
                  className="md3-pressable md3-lift-subtle block rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] shadow-sm p-4 transition hover:bg-[var(--card-bg-hover)]"
                >
                  <div className="font-medium text-[var(--on-surface)]">{label}</div>
                  <div className="text-sm">{desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="md3-card md3-google-block md3-reveal md3-reveal-delay-2 p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--secondary-container)] px-4 py-1 text-sm font-medium text-[var(--on-secondary-container)]">
              <ArrowRight className="h-4 w-4" />
              {ui.homePopularPairs}
            </div>
            <h2 className="md3-display-small text-[var(--on-surface)] tracking-tight mt-4">{ui.homePopularPairs}</h2>
          </div>
          <Link href={getLocalePath(locale, '/guides')} className="text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--on-primary-container)]">
            {ui.homePopularPairsLink}
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {popularPairs.map((pair) => (
            <Link
              key={pair.href}
              href={pair.href}
              className="md3-pressable md3-lift-subtle block rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] shadow-sm p-5 transition hover:bg-[var(--card-bg-hover)]"
            >
              <div className="md3-title-medium text-[var(--on-surface)]">{pair.label}</div>
              <div className="mt-2 md3-body-medium text-[var(--on-surface-variant)]">{pair.description}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="md3-card md3-google-block md3-reveal md3-reveal-delay-2 p-8">
          <h2 className="md3-display-small text-[var(--on-surface)] tracking-tight">{ui.homeWhyDailyTitle}</h2>
          <ul className="mt-6 space-y-4">
            {whyList.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[var(--on-surface)]">
                <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md3-card-tonal md3-google-block md3-reveal md3-reveal-delay-3 flex flex-col justify-center border border-transparent p-8 text-center">
          <Info size={42} className="mx-auto mb-4 text-[var(--primary)]" />
          <h3 className="mb-2 md3-headline-small text-[var(--on-secondary-container)]">{ui.homeScenarioTitle}</h3>
          <p className="mx-auto mb-6 max-w-xs text-[var(--on-surface-variant)]">{ui.homeScenarioDesc}</p>
          <Link href={getLocalePath(locale, '/pressure/bar-to-psi')} className="md3-button md3-button-filled w-full">
            bar → psi
          </Link>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className="md3-card md3-google-block md3-reveal md3-reveal-delay-2 p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
            <BookOpen className="h-4 w-4" />
            {ui.guides}
          </div>
          <h2 className="md3-display-small text-[var(--on-surface)] tracking-tight">{ui.homeGuidesTitle}</h2>
          <div className="mt-6 space-y-4">
            {guideArticles.map((article) => (
              <Link
                key={article.slug}
                href={getLocalePath(locale, `/guides/${article.slug}`)}
                className="md3-pressable md3-lift-subtle block rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] shadow-sm p-4 transition hover:bg-[var(--card-bg-hover)]"
              >
                <div className="text-sm text-[var(--primary)]">{article.category} • {article.readTime}</div>
                <div className="mt-1 md3-title-large text-[var(--on-surface-variant)]">{article.title}</div>
                <div className="mt-1 text-[var(--on-surface-variant)]">{article.description}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md3-card md3-google-block md3-reveal md3-reveal-delay-3 p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--secondary-container)] px-4 py-1 text-sm font-medium text-[var(--on-secondary-container)]">
            <Info className="h-4 w-4" />
            {ui.faq}
          </div>
          <h2 className="md3-display-small text-[var(--on-surface)] tracking-tight">{ui.homeFaqTitle}</h2>
          <div className="mt-6 space-y-4">
            {homepageFaq.map((item) => (
              <article key={item.question} className="rounded-[28px] bg-[var(--card-bg)] shadow-sm p-5">
                <h3 className="md3-title-medium text-[var(--on-surface-variant)]">{item.question}</h3>
                <p className="mt-2 text-[var(--on-surface-variant)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
