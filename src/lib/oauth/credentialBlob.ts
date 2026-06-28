/**
 * Paste-safe credential blob codec for the remote OAuth login helper.
 *
 * Why this exists: Google's `firstparty/nativeapp` consent for embedded desktop
 * clients (Antigravity/agy) only releases the authorization code when the
 * loopback redirect (127.0.0.1:<port>) is reachable. On a remote VPS install the
 * loopback is unreachable, so the consent hangs and never emits a code — there is
 * nothing for the user to paste back. (The same flow works locally and over an SSH
 * tunnel because then the loopback IS reachable.)
 *
 * The workaround: a local helper (`omniroute login antigravity`) runs the OAuth on
 * the user's own machine (loopback reachable → consent completes → tokens), then
 * encodes the raw token response into a single-line blob with this codec. The user
 * pastes the blob into the remote dashboard, which decodes it and persists the
 * connection (running the provider's post-exchange/onboarding from the server,
 * which CAN reach Google's Cloud Code APIs).
 *
 * Format: `<prefix><base64url(JSON)>` — a recognizable prefix so humans and the
 * decoder can identify it, followed by a URL/shell-safe base64url payload (no
 * `+`, `/`, `=`, or whitespace) so it survives copy-paste through terminals.
 */

/** Human-recognizable, copy-paste-safe prefix. The decoder requires it. */
export const CREDENTIAL_BLOB_PREFIX = "omniroute-cred-v1.";

/** Current blob schema version (embedded in the payload as `v`). */
const CREDENTIAL_BLOB_VERSION = 1;

export interface CredentialBlobTokens {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  scope?: string;
  [key: string]: unknown;
}

export interface CredentialBlob {
  provider: string;
  tokens: CredentialBlobTokens;
}

/**
 * Encode a provider + raw OAuth token response into a single-line blob.
 * Throws if `provider` is missing — a blob with no provider cannot be routed.
 */
export function encodeCredentialBlob(input: CredentialBlob): string {
  if (!input || typeof input.provider !== "string" || !input.provider.trim()) {
    throw new Error("encodeCredentialBlob: a non-empty provider is required");
  }
  if (!input.tokens || typeof input.tokens !== "object") {
    throw new Error("encodeCredentialBlob: tokens object is required");
  }
  const payload = {
    v: CREDENTIAL_BLOB_VERSION,
    provider: input.provider.trim(),
    tokens: input.tokens,
  };
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json, "utf8").toString("base64url");
  return `${CREDENTIAL_BLOB_PREFIX}${b64}`;
}

/**
 * Decode a credential blob produced by {@link encodeCredentialBlob}.
 * Validates the prefix, version, JSON shape, and the presence of an access_token.
 * Throws a descriptive error on any malformed/tampered/unsupported input.
 */
export function decodeCredentialBlob(blob: string): CredentialBlob {
  if (typeof blob !== "string" || !blob.startsWith(CREDENTIAL_BLOB_PREFIX)) {
    throw new Error(
      `decodeCredentialBlob: invalid format — must start with "${CREDENTIAL_BLOB_PREFIX}"`
    );
  }
  const b64 = blob.slice(CREDENTIAL_BLOB_PREFIX.length).trim();
  if (!/^[A-Za-z0-9_-]+$/.test(b64)) {
    throw new Error("decodeCredentialBlob: invalid payload — not base64url");
  }

  let parsed: { v?: unknown; provider?: unknown; tokens?: unknown };
  try {
    const json = Buffer.from(b64, "base64url").toString("utf8");
    parsed = JSON.parse(json);
  } catch {
    throw new Error("decodeCredentialBlob: invalid payload — could not parse JSON");
  }

  if (parsed.v !== CREDENTIAL_BLOB_VERSION) {
    throw new Error(
      `decodeCredentialBlob: unsupported blob version ${String(parsed.v)} (expected ${CREDENTIAL_BLOB_VERSION})`
    );
  }
  if (typeof parsed.provider !== "string" || !parsed.provider.trim()) {
    throw new Error("decodeCredentialBlob: invalid payload — missing provider");
  }
  const tokens = parsed.tokens as CredentialBlobTokens | undefined;
  if (!tokens || typeof tokens !== "object") {
    throw new Error("decodeCredentialBlob: invalid payload — missing tokens");
  }
  if (typeof tokens.access_token !== "string" || !tokens.access_token) {
    throw new Error("decodeCredentialBlob: invalid payload — missing access_token");
  }

  return { provider: parsed.provider.trim(), tokens };
}
