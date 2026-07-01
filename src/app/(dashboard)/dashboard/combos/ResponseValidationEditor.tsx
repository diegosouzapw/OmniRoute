"use client";

import React from "react";

// Feature 4985 — per-combo response-body validation editor. Extracted into its own file
// so the combos god-component (page.tsx) stays lean. Emits the same declarative shape the
// Zod `responseValidationSchema` validates; backend evaluates it in validateResponseQuality.

export type JsonPathCondition = "exists" | "nonEmpty" | "equals" | "notEquals";

export interface ResponseValidationValue {
  forbiddenSubstrings?: string[];
  requiredSubstrings?: string[];
  minContentLength?: number;
  jsonPathPredicates?: Array<{
    path: string;
    condition: JsonPathCondition;
    value?: string | number | boolean;
  }>;
}

function tr(t: ((key: string) => string) | undefined, key: string, fallback: string): string {
  if (!t) return fallback;
  try {
    const v = t(key);
    return v && v !== key ? v : fallback;
  } catch {
    return fallback;
  }
}

const linesToArray = (text: string): string[] =>
  text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

const arrayToLines = (arr?: string[]): string => (arr ?? []).join("\n");

const INPUT_CLASS =
  "w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none";
const LABEL_CLASS = "text-[11px] font-medium text-text-muted block mb-0.5";

const CONDITIONS: JsonPathCondition[] = ["exists", "nonEmpty", "equals", "notEquals"];

export function ResponseValidationEditor({
  value,
  onChange,
  t,
}: {
  value?: ResponseValidationValue | null;
  onChange: (next: ResponseValidationValue | undefined) => void;
  t?: (key: string) => string;
}) {
  const v: ResponseValidationValue = value && typeof value === "object" ? value : {};

  const emit = (draft: ResponseValidationValue) => {
    const cleaned: ResponseValidationValue = {};
    if (draft.forbiddenSubstrings && draft.forbiddenSubstrings.length)
      cleaned.forbiddenSubstrings = draft.forbiddenSubstrings;
    if (draft.requiredSubstrings && draft.requiredSubstrings.length)
      cleaned.requiredSubstrings = draft.requiredSubstrings;
    if (typeof draft.minContentLength === "number" && draft.minContentLength > 0)
      cleaned.minContentLength = draft.minContentLength;
    if (draft.jsonPathPredicates && draft.jsonPathPredicates.length)
      cleaned.jsonPathPredicates = draft.jsonPathPredicates;
    onChange(Object.keys(cleaned).length ? cleaned : undefined);
  };

  const predicates = v.jsonPathPredicates ?? [];

  const updatePredicate = (index: number, patch: Partial<(typeof predicates)[number]>) => {
    const next = predicates.map((p, i) => (i === index ? { ...p, ...patch } : p));
    emit({ ...v, jsonPathPredicates: next });
  };

  return (
    <div className="flex flex-col gap-2" data-testid="response-validation-editor">
      <p className="text-[10px] text-text-muted">
        {tr(
          t,
          "responseValidationHelp",
          "Fail over to the next target when a 200 OK body fails these checks (assistant content)."
        )}
      </p>

      <div>
        <label className={LABEL_CLASS}>
          {tr(t, "responseValidationForbidden", "Forbidden substrings (one per line)")}
        </label>
        <textarea
          rows={2}
          value={arrayToLines(v.forbiddenSubstrings)}
          onChange={(e) => emit({ ...v, forbiddenSubstrings: linesToArray(e.target.value) })}
          placeholder={"I cannot help\nas an AI"}
          data-testid="rv-forbidden"
          className={INPUT_CLASS + " font-mono"}
        />
      </div>

      <div>
        <label className={LABEL_CLASS}>
          {tr(t, "responseValidationRequired", "Required substrings (one per line)")}
        </label>
        <textarea
          rows={2}
          value={arrayToLines(v.requiredSubstrings)}
          onChange={(e) => emit({ ...v, requiredSubstrings: linesToArray(e.target.value) })}
          data-testid="rv-required"
          className={INPUT_CLASS + " font-mono"}
        />
      </div>

      <div>
        <label className={LABEL_CLASS}>
          {tr(t, "responseValidationMinLength", "Minimum content length (chars)")}
        </label>
        <input
          type="number"
          min={0}
          value={typeof v.minContentLength === "number" ? v.minContentLength : ""}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            emit({ ...v, minContentLength: Number.isFinite(n) && n > 0 ? n : undefined });
          }}
          data-testid="rv-min-length"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label className={LABEL_CLASS}>
          {tr(t, "responseValidationJsonPaths", "JSON-path checks")}
        </label>
        <div className="flex flex-col gap-1.5">
          {predicates.map((predicate, index) => (
            <div key={index} className="flex flex-wrap items-center gap-1.5" data-testid="rv-predicate-row">
              <input
                type="text"
                value={predicate.path}
                onChange={(e) => updatePredicate(index, { path: e.target.value })}
                placeholder="choices[0].message.content"
                data-testid="rv-predicate-path"
                className={INPUT_CLASS + " font-mono flex-1 min-w-[140px]"}
              />
              <select
                value={predicate.condition}
                onChange={(e) =>
                  updatePredicate(index, { condition: e.target.value as JsonPathCondition })
                }
                data-testid="rv-predicate-condition"
                className={INPUT_CLASS + " w-auto"}
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {(predicate.condition === "equals" || predicate.condition === "notEquals") && (
                <input
                  type="text"
                  value={predicate.value === undefined ? "" : String(predicate.value)}
                  onChange={(e) => updatePredicate(index, { value: e.target.value })}
                  placeholder="value"
                  data-testid="rv-predicate-value"
                  className={INPUT_CLASS + " w-auto"}
                />
              )}
              <button
                type="button"
                onClick={() =>
                  emit({ ...v, jsonPathPredicates: predicates.filter((_, i) => i !== index) })
                }
                data-testid="rv-predicate-remove"
                className="text-[10px] px-1.5 py-1 rounded border border-black/10 dark:border-white/10 text-text-muted hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              emit({
                ...v,
                jsonPathPredicates: [...predicates, { path: "", condition: "exists" }],
              })
            }
            data-testid="rv-predicate-add"
            className="self-start text-[10px] px-2 py-1 rounded border border-black/10 dark:border-white/10 text-text-muted hover:text-primary"
          >
            {tr(t, "responseValidationAddCheck", "+ Add check")}
          </button>
        </div>
      </div>
    </div>
  );
}
