/**
 * MaxAI signing-constants store + `ensure` gate.
 *
 * This is the persistence + freshness layer around ./constants.ts:
 *   - `getStoredMaxaiConstants()` reads the last-extracted, validated constants
 *     from OmniRoute settings (the sole source of the two secret-shaped keys).
 *   - `persistMaxaiConstants()` writes a freshly-extracted+validated set.
 *   - `ensureMaxaiConstants()` is the gate every signed path calls: it returns a
 *     usable constants object, extracting + persisting on a cold store, and is
 *     cheap (in-process memo) on the hot path.
 *   - `refreshMaxaiConstants()` force re-extracts (used by the daily token
 *     refresh) so a MaxAI-side rotation is picked up within a day.
 *
 * Design (William's Option 2): there is NO hardcoded fallback for the secret
 * keys. If the store is empty AND a live extraction cannot be validated, the
 * signer has no keys and MaxAI is simply unconfigured (callers surface a clear
 * auth error) — we never sign with a guessed/stale secret.
 */
import type { MaxaiSigningConstants, FetchConstantsOptions } from "./constants.ts";
import {
  MAXAI_CONSTANTS_SETTINGS_KEY,
  fetchMaxaiConstants,
  validateMaxaiConstants,
  MAXAI_DEFAULT_HEADER_NAMES,
} from "./constants.ts";

/** In-process memo so the hot signing path never touches the DB or network. */
let memo: MaxaiSigningConstants | null = null;
let inflight: Promise<MaxaiSigningConstants | null> | null = null;

/** Reset the in-process memo (tests + after a forced refresh). */
export function resetMaxaiConstantsMemo(): void {
  memo = null;
  inflight = null;
}

/**
 * Test seam: directly seed the in-process memo so unit tests that exercise the
 * signed network functions don't need to also mock the bundle fetch. Not used in
 * production paths (production goes through ensure/refresh → store → extraction).
 */
export function __setMaxaiConstantsForTest(constants: MaxaiSigningConstants | null): void {
  memo = constants;
  inflight = null;
}

/** Shape-guard a persisted record before trusting it. */
function isUsableConstants(v: unknown): v is MaxaiSigningConstants {
  if (!v || typeof v !== "object") return false;
  const c = v as Partial<MaxaiSigningConstants>;
  return (
    typeof c.hmacKey === "string" &&
    typeof c.aesKey === "string" &&
    typeof c.appVersion === "string" &&
    typeof c.ctxKey === "string" &&
    typeof c.docIdKey === "string" &&
    !!c.headerNames &&
    typeof c.headerNames === "object"
  );
}

/** Read the persisted constants from settings (validated). Null when absent/invalid. */
export async function getStoredMaxaiConstants(): Promise<MaxaiSigningConstants | null> {
  try {
    const { getSettings } = await import("@/lib/db/settings");
    const settings = await getSettings();
    const raw = (settings as Record<string, unknown>)[MAXAI_CONSTANTS_SETTINGS_KEY];
    if (!isUsableConstants(raw)) return null;
    // Re-validate on read: a persisted record must still reproduce the vector.
    const withDefaults: MaxaiSigningConstants = {
      ...raw,
      headerNames: { ...MAXAI_DEFAULT_HEADER_NAMES, ...raw.headerNames },
    };
    return validateMaxaiConstants(withDefaults) ? withDefaults : null;
  } catch {
    return null;
  }
}

/** Persist a freshly-extracted+validated constants set to settings. */
export async function persistMaxaiConstants(
  constants: MaxaiSigningConstants
): Promise<void> {
  try {
    const { updateSettings } = await import("@/lib/db/settings");
    await updateSettings({ [MAXAI_CONSTANTS_SETTINGS_KEY]: constants });
  } catch {
    // Non-fatal: a persist failure just means the next process re-extracts.
  }
}

/**
 * Return usable MaxAI signing constants, extracting + persisting on a cold store.
 * Order: in-process memo → persisted store → live extraction (validated) → null.
 * Concurrent callers share a single in-flight extraction. Never throws.
 */
export async function ensureMaxaiConstants(
  opts: FetchConstantsOptions = {}
): Promise<MaxaiSigningConstants | null> {
  if (memo) return memo;

  const stored = await getStoredMaxaiConstants();
  if (stored) {
    memo = stored;
    return memo;
  }

  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const fresh = await fetchMaxaiConstants(opts);
      if (fresh) {
        memo = fresh;
        await persistMaxaiConstants(fresh);
        return fresh;
      }
      return null;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

/**
 * Force a live re-extraction (used by the daily token refresh). If the fetched
 * set validates AND differs from what's stored, it is persisted + memoized so a
 * MaxAI-side rotation is picked up. Returns the current-best constants (the fresh
 * set on success, else whatever was already stored/memoized). Never throws.
 */
export async function refreshMaxaiConstants(
  opts: FetchConstantsOptions = {}
): Promise<MaxaiSigningConstants | null> {
  let fresh: MaxaiSigningConstants | null = null;
  try {
    fresh = await fetchMaxaiConstants(opts);
  } catch {
    fresh = null;
  }

  if (fresh) {
    const changed =
      !memo ||
      memo.hmacKey !== fresh.hmacKey ||
      memo.aesKey !== fresh.aesKey ||
      memo.appVersion !== fresh.appVersion ||
      memo.ctxKey !== fresh.ctxKey ||
      memo.docIdKey !== fresh.docIdKey;
    memo = fresh;
    if (changed) await persistMaxaiConstants(fresh);
    return fresh;
  }

  // Fetch failed — keep serving whatever we already have (memo or store).
  return memo ?? (await getStoredMaxaiConstants());
}
