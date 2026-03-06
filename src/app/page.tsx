import type { Metadata } from 'next';
import type { UnitType } from '@/lib/conversions';
import JsonLd from '@/components/JsonLd';
import HomePageView from '@/components/HomePageView';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { getLocalizedUnit } from '@/lib/i18n';
import { getRootAlternates } from '@/lib/seo';

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

export const metadata: Metadata = {
  title: `${siteConfig.name} — онлайн-конвертер единиц`,
  description: siteConfig.description,
  alternates: getRootAlternates('/'),
};

const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'ru',
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: unitKeys.map((unit, index) => {
    const item = getLocalizedUnit('ru', unit);
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: absoluteUrl(`/${unit}`),
    };
  }),
};

export default function Home() {
  return (
    <>
      <JsonLd data={[homepageSchema, itemListSchema]} />
      <HomePageView locale="ru" />
    </>
  );
}
