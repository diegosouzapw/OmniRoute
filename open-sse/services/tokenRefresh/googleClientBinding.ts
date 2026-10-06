import { resolvePublicCred } from "../../utils/publicCreds.ts";

/**
 * Built-in (env-override-free) Google client credentials per provider.
 *
 * `PROVIDERS[x].clientId` resolves env overrides first
 * (ANTIGRAVITY_OAUTH_CLIENT_ID / GEMINI_OAUTH_CLIENT_ID), so once an operator
 * configures a custom OAuth client the resolved value can no longer see the
 * embedded client that issued the refresh tokens of every pre-existing
 * connection. Those connections must keep refreshing against the built-in
 * client of THEIR provider: Google binds a refresh token to the client that
 * issued it and answers any other client with 401 unauthorized_client.
 * gemini and antigravity embed DIFFERENT desktop clients, so the fallback is
 * keyed by provider, not global.
 */
export const BUILTIN_ANTIGRAVITY_CLIENT = {
  clientId: resolvePublicCred("antigravity_id"),
  clientSecret: resolvePublicCred("antigravity_alt"),
} as const;

export const BUILTIN_GEMINI_CLIENT = {
  clientId: resolvePublicCred("gemini_id"),
  clientSecret: resolvePublicCred("gemini_alt"),
} as const;

/** Marker recorded at authorize time; the literal id guards client rotation. */
export type GoogleOauthClientMarker = "builtin" | `custom:${string}` | undefined;

function builtinClientFor(provider: string) {
  if (provider === "gemini") return BUILTIN_GEMINI_CLIENT;
  if (provider === "antigravity" || provider === "agy") return BUILTIN_ANTIGRAVITY_CLIENT;
  // Unknown Google-family provider: no embedded client exists to fall back
  // to. The antigravity client would mint Google 401s for tokens it never
  // issued, so refuse loudly instead of guessing.
  throw new Error(`no builtin OAuth client registered for provider: ${provider}`);
}

/**
 * Pick the OAuth client credentials a Google refresh must use.
 *
 * The marker lives in the connection's providerSpecificData.oauthClient:
 *   - a string starting with "custom:" records the LITERAL client id that
 *     issued the token. The refresh compares it against the currently
 *     configured client: matching means the operator's custom client is
 *     unchanged and can refresh; a mismatch (the operator swapped to a
 *     different custom client after authorization) or a missing/malformed
 *     marker means the connection predates per-connection binding or lost
 *     its issuer, so the embedded desktop client of the connection's own
 *     provider is the only client that can still own that token.
 *   - "builtin": authorized with the embedded desktop client.
 *
 * Storing the literal id (not just a boolean) matters because Google binds
 * each refresh token to the exact issuing client; "custom" alone would
 * silently move old connections onto a *different* custom client when the
 * operator rotates credentials.
 *
 * When no custom credentials are configured, both branches resolve to the
 * same built-in client and the choice is moot.
 */
export function selectGoogleRefreshClient(
  provider: string,
  oauthClientMarker: GoogleOauthClientMarker,
  configuredClient: { clientId?: string; clientSecret?: string } | null | undefined
): { clientId: string; clientSecret: string } {
  if (
    typeof oauthClientMarker === "string" &&
    oauthClientMarker.startsWith("custom:") &&
    oauthClientMarker.slice("custom:".length) === configuredClient?.clientId &&
    configuredClient?.clientSecret
  ) {
    return {
      clientId: configuredClient.clientId,
      clientSecret: configuredClient.clientSecret,
    };
  }
  const builtin = builtinClientFor(provider);
  return { clientId: builtin.clientId, clientSecret: builtin.clientSecret };
}
