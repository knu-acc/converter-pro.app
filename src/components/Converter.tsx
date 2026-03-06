'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Check, Copy, Info, Share2 } from 'lucide-react';
import { convert } from '@/lib/conversions';
import type { Locale } from '@/lib/i18n';
import { localeUi, getLocalizedUnits } from '@/lib/i18n';

type UnitType = Parameters<typeof getLocalizedUnits>[1];

interface ConverterProps {
  type: UnitType;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  locale?: Locale;
  defaultAmount?: number;
  defaultFrom?: string | number;
  defaultTo?: string | number;
}

export default function Converter({
  type,
  title,
  description,
  icon,
  locale = 'ru',
  defaultAmount = 1,
  defaultFrom,
  defaultTo,
}: ConverterProps) {
  const ui = localeUi[locale];
  const currentUnits = getLocalizedUnits(locale, type);
  const initialFrom = currentUnits.find((unit) => unit.value === defaultFrom)?.value ?? currentUnits[0].value;
  const initialTo = currentUnits.find((unit) => unit.value === defaultTo)?.value ?? (currentUnits[1]?.value || currentUnits[0].value);
  const [amount, setAmount] = useState<number | string>(defaultAmount);
  const [fromUnit, setFromUnit] = useState(initialFrom);
  const [toUnit, setToUnit] = useState(initialTo);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const amountId = useId();
  const fromId = useId();
  const toId = useId();

  const parsedAmount = parseFloat(amount.toString());
  const result = Number.isNaN(parsedAmount)
    ? '---'
    : formatCalculatedResult(convert(parsedAmount, fromUnit, toUnit, type));

  const getSymbol = (val: string | number) => currentUnits.find((unit) => unit.value === val)?.symbol || '';
  const getLabel = (val: string | number) => currentUnits.find((unit) => unit.value === val)?.label || '';

  const writeText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyToClipboard = async () => {
    if (result === '---') return;

    try {
      await writeText(String(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareResult = async () => {
    if (result === '---') return;

    const shareText = `${result} ${getSymbol(toUnit)}\n${getLabel(fromUnit)} -> ${getLabel(toUnit)}`.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
        return;
      } catch {
        // Fall back to copying the result text when native sharing is not available.
      }
    }

    try {
      await writeText(shareText);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      setShared(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="converter-root w-full max-w-2xl mx-auto"
    >
      <div className="md3-card md3-card-elevated md3-shape-panel overflow-hidden">
        <div className="border-b border-[var(--outline-variant)] px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex items-start gap-4">
            {icon && <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[28px] bg-[var(--primary-container)] text-[var(--on-primary-container)]">{icon}</div>}
            <div>
              <h1 className="md3-title-large tracking-tight text-[var(--on-surface)] sm:text-[1.75rem] sm:leading-8">{title}</h1>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-10">
          <div className="space-y-3">
            <label htmlFor={amountId} className="md3-label-large block text-[var(--on-surface-variant)]">
              {ui.enterValue}
            </label>
            <div className="relative">
              <input
                id={amountId}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="decimal"
                className="md3-expressive-input pr-14 text-[1.375rem] font-medium"
                placeholder={ui.examplePlaceholder}
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-medium text-[var(--on-surface-variant)]">
                 {getSymbol(fromUnit)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="md3-label-large text-[var(--on-surface-variant)]">{ui.conversion}</div>
            <div className="converter-units-grid grid grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)]">
              <div className="md3-filled-tonal-surface relative flex min-w-0 items-center gap-3 rounded-[28px] border border-[var(--outline-variant)] px-4 py-3 shadow-sm">
                <span className="shrink-0 text-sm font-medium text-[var(--on-secondary-container)]">{ui.from}</span>
                <select
                  id={fromId}
                  value={fromUnit}
                  onChange={(e) => setFromUnit(isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))}
                  className="min-w-0 flex-1 appearance-none bg-transparent pr-8 text-[0.95rem] font-medium text-[var(--on-secondary-container)] outline-none"
                  aria-label={ui.fromUnitAria}
                >
                  {currentUnits.map((u) => (
                    <option key={`${u.label}-from`} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--on-secondary-container)]">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="md3-icon-button-tonal md3-state-layer"
                  aria-label={ui.swap}
                >
                  <ArrowLeftRight size={20} />
                </button>
              </div>

              <div className="md3-filled-tonal-surface relative flex min-w-0 items-center gap-3 rounded-[28px] border border-[var(--outline-variant)] px-4 py-3 shadow-sm">
                <span className="shrink-0 text-sm font-medium text-[var(--on-secondary-container)]">{ui.to}</span>
                <select
                  id={toId}
                  value={toUnit}
                  onChange={(e) => setToUnit(isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))}
                  className="min-w-0 flex-1 appearance-none bg-transparent pr-8 text-[0.95rem] font-medium text-[var(--on-secondary-container)] outline-none"
                  aria-label={ui.toUnitAria}
                >
                  {currentUnits.map((u) => (
                    <option key={`${u.label}-to`} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--on-secondary-container)]">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="md3-card-tonal md3-shape-panel relative p-6 sm:p-8">
             <div className="absolute right-4 top-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
className="md3-icon-button-tonal md3-state-layer"
                title={ui.copy}
                >
                  {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
                <button
                  type="button"
                  onClick={shareResult}
className="md3-icon-button-tonal md3-state-layer"
                title={ui.share}
                >
                  {shared ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
                </button>
             </div>
             
             <p className="mb-2 text-sm font-medium uppercase tracking-[0.14em] text-[var(--on-secondary-container)]">
               {ui.result}
             </p>
             <div className="flex items-baseline flex-wrap gap-2" aria-live="polite">
               <span className="break-all text-4xl font-semibold tracking-tight text-[var(--on-secondary-container)] sm:text-5xl">
                  {result}
               </span>
               <span className="text-xl font-medium text-[var(--on-surface-variant)] sm:text-2xl">
                 {getSymbol(toUnit)}
               </span>
             </div>
             <p className="mt-3 md3-body-medium text-[var(--on-surface-variant)]">
               {getLabel(fromUnit)} → {getLabel(toUnit)}
             </p>
             <p className="mt-2 text-xs text-[var(--on-surface-variant)]">
               {copied ? ui.copiedHint : shared ? ui.sharedHint : ui.copyHint}
             </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 10, 100, 1000].map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => setAmount(quickAmount)}
                className="md3-chip md3-chip-tonal md3-pressable"
              >
                {quickAmount} {getSymbol(fromUnit)}
              </button>
            ))}
          </div>

        </div>
      </div>
      
      {description && (
        <p className="mt-4 md3-body-large max-w-2xl text-[var(--on-surface-variant)]">{description}</p>
      )}

      <div className="md3-card md3-card-outlined md3-shape-panel mt-6 p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2 font-medium text-[var(--on-surface)]">
            <Info size={18} className="text-[var(--tertiary)]"/>
           <span>{ui.popularPairs}</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
           {[1, 5, 10, 50, 100].map((val) => (
             <div key={val} className="flex justify-between rounded-[28px] border border-[var(--outline-variant)] bg-[var(--surface-container-low)] shadow-sm p-3 md3-body-medium text-[var(--on-surface-variant)]">
                <span>{val} {getSymbol(fromUnit)}</span>
                <span className="font-medium text-[var(--on-surface)]">
                  {formatResult(convert(val, fromUnit, toUnit, type))} {getSymbol(toUnit)}
                </span>
             </div>
           ))}
        </div>
      </div>

    </motion.div>
  );
}

function formatResult(val: number | string) {
    if (typeof val !== 'number') return val;
    return Math.abs(val) < 0.01 ? val.toExponential(2) : parseFloat(val.toFixed(2));
}

function formatCalculatedResult(val: number) {
  return Math.abs(val) < 0.000001 ? val.toExponential(4) : parseFloat(val.toFixed(6));
}
