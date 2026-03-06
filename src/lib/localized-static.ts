import type { Locale } from '@/lib/i18n';
import type { FaqItem } from '@/lib/site';

export type LocalizedFaqContent = {
  title: string;
  description: string;
  body: string[];
  items: FaqItem[];
};

export const localizedStaticContent: Record<Locale, Record<'about' | 'contact' | 'privacy' | 'terms', { title: string; description: string; body: string[] }> & { faq: LocalizedFaqContent }> = {
  ru: {
    about: {
      title: 'О проекте Converter Pro',
      description: 'Информация о проекте и его возможностях.',
      body: [
        'Converter Pro создан как быстрый и понятный сервис для перевода единиц измерения в повседневных и рабочих сценариях.',
        'Помимо калькуляторов, сайт включает справочные материалы, гайды и страницы с популярными парами конвертации.',
      ],
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      description: 'Ответы на частые вопросы о Converter Pro.',
      body: [
        'Сайт работает без внешних API и без обязательной регистрации.',
        'На страницах есть примеры, таблицы значений и быстрые ссылки на связанные конвертации.',
      ],
      items: [
        { question: 'Что умеет Converter Pro?', answer: 'Сервис переводит 10 категорий величин: давление, длину, вес, площадь, объём, температуру, скорость, время, данные и энергию. Каждая страница содержит таблицу соответствий и примеры расчётов.' },
        { question: 'Нужно ли что-то устанавливать?', answer: 'Нет, сервис работает прямо в браузере на телефоне, планшете и компьютере. Регистрация и установка приложений не требуются.' },
        { question: 'Насколько быстро работает пересчёт?', answer: 'Результат появляется сразу после ввода значения или смены единицы измерения. Все вычисления выполняются локально в браузере.' },
        { question: 'Какие страницы самые популярные?', answer: 'Чаще всего используют конвертеры давления (bar, psi, kPa), веса (кг, фунты), длины (метры, футы) и температуры (Цельсий, Фаренгейт).' },
        { question: 'Насколько точны результаты конвертации?', answer: 'Расчёты основаны на точных формулах. Для критически важных задач рекомендуем дополнительно проверять значения по официальным источникам.' },
        { question: 'Работает ли конвертер на мобильных устройствах?', answer: 'Да, сайт адаптирован под смартфоны и планшеты. Все функции доступны без ограничений.' },
        { question: 'Сохраняются ли введённые данные?', answer: 'Значения хранятся только в текущей сессии браузера. Мы не передаём введённые данные на сервер.' },
        { question: 'Есть ли ссылки на связанные конвертеры?', answer: 'Да, на каждой странице есть блок «Связанные конвертеры» с быстрыми переходами к смежным категориям.' },
        { question: 'Где найти справочные материалы?', answer: 'Разделы «Гайды» и «Статьи» содержат практические материалы, таблицы и примеры по конвертации.' },
        { question: 'Показывается ли реклама?', answer: 'Сервис может показывать рекламные блоки для поддержки разработки. Они не влияют на точность расчётов.' },
      ],
    },
    contact: {
      title: 'Контакты',
      description: 'Локализованные контакты проекта.',
      body: [
        'Для предложений по новым категориям, страницам и статьям можно использовать редакционные контакты проекта.',
        'Раздел помогает быстро связаться с командой по вопросам сотрудничества и улучшения сервиса.',
      ],
    },
    privacy: {
      title: 'Политика конфиденциальности',
      description: 'Локализованная политика конфиденциальности.',
      body: [
        'Converter Pro использует минимально необходимую техническую информацию для стабильной работы и улучшения пользовательского опыта.',
        'Страницы сервиса построены вокруг полезного контента и удобной навигации без обязательных персональных сценариев.',
      ],
    },
    terms: {
      title: 'Условия использования',
      description: 'Локализованные условия использования сервиса.',
      body: [
        'Сервис предназначен для информационных и справочных задач, связанных с переводом единиц измерения.',
        'Пользователь должен дополнительно проверять данные для критически важных инженерных, медицинских и юридических задач.',
      ],
    },
  },
  kk: {
    about: {
      title: 'Converter Pro жобасы туралы',
      description: 'Жоба және оның мүмкіндіктері туралы ақпарат.',
      body: [
        'Converter Pro өлшем бірліктерін күнделікті және жұмыс сценарийлерінде жылдам түрлендіруге арналған.',
        'Негізгі мақсат — жалпы конвертация сұрауын ғана емес, нақты іздеу ниеттерін де жабу.',
      ],
    },
    faq: {
      title: 'Жиі сұрақтар',
      description: 'Converter Pro туралы жиі қойылатын сұрақтар.',
      body: [
        'Сайт сыртқы API қолданбайды және міндетті тіркеуді талап етпейді.',
        'Барлық беттерде мысалдар, мәндер кестесі және байланысты конвертациялар бар.',
      ],
      items: [
        { question: 'Converter Pro не істейді?', answer: 'Сервис 10 категориядағы шамаларды түрлендіреді: қысым, ұзындық, салмақ, аудан, көлем, температура, жылдамдық, уақыт, деректер және энергия. Әр бетте сәйкестіктер кестесі және есептеу мысалдары бар.' },
        { question: 'Бірдеңе орнату керек пе?', answer: 'Жоқ, сервис телефоныңызда, планшетте және компьютерде браузерде тікелей жұмыс істейді. Тіркеу және қосымша орнату талап етілмейді.' },
        { question: 'Есептеу қаншалықты жылдам?', answer: 'Мән енгізілген немесе бірлік өзгертілген сәтте нәтиже пайда болады. Барлық есептеулер браузерде жергілікті түрде орындалады.' },
        { question: 'Қандай беттер ең танымал?', answer: 'Көбінесе қысым (bar, psi, kPa), салмақ (кг, фунт), ұзындық (метр, фут) және температура (Цельсий, Фаренгейт) конвертерлері қолданылады.' },
        { question: 'Нәтижелер қаншалықты дәл?', answer: 'Есептеулер нақты формулаларға негізделген. Маңызды міндеттер үшін мәндерді ресми көздерден қосымша тексеру ұсынылады.' },
        { question: 'Конвертер мобильді құрылғыларда жұмыс істей ме?', answer: 'Иә, сайт смартфондар мен планшеттерге бейімделген. Барлық функциялар шектеусіз қол жетімді.' },
        { question: 'Енгізілген деректер сақтала ма?', answer: 'Мәндер тек браузердің ағымдағы сессиясында сақталады. Біз енгізілген деректерді серверге жібермейміз.' },
        { question: 'Байланысты конвертерлерге сілтемелер бар ма?', answer: 'Иә, әр бетте «Байланысты конвертерлер» блогы бар, қатынас категорияларға жылдам өтулермен.' },
        { question: 'Анықтамалық материалдар қайда?', answer: '«Нұсқаулар» және «Мақалалар» бөлімдерінде түрлендіру бойынша тәжірибелік материалдар, кестелер және мысалдар бар.' },
        { question: 'Жарнама көрсетіледі ме?', answer: 'Сервис әзірлеуді қолдау үшін жарнамалық блоктарды көрсете алады. Олар есептеу дәлдігіне әсер етпейді.' },
      ],
    },
    contact: {
      title: 'Байланыс',
      description: 'Converter Pro командасымен байланысу.',
      body: [
        'Жаңа конвертер немесе мақала ұсынысы болса, редакциялық байланыс арқылы жіберуге болады.',
        'Барлық хабарламаларды оқимыз және бірнеше жұмыс күні ішінде жауап береміз.',
      ],
    },
    privacy: {
      title: 'Құпиялылық саясаты',
      description: 'Жергіліктендірілген құпиялылық саясаты.',
      body: [
        'Converter Pro тұрақты жұмыс пен пайдаланушы тәжірибесін жақсарту үшін тек минималды техникалық ақпаратты қолданады.',
        'Сервис пайдалы контентке және ыңғайлы навигацияға негізделген.',
      ],
    },
    terms: {
      title: 'Пайдалану шарттары',
      description: 'Сервисті пайдалану шарттарының жергіліктендірілген нұсқасы.',
      body: [
        'Сервис өлшем бірліктерін түрлендіруге арналған ақпараттық және анықтамалық құрал ретінде ұсынылады.',
        'Маңызды инженерлік, медициналық және құқықтық есептер үшін деректерді қосымша тексеру керек.',
      ],
    },
  },
  en: {
    about: {
      title: 'About Converter Pro',
      description: 'A free unit conversion tool for everyday and technical use.',
      body: [
        'Converter Pro is a free unit conversion tool for everyday tasks and technical work. It covers ten categories: weight, length, pressure, area, volume, temperature, speed, time, data, and energy.',
        'Every converter includes a reference table, worked examples, and related articles — all in one place, no registration needed.',
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Answers to common questions about Converter Pro.',
      body: [
        'All conversions happen instantly in your browser — no account or external API is needed.',
        'Values are calculated from precise formulas. Every page includes a reference table and practical examples.',
      ],
      items: [
        { question: 'What does Converter Pro do?', answer: 'The service converts 10 categories of units: pressure, length, weight, area, volume, temperature, speed, time, data, and energy. Each page includes a reference table and calculation examples.' },
        { question: 'Do I need to install anything?', answer: 'No, the service runs directly in your browser on phone, tablet, and computer. No registration or app installation required.' },
        { question: 'How fast is the conversion?', answer: 'Results appear instantly after entering a value or changing the unit. All calculations run locally in the browser.' },
        { question: 'Which pages are most popular?', answer: 'Users most often use pressure (bar, psi, kPa), weight (kg, lb), length (meters, feet), and temperature (Celsius, Fahrenheit) converters.' },
        { question: 'How accurate are the results?', answer: 'Calculations are based on precise formulas. For critical tasks, we recommend verifying values against official sources.' },
        { question: 'Does the converter work on mobile?', answer: 'Yes, the site is adapted for smartphones and tablets. All features are available without restrictions.' },
        { question: 'Are entered values saved?', answer: 'Values are stored only in the current browser session. We do not send entered data to the server.' },
        { question: 'Are there links to related converters?', answer: 'Yes, each page has a "Related converters" block with quick links to adjacent categories.' },
        { question: 'Where can I find reference materials?', answer: 'The "Guides" and "Articles" sections contain practical materials, tables, and examples on conversion.' },
        { question: 'Is there advertising?', answer: 'The service may show ad blocks to support development. They do not affect calculation accuracy.' },
      ],
    },
    contact: {
      title: 'Contact',
      description: 'Get in touch with the Converter Pro team.',
      body: [
        'Got a suggestion for a new converter or spotted an error? Reach out through the editorial contact section.',
        'We read all messages and try to respond within a few business days.',
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'How Converter Pro handles your data.',
      body: [
        'Converter Pro collects only the minimum technical data needed for stable operation — no personal profiles, no tracking pixels.',
        'Pages are built around useful content and smooth navigation. No mandatory sign-up workflows are present.',
      ],
    },
    terms: {
      title: 'Terms of Use',
      description: 'Terms governing use of the Converter Pro service.',
      body: [
        'The service is intended for informational and reference tasks related to unit conversion.',
        'Users should verify values independently for critical engineering, medical, and legal cases.',
      ],
    },
  },
};
