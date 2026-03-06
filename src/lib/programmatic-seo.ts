import { convert, units, type UnitOption, type UnitType } from '@/lib/conversions';
import { unitContent } from '@/lib/site';

export type UnitPairPage = {
  unit: UnitType;
  pair: string;
  from: UnitOption;
  to: UnitOption;
  fromCode: string;
  toCode: string;
  fromName: string;
  toName: string;
  title: string;
  heading: string;
  description: string;
  examples: number[];
};

const sampleValuesByUnit: Record<UnitType, number[]> = {
  weight: [1, 5, 10, 50, 100],
  length: [1, 10, 100, 1000],
  pressure: [1, 5, 10, 50, 100, 1000],
  area: [1, 10, 100, 1000],
  volume: [1, 5, 10, 100, 500],
  temperature: [0, 20, 37, 100],
  speed: [1, 10, 60, 100],
  time: [1, 5, 24, 60, 365],
  data: [1, 10, 100, 1024, 10000],
  energy: [1, 10, 100, 1000],
};

function sanitizeSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/°/g, 'deg')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/·/g, '-')
    .replace(/\//g, '-per-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getUnitOptionCode(option: UnitOption) {
  const fromLabel = option.label.match(/\(([^)]+)\)/)?.[1] ?? option.symbol;
  return sanitizeSlug(fromLabel);
}

export function getUnitOptionName(option: UnitOption) {
  return option.label.replace(/\s*\([^)]*\)/, '').trim();
}

export function formatNumericValue(value: number) {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) >= 1000000) return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(value);
  if (Math.abs(value) >= 1) return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 4 }).format(value);
  if (Math.abs(value) === 0) return '0';
  return value.toExponential(4);
}

export function getPairSlug(from: UnitOption, to: UnitOption) {
  return `${getUnitOptionCode(from)}-to-${getUnitOptionCode(to)}`;
}

export function getUnitPairs(unit: UnitType): UnitPairPage[] {
  return units[unit].flatMap((from) =>
    units[unit]
      .filter((to) => getPairSlug(from, to) !== getPairSlug(from, from))
      .map((to) => {
        const fromName = getUnitOptionName(from);
        const toName = getUnitOptionName(to);
        return {
          unit,
          pair: getPairSlug(from, to),
          from,
          to,
          fromCode: getUnitOptionCode(from),
          toCode: getUnitOptionCode(to),
          fromName,
          toName,
          title: `${fromName} в ${toName}`,
          heading: `${fromName} → ${toName}`,
          description: `Отдельная страница для запроса «${fromName.toLowerCase()} в ${toName.toLowerCase()}». Быстрый перевод в категории «${unitContent[unit].navLabel.toLowerCase()}» с онлайн-калькулятором и примерами.`,
          examples: sampleValuesByUnit[unit],
        };
      })
  );
}

export function getPairPage(unit: UnitType, pair: string) {
  return getUnitPairs(unit).find((item) => item.pair === pair);
}

export function getAllPairPages() {
  return (Object.keys(units) as UnitType[]).flatMap((unit) => getUnitPairs(unit));
}

export function getRelatedPairPages(unit: UnitType, currentPair: string, limit = 12) {
  return getUnitPairs(unit).filter((item) => item.pair !== currentPair).slice(0, limit);
}

export function calculatePairExamples(unit: UnitType, from: UnitOption, to: UnitOption, values: number[]) {
  return values.map((value) => ({
    value,
    result: convert(value, from.value, to.value, unit),
  }));
}
