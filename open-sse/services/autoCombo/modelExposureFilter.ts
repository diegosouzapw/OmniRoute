/**
 * #11481 — mandatory mirror of the `/v1/models` catalog's explicit model
 * exposure allow/deny list into every `auto/*` combo candidate pool.
 *
 * `src/app/api/v1/models/catalog.ts` hides denied models (and, when an
 * allowlist is set, restricts to it) from the advertised catalog, but
 * `auto/*` combos build their candidate pool independently — exactly the
 * trap #6512 already fixed once for `hidePaidModels` (PR #6495 hid paid
 * models from `GET /v1/models`, but `auto/*` could still route to one,
 * a 402/403 at request time). This applies the SAME predicate `catalog.ts`
 * uses to every virtual auto-combo candidate pool.
 *
 * Kept as a pure, dependency-light function so the filter is unit-testable
 * in isolation without seeding the DB-backed virtual factory (mirrors
 * `paidModelFilter.ts`).
 */
import {
  isModelExposureAllowed,
  type ModelExposureListSettings,
} from "@/shared/utils/modelExposureList";

interface ExposureFilterCandidate {
  provider: string;
  model: string;
}

function hasAnyExposureListEntries(settings: ModelExposureListSettings | null | undefined): boolean {
  return (
    (Array.isArray(settings?.modelVisibilityDenylist) &&
      settings.modelVisibilityDenylist.length > 0) ||
    (Array.isArray(settings?.modelVisibilityAllowlist) &&
      settings.modelVisibilityAllowlist.length > 0)
  );
}

/**
 * Return the candidate pool filtered by the operator's model exposure
 * allow/deny lists; otherwise return the pool unchanged (identity — the
 * default, opt-in-off path when both lists are empty). If the allowlist
 * empties the pool, the caller's existing graceful empty-pool path handles
 * it, consistent with the opt-in intent.
 */
export function filterModelExposureCandidates<T extends ExposureFilterCandidate>(
  pool: T[],
  settings: ModelExposureListSettings | null | undefined
): T[] {
  if (!hasAnyExposureListEntries(settings)) return pool;
  return pool.filter((candidate) =>
    isModelExposureAllowed(candidate.provider, candidate.model, settings)
  );
}
