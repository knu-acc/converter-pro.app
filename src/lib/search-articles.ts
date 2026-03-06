import { type UnitType } from '@/lib/conversions';
import { calculatePairExamples, getPairPage, getRelatedPairPages } from '@/lib/programmatic-seo';

export const articleIntentTypes = [
  'guide',
  'table',
  'formula',
  'examples',
  'calculator',
  'comparison',
  'quick-answer',
  'reference',
  'how-to',
  'explained',
  'cheatsheet',
  'faq',
  'practical',
  'detailed',
  'tutorial',
  'method',
  'lookup',
  'conversion-chart',
  'ready-values',
  'business',
  'technical',
  'basic',
  'advanced',
  'common-values',
] as const;
export type ArticleIntentType = (typeof articleIntentTypes)[number];

export type SearchArticle = {
  slug: string;
  unit: UnitType;
  pair: string;
  title: string;
  query: string;
  intent: string;
  intentType: ArticleIntentType;
};

type IntentMeta = {
  label: string;
  title: string;
  description: string;
};

export const intentMeta: Record<ArticleIntentType, IntentMeta> = {
  guide: {
    label: 'Гид',
    title: 'Гайды по конвертации',
    description: 'Разборы, пояснения и сценарии использования под информационный интент.',
  },
  table: {
    label: 'Таблицы',
    title: 'Таблицы популярных значений',
    description: 'Страницы с крупными таблицами готовых значений под быстрый поисковый интент.',
  },
  formula: {
    label: 'Формулы',
    title: 'Формулы и примеры',
    description: 'Статьи с формульным интентом, примерами расчётов и пояснениями.',
  },
  examples: {
    label: 'Примеры',
    title: 'Примеры конвертации',
    description: 'Статьи с готовыми примерами конвертации для типовых запросов.',
  },
  calculator: {
    label: 'Калькулятор',
    title: 'Калькуляторы по запросу',
    description: 'Страницы с калькуляторным интентом и быстрым переходом к расчёту.',
  },
  comparison: {
    label: 'Сравнение',
    title: 'Сравнения единиц',
    description: 'Материалы о сравнении единиц и их практического использования.',
  },
  'quick-answer': {
    label: 'Быстрый ответ',
    title: 'Быстрые ответы',
    description: 'Короткие страницы под мгновенный поисковый ответ.',
  },
  reference: {
    label: 'Справка',
    title: 'Справочные страницы',
    description: 'Справочные страницы по конвертации и единицам измерения.',
  },
  'how-to': {
    label: 'Как перевести',
    title: 'Как перевести: инструкции',
    description: 'Пошаговые материалы под запросы формата «как перевести».',
  },
  explained: {
    label: 'Объяснение',
    title: 'Объяснение конвертации',
    description: 'Статьи, которые объясняют логику перевода простым языком.',
  },
  cheatsheet: {
    label: 'Шпаргалка',
    title: 'Шпаргалки по конвертации',
    description: 'Компактные материалы с быстрыми значениями и ориентирами.',
  },
  faq: {
    label: 'FAQ',
    title: 'FAQ по конвертации',
    description: 'Страницы с вопросами и ответами под частые пользовательские запросы.',
  },
  practical: {
    label: 'Практика',
    title: 'Практическая конвертация',
    description: 'Практические статьи с бытовыми и рабочими сценариями.',
  },
  detailed: {
    label: 'Подробно',
    title: 'Подробные разборы',
    description: 'Длинные материалы с расширенными пояснениями и примерами.',
  },
  tutorial: {
    label: 'Инструкция',
    title: 'Инструкции по переводу единиц',
    description: 'Инструкционные статьи под обучающий интент.',
  },
  method: {
    label: 'Метод',
    title: 'Методы конвертации',
    description: 'Материалы о способах перевода и проверки результатов.',
  },
  lookup: {
    label: 'Подборка',
    title: 'Подборки значений',
    description: 'Подборки готовых значений для популярных конвертаций.',
  },
  'conversion-chart': {
    label: 'Чарт',
    title: 'Conversion charts',
    description: 'Чарт-страницы с готовыми диапазонами конвертации.',
  },
  'ready-values': {
    label: 'Готовые значения',
    title: 'Готовые значения',
    description: 'Страницы с готовыми ответами на частотные запросы.',
  },
  business: {
    label: 'Бизнес',
    title: 'Бизнес-сценарии',
    description: 'Страницы под коммерческое и рабочее использование единиц.',
  },
  technical: {
    label: 'Техника',
    title: 'Технические конвертации',
    description: 'Материалы с техническим интентом и инженерными примерами.',
  },
  basic: {
    label: 'База',
    title: 'Базовые конвертации',
    description: 'Простые статьи для начального понимания перевода единиц.',
  },
  advanced: {
    label: 'Расширенно',
    title: 'Расширенные конвертации',
    description: 'Более детальные материалы для продвинутых сценариев.',
  },
  'common-values': {
    label: 'Популярные значения',
    title: 'Популярные значения',
    description: 'Материалы, ориентированные на самые частые числовые значения.',
  },
};

