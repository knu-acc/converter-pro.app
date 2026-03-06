'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type FaqAccordionItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article
            key={item.question}
            className="md3-card overflow-hidden border border-[var(--outline-variant)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[color-mix(in_srgb,var(--surface-container-high)_50%,transparent)]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <h2 className="md3-title-medium text-[var(--on-surface)]">
                {item.question}
              </h2>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[var(--on-surface-variant)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-[var(--outline-variant)] px-5 py-4">
                  <p className="md3-body-medium text-[var(--on-surface-variant)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
