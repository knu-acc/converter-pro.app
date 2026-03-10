'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';
import { unitContent } from '@/lib/site';
import type { UnitType } from '@/lib/conversions';
import { getLocaleFromPathname, getLocalePath, getLocalizedUnit, localeUi } from '@/lib/i18n';

const localeLinks = [
  { href: '/', label: 'RU' },
  { href: '/lang/kk', label: 'KK' },
  { href: '/lang/en', label: 'EN' },
];

export default function Header() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = localeUi[locale];

  const unitLinks = useMemo(
    () =>
      (Object.keys(unitContent) as UnitType[]).map((unit) => ({
        href: getLocalePath(locale, `/${unit}`),
        label: getLocalizedUnit(locale, unit).navLabel,
      })),
    [locale]
  );

  const secondaryLinks = useMemo(
    () => [
      { href: getLocalePath(locale, '/konvertery'), label: ui.converters },
      { href: getLocalePath(locale, '/guides'), label: ui.guides },
      { href: getLocalePath(locale, '/articles'), label: ui.articles },
      { href: getLocalePath(locale, '/image-tools'), label: ui.imageTools },
      { href: getLocalePath(locale, '/faq'), label: ui.faq },
    ],
    [locale, ui]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--outline-variant)] bg-[color:color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-xl md3-elevation-2">
      <div className="container mx-auto flex min-h-[80px] items-center justify-between gap-4 px-4 py-3">
        <Link href={getLocalePath(locale, '/')} className="flex min-w-0 items-center gap-3 text-[var(--on-surface)]">
          <div className="md3-google-icon flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--primary-container)] text-[var(--on-primary-container)] shadow-[var(--shadow-sm)]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="truncate text-[1.1rem] font-semibold tracking-tight text-[var(--on-surface)]">Converter Pro</div>
            <div className="truncate md3-body-medium text-[var(--on-surface-variant)]">{ui.siteSubtitle}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {secondaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-[var(--on-surface-variant)] transition hover:bg-[var(--secondary-container)] hover:text-[var(--on-secondary-container)]">
              {link.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="md3-pressable flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--on-surface-variant)] transition hover:bg-[var(--secondary-container)] hover:text-[var(--on-secondary-container)]">
              {ui.convertersDropdown}
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute right-0 top-full mt-3 w-72 rounded-[32px] border border-[var(--outline-variant)] bg-[var(--surface-container-low)] shadow-sm p-3 opacity-0 shadow-[var(--shadow-md)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--on-surface-variant)]">{ui.categories}</div>
              {unitLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-[28px] px-4 py-3 text-sm font-medium text-[var(--on-surface)] transition hover:bg-[var(--secondary-container)] hover:text-[var(--on-secondary-container)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-1 flex items-center gap-2 pl-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="md3-icon-button-tonal"
              aria-label={theme === 'dark' ? ui.themeLight : ui.themeDark}
              title={theme === 'dark' ? ui.themeLightTitle : ui.themeDarkTitle}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {localeLinks.map((link) => (
              <Link key={link.href} href={link.href} className="locale-chip md3-pressable">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <button
          className="md3-icon-button-tonal flex md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? ui.menuClose : ui.menuOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] shadow-sm md:hidden overflow-y-auto max-h-[calc(100vh-81px)]"
        >
          <nav className="flex flex-col gap-4 p-4 pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="md3-icon-button-tonal"
                aria-label={theme === 'dark' ? ui.themeLight : ui.themeDark}
                title={theme === 'dark' ? ui.themeLightTitle : ui.themeDarkTitle}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {localeLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="locale-chip md3-pressable"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[28px] px-4 py-3 text-base font-medium text-[var(--on-surface)] transition hover:bg-[var(--secondary-container)] hover:text-[var(--on-secondary-container)]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="rounded-[32px] border border-[var(--outline-variant)] bg-[var(--surface-container)] p-3">
              <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--on-surface-variant)]">{ui.convertersDropdown}</div>
              <div className="grid gap-2">
                {unitLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-[28px] px-3 py-3 text-base font-medium text-[var(--on-surface)] transition hover:bg-[var(--secondary-container)] hover:text-[var(--on-secondary-container)]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