const articleTitleByIntent: Record<ArticleIntentType, (fromName: string, toName: string) => string> = {
  guide: (fromName, toName) => `${fromName} в ${toName}: подробный разбор и примеры`,
  table: (fromName, toName) => `${fromName} в ${toName}: таблица популярных значений`,
  formula: (fromName, toName) => `${fromName} в ${toName}: формула, расчёт и примеры`,
  examples: (fromName, toName) => `${fromName} в ${toName}: примеры готовых расчётов`,
  calculator: (fromName, toName) => `${fromName} в ${toName}: калькулятор и быстрый результат`,
  comparison: (fromName, toName) => `${fromName} и ${toName}: сравнение единиц и перевод`,
  'quick-answer': (fromName, toName) => `${fromName} в ${toName}: быстрый ответ`,
  reference: (fromName, toName) => `${fromName} в ${toName}: справочная страница`,
  'how-to': (fromName, toName) => `Как перевести ${fromName.toLowerCase()} в ${toName.toLowerCase()}`,
  explained: (fromName, toName) => `${fromName} в ${toName}: простое объяснение`,
  cheatsheet: (fromName, toName) => `${fromName} в ${toName}: шпаргалка`,
  faq: (fromName, toName) => `${fromName} в ${toName}: вопросы и ответы`,
  practical: (fromName, toName) => `${fromName} в ${toName}: практические сценарии`,
  detailed: (fromName, toName) => `${fromName} в ${toName}: подробная статья`,
  tutorial: (fromName, toName) => `${fromName} в ${toName}: пошаговая инструкция`,
  method: (fromName, toName) => `${fromName} в ${toName}: метод перевода`,
  lookup: (fromName, toName) => `${fromName} в ${toName}: подборка значений`,
  'conversion-chart': (fromName, toName) => `${fromName} в ${toName}: chart значений`,
  'ready-values': (fromName, toName) => `${fromName} в ${toName}: готовые значения`,
  business: (fromName, toName) => `${fromName} в ${toName}: бизнес и рабочие расчёты`,
  technical: (fromName, toName) => `${fromName} в ${toName}: технический разбор`,
  basic: (fromName, toName) => `${fromName} в ${toName}: базовое объяснение`,
  advanced: (fromName, toName) => `${fromName} в ${toName}: расширенный материал`,
  'common-values': (fromName, toName) => `${fromName} в ${toName}: популярные значения`,
};

