"use client";
/**
 * Search input + filter chips for the Agents/Overview tabs — pure presentation over the URL
 * params owned by OrchestrationPageClient (`q`/`state`/`source`/`provider`). No filtering logic
 * lives here; it renders `filter` (an `OrchFilter` already parsed from the URL) and calls
 * `setParams` to mutate it. Spec: task-a6-brief.md (2.3+2.4).
 */
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { isEmptyFilter } from "./model/filterSnapshot";
import type { OrchFilter } from "./model/filterSnapshot";
import { ORCH_STATES } from "./model/orchestrationTypes";
import type { OrchSource, OrchState } from "./model/orchestrationTypes";

const SOURCES = ["cloud-agent", "a2a", "conductor"] as const satisfies readonly OrchSource[];

const STATE_KEY: Record<OrchState, string> = {
  queued: "stateQueued",
  running: "stateRunning",
  waiting_approval: "stateWaitingApproval",
  succeeded: "stateSucceeded",
  failed: "stateFailed",
  cancelled: "stateCancelled",
};
const SOURCE_KEY: Record<(typeof SOURCES)[number], string> = {
  "cloud-agent": "sourceCloudAgent",
  a2a: "sourceA2A",
  conductor: "sourceConductor",
};

const SEARCH_DEBOUNCE_MS = 300;

/** Toggle `value` in `current`, returning the next CSV (or `null` to drop the param). */
function toggleCsv<T extends string>(current: ReadonlySet<T>, value: T): string | null {
  const next = new Set(current);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next.size > 0 ? [...next].sort().join(",") : null;
}

const chipClass = (active: boolean) =>
  `text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${
    active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"
  }`;

/**
 * One labeled row of toggle chips (states / sources / providers). Pure presentation:
 * `active` drives the pressed style + `aria-pressed`, `onToggle` writes the URL param
 * upstream. Extracted so the toolbar itself stays under the max-lines ratchet.
 */
function ChipGroup<T extends string>({
  label,
  values,
  active,
  renderLabel,
  onToggle,
}: {
  label: string;
  values: readonly T[];
  active: ReadonlySet<T>;
  renderLabel: (value: T) => string;
  onToggle: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="text-[10px] text-muted">{label}</span>
      {values.map((v) => (
        <button
          key={v}
          type="button"
          className={chipClass(active.has(v))}
          aria-pressed={active.has(v)}
          onClick={() => onToggle(v)}
        >
          {renderLabel(v)}
        </button>
      ))}
    </div>
  );
}

export function OrchestrationToolbar({
  filter,
  providerKeys,
  setParams,
}: {
  filter: OrchFilter;
  providerKeys: string[];
  setParams: (patch: Record<string, string | null>) => void;
}) {
  const t = useTranslations("orchestration");
  const [text, setText] = useState(filter.q);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const handleSearchChange = (v: string) => {
    setText(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setParams({ q: v || null }), SEARCH_DEBOUNCE_MS);
  };

  const handleClear = () => {
    setText("");
    if (timerRef.current) clearTimeout(timerRef.current);
    setParams({ q: null, state: null, source: null, provider: null });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
      <input
        type="search"
        value={text}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="text-xs px-2 py-1 rounded border border-border bg-transparent min-w-[160px]"
      />
      <ChipGroup
        label={t("filterStates")}
        values={ORCH_STATES}
        active={filter.states}
        renderLabel={(s) => t(STATE_KEY[s])}
        onToggle={(s) => setParams({ state: toggleCsv(filter.states, s) })}
      />
      <ChipGroup
        label={t("filterSources")}
        values={SOURCES}
        active={filter.sources}
        renderLabel={(s) => t(SOURCE_KEY[s])}
        onToggle={(s) => setParams({ source: toggleCsv(filter.sources, s) })}
      />
      {providerKeys.length > 0 && (
        <ChipGroup
          label={t("filterProviders")}
          values={providerKeys}
          active={filter.providers}
          renderLabel={(p) => p}
          onToggle={(p) => setParams({ provider: toggleCsv(filter.providers, p) })}
        />
      )}
      {!isEmptyFilter(filter) && (
        <button
          type="button"
          className="text-[10px] underline text-muted ml-auto"
          onClick={handleClear}
        >
          {t("clearFilters")}
        </button>
      )}
    </div>
  );
}
