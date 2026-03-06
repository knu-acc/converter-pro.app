'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LocaleLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname?.split('/').filter(Boolean) ?? [];
    const locale =
      segments[0] === 'lang' && segments[1] ? segments[1] : 'ru';
    const lang = locale === 'kk' ? 'kk' : locale === 'en' ? 'en' : 'ru';
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