const articleIntentTextByIntent: Record<ArticleIntentType, (fromName: string, toName: string, fromCode: string, toCode: string) => string> = {
  guide: (fromName, toName) => `Как быстро перевести ${fromName.toLowerCase()} в ${toName.toLowerCase()} и где такая конвертация нужна чаще всего.`,
  table: (_fromName, _toName, fromCode, toCode) => `Готовая таблица значений для запроса «${fromCode} в ${toCode}» без ручного ввода и лишних действий.`,
  formula: (fromName, toName) => `Формула перевода ${fromName.toLowerCase()} в ${toName.toLowerCase()} с примерами и пояснениями по расчёту.`,
  examples: (fromName, toName) => `Подборка примеров для запроса «${fromName.toLowerCase()} в ${toName.toLowerCase()}» с типовыми сценариями использования.`,
  calculator: (fromName, toName) => `Калькулятор и пояснения для запроса «${fromName.toLowerCase()} в ${toName.toLowerCase()}».`,
  comparison: (fromName, toName) => `Сравнение единиц ${fromName.toLowerCase()} и ${toName.toLowerCase()} с быстрым переводом и пояснениями.`,
  'quick-answer': (_fromName, _toName, fromCode, toCode) => `Быстрый ответ на запрос «${fromCode} в ${toCode}» с готовыми значениями.`,
  reference: (fromName, toName) => `Справочная страница по переводу ${fromName.toLowerCase()} в ${toName.toLowerCase()}.`,
  'how-to': (fromName, toName) => `Пошаговая инструкция, как перевести ${fromName.toLowerCase()} в ${toName.toLowerCase()} без ошибок.`,
  explained: (fromName, toName) => `Простое объяснение, как работает перевод ${fromName.toLowerCase()} в ${toName.toLowerCase()}.`,
  cheatsheet: (_fromName, _toName, fromCode, toCode) => `Шпаргалка по запросу «${fromCode} в ${toCode}» с полезными ориентирами и быстрыми значениями.`,
  faq: (fromName, toName) => `Ответы на частые вопросы по переводу ${fromName.toLowerCase()} в ${toName.toLowerCase()}.`,
  practical: (fromName, toName) => `Практические сценарии и готовые примеры перевода ${fromName.toLowerCase()} в ${toName.toLowerCase()}.`,
  detailed: (fromName, toName) => `Подробный материал по теме ${fromName.toLowerCase()} в ${toName.toLowerCase()} с дополнительными пояснениями.`,
  tutorial: (fromName, toName) => `Инструкция для пользователей, которым нужен точный перевод ${fromName.toLowerCase()} в ${toName.toLowerCase()}.`,
  method: (fromName, toName) => `Метод перевода ${fromName.toLowerCase()} в ${toName.toLowerCase()} с советами по проверке результата.`,
  lookup: (_fromName, _toName, fromCode, toCode) => `Подборка готовых значений для быстрого поиска по запросу «${fromCode} в ${toCode}».`,
  'conversion-chart': (_fromName, _toName, fromCode, toCode) => `Conversion chart для запроса «${fromCode} в ${toCode}» с диапазонами и популярными значениями.`,
  'ready-values': (fromName, toName) => `Готовые значения для перевода ${fromName.toLowerCase()} в ${toName.toLowerCase()} без ручного расчёта.`,
  business: (fromName, toName) => `Коммерческие и рабочие сценарии, где нужен перевод ${fromName.toLowerCase()} в ${toName.toLowerCase()}.`,
  technical: (fromName, toName) => `Технический материал по переводу ${fromName.toLowerCase()} в ${toName.toLowerCase()} для точных задач.`,
  basic: (fromName, toName) => `Базовое объяснение перевода ${fromName.toLowerCase()} в ${toName.toLowerCase()} для начинающих.`,
  advanced: (fromName, toName) => `Расширенный материал по конвертации ${fromName.toLowerCase()} в ${toName.toLowerCase()} с дополнительными пояснениями.`,
  'common-values': (fromName, toName) => `Подборка популярных значений для перевода ${fromName.toLowerCase()} в ${toName.toLowerCase()}.`,
};

