/**
 * Adaptive keepalive threshold resolver for streaming routes.
 *
 * `resolveKeepaliveThreshold(model)` inspects the model prefix and returns the
 * delay after which `withEarlyStreamKeepalive` stops waiting for the handler and
 * commits to a 200 `text/event-stream` response, whose FIRST byte is the
 * keepalive frame. That first byte is therefore the client's time-to-first-byte,
 * so for the default tier the threshold is a hard latency budget, not an
 * optimization knob: a client whose first-byte watchdog is tighter than the
 * threshold aborts with zero bytes written, and the request dies as a 499 with
 * nothing diagnosable in it.
 *
 * Calibration (measured on this deployment): the *default* 2 s threshold and the
 * `oh-my-pi` (omp) CLI's ~2 s watchdog were the same 2 s, so the two raced and the
 * abort won — every combo request had its first byte at 2.003 s (combos reach the
 * resolver as a bare name with no provider prefix, and a combo handler essentially
 * never resolves inside 2 s because it probes candidate legs first) and omp
 * aborted at 2.011–2.016 s having received nothing. The default tier therefore
 * targets half the tightest observed watchdog, ~10x more margin than the ~5 ms of
 * scheduling jitter that decided the failures.
 *
 * Web-session and anonymous-fallback providers are slower to produce the first
 * byte because they route through browser sessions or public rate-limited
 * endpoints, so they keep a deliberately longer threshold: for those, committing
 * to a keepalive stream early adds SSE framing to a request the caller already
 * expects to wait on. That longer tier is an intentional exception to the
 * watchdog budget above, not an oversight — the clients that drive those
 * providers tolerate multi-second first bytes.
 */

import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { APIKEY_PROVIDERS } from "@/shared/constants/providers";
import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";
import { WEB_SESSION_CREDENTIAL_REQUIREMENTS } from "@/shared/providers/webSessionCredentials";

/** Half the tightest observed client first-byte watchdog (~2 s). */
const DEFAULT_THRESHOLD_MS = 1_000;
/** Deliberately long: see the module doc — not part of the watchdog budget. */
const SLOW_THRESHOLD_MS = 15_000;

const SLOW_PROVIDER_IDS: Set<string> = new Set();

function addSlowProvider(id: string, alias?: string) {
  SLOW_PROVIDER_IDS.add(id);
  if (typeof alias === "string" && alias) SLOW_PROVIDER_IDS.add(alias);
}

for (const [id, def] of Object.entries(NOAUTH_PROVIDERS)) {
  if ((def as Record<string, unknown>).noAuth === true) {
    addSlowProvider(id, (def as Record<string, unknown>).alias as string | undefined);
  }
}

for (const [id, def] of Object.entries(APIKEY_PROVIDERS)) {
  if ((def as Record<string, unknown>).anonymousFallback === true) {
    addSlowProvider(id, (def as Record<string, unknown>).alias as string | undefined);
  }
}

for (const [id, def] of Object.entries(WEB_COOKIE_PROVIDERS)) {
  addSlowProvider(id, (def as Record<string, unknown>).alias as string | undefined);
}

for (const id of Object.keys(WEB_SESSION_CREDENTIAL_REQUIREMENTS)) {
  SLOW_PROVIDER_IDS.add(id);
}

export const SLOW_KEEPALIVE_PROVIDERS: ReadonlySet<string> = SLOW_PROVIDER_IDS;

export function resolveKeepaliveThreshold(model: string | undefined | null): number {
  if (!model || typeof model !== "string") return DEFAULT_THRESHOLD_MS;

  const slashIndex = model.indexOf("/");
  if (slashIndex <= 0) return DEFAULT_THRESHOLD_MS;

  const prefix = model.slice(0, slashIndex);
  if (SLOW_PROVIDER_IDS.has(prefix)) return SLOW_THRESHOLD_MS;

  return DEFAULT_THRESHOLD_MS;
}
