"use client";

/**
 * ModelComboBadge — the small "used in combo X" tag rendered behind a model row
 * on the provider detail page. One badge per combo; rows used by several combos
 * get several badges. Rows used by none render nothing (no placeholder, no gap).
 *
 * Leaf component: imports only from shared utilities and sibling helpers, never
 * from the page client.
 */

import Link from "next/link";

import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

export interface ModelComboBadgeProps {
  /** Combo names that reference this model, in combo-list order. */
  combos: string[];
  t: ProviderMessageTranslator;
}

export default function ModelComboBadge({ combos, t }: ModelComboBadgeProps) {
  if (combos.length === 0) return null;

  const tooltip = providerText(t, "usedInComboTooltip", "Used in {count} combo(s): {combos}", {
    count: combos.length,
    combos: combos.join(", "),
  });

  return (
    <span className="flex flex-wrap items-center gap-1" title={tooltip}>
      {combos.map((name) => (
        <Link
          key={name}
          href="/dashboard/combos"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-0.5 rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide leading-none text-primary hover:border-primary/60 hover:bg-primary/20 transition-colors"
          title={providerText(t, "openComboTooltip", "Open Combos — used by {combo}", {
            combo: name,
          })}
        >
          <span className="material-symbols-outlined text-[10px] leading-none">layers</span>
          {name}
        </Link>
      ))}
    </span>
  );
}
