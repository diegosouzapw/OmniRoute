/**
 * Adaptive keepalive threshold resolver for streaming routes.
 *
 * Web-session and anonymous-fallback providers are slower to produce the first
 * byte because they route through browser sessions or public rate-limited
 * endpoints. The default 2 s keepalive threshold is too aggressive for these
 * providers — the keepalive stream commits before the upstream has a chance to
 * respond, adding unnecessary SSE framing overhead.
 *
 * `resolveKeepaliveThreshold(model)` inspects the model prefix and returns a
 * longer threshold (15 s) for known-slow providers, or the default (2 s) for
 * everything else.
 */

import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { APIKEY_PROVIDERS } from "@/shared/constants/providers";
import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";
import { WEB_SESSION_CREDENTIAL_REQUIREMENTS } from "@/shared/providers/webSessionCredentials";

const DEFAULT_THRESHOLD_MS = 2_000;
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
