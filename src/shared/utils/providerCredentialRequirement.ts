/**
 * Single answer to "does this provider need a credential?".
 *
 * Two different questions had been collapsed into the word "keyless":
 *
 *   1. **Is the free access quantifiable in tokens?** That is what
 *      `FreeModelBudget.freeType === "keyless"` means — it sits next to `oauth`
 *      in the docs as "not token-quantifiable", which is why those rows never
 *      reach the headline. It says nothing about credentials.
 *   2. **Can the user call it with nothing configured?** That is this module.
 *
 * Reading (1) as (2) is not academic: probing the endpoints on 2026-07-20 showed
 * blackbox, friendliai, iflytek, sparkdesk and puter answering 401, and
 * muse-spark-web 403, with no credential — yet all are `freeType: "keyless"`.
 * A UI section built on (1) would invite users to call providers that reject
 * them. So anything user-facing about API keys must come from here.
 *
 * The answer is derived from the two registries that describe real behaviour —
 * `NOAUTH_PROVIDERS` (does the connect form ask for a key?) and `RegistryEntry`
 * (what does the executor actually send?) — so there is no new list to keep in
 * sync: registering a provider the usual way is enough.
 */
import { NOAUTH_PROVIDERS } from "../constants/providers/noauth.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

export type CredentialRequirement =
  /** Never needs a credential — the connect form does not even ask for one. */
  | "none"
  /** Works anonymously; a credential is accepted and usually raises the limits. */
  | "optional"
  /** No API key to paste, but the user still signs in (OAuth/device flow). */
  | "oauth"
  /** Unusable without a credential (API key, cookie or session token). */
  | "required";

/** True when the user can call the provider with nothing configured. */
export function worksWithoutCredential(req: CredentialRequirement): boolean {
  return req === "none" || req === "optional";
}

export function getCredentialRequirement(providerId: string): CredentialRequirement {
  const entry = REGISTRY[providerId];

  // Checked before `noAuth`: a literal anonymous token means the executor can
  // call upstream with no user credential (Kilo's `anonymous`, AI Horde's
  // `0000000000`) *and* that a real key is still honoured — AI Horde trades one
  // for higher queue priority. That is "optional", not "none", even though the
  // connect form hides the field.
  if (entry?.anonymousApiKey) return "optional";

  const noAuth = (NOAUTH_PROVIDERS as Record<string, { noAuth?: boolean }>)[providerId];
  if (noAuth?.noAuth === true) return "none";

  if (!entry) return "required";
  if (entry.authType === "none") return "none";
  if (entry.authType === "optional") return "optional";
  if (entry.authType === "oauth") return "oauth";
  return "required";
}

/**
 * Every provider usable with nothing configured, sorted for stable output.
 * This — not `freeType === "keyless"` — is what a "no API key required" list
 * must be built from.
 */
export function listNoCredentialProviders(): string[] {
  const ids = new Set([...Object.keys(NOAUTH_PROVIDERS), ...Object.keys(REGISTRY)]);
  return [...ids].filter((id) => worksWithoutCredential(getCredentialRequirement(id))).sort();
}

/**
 * Providers whose catalog rows are `freeType: "keyless"` while routing still
 * needs a credential.
 *
 * This is NOT a bug list — the two fields answer different questions (see the
 * module header). It exists so the mismatch stays visible and measured: each of
 * these is a provider whose free access is real but reached through a web/session
 * path, and each was confirmed by probing the endpoint. Kept frozen so a genuine
 * new mistake still trips the gate.
 */
export const NOT_TOKEN_QUANTIFIABLE_BUT_CREDENTIALED: readonly string[] = [
  "agy", // OAuth sign-in; nothing to paste, but still an account
  "blackbox", // probed 2026-07-20 -> 401 "No api key passed in"
  "friendliai", // probed -> 401 "no authorization info provided"
  "iflytek", // probed -> 401 Unauthorized
  "liquid", // probed -> 404: endpoint moved; config needs a separate audit
  "muse-spark-web", // probed -> 403; authHeader is a session cookie, not a key
  "puter", // probed -> 401 "Missing authentication token"
  "qwen-web", // probed -> 200 but serves the WAF HTML page, not the API
  "sparkdesk", // probed -> 401 Unauthorized
];

export interface KeylessConsistencyReport {
  /** Catalog says keyless, routing needs a credential, and it is not recorded. */
  unexpected: string[];
  /** Recorded entries that now work without a credential — drop them. */
  stale: string[];
}

/**
 * Compare the catalog's `keyless` rows against real routing behaviour.
 * Pure function: callers pass the catalog so tests and gates can reuse it.
 */
export function checkKeylessCatalogConsistency(
  catalog: readonly { provider: string; freeType: string }[]
): KeylessConsistencyReport {
  const labelledKeyless = [
    ...new Set(catalog.filter((m) => m.freeType === "keyless").map((m) => m.provider)),
  ].sort();

  const credentialed = labelledKeyless.filter(
    (id) => !worksWithoutCredential(getCredentialRequirement(id))
  );

  const recorded = new Set(NOT_TOKEN_QUANTIFIABLE_BUT_CREDENTIALED);
  return {
    unexpected: credentialed.filter((id) => !recorded.has(id)),
    stale: [...recorded].filter((id) => !credentialed.includes(id)).sort(),
  };
}
