// src/lib/combos/comboSort.ts
import {
  CANONICAL_PROVIDER_ORDER,
  providerRank,
} from "@/shared/constants/canonicalProviderOrder";
import type { ComboStep } from "@/lib/combos/steps";

export type { ComboStep };

export type SortMethod = "manual" | "provider" | "score" | "name";

export const SORT_METHODS: readonly SortMethod[] = ["manual", "provider", "score", "name"] as const;
const VALID_SORT_METHODS = new Set<string>(SORT_METHODS as readonly string[]);

export function normalizeSortMethod(raw: unknown): SortMethod {
  return VALID_SORT_METHODS.has(raw as string) ? (raw as SortMethod) : "manual";
}

export function isValidSortMethod(raw: unknown): raw is SortMethod {
  return VALID_SORT_METHODS.has(raw as string);
}

// Single source: re-exported from canonicalProviderOrder (was a duplicated derivation).
export { CANONICAL_PROVIDER_ORDER as PROVIDER_ORDER };

const REFERENCE_SENTINEL = " combo-ref"; // sorts after any real provider id

function providerKey(step: ComboStep): string {
  if (step.kind === "model" || step.kind === "provider-wildcard") {
    return step.providerId ?? REFERENCE_SENTINEL;
  }
  return REFERENCE_SENTINEL; // combo-ref: no providerId
}

function nameKey(step: ComboStep): string {
  if (step.kind === "model") return step.model;
  if (step.kind === "provider-wildcard") return `${step.providerId}/${step.modelPattern}`;
  return step.comboName; // combo-ref
}

/** Synchronous sorts: manual (noop), provider, name. Stable. */
export function sortComboStepsSync(
  steps: ComboStep[],
  method: "manual" | "provider" | "name"
): ComboStep[] {
  if (method === "manual") return steps;
  const indexed = steps.map((step, i) => ({ step, i }));
  indexed.sort((a, b) => {
    if (method === "provider") {
      const ra = providerRank(providerKey(a.step));
      const rb = providerRank(providerKey(b.step));
      if (ra !== rb) return ra - rb;
    } else {
      const na = nameKey(a.step);
      const nb = nameKey(b.step);
      if (na !== nb) return na < nb ? -1 : 1;
    }
    return a.i - b.i; // stable tiebreak preserves original order
  });
  return indexed.map((x) => x.step);
}

export type Rankings = Map<string, number> | Record<string, number>;

function toMap(rankings: Rankings): Map<string, number> {
  return rankings instanceof Map ? rankings : new Map(Object.entries(rankings));
}

/** Steps with a ranking sort descending by score; steps without a score stay
 *  stable at the end (including combo-ref, which has no providerId). */
export async function sortComboStepsByScore(
  steps: ComboStep[],
  rankings: Rankings
): Promise<ComboStep[]> {
  const map = toMap(rankings);
  const indexed = steps.map((step, i) => {
    const pid =
      step.kind === "model" || step.kind === "provider-wildcard" ? step.providerId : undefined;
    const score = pid ? map.get(pid) : undefined;
    return { step, i, score: score ?? -1 };
  });
  indexed.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score; // desc, -1 (unscored) last
    return a.i - b.i;
  });
  return indexed.map((x) => x.step);
}

/** Client-side rankings source for the dashboard (provider-level averageScore). */
export async function fetchProviderRankings(): Promise<Map<string, number>> {
  const res = await fetch("/api/free-provider-rankings");
  if (!res.ok) throw new Error(`free-provider-rankings ${res.status}`);
  const data = (await res.json()) as { rankings: Array<{ id: string; averageScore: number }> };
  return new Map(data.rankings.map((r) => [r.id, r.averageScore]));
}

/** Re-apply the current method to a models array. Sync for manual/provider/name,
 *  async for score (fetches rankings when getRankings is provided). */
export async function reapplyCurrentSort(
  steps: ComboStep[],
  method: SortMethod,
  getRankings?: () => Promise<Rankings>
): Promise<ComboStep[]> {
  if (method === "manual") return steps;
  if (method === "score") {
    const rankings = getRankings ? await getRankings() : new Map<string, number>();
    return sortComboStepsByScore(steps, rankings);
  }
  return sortComboStepsSync(steps, method);
}
