import type { Metadata } from 'next';
import { Mail, Globe, Handshake } from 'lucide-react';
import { getRootAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Контакты | Converter Pro',
  description: 'Страница контактов и сотрудничества для проекта Converter Pro.',
  alternates: getRootAlternates('/contact'),
};

const contacts = [
  {
    title: 'Редакционные вопросы',
    description: 'Предложения по новым конвертерам, страницам, FAQ и статьям.',
    value: 'hello@converter-pro.app',
    icon: Mail,
  },
  {
    title: 'Партнёрство',
    description: 'Коллаборации, интеграции, рекламные и контентные предложения.',
    value: 'partners@converter-pro.app',
    icon: Handshake,
  },
  {
    title: 'Сайт',
    description: 'Основной адрес проекта и технические вопросы по размещению.',
    value: 'converter-pro.app',
    icon: Globe,
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-10 py-8">
      <section className="md3-card md3-card-elevated px-6 py-10 sm:px-8">
        <div className="max-w-4xl space-y-5">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">Контакты и сотрудничество</span>
          <h1 className="md3-display-medium text-[var(--on-surface)]">Контакты</h1>
          <p className="max-w-3xl text-lg text-[var(--on-surface-variant)]">
          Если нужен новый калькулятор, заметили ошибку или хотите обсудить сотрудничество — используйте контакты ниже.
        </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {contacts.map(({ title, description, value, icon: Icon }) => (
          <article key={title} className="md3-card p-6">
            <div className="inline-flex rounded-[24px] bg-[var(--primary-container)] p-3 text-[var(--on-primary-container)]">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-[var(--on-surface)]">{title}</h2>
            <p className="mt-2 text-[var(--on-surface-variant)]">{description}</p>
            <p className="mt-4 font-semibold text-[var(--primary)]">{value}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
