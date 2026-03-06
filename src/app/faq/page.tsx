import type { Metadata } from 'next';
import Link from 'next/link';
import { homepageFaq, unitContent } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import FaqAccordion from '@/components/FaqAccordion';
import { getRootAlternates, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'FAQ | Converter Pro',
  description: 'Ответы на частые вопросы о работе онлайн-конвертера Converter Pro: точность, мобильная версия, категории единиц и использование сервиса.',
  keywords: ['FAQ конвертер', 'вопросы о конвертере единиц', 'как пользоваться конвертером', 'точность конвертации', 'мобильный конвертер'],
  alternates: getRootAlternates('/faq'),
};

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Главная', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ]);

  return (
    <div className="space-y-10 py-8">
      <JsonLd data={[faqSchema, breadcrumbSchema]} />
      <section className="md3-card md3-card-elevated px-6 py-8 sm:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">Быстрые ответы</span>
          <h1 className="md3-display-small text-[var(--on-surface)]">Часто задаваемые вопросы</h1>
          <p className="text-lg text-[var(--on-surface-variant)]">
            Короткие ответы о конвертации, поддерживаемых категориях и использовании сервиса на телефоне и компьютере.
          </p>
        </div>
      </section>

      <section>
        <FaqAccordion items={homepageFaq} />
      </section>

      <section className="md3-card md3-card-outlined p-6">
        <h2 className="md3-title-medium mb-4 text-[var(--on-surface)]">Популярные конвертеры</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/pressure" className="md3-chip md3-pressable text-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">{unitContent.pressure.title}</Link>
          <Link href="/weight" className="md3-chip md3-pressable text-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">{unitContent.weight.title}</Link>
          <Link href="/length" className="md3-chip md3-pressable text-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">{unitContent.length.title}</Link>
          <Link href="/temperature" className="md3-chip md3-pressable text-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">{unitContent.temperature.title}</Link>
          <Link href="/konvertery" className="md3-chip md3-pressable text-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">Все конвертеры</Link>
          <Link href="/guides" className="md3-chip md3-pressable text-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">Гайды</Link>
          <Link href="/articles" className="md3-chip md3-pressable text-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">Статьи</Link>
        </div>
      </section>
    </div>
  );
}
