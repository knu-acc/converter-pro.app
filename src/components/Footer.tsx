'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { guideArticles, unitContent } from '@/lib/site';
import type { UnitType } from '@/lib/conversions';
import { getLocaleFromPathname, getLocalePath, getLocalizedUnit, localeUi } from '@/lib/i18n';

const footerConverterUnits: UnitType[] = ['pressure', 'weight', 'length', 'temperature'];

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = localeUi[locale];

  const trustItems = [ui.trustItem1, ui.trustItem2, ui.trustItem3];

  return (
    <footer className="mt-auto w-full border-t border-[var(--outline-variant)] bg-[var(--surface-container)]">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 text-sm text-[var(--on-surface-variant)] md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[var(--on-surface)]">Converter Pro</h3>
          <p className="max-w-xs leading-6">{ui.footerDescription}</p>
          <div className="mt-5 space-y-2">
            {trustItems.map((item) => (
              <div key={item} className="rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--on-surface-variant)]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-medium text-[var(--on-surface)]">{ui.footerPopularConverters}</h4>
          <ul className="space-y-2">
            {footerConverterUnits.map((unit) => {
              const info = getLocalizedUnit(locale, unit);
              return (
                <li key={unit}>
                  <Link href={getLocalePath(locale, `/${unit}`)} className="transition hover:text-[var(--primary)]">{info.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-medium text-[var(--on-surface)]">{ui.footerSections}</h4>
          <ul className="space-y-2">
            <li><Link href={getLocalePath(locale, '/konvertery')} className="transition hover:text-[var(--primary)]">{ui.converters}</Link></li>
            <li><Link href={getLocalePath(locale, '/guides')} className="transition hover:text-[var(--primary)]">{ui.guides}</Link></li>
            <li><Link href={getLocalePath(locale, '/articles')} className="transition hover:text-[var(--primary)]">{ui.articles}</Link></li>
            <li><Link href={getLocalePath(locale, '/faq')} className="transition hover:text-[var(--primary)]">{ui.faq}</Link></li>
            <li><Link href={getLocalePath(locale, '/about')} className="transition hover:text-[var(--primary)]">{ui.footerAbout}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-medium text-[var(--on-surface)]">{ui.footerInfo}</h4>
          <ul className="space-y-2">
            <li><Link href={getLocalePath(locale, '/privacy')} className="transition hover:text-[var(--primary)]">{ui.footerPrivacy}</Link></li>
            <li><Link href={getLocalePath(locale, '/terms')} className="transition hover:text-[var(--primary)]">{ui.footerTerms}</Link></li>
            <li><Link href={getLocalePath(locale, '/contact')} className="transition hover:text-[var(--primary)]">{ui.footerContact}</Link></li>
            <li><Link href={getLocalePath(locale, `/guides/${guideArticles[0].slug}`)} className="transition hover:text-[var(--primary)]">{ui.footerPopularGuide}</Link></li>
          </ul>
          <div className="mt-4 flex gap-2">
            {['ru', 'kk', 'en'].map((loc) => (
              <Link key={loc} href={loc === 'ru' ? '/' : `/lang/${loc}`} className="locale-chip md3-pressable">
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--outline-variant)] py-6 text-center text-xs text-[var(--on-surface-variant)]">
        <p>&copy; {new Date().getFullYear()} Converter Pro. {ui.footerTagline}</p>
      </div>
    </footer>
  );
}
