'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type OutputFormat = 'auto' | 'jpeg' | 'png' | 'webp';

type ProcessedImage = {
  id: string;
  name: string;
  beforeKb: number;
  afterKb: number;
  reduction: number;
  previewUrl: string;
  downloadUrl: string;
  outputName: string;
};

interface ImageLabProps {
  title: string;
  description: string;
  dropHint: string;
  processLabel: string;
  clearLabel: string;
  selectedLabel: string;
  qualityLabel: string;
  formatLabel: string;
  removeBackgroundLabel: string;
  resultsLabel: string;
  totalLabel: string;
  downloadLabel: string;
  processingLabel: string;
}

export default function ImageLab({
  title,
  description,
  dropHint,
  processLabel,
  clearLabel,
  selectedLabel,
  qualityLabel,
  formatLabel,
  removeBackgroundLabel,
  resultsLabel,
  totalLabel,
  downloadLabel,
  processingLabel,
}: ImageLabProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.82);
  const [format, setFormat] = useState<OutputFormat>('auto');
  const [removeBackground, setRemoveBackground] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [items, setItems] = useState<ProcessedImage[]>([]);

  const totalBefore = useMemo(() => items.reduce((sum, item) => sum + item.beforeKb, 0), [items]);
  const totalAfter = useMemo(() => items.reduce((sum, item) => sum + item.afterKb, 0), [items]);

  useEffect(() => {
    return () => {
      for (const item of items) {
        URL.revokeObjectURL(item.previewUrl);
        URL.revokeObjectURL(item.downloadUrl);
      }
    };
  }, [items]);

  const onSelect = (selected: FileList | null) => {
    if (!selected) return;
    setFiles(Array.from(selected).filter((file) => file.type.startsWith('image/')));
  };

  const reset = () => {
    for (const item of items) {
      URL.revokeObjectURL(item.previewUrl);
      URL.revokeObjectURL(item.downloadUrl);
    }
    setFiles([]);
    setItems([]);
  };

  const run = async () => {
    if (!files.length || processing) return;
    setProcessing(true);
    const results: ProcessedImage[] = [];

    try {
      for (const file of files) {
        const originalUrl = URL.createObjectURL(file);
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) continue;

        ctx.drawImage(bitmap, 0, 0);

        if (removeBackground) {
          removeSimpleBackground(ctx, canvas.width, canvas.height);
        }

        const hasAlpha = containsAlpha(ctx, canvas.width, canvas.height);
        const target = chooseMimeType(format, hasAlpha);
        const blob = await canvasToBlob(canvas, target, quality);
        const finalBlob = blob ?? file;
        const outputUrl = URL.createObjectURL(finalBlob);

        const extension = target === 'image/png' ? 'png' : target === 'image/webp' ? 'webp' : 'jpg';
        const safeName = file.name.replace(/\.[^.]+$/, '');

        results.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          name: file.name,
          beforeKb: file.size / 1024,
          afterKb: finalBlob.size / 1024,
          reduction: Math.max(0, 100 - (finalBlob.size / file.size) * 100),
          previewUrl: originalUrl,
          downloadUrl: outputUrl,
          outputName: `${safeName}.optimized.${extension}`,
        });
      }

      reset();
      setItems(results);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="md3-card md3-card-elevated p-6 sm:p-8">
        <h1 className="md3-display-small text-[var(--on-surface)]">{title}</h1>
        <p className="mt-3 text-[var(--on-surface-variant)]">{description}</p>

        <label className="mt-6 block cursor-pointer rounded-[28px] border border-dashed border-[var(--outline)] bg-[var(--surface-container-low)] p-6 text-center">
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onSelect(e.target.files)} />
          <span className="md3-title-medium text-[var(--on-surface)]">{dropHint}</span>
          {!!files.length && <p className="mt-2 text-sm text-[var(--on-surface-variant)]">{selectedLabel}: {files.length}</p>}
        </label>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-[var(--on-surface-variant)]">{qualityLabel}: {Math.round(quality * 100)}%</label>
            <input type="range" min={0.4} max={1} step={0.01} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-sm text-[var(--on-surface-variant)]">{formatLabel}</label>
            <select value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)} className="md3-expressive-input mt-1">
              <option value="auto">Auto</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
              <option value="png">PNG</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-[var(--on-surface)]">
            <input type="checkbox" checked={removeBackground} onChange={(e) => setRemoveBackground(e.target.checked)} />
            {removeBackgroundLabel}
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="md3-button md3-button-filled" onClick={run} disabled={processing || !files.length}>
            {processing ? processingLabel : processLabel}
          </button>
          <button type="button" className="md3-button md3-button-outlined" onClick={reset}>
            {clearLabel}
          </button>
        </div>
      </div>

      {!!items.length && (
        <div className="md3-card p-6 sm:p-8">
          <h2 className="md3-headline-small">{resultsLabel}</h2>
          <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
            {totalLabel}: {totalBefore.toFixed(1)} KB → {totalAfter.toFixed(1)} KB
          </p>
          <div className="mt-6 grid gap-4">
            {items.map((item) => (
              <article key={item.id} className="grid gap-3 rounded-[24px] border border-[var(--outline-variant)] p-4 md:grid-cols-[120px,1fr,auto]">
                <Image src={item.previewUrl} alt={item.name} width={96} height={96} unoptimized className="h-24 w-24 rounded-xl object-cover" />
                <div>
                  <p className="font-medium text-[var(--on-surface)]">{item.name}</p>
                  <p className="text-sm text-[var(--on-surface-variant)]">
                    {item.beforeKb.toFixed(1)} KB → {item.afterKb.toFixed(1)} KB ({item.reduction.toFixed(1)}%)
                  </p>
                </div>
                <a className="md3-button md3-button-tonal" href={item.downloadUrl} download={item.outputName}>{downloadLabel}</a>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function chooseMimeType(format: OutputFormat, hasAlpha: boolean) {
  if (format === 'jpeg') return hasAlpha ? 'image/png' : 'image/jpeg';
  if (format === 'png') return 'image/png';
  if (format === 'webp') return 'image/webp';
  return hasAlpha ? 'image/png' : 'image/webp';
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

function containsAlpha(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const { data } = ctx.getImageData(0, 0, width, height);
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

function removeSimpleBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  const threshold = 238;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) continue;

    const isLight = r > threshold && g > threshold && b > threshold;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);

    if (isLight && spread < 25) {
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(image, 0, 0);
}
