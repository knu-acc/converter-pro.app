import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Converter Pro',
    short_name: 'Converter Pro',
    description: 'Онлайн-конвертер единиц измерения.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f9fa',
    theme_color: '#1a73e8',
    lang: 'ru',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
