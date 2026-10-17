import { DEVIN_DESKTOP_CONFIG } from "../constants/oauth";

/** Prefix the Devin CLI puts in front of the session token it mints at sign-in. */
export const DEVIN_SESSION_TOKEN_PREFIX = "devin-session-token$";

/** Return the session token with exactly one `devin-session-token$` prefix. */
export function normalizeDevinSessionToken(token: string): string {
  const value = String(token ?? "").trim();
  return value.startsWith(DEVIN_SESSION_TOKEN_PREFIX)
    ? value
    : `${DEVIN_SESSION_TOKEN_PREFIX}${value}`;
}

type DevinDesktopConfig = typeof DEVIN_DESKTOP_CONFIG;

/**
 * The manual fallback lets the operator paste the whole callback URL. Pull the code out of
 * it and reject a state that does not belong to this login; a bare code passes through.
 */
function resolveAuthorizationCode(raw: string, expectedState?: string): string {
  const value = String(raw ?? "").trim();
  if (!/^https?:\/\//i.test(value)) return value;
  const url = new URL(value);
  const code = url.searchParams.get("code");
  if (!code) throw new Error("Devin callback is missing the authorization code");
  const state = url.searchParams.get("state");
  if (expectedState && state !== expectedState) throw new Error("Devin callback state mismatch");
  return code;
}

function validateImportToken(token: string): { valid: boolean; reason?: string } {
  const trimmed = (token ?? "").trim();
  if (!trimmed) return { valid: false, reason: "Token is empty" };
  if (trimmed.length < 16) return { valid: false, reason: "Token is too short" };
  return { valid: true };
}

function mapTokens(tokens: { accessToken: string; authMethod?: string }) {
  return {
    accessToken: tokens.accessToken,
    refreshToken: null,
    expiresIn: null as number | null,
    // Only the browser sign-in tags the connection; an imported key stays verbatim and untagged.
    ...(tokens.authMethod ? { providerSpecificData: { authMethod: tokens.authMethod } } : {}),
  };
}

/**
 * Devin Desktop: import-token stays the default flow; the Devin CLI browser sign-in is an
 * additional method (same capability flag grok-cli uses for its browser login).
 */
export const devinDesktop = {
  config: DEVIN_DESKTOP_CONFIG,
  flowType: "import_token" as const,
  supportsBrowserPkce: true,
  fixedPort: DEVIN_DESKTOP_CONFIG.callbackPort,
  callbackPath: DEVIN_DESKTOP_CONFIG.callbackPath,
  callbackHost: DEVIN_DESKTOP_CONFIG.callbackHost,
  // The Devin CLI uses a 96-byte verifier (128 base64url chars).
  pkceVerifierBytes: 96,

  validateImportToken,

  buildAuthUrl(
    config: DevinDesktopConfig,
    redirectUri: string,
    state: string,
    codeChallenge: string
  ): string {
    const params = new URLSearchParams({
      redirect_uri: redirectUri,
      state,
      prompt: "select_account",
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },

  async exchangeToken(
    config: DevinDesktopConfig,
    code: string,
    _redirectUri: string,
    codeVerifier: string,
    state?: string
  ) {
    const authorizationCode = resolveAuthorizationCode(code, state);
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ code: authorizationCode, code_verifier: codeVerifier }),
    });
    // Status only: the body can echo the code, and the route surfaces this message.
    if (!response.ok) throw new Error(`Devin token exchange failed: ${response.status}`);
    const data = (await response.json().catch(() => null)) as { token?: unknown } | null;
    if (typeof data?.token !== "string" || !data.token.trim()) {
      throw new Error("Devin token exchange returned no token");
    }
    return { accessToken: normalizeDevinSessionToken(data.token), authMethod: "browser" };
  },

  mapTokens,
};

/** Devin CLI owns its own login, so OmniRoute only imports its token. */
export const devinCli = {
  config: DEVIN_DESKTOP_CONFIG,
  flowType: "import_token" as const,
  validateImportToken,
  mapTokens,
};
