/**
 * Single answer to "does this provider need an API key?".
 *
 * The information used to live in three places that disagreed:
 *   1. `NOAUTH_PROVIDERS.noAuth` — whether the connect form hides the key field;
 *   2. `RegistryEntry.authType` / `anonymousApiKey` — what the executor actually
 *      sends upstream;
 *   3. `FreeModelBudget.freeType === "keyless"` — how the free catalog labels it.
 *
 * Only three providers agreed across all three. This module derives the answer
 * from the two sources that describe real behaviour (1 and 2) so callers stop
 * reimplementing the check, and `assertKeylessCatalogConsistency()` pins the
 * catalog (3) against it.
 *
 * Nothing here is a new list to maintain — it is computed from the existing
 * registries, so adding a provider in the usual place is enough.
 */
import { NOAUTH_PROVIDERS } from "../constants/providers/noauth.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

export type CredentialRequirement =
  /** Never needs a credential — the connect form does not even ask for one. */
  | "none"
  /** Works anonymously; a key is accepted and usually raises the limits. */
  | "optional"
  /** No API key to paste, but the user still signs in (OAuth/device flow). */
  | "oauth"
  /** Unusable without a credential. */
  | "required";

/** True when the user can call the provider without supplying anything. */
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

/** Every provider usable with no credential at all, sorted for stable output. */
export function listNoCredentialProviders(): string[] {
  const ids = new Set([...Object.keys(NOAUTH_PROVIDERS), ...Object.keys(REGISTRY)]);
  return [...ids].filter((id) => worksWithoutCredential(getCredentialRequirement(id))).sort();
}

/**
 * Providers the free catalog labels `keyless` while the routing layer still
 * demands a credential. Each entry is a real inconsistency: the catalog promises
 * something the executor cannot deliver.
 *
 * These predate the derivation and are frozen so the gate can block NEW drift
 * without forcing an unrelated audit. Most are web-endpoint providers whose free
 * model is reached through a public path that never got modelled in the registry
 * — resolving each one means confirming upstream behaviour, not editing a list.
 *
 * Shrink this; never grow it.
 */
export const KEYLESS_CATALOG_DRIFT: readonly string[] = [
  "agy", // authType oauth: free tier via OAuth login, no key pasted
  "blackbox",
  "friendliai",
  "iflytek",
  "liquid",
  "muse-spark-web",
  "pollinations",
  "puter",
  "qwen-web",
  "sparkdesk",
];

export interface KeylessConsistencyReport {
  /** Catalog says keyless, routing still requires a credential (not frozen). */
  unexpected: string[];
  /** Frozen entries that no longer drift — remove them from the allowlist. */
  stale: string[];
}

/**
 * Compare the free catalog's `keyless` label against real routing behaviour.
 * Pure function: callers pass the catalog so tests and gates can reuse it.
 */
export function checkKeylessCatalogConsistency(
  catalog: readonly { provider: string; freeType: string }[]
): KeylessConsistencyReport {
  const labelledKeyless = [
    ...new Set(catalog.filter((m) => m.freeType === "keyless").map((m) => m.provider)),
  ].sort();

  const drifting = labelledKeyless.filter(
    (id) => !worksWithoutCredential(getCredentialRequirement(id))
  );

  const frozen = new Set(KEYLESS_CATALOG_DRIFT);
  return {
    unexpected: drifting.filter((id) => !frozen.has(id)),
    stale: [...frozen].filter((id) => !drifting.includes(id)).sort(),
  };
}
