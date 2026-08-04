/**
 * #6512 (follow-up to #6328 / #6495) — exclude paid-only backends from `auto/*`
 * candidate pools when the operator opts into the `hidePaidModels` setting.
 *
 * PR #6495 added `hidePaidModels` to hide paid models from the `GET /v1/models`
 * listing, but `auto/*` combos could still pick a paid-only backend into their
 * candidate pool → a 402/403 at request time, exactly what #6328 wanted to avoid.
 * This applies the SAME free-model predicate #6495 uses in `catalog.ts` to every
 * virtual auto-combo candidate pool.
 *
 * Kept as a pure, dependency-light function so the filter is unit-testable in
 * isolation without seeding the DB-backed virtual factory.
 */
import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";

interface PaidFilterCandidate {
  provider: string;
  model: string;
}

/** A candidate is kept only when its provider has documented free models AND the
 * selected model itself qualifies as free — mirrors `shouldHidePaid` in
 * `src/app/api/v1/models/catalog.ts`. */
function isFreeCandidate(candidate: PaidFilterCandidate): boolean {
  return (
    providerHasFreeModels(candidate.provider) &&
    isFreeModel(candidate.provider, { id: candidate.model })
  );
}

/**
 * Return the candidate pool filtered to free-only backends when
 * `hidePaidModels` is on; otherwise return the pool unchanged (identity — the
 * default, opt-in-off path). If every candidate is paid the result is empty, and
 * the caller's existing graceful empty-pool path handles it (consistent with the
 * opt-in intent — the operator asked not to route to paid models).
 */
export function filterPaidOnlyCandidates<T extends PaidFilterCandidate>(
  pool: T[],
  hidePaidModels: boolean
): T[] {
  if (!hidePaidModels) return pool;
  return pool.filter(isFreeCandidate);
}
