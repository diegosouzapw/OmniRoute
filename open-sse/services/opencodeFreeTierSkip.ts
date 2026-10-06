/**
 * #14313 — short-lived pause on the synthetic noauth OpenCode path after a
 * free-tier refusal.
 *
 * The refusal is request-scoped (never a model lockout / connection cooldown),
 * but re-picking the same noauth candidate on every subsequent auto-combo turn
 * only burns latency until the operator adjusts the request shape. This is an
 * in-process, provider-keyed TTL skip — not resilience state: keyed OpenCode
 * connections keep their own account selection and are never dropped here.
 *
 * Default TTL ~3 minutes: long enough to stop a tight retry loop, short enough
 * that a fixed request shape becomes eligible again without operator action.
 */

const DEFAULT_SKIP_TTL_MS = 3 * 60 * 1000;

/** provider id (lowercase, opencode*) → skip-until epoch ms. */
const skips = new Map<string, number>();

function isOpencodeProvider(provider: string | null | undefined): boolean {
  return typeof provider === "string" && provider.toLowerCase().startsWith("opencode");
}

/**
 * Record a free-tier refusal pause for an opencode* provider. Non-opencode
 * providers are ignored (the free-tier signal is scoped to that family).
 */
export function noteOpencodeFreeTierSkip(
  provider: string | null | undefined,
  now: number = Date.now(),
  ttlMs: number = DEFAULT_SKIP_TTL_MS
): void {
  if (!isOpencodeProvider(provider)) return;
  skips.set(String(provider).toLowerCase(), now + ttlMs);
}

/** True while an active free-tier skip covers this opencode* provider. */
export function isOpencodeFreeTierSkipped(
  provider: string | null | undefined,
  now: number = Date.now()
): boolean {
  if (!isOpencodeProvider(provider)) return false;
  const key = String(provider).toLowerCase();
  const until = skips.get(key);
  if (until === undefined) return false;
  if (until <= now) {
    skips.delete(key);
    return false;
  }
  return true;
}

/** Test helper — drop every active skip. */
export function clearOpencodeFreeTierSkips(): void {
  skips.clear();
}
