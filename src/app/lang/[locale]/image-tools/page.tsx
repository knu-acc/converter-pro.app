import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ImageLab from '@/components/ImageLab';
import { getLocaleAlternates } from '@/lib/seo';
import { isLocale, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: 'Not found' };

  const titleByLocale = {
    ru: 'Сжатие фото и удаление фона — без API | Converter Pro',
    kk: 'Фото қысу және фонды өшіру — API кілтсіз | Converter Pro',
    en: 'Image compression and background removal — no API | Converter Pro',
  };

  const descriptionByLocale = {
    ru: 'Пакетное сжатие изображений и удаление фона прямо в браузере. Все вычисления только на клиенте.',
    kk: 'Суреттерді пакетпен қысу және фонды браузерде өшіру. Барлығы тек клиентте орындалады.',
    en: 'Batch image compression and background removal in your browser. All processing stays on the client.',
  };

  return {
    title: titleByLocale[locale],
    description: descriptionByLocale[locale],
    alternates: getLocaleAlternates(locale, '/image-tools'),
  };
}

export default async function LocalizedImageToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = {
    ru: {
      title: 'Image Tools: сжатие, прозрачность и удаление фона',
      description:
        'Все действия выполняются на клиенте: изображения не отправляются на сервер. Если фото уже без фона, прозрачность сохранится.',
      dropHint: 'Выберите одно или несколько изображений',
      processLabel: 'Запустить массовое сжатие',
      clearLabel: 'Очистить',
      selectedLabel: 'Выбрано файлов',
      qualityLabel: 'Качество',
      formatLabel: 'Формат',
      removeBackgroundLabel: 'Удалять светлый фон (клиентский алгоритм)',
      resultsLabel: 'Результаты пакетного сжатия',
      totalLabel: 'Общий размер',
      downloadLabel: 'Скачать',
      processingLabel: 'Обработка...',
    },
    kk: {
      title: 'Image Tools: қысу, мөлдірлік және фонды өшіру',
      description:
        'Барлық әрекет клиентте орындалады: файлдар серверге жіберілмейді. Фото фоны онсыз да мөлдір болса, сол күйі қалады.',
      dropHint: 'Бір немесе бірнеше суретті таңдаңыз',
      processLabel: 'Пакеттік қысуды бастау',
      clearLabel: 'Тазарту',
      selectedLabel: 'Таңдалған файлдар',
      qualityLabel: 'Сапа',
      formatLabel: 'Формат',
      removeBackgroundLabel: 'Ашық фонды өшіру (клиенттік алгоритм)',
      resultsLabel: 'Пакеттік қысу нәтижелері',
      totalLabel: 'Жалпы өлшем',
      downloadLabel: 'Жүктеу',
      processingLabel: 'Өңделуде...',
    },
    en: {
      title: 'Image Tools: compression, transparency and background removal',
      description:
        'Everything runs in the browser with no server upload. If your photo already has transparency, it is preserved after processing.',
      dropHint: 'Select one or multiple images',
      processLabel: 'Run batch compression',
      clearLabel: 'Clear',
      selectedLabel: 'Selected files',
      qualityLabel: 'Quality',
      formatLabel: 'Format',
      removeBackgroundLabel: 'Remove light background (client-side algorithm)',
      resultsLabel: 'Batch compression results',
      totalLabel: 'Total size',
      downloadLabel: 'Download',
      processingLabel: 'Processing...',
    },
  };

  return <ImageLab {...copy[locale]} />;
}
