import type { UnitType } from '@/lib/conversions';
import type { UnitOption } from '@/lib/conversions';
import { units } from '@/lib/conversions';
import { getUnitOptionCode } from '@/lib/programmatic-seo';
import type { UnitPairPage } from '@/lib/programmatic-seo';
import { guideArticles } from '@/lib/site';

export const locales = ['ru', 'kk', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';
export const indexedLocales = locales.filter((locale) => locale !== defaultLocale);

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Текущая локаль по pathname (для клиентских компонентов: Header, Footer) */
export function getLocaleFromPathname(pathname: string | null): Locale {
  if (!pathname) return 'ru';
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'lang' && segments[1] === 'kk') return 'kk';
  if (segments[0] === 'lang' && segments[1] === 'en') return 'en';
  return 'ru';
}

export const localeInfo: Record<Locale, { label: string; locale: string; siteTitle: string }> = {
  ru: { label: 'Русский', locale: 'ru', siteTitle: 'Converter Pro на русском' },
  kk: { label: 'Қазақша', locale: 'kk-KZ', siteTitle: 'Converter Pro қазақ тілінде' },
  en: { label: 'English', locale: 'en', siteTitle: 'Converter Pro in English' },
};

export function getLocalePath(locale: Locale, path = '') {
  const normalized = path.startsWith('/') || path === '' ? path : `/${path}`;
  return `/lang/${locale}${normalized}`;
}

const unitLabels: Record<Locale, Record<UnitType, { navLabel: string; title: string; shortDescription: string }>> = {
  ru: {
    weight: { navLabel: 'Вес', title: 'Конвертер веса и массы', shortDescription: 'Килограммы, граммы, тонны, фунты, унции и стоуны.' },
    length: { navLabel: 'Длина', title: 'Конвертер длины', shortDescription: 'Метры, километры, сантиметры, мили, футы и дюймы.' },
    pressure: { navLabel: 'Давление', title: 'Конвертер давления', shortDescription: 'Па, кПа, МПа, бар, атм, psi и мм рт. ст.' },
    area: { navLabel: 'Площадь', title: 'Конвертер площади', shortDescription: 'м², км², гектары, акры, квадратные футы и ярды.' },
    volume: { navLabel: 'Объём', title: 'Конвертер объёма', shortDescription: 'Литры, миллилитры, кубометры, чашки, ложки и галлоны.' },
    temperature: { navLabel: 'Температура', title: 'Конвертер температуры', shortDescription: 'Цельсий, Фаренгейт и Кельвин.' },
    speed: { navLabel: 'Скорость', title: 'Конвертер скорости', shortDescription: 'км/ч, м/с, mph, узлы и ft/s.' },
    time: { navLabel: 'Время', title: 'Конвертер времени', shortDescription: 'Секунды, минуты, часы, дни, недели, месяцы и годы.' },
    data: { navLabel: 'Данные', title: 'Конвертер данных', shortDescription: 'Байты, KB, MB, GB, TB, KiB, MiB и GiB.' },
    energy: { navLabel: 'Энергия', title: 'Конвертер энергии', shortDescription: 'Джоули, килоджоули, калории, ккал, Wh и kWh.' },
  },
  kk: {
    weight: { navLabel: 'Салмақ', title: 'Салмақ және масса конвертері', shortDescription: 'Килограмм, Миллиграмм, Грамм, Тонна, Фунт, Унция және Стоун.' },
    length: { navLabel: 'Ұзындық', title: 'Ұзындық конвертері', shortDescription: 'Метр, километр, сантиметр, миль, фут және дюйм.' },
    pressure: { navLabel: 'Қысым', title: 'Қысым конвертері', shortDescription: 'Па, кПа, МПа, bar, atm, psi және мм сын. бағ.' },
    area: { navLabel: 'Аудан', title: 'Аудан конвертері', shortDescription: 'м², км², гектар, акр, шаршы фут және ярд.' },
    volume: { navLabel: 'Көлем', title: 'Көлем конвертері', shortDescription: 'Литр, миллилитр, текше метр, cup, spoon және gallon.' },
    temperature: { navLabel: 'Температура', title: 'Температура конвертері', shortDescription: 'Цельсий, Фаренгейт және Кельвин.' },
    speed: { navLabel: 'Жылдамдық', title: 'Жылдамдық конвертері', shortDescription: 'км/сағ, м/с, mph, knot және ft/s.' },
    time: { navLabel: 'Уақыт', title: 'Уақыт конвертері', shortDescription: 'Секунд, минут, сағат, күн, апта, ай және жыл.' },
    data: { navLabel: 'Деректер', title: 'Деректер конвертері', shortDescription: 'Байт, KB, MB, GB, TB, KiB, MiB және GiB.' },
    energy: { navLabel: 'Энергия', title: 'Энергия конвертері', shortDescription: 'Джоуль, килоджоуль, калория, ккал, Wh және kWh.' },
  },
  en: {
    weight: { navLabel: 'Weight', title: 'Weight and Mass Converter', shortDescription: 'Kilograms, grams, tonnes, pounds, ounces, and stones.' },
    length: { navLabel: 'Length', title: 'Length Converter', shortDescription: 'Meters, kilometers, centimeters, miles, feet, and inches.' },
    pressure: { navLabel: 'Pressure', title: 'Pressure Converter', shortDescription: 'Pa, kPa, MPa, bar, atm, psi, and mmHg.' },
    area: { navLabel: 'Area', title: 'Area Converter', shortDescription: 'm², km², hectares, acres, square feet, and square yards.' },
    volume: { navLabel: 'Volume', title: 'Volume Converter', shortDescription: 'Liters, milliliters, cubic meters, cups, spoons, and gallons.' },
    temperature: { navLabel: 'Temperature', title: 'Temperature Converter', shortDescription: 'Celsius, Fahrenheit, and Kelvin.' },
    speed: { navLabel: 'Speed', title: 'Speed Converter', shortDescription: 'km/h, m/s, mph, knots, and ft/s.' },
    time: { navLabel: 'Time', title: 'Time Converter', shortDescription: 'Seconds, minutes, hours, days, weeks, months, and years.' },
    data: { navLabel: 'Data', title: 'Data Size Converter', shortDescription: 'Bytes, KB, MB, GB, TB, KiB, MiB, and GiB.' },
    energy: { navLabel: 'Energy', title: 'Energy Converter', shortDescription: 'Joules, kilojoules, calories, kcal, Wh, and kWh.' },
  },
};

