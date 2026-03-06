import Link from 'next/link';

type LinkItem = {
  href: string;
  label: string;
};

type StatItem = {
  value: string;
  label: string;
};

type StaticRichPageProps = {
  badge: string;
  title: string;
  description: string;
  paragraphs: string[];
  stats?: StatItem[];
  links?: LinkItem[];
  asideTitle?: string;
  asideItems?: string[];
};

export default function StaticRichPage({
  badge,
  title,
  description,
  paragraphs,
  stats = [],
  links = [],
  asideTitle = 'Полезно знать',
  asideItems = [],
}: StaticRichPageProps) {
  return (
    <div className="space-y-10 py-8">
      <section className="md3-card md3-card-elevated px-6 py-10 sm:px-8">
        <div className="relative max-w-4xl space-y-5">
          <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">{badge}</span>
          <h1 className="md3-display-medium text-[var(--on-surface)]">{title}</h1>
          <p className="max-w-3xl text-lg text-[var(--on-surface-variant)]">{description}</p>
          {stats.length > 0 && (
            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={`${item.value}-${item.label}`} className="rounded-[28px] border border-[var(--outline-variant)] bg-[var(--card-bg)] p-4">
                  <div className="text-2xl font-extrabold text-[var(--on-surface)]">{item.value}</div>
                  <div className="text-sm text-[var(--on-surface-variant)]">{item.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <article className="md3-card p-8">
          <div className="grid gap-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-[var(--on-surface-variant)]">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <aside className="md3-card md3-card-outlined p-8">
          <h2 className="text-2xl font-bold text-[var(--on-surface)]">{asideTitle}</h2>
          {asideItems.length > 0 && (
            <div className="mt-5 grid gap-3">
              {asideItems.map((item) => (
                <div key={item} className="rounded-[28px] border border-[var(--line)] bg-[var(--card-bg)] px-4 py-4 text-sm leading-7 text-[var(--on-surface-variant)]">
                  {item}
                </div>
              ))}
            </div>
          )}
          {links.length > 0 && (
            <div className="mt-5 grid gap-3">
              {links.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-[28px] border border-[var(--line)] bg-[var(--card-bg)] px-4 py-4 font-medium text-[var(--on-surface)] transition hover:border-[var(--primary)] hover:bg-[var(--card-bg-hover)] hover:text-[var(--primary)]">
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}