const priorityPairs: Record<UnitType, string[]> = {
  weight: ['kg-to-lb', 'lb-to-kg', 'g-to-kg', 'kg-to-g', 't-to-kg', 'oz-to-g'],
  length: ['m-to-ft', 'ft-to-m', 'km-to-mi', 'cm-to-in', 'in-to-cm', 'nmi-to-km'],
  pressure: ['bar-to-psi', 'psi-to-bar', 'kpa-to-bar', 'atm-to-kpa', 'mmhg-to-atm', 'mpa-to-bar'],
  area: ['m2-to-ha', 'ha-to-m2', 'ac-to-ha', 'km2-to-m2', 'ft2-to-m2', 'yd2-to-m2'],
  volume: ['l-to-ml', 'ml-to-l', 'gal-to-l', 'cup-to-ml', 'tbsp-to-ml', 'm3-to-l'],
  temperature: ['degc-to-degf', 'degf-to-degc', 'k-to-degc', 'degc-to-k', 'degf-to-k', 'k-to-degf'],
  speed: ['km-per-h-to-m-per-s', 'm-per-s-to-km-per-h', 'mph-to-km-per-h', 'knot-to-km-per-h', 'ft-per-s-to-m-per-s', 'km-per-h-to-mph'],
  time: ['s-to-min', 'min-to-h', 'h-to-d', 'd-to-h', 'wk-to-d', 'yr-to-d'],
  data: ['kb-to-mb', 'mb-to-gb', 'gb-to-mb', 'gib-to-gb', 'tb-to-gb', 'mib-to-mb'],
  energy: ['j-to-kj', 'kj-to-j', 'kwh-to-j', 'kcal-to-kj', 'wh-to-kwh', 'cal-to-j'],
};

export function getSearchArticles(): SearchArticle[] {
  return (Object.keys(priorityPairs) as UnitType[]).flatMap((unit) =>
    priorityPairs[unit]
      .map((pair) => {
        const page = getPairPage(unit, pair);
        if (!page) return null;
        return articleIntentTypes.map((intentType) => {
          return {
            slug: `${unit}-${pair}-${intentType}`,
            unit,
            pair,
            title: articleTitleByIntent[intentType](page.fromName, page.toName),
            query: `${page.fromCode} в ${page.toCode}`,
            intent: articleIntentTextByIntent[intentType](page.fromName, page.toName, page.fromCode, page.toCode),
            intentType,
          };
        });
      })
      .flat()
      .filter(Boolean) as SearchArticle[]
  );
}

export function getSearchArticlesByUnit(unit: UnitType) {
  return getSearchArticles().filter((article) => article.unit === unit);
}

export function getSearchArticlesByIntent(intentType: ArticleIntentType) {
  return getSearchArticles().filter((article) => article.intentType === intentType);
}

export function getSearchArticle(slug: string) {
  return getSearchArticles().find((item) => item.slug === slug);
}

export function getSearchArticleContent(slug: string) {
  const article = getSearchArticle(slug);
  if (!article) return null;

  const page = getPairPage(article.unit, article.pair);
  if (!page) return null;

  const tableValues = article.unit === 'temperature'
    ? [0, 10, 20, 25, 37, 50, 75, 100, 150, 273.15]
    : article.intentType === 'table'
      ? [1, 2, 3, 5, 10, 15, 20, 25, 50, 75, 100, 150, 200, 250, 500, 750, 1000, 5000]
      : [1, 2, 3, 5, 10, 15, 20, 25, 50, 75, 100, 250, 500, 1000];

  return {
    article,
    page,
    examples: calculatePairExamples(article.unit, page.from, page.to, tableValues),
    relatedPairs: getRelatedPairPages(article.unit, article.pair, 24),
    relatedArticles: getSearchArticles()
      .filter((item) => item.unit === article.unit && item.slug !== article.slug)
      .slice(0, 18),
  };
}
