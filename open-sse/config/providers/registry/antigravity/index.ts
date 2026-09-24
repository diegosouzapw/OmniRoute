import type { RegistryEntry } from "../../shared.ts";
import {
  buildAntigravityUrl,
  ANTIGRAVITY_RUNTIME_BASE_URLS,
  ANTIGRAVITY_PUBLIC_MODELS,
  getAntigravityProviderHeaders,
  resolvePublicCred,
} from "../../shared.ts";

/**
 * Antigravity (CLI identity) — consolidated provider.
 *
 * The `agy` provider was merged into this entry: both clients authenticate
 * against the same Google consumer-OAuth client and share the same Cloud Code
 * backend, model catalog, and quota family. OmniRoute now presents only the
 * official CLI identity (see open-sse/services/antigravityHeaders.ts) and
 * accepts both the browser OAuth flow and imported `agy` token files.
 */
export const antigravityProvider: RegistryEntry = {
  id: "antigravity",
  alias: "agy",
  format: "antigravity",
  executor: "antigravity",
  baseUrls: [...ANTIGRAVITY_RUNTIME_BASE_URLS],
  urlBuilder: buildAntigravityUrl,
  authType: "oauth",
  authHeader: "bearer",
  headers: getAntigravityProviderHeaders(),
  oauth: {
    clientIdEnv: "ANTIGRAVITY_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("antigravity_id"),
    clientSecretEnv: "ANTIGRAVITY_OAUTH_CLIENT_SECRET",
    clientSecretDefault: resolvePublicCred("antigravity_alt"),
  },
  models: [...ANTIGRAVITY_PUBLIC_MODELS],
  passthroughModels: true,
  liveCatalogAuthoritative: true,
};