export function getLocalizedUnit(locale: Locale, unit: UnitType) {
  return unitLabels[locale][unit];
}

export function getLocalizedPairCopy(locale: Locale, page: Pick<UnitPairPage, 'fromCode' | 'toCode' | 'fromName' | 'toName'>, unit: UnitType) {
  const unitLabel = getLocalizedUnit(locale, unit).navLabel;

  if (locale === 'en') {
    return {
      title: `${page.fromCode} to ${page.toCode} converter`,
      heading: `${page.fromCode} to ${page.toCode}`,
      description: `Convert ${page.fromName.toLowerCase()} to ${page.toName.toLowerCase()} instantly with examples, a calculator, and related ${unitLabel.toLowerCase()} conversions.`,
    };
  }

  if (locale === 'kk') {
    return {
      title: `${page.fromCode} - ${page.toCode} конвертері`,
      heading: `${page.fromCode} → ${page.toCode}`,
      description: `${page.fromName.toLowerCase()} мәнін ${page.toName.toLowerCase()} бірлігіне жылдам аударыңыз: мысалдар, калькулятор және ${unitLabel.toLowerCase()} бойынша ұқсас конвертациялар бір бетте.`,
    };
  }

  return {
    title: `${page.fromName} в ${page.toName}`,
    heading: `${page.fromName} → ${page.toName}`,
    description: `Быстро переведите ${page.fromName.toLowerCase()} в ${page.toName.toLowerCase()} с примерами, калькулятором и дополнительными конвертациями по теме «${unitLabel.toLowerCase()}».`,
  };
}

