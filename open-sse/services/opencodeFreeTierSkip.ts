/**
 * #14313 — short-lived pause on the synthetic noauth OpenCode path after a
 * free-tier refusal.
 *
 * The refusal is request-scoped (never a model lockout / connection cooldown),
 * but re-picking the same noauth candidate on every subsequent auto-combo turn
 * only burns latency until the operator adjusts the request shape. This is an
 * in-process, provider + model keyed TTL skip — not resilience state: keyed OpenCode
 * connections keep their own account selection and are never dropped here.
 *
 * A refusal recorded with a model pauses that model only; sibling models on
 * the same provider stay eligible. A refusal recorded without a model keeps
 * the previous behaviour and covers the whole provider.
 *
 * Default TTL ~3 minutes: long enough to stop a tight retry loop, short enough
 * that a fixed request shape becomes eligible again without operator action.
 */

const DEFAULT_SKIP_TTL_MS = 3 * 60 * 1000;

/** Upper bound on live entries; every entry has a deletion path (see below). */
const MAX_SKIP_ENTRIES = 512;

/**
 * Pause key: provider id (lowercase, opencode*) alone for a provider-wide
 * pause, or provider + model (both normalized) for a model-scoped pause.
 * A single flat map keeps insertion order, which doubles as eviction order.
 */
const skips = new Map<string, number>();

function isOpencodeProvider(provider: string | null | undefined): boolean {
  return typeof provider === "string" && provider.toLowerCase().startsWith("opencode");
}

function normalizeModel(model: string | null | undefined): string | null {
  if (typeof model !== "string") return null;
  const trimmed = model.trim().toLowerCase();
  return trimmed.length === 0 ? null : trimmed;
}

function buildSkipKey(provider: string, model: string | null | undefined): string {
  const providerKey = provider.toLowerCase();
  const normalized = normalizeModel(model);
  return normalized === null ? providerKey : `${providerKey}\n${normalized}`;
}

function readEntry(key: string, now: number): number | null {
  const until = skips.get(key);
  if (until === undefined) return null;
  if (until <= now) {
    skips.delete(key);
    return null;
  }
  return until;
}

/** Drop every entry the reader below would already treat as gone. */
function evictExpiredEntries(now: number): void {
  for (const [storedKey, until] of skips) {
    if (until <= now) skips.delete(storedKey);
  }
}

function evictOldestEntries(): void {
  while (skips.size >= MAX_SKIP_ENTRIES) {
    const oldest = skips.keys().next();
    if (oldest.done) break;
    skips.delete(oldest.value);
  }
}

/**
 * Record a free-tier refusal pause for an opencode* provider. Non-opencode
 * providers are ignored (the free-tier signal is scoped to that family).
 * With a model, only that model pauses; without one, the whole provider
 * pauses, as before.
 */
export function noteOpencodeFreeTierSkip(
  provider: string | null | undefined,
  now: number = Date.now(),
  ttlMs: number = DEFAULT_SKIP_TTL_MS,
  model?: string | null
): void {
  if (!isOpencodeProvider(provider)) return;
  const key = buildSkipKey(String(provider), model);
  if (skips.size >= MAX_SKIP_ENTRIES && !skips.has(key)) {
    evictExpiredEntries(now);
    evictOldestEntries();
  }
  skips.set(key, now + ttlMs);
}

/**
 * True while an active free-tier skip covers this opencode* provider + model
 * pair. A provider-wide pause covers every model; without a model, any live
 * pause for the provider counts, so callers that cannot name a model keep
 * the previous fail-closed behaviour.
 */
export function isOpencodeFreeTierSkipped(
  provider: string | null | undefined,
  now: number = Date.now(),
  model?: string | null
): boolean {
  if (!isOpencodeProvider(provider)) return false;
  const providerKey = String(provider).toLowerCase();
  const normalized = normalizeModel(model);
  if (normalized !== null) {
    if (readEntry(`${providerKey}\n${normalized}`, now) !== null) return true;
    return readEntry(providerKey, now) !== null;
  }
  if (readEntry(providerKey, now) !== null) return true;
  const prefix = `${providerKey}\n`;
  for (const [storedKey, until] of skips) {
    if (!storedKey.startsWith(prefix)) continue;
    if (until <= now) {
      skips.delete(storedKey);
      continue;
    }
    return true;
  }
  return false;
}

/** Test helper — drop every active skip. */
export function clearOpencodeFreeTierSkips(): void {
  skips.clear();
}

/**
 * Remaining pause time in ms for an opencode* provider + model pair, or null
 * when no active pause covers it. Read-only companion to
 * `isOpencodeFreeTierSkipped`: an expired entry is dropped lazily, so a
 * null remainder hands the connection back instead of a zero-second
 * cooldown. Without a model, reports the longest live remainder for the
 * provider, so the caller waits out the worst case instead of retrying
 * into a still-paused model.
 */
export function getOpencodeFreeTierSkipRemainingMs(
  provider: string | null | undefined,
  now: number = Date.now(),
  model?: string | null
): number | null {
  if (!isOpencodeProvider(provider)) return null;
  const providerKey = String(provider).toLowerCase();
  const normalized = normalizeModel(model);
  if (normalized !== null) {
    const exact = readEntry(`${providerKey}\n${normalized}`, now);
    if (exact !== null) return exact - now;
    const wide = readEntry(providerKey, now);
    return wide === null ? null : wide - now;
  }
  const wide = readEntry(providerKey, now);
  let longest = wide === null ? null : wide - now;
  const prefix = `${providerKey}\n`;
  for (const [storedKey, until] of skips) {
    if (!storedKey.startsWith(prefix)) continue;
    if (until <= now) {
      skips.delete(storedKey);
      continue;
    }
    const remaining = until - now;
    if (longest === null || remaining > longest) longest = remaining;
  }
  return longest;
}
