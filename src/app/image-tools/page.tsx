import type { Metadata } from 'next';
import ImageLab from '@/components/ImageLab';
import { getRootAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Сжатие фото и удаление фона — без API | Converter Pro',
  description:
    'Пакетное сжатие изображений и простое удаление фона прямо в браузере. Без API-ключей, без отправки файлов на сервер.',
  alternates: getRootAlternates('/image-tools'),
};

export default function ImageToolsPage() {
  return (
    <ImageLab
      title="Image Tools: сжатие, прозрачность и удаление фона"
      description="Все действия выполняются на клиенте: изображения не отправляются на сервер, поэтому инструмент быстрый и безопасный. Если у фото уже прозрачный фон, прозрачность сохраняется после обработки."
      dropHint="Выберите одно или несколько изображений"
      processLabel="Запустить массовое сжатие"
      clearLabel="Очистить"
      selectedLabel="Выбрано файлов"
      qualityLabel="Качество"
      formatLabel="Формат"
      removeBackgroundLabel="Удалять светлый фон (клиентский алгоритм)"
      resultsLabel="Результаты пакетного сжатия"
      totalLabel="Общий размер"
      downloadLabel="Скачать"
      processingLabel="Обработка..."
    />
  );
}