export const localeUi: Record<Locale, Record<string, string>> = {
  ru: {
    heroBadge: 'Единицы измерения',
    heroTitle: 'Конвертеры величин на русском',
    heroDescription: 'Выберите нужный конвертер, просматривайте сотни парных страниц или читайте статьи — без рекламы и регистрации.',
    converters: 'Все конвертеры',
    convertersBadge: 'Каталог конвертеров',
    popularPairs: 'Популярные конвертации',
    popularPairsDesc: 'Самые частые пары единиц — быстрый переход.',
    guides: 'Гайды',
    articles: 'Статьи',
    imageTools: 'Image Tools',
    faq: 'Частые вопросы',
    relatedQueries: 'Похожие запросы',
    valueTable: 'Таблица популярных значений',
    backToHub: 'К хабу',
    enterValue: 'Введите значение',
    conversion: 'Конвертация',
    from: 'Из',
    to: 'В',
    result: 'Результат',
    copyHint: 'Справа можно скопировать итог или поделиться им.',
    copiedHint: 'Скопировано только число результата.',
    sharedHint: 'Результат отправлен или скопирован.',
    examplePlaceholder: 'Например, 25',
    swap: 'Поменять местами',
    copy: 'Копировать результат',
    share: 'Поделиться результатом',
    fromUnitAria: 'Из какой единицы',
    toUnitAria: 'В какую единицу',
    siteSubtitle: 'Онлайн-конвертер единиц',
    convertersDropdown: 'Конвертеры',
    categories: 'Категории',
    themeLight: 'Включить светлую тему',
    themeDark: 'Включить тёмную тему',
    themeLightTitle: 'Светлая тема',
    themeDarkTitle: 'Тёмная тема',
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    footerTagline: 'Конвертация, справка и полезные материалы в одном месте.',
    footerDescription: 'Быстрый онлайн-конвертер единиц для повседневных задач, учёбы, работы и точных проверок.',
    footerPopularConverters: 'Популярные конвертеры',
    footerSections: 'Разделы сайта',
    footerAbout: 'О проекте',
    footerInfo: 'Информация',
    footerPrivacy: 'Политика конфиденциальности',
    footerTerms: 'Условия использования',
    footerContact: 'Контакты',
    footerPopularGuide: 'Популярный гайд',
    trustItem1: 'Мгновенный расчёт без перезагрузки',
    trustItem2: '10 категорий единиц в одном месте',
    trustItem3: 'Удобно на телефоне и на компьютере',
    homeHeroBadge: 'Быстро, чисто, без лишних шагов',
    homeHeroTitle: 'Точные конвертации',
    homeHeroTitleAccent: 'для любых задач',
    homeHeroLead: 'Один сервис для веса, длины, давления, температуры, времени, данных и других единиц. Откройте нужную категорию и начните считать сразу.',
    homeCtaPressure: 'Открыть конвертер давления',
    homeCtaAll: 'Смотреть все категории',
    homeStatCategories: 'категорий',
    homeStatCategoriesVal: 'основных конвертаций',
    homeStatGuides: 'гайда',
    homeStatGuidesVal: 'с примерами и пояснениями',
    homeStatSections: 'разделов',
    homeStatSectionsVal: 'для навигации и справки',
    homeOpenPage: 'Открыть страницу →',
    homeWhyConvenient: 'Почему это удобно',
    homeAllNearby: 'Всё нужное рядом',
    homePopularPairs: 'Популярные пары',
    homePopularPairsLink: 'Смотреть объясняющие гайды',
    homePair1Label: 'bar в psi',
    homePair1Desc: 'Для шин, компрессоров и манометров',
    homePair2Label: 'kg в lb',
    homePair2Desc: 'Для веса, логистики и спорта',
    homePair3Label: '°C в °F',
    homePair3Desc: 'Для поездок, техники и рецептов',
    homePair4Label: 'kWh в J',
    homePair4Desc: 'Для энергии, отопления и расчётов',
    homeScenarioTitle: 'Начните с популярного сценария',
    homeScenarioDesc: 'Откройте одну из частых конвертаций и получите результат за секунды.',
    homeGuidesTitle: 'Гайды и пояснения',
    homeFaqTitle: 'Ответы на частые вопросы',
    homeBenefitsTitle: 'Быстрый путь от ввода к точному результату',
    homeWhyDailyTitle: 'Почему Converter Pro удобен каждый день',
    homeUtilityKonverteryDesc: 'Полный каталог всех страниц конвертации.',
    homeUtilityArticlesDesc: 'Подборка материалов с примерами, пояснениями и таблицами.',
    homeUtilityGuidesDesc: 'Полезные статьи и справочные материалы.',
    homeUtilityFaqDesc: 'Ответы на частые вопросы.',
    homeUtilityAboutDesc: 'О сервисе и его возможностях.',
    homeUtilityImageToolsDesc: 'Массовое сжатие фото, удаление фона и сохранение прозрачности.',
    homeBenefit1: 'Мгновенный результат: ввёл число и сразу получил пересчёт.',
    homeBenefit2: '10 категорий единиц: от давления и веса до данных и энергии.',
    homeBenefit3: 'FAQ, статьи и гайды помогают быстро разобраться в нужной теме.',
    homeBenefit4: 'Интерфейс одинаково удобен на телефоне и на компьютере.',
    homeWhy1: 'Мгновенная конвертация без перезагрузки и без заполнения форм.',
    homeWhy2: 'Ясный интерфейс с крупными подписями и понятными действиями.',
    homeWhy3: 'Быстрые ссылки на популярные пары и связанные разделы.',
    homeWhy4: 'Одинаково удобно пользоваться одной рукой на телефоне и на широком экране.',
  },
  kk: {
    heroBadge: 'Өлшем бірліктері',
    heroTitle: 'Қазақшадағы өлшем конвертерлері',
    heroDescription: 'Конвертерді таңдаңыз, жүздеген жұп беттерін немесе мақалаларды пайдаланыңыз — тіркеусіз және жарнамасыз.',
    converters: 'Барлық конвертерлер',
    convertersBadge: 'Конвертерлер каталогы',
    popularPairs: 'Танымал конвертациялар',
    popularPairsDesc: 'Ең жиі іздейтін бірлік жұптары — бір рет басу жеткілікті.',
    guides: 'Нұсқаулықтар',
    articles: 'Мақалалар',
    imageTools: 'Image Tools',
    faq: 'Жиі сұрақтар',
    relatedQueries: 'Ұқсас сұраулар',
    valueTable: 'Танымал мәндер кестесі',
    backToHub: 'Хабқа оралу',
    enterValue: 'Мәнді енгізіңіз',
    conversion: 'Түрлендіру',
    from: 'Бастап',
    to: 'Дейін',
    result: 'Нәтиже',
    copyHint: 'Нәтижені оң жақтан көшіруге немесе бөлісуге болады.',
    copiedHint: 'Тек нәтиже саны көшірілді.',
    sharedHint: 'Нәтиже жіберілді немесе көшірілді.',
    examplePlaceholder: 'Мысалы, 25',
    swap: 'Орындарын ауыстыру',
    copy: 'Нәтижені көшіру',
    share: 'Нәтижемен бөлісу',
    fromUnitAria: 'Қай бірліктен',
    toUnitAria: 'Қай бірлікке',
    siteSubtitle: 'Онлайн өлшем конвертері',
    convertersDropdown: 'Конвертерлер',
    categories: 'Категориялар',
    themeLight: 'Жарық тақырыпты қосу',
    themeDark: 'Қараңғы тақырыпты қосу',
    themeLightTitle: 'Жарық тақырып',
    themeDarkTitle: 'Қараңғы тақырып',
    menuOpen: 'Мәзірді ашу',
    menuClose: 'Мәзірді жабу',
    footerTagline: 'Түрлендіру, анықтама және пайдалы материалдар бір жерде.',
    footerDescription: 'Күнделікті жұмыс, оқу және тексеру үшін жылдам өлшем бірліктері конвертері.',
    footerPopularConverters: 'Танымал конвертерлер',
    footerSections: 'Сайт бөлімдері',
    footerAbout: 'Жоба туралы',
    footerInfo: 'Ақпарат',
    footerPrivacy: 'Құпиялылық саясаты',
    footerTerms: 'Пайдалану шарттары',
    footerContact: 'Байланыс',
    footerPopularGuide: 'Танымал нұсқаулық',
    trustItem1: 'Жаңартпай деректеуді тез есептеу',
    trustItem2: '10 категория бірлік бір жерде',
    trustItem3: 'Телефонда және компьютерде ыңғайлы',
    homeHeroBadge: 'Жылдам, таза, қосымша қадамдарсыз',
    homeHeroTitle: 'Нақты түрлендірулер',
    homeHeroTitleAccent: 'кез келген міндеттер үшін',
    homeHeroLead: 'Салмақ, ұзындық, қысым, температура, уақыт, деректер және басқа бірліктер үшін бір сервис. Қажетті категорияны ашып, бірден есептеңіз.',
    homeCtaPressure: 'Қысым конвертерін ашу',
    homeCtaAll: 'Барлық категорияларды қарау',
    homeStatCategories: 'категория',
    homeStatCategoriesVal: 'негізгі түрлендірулер',
    homeStatGuides: 'нұсқаулық',
    homeStatGuidesVal: 'мысалдар мен түсініктемелермен',
    homeStatSections: 'бөлім',
    homeStatSectionsVal: 'навигация және анықтама үшін',
    homeOpenPage: 'Бетті ашу →',
    homeWhyConvenient: 'Неге ыңғайлы',
    homeAllNearby: 'Керектінің бәрі жақын',
    homePopularPairs: 'Танымал жұптар',
    homePopularPairsLink: 'Түсіндіретін нұсқаулықтарды қарау',
    homePair1Label: 'bar → psi',
    homePair1Desc: 'Шиналар, компрессорлар және манометрлер үшін',
    homePair2Label: 'kg → lb',
    homePair2Desc: 'Салмақ, логистика және спорт үшін',
    homePair3Label: '°C → °F',
    homePair3Desc: 'Сапарлар, техника және рецепттер үшін',
    homePair4Label: 'kWh → J',
    homePair4Desc: 'Энергия, жылыту және есептеулер үшін',
    homeScenarioTitle: 'Танымал сценарийден бастаңыз',
    homeScenarioDesc: 'Жиі түрлендірулердің бірін ашып, секундтар ішінде нәтиже алыңыз.',
    homeGuidesTitle: 'Нұсқаулықтар мен түсініктемелер',
    homeFaqTitle: 'Жиі қойылатын сұрақтарға жауаптар',
    homeBenefitsTitle: 'Енгізуден нақты нәтижеге жылдам жол',
    homeWhyDailyTitle: 'Неге Converter Pro күнделікті ыңғайлы',
    homeUtilityKonverteryDesc: 'Конвертацияның барлық беттерінің толық каталогы.',
    homeUtilityArticlesDesc: 'Мысалдар, түсініктемелер мен кестелермен материалдар жинағы.',
    homeUtilityGuidesDesc: 'Пайдалы мақалалар мен анықтамалық материалдар.',
    homeUtilityFaqDesc: 'Жиі қойылатын сұрақтарға жауаптар.',
    homeUtilityAboutDesc: 'Сервис және оның мүмкіндіктері туралы.',
    homeUtilityImageToolsDesc: 'Фотоны пакеттік қысу, фонды өшіру және мөлдірлікті сақтау.',
    homeBenefit1: 'Жылдам нәтиже: санды енгізіп, бірден қайта есептеуді алдыңыз.',
    homeBenefit2: '10 бірлік категориясы: қысым мен салмақтан деректер мен энергияға дейін.',
    homeBenefit3: 'Жиі сұрақтар, мақалалар мен нұсқаулықтар тақырыпты тез түсінуге көмектеседі.',
    homeBenefit4: 'Интерфейс телефонда да, компьютерде де бірдей ыңғайлы.',
    homeWhy1: 'Жаңартпай және формаларды толтырмай лезде түрлендіру.',
    homeWhy2: 'Үлкен жазулар мен түсінікті әрекеттері бар анық интерфейс.',
    homeWhy3: 'Танымал жұптар мен байланысты бөлімдерге жылдам сілтемелер.',
    homeWhy4: 'Телефонда бір қолмен де, кең экранда да бірдей ыңғайлы.',
  },
  en: {
    heroBadge: 'Unit converter',
    heroTitle: 'Convert units of measurement in English',
    heroDescription: 'Pick a converter, browse hundreds of pair pages, or read related articles — no ads, no sign-up.',
    converters: 'All converters',
    convertersBadge: 'Converter catalog',
    popularPairs: 'Popular conversions',
    popularPairsDesc: 'The most searched unit pairs, one click away.',
    guides: 'Guides',
    articles: 'Articles',
    imageTools: 'Image Tools',
    faq: 'FAQ',
    relatedQueries: 'Related queries',
    valueTable: 'Popular values table',
    backToHub: 'Back to hub',
    enterValue: 'Enter value',
    conversion: 'Conversion',
    from: 'From',
    to: 'To',
    result: 'Result',
    copyHint: 'You can copy or share the result using the buttons on the right.',
    copiedHint: 'Only the result number was copied.',
    sharedHint: 'Result shared or copied.',
    examplePlaceholder: 'e.g. 25',
    swap: 'Swap units',
    copy: 'Copy result',
    share: 'Share result',
    fromUnitAria: 'From unit',
    toUnitAria: 'To unit',
    siteSubtitle: 'Online unit converter',
    convertersDropdown: 'Converters',
    categories: 'Categories',
    themeLight: 'Switch to light theme',
    themeDark: 'Switch to dark theme',
    themeLightTitle: 'Light theme',
    themeDarkTitle: 'Dark theme',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    footerTagline: 'Conversion, reference and useful materials in one place.',
    footerDescription: 'Fast online unit converter for everyday tasks, study, work and accurate checks.',
    footerPopularConverters: 'Popular converters',
    footerSections: 'Site sections',
    footerAbout: 'About',
    footerInfo: 'Information',
    footerPrivacy: 'Privacy policy',
    footerTerms: 'Terms of use',
    footerContact: 'Contact',
    footerPopularGuide: 'Popular guide',
    trustItem1: 'Instant calculation without reload',
    trustItem2: '10 unit categories in one place',
    trustItem3: 'Convenient on phone and computer',
    homeHeroBadge: 'Fast, clean, no extra steps',
    homeHeroTitle: 'Accurate conversions',
    homeHeroTitleAccent: 'for any task',
    homeHeroLead: 'One service for weight, length, pressure, temperature, time, data and other units. Open the category you need and start calculating right away.',
    homeCtaPressure: 'Open pressure converter',
    homeCtaAll: 'View all categories',
    homeStatCategories: 'categories',
    homeStatCategoriesVal: 'main conversions',
    homeStatGuides: 'guides',
    homeStatGuidesVal: 'with examples and explanations',
    homeStatSections: 'sections',
    homeStatSectionsVal: 'for navigation and reference',
    homeOpenPage: 'Open page →',
    homeWhyConvenient: 'Why it\'s convenient',
    homeAllNearby: 'Everything you need nearby',
    homePopularPairs: 'Popular pairs',
    homePopularPairsLink: 'View guides',
    homePair1Label: 'bar to psi',
    homePair1Desc: 'For tires, compressors and gauges',
    homePair2Label: 'kg to lb',
    homePair2Desc: 'For weight, logistics and sports',
    homePair3Label: '°C to °F',
    homePair3Desc: 'For travel, tech and recipes',
    homePair4Label: 'kWh to J',
    homePair4Desc: 'For energy, heating and calculations',
    homeScenarioTitle: 'Start with a popular scenario',
    homeScenarioDesc: 'Open one of the common conversions and get the result in seconds.',
    homeGuidesTitle: 'Guides and explanations',
    homeFaqTitle: 'Frequently asked questions',
    homeBenefitsTitle: 'Fast path from input to accurate result',
    homeWhyDailyTitle: 'Why Converter Pro is convenient every day',
    homeUtilityKonverteryDesc: 'Full catalog of all conversion pages.',
    homeUtilityArticlesDesc: 'Collection of materials with examples and tables.',
    homeUtilityGuidesDesc: 'Useful articles and reference materials.',
    homeUtilityFaqDesc: 'Answers to frequent questions.',
    homeUtilityAboutDesc: 'About the service and its features.',
    homeUtilityImageToolsDesc: 'Batch image compression, background removal, and transparency preservation.',
    homeBenefit1: 'Instant result: enter a number and get the conversion immediately.',
    homeBenefit2: '10 unit categories: from pressure and weight to data and energy.',
    homeBenefit3: 'FAQ, articles and guides help you get up to speed on any topic.',
    homeBenefit4: 'The interface is equally convenient on phone and computer.',
    homeWhy1: 'Instant conversion without reload or form filling.',
    homeWhy2: 'Clear interface with large labels and clear actions.',
    homeWhy3: 'Quick links to popular pairs and related sections.',
    homeWhy4: 'Equally easy to use one-handed on phone or on a large screen.',
  },
};

