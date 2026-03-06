import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-6 py-24 text-center">
      <span className="inline-flex rounded-full bg-[var(--primary-container)] px-4 py-1 text-sm font-medium text-[var(--on-primary-container)]">
        404
      </span>
      <h1 className="md3-display-small text-[var(--on-surface)]">Страница не найдена</h1>
      <p className="text-lg text-[var(--on-surface-variant)]">
        Возможно, ссылка устарела. Перейдите на главную, в каталог конвертеров или в раздел гайдов.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="md3-button md3-button-filled">
          На главную
        </Link>
        <Link href="/konvertery" className="md3-button md3-button-outlined">
          Все конвертеры
        </Link>
        <Link href="/guides" className="md3-button md3-button-outlined">
          Гайды
        </Link>
      </div>
    </div>
  );
}
