/**
 * Server-side gate for the remote login helper's "paste credentials" flow.
 *
 * Google's `firstparty/nativeapp` consent for embedded desktop clients only
 * releases the authorization code when the loopback redirect is reachable, which
 * never happens on a remote VPS install. The remote login helper runs the OAuth
 * locally and emits a credential blob (see ./credentialBlob.ts); the dashboard
 * POSTs that blob to /api/oauth/<provider>/paste-credentials, which decodes it
 * and persists the connection via the same finalize path as `device-complete`.
 *
 * This module holds the pure, security-relevant gate: which providers may use
 * the paste path, and the requirement that the blob's embedded provider matches
 * the route provider (so a blob minted for one provider cannot be replayed
 * against another).
 */

import { decodeCredentialBlob, type CredentialBlob } from "./credentialBlob";

/**
 * Providers eligible for the paste-credentials flow: Google native-loopback
 * clients whose consent cannot complete on a headless/remote host. `agy` is the
 * Antigravity alias. Codex is intentionally excluded — it has its own browser
 * device flow (`device-complete`) that works remotely.
 */
export const PASTE_CREDENTIAL_PROVIDERS = new Set(["antigravity", "agy"]);

/**
 * Validate + decode a pasted credential blob for a given route provider.
 * Throws a descriptive error if the provider is not allowlisted, if the blob's
 * embedded provider does not match, or if the blob itself is malformed.
 */
export function parsePastedCredentials(routeProvider: string, blob: string): CredentialBlob {
  if (!PASTE_CREDENTIAL_PROVIDERS.has(routeProvider)) {
    throw new Error(
      `paste-credentials not supported for provider: ${routeProvider}. ` +
        `Supported: ${[...PASTE_CREDENTIAL_PROVIDERS].join(", ")}`
    );
  }

  // decodeCredentialBlob validates prefix/version/JSON shape + access_token.
  const decoded = decodeCredentialBlob(blob);

  if (decoded.provider !== routeProvider) {
    throw new Error(
      `Pasted credential provider mismatch: blob is for "${decoded.provider}" ` +
        `but the route provider is "${routeProvider}"`
    );
  }

  return decoded;
}