/** Маппинг href полезных разделов → ключи label/description в localeUi */
export const homeUtilityKeys: Record<string, { labelKey: string; descKey: string }> = {
  '/konvertery': { labelKey: 'converters', descKey: 'homeUtilityKonverteryDesc' },
  '/articles': { labelKey: 'articles', descKey: 'homeUtilityArticlesDesc' },
  '/guides': { labelKey: 'guides', descKey: 'homeUtilityGuidesDesc' },
  '/faq': { labelKey: 'faq', descKey: 'homeUtilityFaqDesc' },
  '/about': { labelKey: 'footerAbout', descKey: 'homeUtilityAboutDesc' },
  '/image-tools': { labelKey: 'imageTools', descKey: 'homeUtilityImageToolsDesc' },
};

/** Коды единиц (из label, напр. kg, mg) → локализованное название (без скобок) */
const unitOptionNames: Record<Locale, Partial<Record<UnitType, Record<string, string>>>> = {
  ru: {},
  kk: {
    weight: { kg: 'Килограмм', mg: 'Миллиграмм', g: 'Грамм', t: 'Тонна', lb: 'Фунт', oz: 'Унция', st: 'Стоун' },
    length: { mm: 'Миллиметр', cm: 'Сантиметр', m: 'Метр', km: 'Километр', mi: 'Миль', ft: 'Фут', yd: 'Ярд', in: 'Дюйм', nmi: 'Теңіз милі' },
    pressure: { pa: 'Паскаль', kpa: 'Килопаскаль', mpa: 'Мегапаскаль', bar: 'Бар', atm: 'Атмосфера', psi: 'PSI', mmhg: 'Мм сын. бағ.' },
    area: { 'm2': 'Шаршы метр', 'cm2': 'Шаршы сантиметр', ha: 'Гектар', 'km2': 'Шаршы километр', ac: 'Акр', 'ft2': 'Шаршы фут', 'yd2': 'Шаршы ярд' },
    volume: { ml: 'Миллилитр', l: 'Литр', 'm3': 'Текше метр', tsp: 'Шай қасық', tbsp: 'Ас қасық', cup: 'Кесе', gal: 'Галлон' },
    temperature: { degc: 'Цельсий', degf: 'Фаренгейт', k: 'Кельвин' },
    speed: { 'm-per-s': 'Метр/секунд', 'km-per-h': 'км/сағ', mph: 'миль/сағ', knot: 'Түйін', 'ft-per-s': 'Фут/секунд' },
    time: { s: 'Секунд', min: 'Минут', h: 'Сағат', d: 'Күн', wk: 'Апта', mo: 'Ай', yr: 'Жыл' },
    data: { b: 'Байт', kb: 'Килобайт', mb: 'Мегабайт', gb: 'Гигабайт', tb: 'Терабайт', kib: 'Кибибайт', mib: 'Мебибайт', gib: 'Гибибайт' },
    energy: { j: 'Джоуль', kj: 'Килоджоуль', cal: 'Калория', kcal: 'Килокалория', wh: 'Ватт-сағат', kwh: 'Киловатт-сағат' },
  },
  en: {
    weight: { kg: 'Kilogram', mg: 'Milligram', g: 'Gram', t: 'Ton', lb: 'Pound', oz: 'Ounce', st: 'Stone' },
    length: { mm: 'Millimeter', cm: 'Centimeter', m: 'Meter', km: 'Kilometer', mi: 'Mile', ft: 'Foot', yd: 'Yard', in: 'Inch', nmi: 'Nautical mile' },
    pressure: { pa: 'Pascal', kpa: 'Kilopascal', mpa: 'Megapascal', bar: 'Bar', atm: 'Atmosphere', psi: 'PSI', mmhg: 'mmHg' },
    area: { 'm2': 'Square meter', 'cm2': 'Square centimeter', ha: 'Hectare', 'km2': 'Square kilometer', ac: 'Acre', 'ft2': 'Square foot', 'yd2': 'Square yard' },
    volume: { ml: 'Milliliter', l: 'Liter', 'm3': 'Cubic meter', tsp: 'Teaspoon', tbsp: 'Tablespoon', cup: 'Cup', gal: 'Gallon' },
    temperature: { degc: 'Celsius', degf: 'Fahrenheit', k: 'Kelvin' },
    speed: { 'm-per-s': 'Meter/sec', 'km-per-h': 'km/h', mph: 'mph', knot: 'Knot', 'ft-per-s': 'ft/s' },
    time: { s: 'Second', min: 'Minute', h: 'Hour', d: 'Day', wk: 'Week', mo: 'Month', yr: 'Year' },
    data: { b: 'Byte', kb: 'Kilobyte', mb: 'Megabyte', gb: 'Gigabyte', tb: 'Terabyte', kib: 'Kibibyte', mib: 'Mebibyte', gib: 'Gibibyte' },
    energy: { j: 'Joule', kj: 'Kilojoule', cal: 'Calorie', kcal: 'Kilocalorie', wh: 'Watt-hour', kwh: 'Kilowatt-hour' },
  },
};

