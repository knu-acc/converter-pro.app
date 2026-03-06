export type UnitOption = {
  label: string;
  value: number | string;
  symbol: string;
};

export const units = {
  weight: [
    { label: 'Килограмм (kg)', value: 1, symbol: 'кг' },
    { label: 'Миллиграмм (mg)', value: 0.000001, symbol: 'мг' },
    { label: 'Грамм (g)', value: 0.001, symbol: 'г' },
    { label: 'Метрическая тонна (t)', value: 1000, symbol: 'т' },
    { label: 'Фунт (lb)', value: 0.453592, symbol: 'lb' },
    { label: 'Унция (oz)', value: 0.0283495, symbol: 'oz' },
    { label: 'Стоун (st)', value: 6.35029, symbol: 'st' },
  ],
  length: [
    { label: 'Миллиметр (mm)', value: 0.001, symbol: 'мм' },
    { label: 'Сантиметр (cm)', value: 0.01, symbol: 'см' },
    { label: 'Метр (m)', value: 1, symbol: 'м' },
    { label: 'Километр (km)', value: 1000, symbol: 'км' },
    { label: 'Миля (mi)', value: 1609.34, symbol: 'ми' },
    { label: 'Фут (ft)', value: 0.3048, symbol: 'фт' },
    { label: 'Ярд (yd)', value: 0.9144, symbol: 'ярд' },
    { label: 'Дюйм (in)', value: 0.0254, symbol: 'д' },
    { label: 'Морская миля (nmi)', value: 1852, symbol: 'nmi' },
  ],
  pressure: [
    { label: 'Паскаль (Pa)', value: 1, symbol: 'Па' },
    { label: 'Килопаскаль (kPa)', value: 1000, symbol: 'кПа' },
    { label: 'Мегапаскаль (MPa)', value: 1000000, symbol: 'МПа' },
    { label: 'Бар (bar)', value: 100000, symbol: 'бар' },
    { label: 'Атмосфера (atm)', value: 101325, symbol: 'атм' },
    { label: 'PSI (psi)', value: 6894.76, symbol: 'psi' },
    { label: 'Мм рт. ст. (mmHg)', value: 133.322, symbol: 'мм рт. ст.' },
  ],
  area: [
    { label: 'Кв. метр (m²)', value: 1, symbol: 'м²' },
    { label: 'Кв. сантиметр (cm²)', value: 0.0001, symbol: 'см²' },
    { label: 'Гектар (ha)', value: 10000, symbol: 'га' },
    { label: 'Кв. километр (km²)', value: 1000000, symbol: 'км²' },
    { label: 'Акр (ac)', value: 4046.86, symbol: 'акр' },
    { label: 'Кв. фут (ft²)', value: 0.092903, symbol: 'фт²' },
    { label: 'Кв. ярд (yd²)', value: 0.836127, symbol: 'ярд²' },
  ],
  volume: [
    { label: 'Миллилитр (ml)', value: 0.001, symbol: 'мл' },
    { label: 'Литр (l)', value: 1, symbol: 'л' },
    { label: 'Куб. метр (m³)', value: 1000, symbol: 'м³' },
    { label: 'Чайная ложка (tsp)', value: 0.00492892, symbol: 'ч.л.' },
    { label: 'Столовая ложка (tbsp)', value: 0.0147868, symbol: 'ст.л.' },
    { label: 'Чашка (cup)', value: 0.236588, symbol: 'cup' },
    { label: 'Галлон (gal)', value: 3.78541, symbol: 'гал' },
  ],
  temperature: [
    { label: 'Цельсий (°C)', value: 'C', symbol: '°C' },
    { label: 'Фаренгейт (°F)', value: 'F', symbol: '°F' },
    { label: 'Кельвин (K)', value: 'K', symbol: 'K' },
  ],
  speed: [
    { label: 'Метр в секунду (m/s)', value: 1, symbol: 'м/с' },
    { label: 'Километр в час (km/h)', value: 0.277778, symbol: 'км/ч' },
    { label: 'Миля в час (mph)', value: 0.44704, symbol: 'ми/ч' },
    { label: 'Узел (knot)', value: 0.514444, symbol: 'уз' },
    { label: 'Фут в секунду (ft/s)', value: 0.3048, symbol: 'фт/с' },
  ],
  time: [
    { label: 'Секунда (s)', value: 1, symbol: 'с' },
    { label: 'Минута (min)', value: 60, symbol: 'мин' },
    { label: 'Час (h)', value: 3600, symbol: 'ч' },
    { label: 'День (d)', value: 86400, symbol: 'дн' },
    { label: 'Неделя (wk)', value: 604800, symbol: 'нед' },
    { label: 'Месяц (mo)', value: 2629800, symbol: 'мес' },
    { label: 'Год (yr)', value: 31557600, symbol: 'год' },
  ],
  data: [
    { label: 'Байт (B)', value: 1, symbol: 'Б' },
    { label: 'Килобайт (KB)', value: 1000, symbol: 'КБ' },
    { label: 'Мегабайт (MB)', value: 1000 * 1000, symbol: 'МБ' },
    { label: 'Гигабайт (GB)', value: 1000 * 1000 * 1000, symbol: 'ГБ' },
    { label: 'Терабайт (TB)', value: 1000 * 1000 * 1000 * 1000, symbol: 'ТБ' },
    { label: 'Кибибайт (KiB)', value: 1024, symbol: 'KiB' },
    { label: 'Мебибайт (MiB)', value: 1024 * 1024, symbol: 'MiB' },
    { label: 'Гибибайт (GiB)', value: 1024 * 1024 * 1024, symbol: 'GiB' },
  ],
  energy: [
    { label: 'Джоуль (J)', value: 1, symbol: 'Дж' },
    { label: 'Килоджоуль (kJ)', value: 1000, symbol: 'кДж' },
    { label: 'Калория (cal)', value: 4.184, symbol: 'кал' },
    { label: 'Килокалория (kcal)', value: 4184, symbol: 'ккал' },
    { label: 'Ватт-час (Wh)', value: 3600, symbol: 'Вт·ч' },
    { label: 'Киловатт-час (kWh)', value: 3600000, symbol: 'кВт·ч' },
  ],
};

export type UnitType = keyof typeof units;

export function convert(value: number, from: number | string, to: number | string, type: string): number {
  if (type === 'temperature') {
    let celsius = value;
    if (from === 'C') celsius = value;
    else if (from === 'F') celsius = (value - 32) * 5 / 9;
    else if (from === 'K') celsius = value - 273.15;

    if (to === 'C') return celsius;
    if (to === 'F') return (celsius * 9 / 5) + 32;
    if (to === 'K') return celsius + 273.15;
    return value;
  }

  const numericFrom = typeof from === 'number' ? from : Number(from);
  const numericTo = typeof to === 'number' ? to : Number(to);

  if (Number.isNaN(numericFrom) || Number.isNaN(numericTo) || numericTo === 0) {
    return value;
  }

  const baseValue = value * numericFrom;
  return baseValue / numericTo;
}
