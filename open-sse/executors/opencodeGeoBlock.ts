/**
 * opencodeGeoBlock.ts — geo-block predicate for the opencode executor loop.
 *
 * Leaf module: zero internal imports (layering — errorClassifier pulls
 * accountFallback + registry + DB; this file must not). The 1010 check below
 * mirrors errorClassifier.isCloudflareFingerprintRejection semantics for the
 * tokens this path needs; any divergence is a bug — see the parity test.
 */

// "not available in your country" is the observed opencode RegionError phrasing
// (2026-09-07 — app.log: "This model is not available in your country.");
// siblings cover the same class, not the single incident. No bare "in your
// country/region": location text without the full prefix is not a geo signal.
// `user_blocked` refusal (observed 2026-09-13 — upstream 403 with this token).
// Rotation on it is opt-in (OPENCODE_USER_BLOCKED_ROTATION) and bounded to one
// hop; when enabled it reuses the geo tried-set. 403 and 451 are classified the
// same way. Literal exact token only; `user-blocked` / `user blocked` are
// unobserved phrasings (fail closed).
const USER_BLOCKED_SIGNAL = "user_blocked";
// Free-tier refusal (observed 2026-09-17): upstream rejects a request whose client
// identity or request shape does not match the OpenCode client contract. Two
// signals, both observed on the same response: the machine token in `error.type`,
// and the relayed sentence in `error.message`. The sentence matters on its own
// because the shared error parser keeps `error.type` aside, so the classifier only
// ever sees the message. Both are exact substrings; no looser phrasing is
// recognized (fail closed).
const FREE_TIER_SIGNALS = ["freetiererror", "free tier can only be used"];
const GEO_SIGNALS = [
  "not available in your country",
  "not available in your region",
  "unsupported_country",
  "unsupported country",
];

// `regionerror` word-bounded: bare substring would match region_error /
// region-error variants, which are unobserved phrasings (fail closed).
const REGION_ERROR_REGEX = /(?<![A-Za-z0-9_-])regionerror(?![A-Za-z0-9_-])/i;

// Fingerprint-first: a CDN 1010 rejection says nothing about account health —
// it must never rotate as geo. Parity with errorClassifier
// isCloudflareFingerprintRejection: the bare number 1010 alone is NOT a signal
// (it occurs as port/count/model token) — only with an explicit Cloudflare key
// or the unique tokens (mirrored vectors live in the parity test below).
const CLOUDFLARE_1010_KEY_REGEX =
  /(?<![A-Za-z0-9_-])error[\s_-]?code[\\"':=\s]{0,12}1010(?!\w)|(?<![A-Za-z0-9_-])error[-_]\s?1010(?!\w)\/?/i;

function isFingerprintRejection(bodyText: string): boolean {
  const text = String(bodyText || "");
  const lower = text.toLowerCase();
  return (
    CLOUDFLARE_1010_KEY_REGEX.test(text) ||
    lower.includes("browser_signature_banned") ||
    lower.includes("fingerprint_rejection")
  );
}

export function isOpencodeGeoBlocked(status: number, bodyText: string): boolean {
  if (status !== 403 && status !== 451) return false;
  const text = String(bodyText || "");
  if (isFingerprintRejection(text)) return false;
  const lower = text.toLowerCase();
  if (REGION_ERROR_REGEX.test(text)) return true;
  return GEO_SIGNALS.some((signal) => lower.includes(signal));
}

/** 403 or 451 whose body carries the user_blocked token and is not a geo block or 1010 rejection. */
export function isOpencodeUserBlocked(status: number, bodyText: string | null): boolean {
  if (status !== 403 && status !== 451) return false;
  const text = String(bodyText || "");
  if (isFingerprintRejection(text) || isOpencodeGeoBlocked(status, text)) return false;
  return text.toLowerCase().includes(USER_BLOCKED_SIGNAL);
}

/**
 * 403 or 451 refusing the request itself (client identity or request shape), not
 * the account: every account gets the same verdict from the same request, so this
 * is never a rotation signal and never an account-health signal. More specific
 * refusals win: a fingerprint rejection, a geo block or a `user_blocked` body is
 * left to its own predicate.
 */
export function isOpencodeFreeTierRefusal(status: number, bodyText: string | null): boolean {
  if (status !== 403 && status !== 451) return false;
  const text = String(bodyText || "");
  if (
    isFingerprintRejection(text) ||
    isOpencodeGeoBlocked(status, text) ||
    isOpencodeUserBlocked(status, text)
  ) {
    return false;
  }
  const lower = text.toLowerCase();
  return FREE_TIER_SIGNALS.some((signal) => lower.includes(signal));
}

export function proxyKeyOf(proxy: { host: string; port: number } | null): string | null {
  if (!proxy) return null;
  return `${proxy.host}:${proxy.port}`;
}

/**
 * Key of a pool re-selection candidate the executor compares against the
 * ambient member: the resolver hands back an untyped proxy config, so this
 * narrows unknown to the key shape instead of casting at each call site.
 */
export function poolReselectKeyOf(candidate: unknown): string | null {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return null;
  const record = candidate as { host?: unknown; port?: unknown };
  if (typeof record.host !== "string" || typeof record.port !== "number") return null;
  return proxyKeyOf({ host: record.host, port: record.port });
}

/**
 * Whether this provider and response are an OpenCode free-tier refusal.
 *
 * Scoped to the opencode family the same way `classifyProviderError` scopes it, so a
 * foreign provider echoing the same sentence keeps its existing handling.
 *
 * Callers use this to decide that nothing about the refusal belongs on the account or the
 * model: the refusal is scoped to the REQUEST. Every sibling account returns the same
 * verdict for it, and the same account answers 200 once the request matches the upstream
 * contract. Writing a cooldown, a lockout or an error state would be wrong twice over —
 * the model is not forbidden, and one refusal per account empties the pool until the
 * provider answers "no active credentials" for requests that would have been served.
 */
export function isOpencodeFreeTierRefusalForProvider(
  provider: string | null | undefined,
  status: number,
  bodyText: string | null
): boolean {
  if (!provider || !provider.toLowerCase().startsWith("opencode")) return false;
  return isOpencodeFreeTierRefusal(status, bodyText);
}
