import type { RegistryEntry } from "../../shared.ts";
import {
  buildAntigravityUrl,
  ANTIGRAVITY_RUNTIME_BASE_URLS,
  ANTIGRAVITY_PUBLIC_MODELS,
  getAntigravityProviderHeaders,
  resolvePublicCred,
} from "../../shared.ts";

// Gemini CLI (Google's official `gemini` command-line tool) — Google Cloud
// Code / Code Assist OAuth. Shares the same Cloud Code backend family as
// Antigravity (see errorClassifier.ts's `isCloudCodeProvider` grouping,
// which already treats "gemini-cli" and "antigravity" identically for 403
// project-config recovery) but authenticates with its OWN distinct public
// OAuth client — the well-known Gemini CLI installed-app client
// (681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com),
// already embedded as `gemini_id` / `gemini_alt` and reused unchanged from
// the Gemini Studio API-key provider's own (unused-for-refresh) oauth block.
//
// Before this entry existed, `gemini-cli` connections had NO PROVIDERS row at
// all: `supportsTokenRefresh()`'s generic `PROVIDERS[e].tokenUrl` fallback
// returned false (the id has a hyphen the explicit allow-set didn't cover),
// and even the allow-set path would have dead-ended in
// `_getAccessTokenInternal`'s dispatch switch, which had no "gemini-cli"
// case and would fall through to the generic OAuth `refreshAccessToken()`
// helper — which also needs `PROVIDERS["gemini-cli"]` to exist. Background
// health-check refresh silently no-opped ("refresh unsupported") until the
// access token expired and the account went dark, requiring a full
// re-authentication even though the refresh token was perfectly valid.
export const gemini_cliProvider: RegistryEntry = {
  id: "gemini-cli",
  alias: undefined,
  format: "antigravity",
  executor: "antigravity",
  baseUrls: [...ANTIGRAVITY_RUNTIME_BASE_URLS],
  urlBuilder: buildAntigravityUrl,
  authType: "oauth",
  authHeader: "bearer",
  headers: getAntigravityProviderHeaders(),
  oauth: {
    // Reuses the SAME public Gemini CLI OAuth client/env-var names as the
    // "gemini" (Studio API-key) provider's oauth block above — it is
    // literally the same credential, just used here for the refresh_token
    // grant instead of the (currently dormant) apikey-exchange path.
    clientIdEnv: "GEMINI_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("gemini_id"),
    clientSecretEnv: "GEMINI_OAUTH_CLIENT_SECRET",
    clientSecretDefault: resolvePublicCred("gemini_alt"),
    tokenUrl: "https://oauth2.googleapis.com/token",
    refreshUrl: "https://oauth2.googleapis.com/token",
  },
  models: [...ANTIGRAVITY_PUBLIC_MODELS],
  passthroughModels: true,
};