function getUnitOptionNameRu(option: UnitOption) {
  return option.label.replace(/\s*\([^)]*\)/, '').trim();
}

export function getLocalizedUnitOptionName(locale: Locale, unitType: UnitType, option: UnitOption): string {
  const code = getUnitOptionCode(option);
  const localized = unitOptionNames[locale]?.[unitType]?.[code];
  return localized ?? getUnitOptionNameRu(option);
}

export function getLocalizedUnits(locale: Locale, unitType: UnitType): UnitOption[] {
  return units[unitType].map((u) => {
    const name = getLocalizedUnitOptionName(locale, unitType, u);
    const code = getUnitOptionCode(u);
    return { ...u, label: `${name} (${code})` };
  });
}

const localizedGuideMap: Record<Exclude<Locale, 'ru'>, Record<string, { title: string; description: string; category: string; sections: Array<{ title: string; body: string }> }>> = {
  kk: {
    'pressure-bar-psi-guide': {
      title: 'bar, psi және kPa мәндерін қателіксіз қалай тез аударуға болады',
      description: 'Шиналар, компрессорлар, сорғылар және жабдық үшін қысымды қайта есептеу бойынша практикалық нұсқаулық.',
      category: 'Қысым',
      sections: [
        { title: 'Қысымды қашан тез аудару керек', body: 'Қысымды аудару шиналарды тексергенде, компрессорларды баптағанда, сорғылармен, қазандықтармен, манометрлермен және техникалық құжаттармен жұмыс істегенде қажет.' },
        { title: 'Қандай жұптар жиі кездеседі', body: 'Көбіне bar → psi, psi → bar, kPa → bar, atm → kPa және mmHg → atm жұптары қолданылады.' },
        { title: 'Конвертерді қалай тиімді қолдану керек', body: 'Негізгі мәнді енгізіп, бағытты ауыстырып, шиналар нормасын, жабдық параметрлерін және нұсқаулықтағы мәндерді салыстырыңыз.' },
      ],
    },
    'metric-imperial-length': {
      title: 'Метрлік және империялық ұзындық: қашан және қалай аудару керек',
      description: 'Метр, километр, фут, ярд және дюймді түсінікті түрде салыстыру.',
      category: 'Ұзындық',
      sections: [
        { title: 'Неге қиындық туады', body: 'Қазақстанда метрлік жүйе кең таралған, бірақ шетелдік нұсқаулықтар мен тауарларда фут, дюйм, ярд және миль жиі кездеседі.' },
        { title: 'Дәлдік қайда маңызды', body: 'Жөндеу, құрылыс, интерьер, логистика және спорт үшін дәлдік өте маңызды.' },
        { title: 'Практикалық кеңес', body: 'Алдымен негізгі бірлікті анықтап алыңыз: тұрмыста сантиметр немесе метр, сапарда километр ыңғайлы.' },
      ],
    },
    'data-units-explained': {
      title: 'KB, MB, GB, KiB, MiB: деректер бірліктерін шатастырмау жолы',
      description: 'Файлдар, дисктер және трафик үшін ондық және екілік бірліктердің қысқаша түсіндірмесі.',
      category: 'Деректер',
      sections: [
        { title: 'Неге бір сан әртүрлі көрінеді', body: 'Жинақтауыш өндірушілері көбіне ондық бірліктерді, ал жүйелер екілік бірліктерді қолданады.' },
        { title: 'KiB, MiB және GiB қашан маңызды', body: 'Бұл бірліктер әзірлеушілерге, жүйе әкімшілеріне және үлкен деректермен жұмыс істейтіндерге керек.' },
        { title: 'Шатаспау үшін не істеу керек', body: 'Күнделікті деңгейде MB және GB жеткілікті, ал техникалық есептерде MiB және GiB мәндерін де тексерген дұрыс.' },
      ],
    },
    'temperature-travel-lifehacks': {
      title: 'Цельсий, Фаренгейт және Кельвин: сапар мен оқу үшін жылдам бағдар',
      description: 'Әртүрлі температура шкалаларын қолмен есептеусіз түсінудің оңай жолы.',
      category: 'Температура',
      sections: [
        { title: 'Бұл қайда жиі кездеседі', body: 'Фаренгейт ағылшын тілді сервистерде, ал Кельвин ғылым мен техникада жиі кездеседі.' },
        { title: 'Неге конвертер керек', body: 'Ол формуладағы қателікті азайтады және уақытты үнемдейді.' },
        { title: 'Практикада қалай қолдану керек', body: 'Бағыттарды ауыстырып, бірнеше мәнді қатар салыстырыңыз — бұл сапарға да, техникаға да ыңғайлы.' },
      ],
    },
  },
  en: {
    'pressure-bar-psi-guide': {
      title: 'How to convert bar, psi, and kPa quickly without mistakes',
      description: 'A practical guide to pressure conversion for tires, compressors, pumps, and equipment.',
      category: 'Pressure',
      sections: [
        { title: 'When fast pressure conversion matters', body: 'Pressure conversion is needed for tire checks, compressor settings, pumps, boilers, gauges, and technical documentation.' },
        { title: 'The most common unit pairs', body: 'Users most often compare bar to psi, psi to bar, kPa to bar, atm to kPa, and mmHg to atm.' },
        { title: 'How to use the converter efficiently', body: 'Enter a base value, swap direction in one click, and compare tire norms, equipment ranges, and documentation values.' },
      ],
    },
    'metric-imperial-length': {
      title: 'Metric vs imperial length: what to use and how to convert',
      description: 'A clear explanation of meters, kilometers, feet, yards, and inches.',
      category: 'Length',
      sections: [
        { title: 'Why confusion happens', body: 'Kazakhstan mainly uses metric units, but global products and manuals still show feet, inches, yards, and miles.' },
        { title: 'Where precision matters', body: 'Precision matters in renovation, construction, interior design, logistics, and sports.' },
        { title: 'A practical tip', body: 'Choose one base unit first. For daily tasks use centimeters or meters; for travel use kilometers.' },
      ],
    },
    'data-units-explained': {
      title: 'KB, MB, GB, KiB, MiB: how not to get confused by data units',
      description: 'A short guide to decimal and binary data units for files, storage, and traffic.',
      category: 'Data',
      sections: [
        { title: 'Why the same number can look different', body: 'Storage vendors often use decimal units while operating systems may display binary units.' },
        { title: 'When KiB, MiB, and GiB matter', body: 'These units are useful for developers, system administrators, and anyone working with memory or virtual machines.' },
        { title: 'How to avoid confusion', body: 'For common consumer tasks MB and GB are usually enough, but technical workflows should also check MiB and GiB.' },
      ],
    },
    'temperature-travel-lifehacks': {
      title: 'Celsius, Fahrenheit, and Kelvin: a quick guide for travel and learning',
      description: 'How to understand different temperature scales without manual formulas.',
      category: 'Temperature',
      sections: [
        { title: 'Where you see them most often', body: 'Fahrenheit appears in many English-language apps and services, while Kelvin is common in science and engineering.' },
        { title: 'Why a converter helps', body: 'It saves time and reduces formula errors when you need to interpret a value instantly.' },
        { title: 'How to use it in practice', body: 'Switch directions, compare several values, and use it for travel, climate devices, and study.' },
      ],
    },
  },
};

export function getLocalizedGuide(locale: Locale, slug: string) {
  const article = guideArticles.find((item) => item.slug === slug);
  if (!article) return null;

  if (locale === 'ru') {
    return {
      title: article.title,
      description: article.description,
      category: article.category,
      sections: article.sections,
    };
  }

  return localizedGuideMap[locale][slug] ?? null;
}
