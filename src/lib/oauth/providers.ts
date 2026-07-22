/**
 * OAuth Provider Configurations and Handlers
 *
 * This file re-exports from the modular providers/ directory.
 * Each provider is now in its own file for maintainability.
 *
 * @see ./providers/index.js for the registry
 */

import { generatePKCE, generateState } from "./utils/pkce";
import { PROVIDERS } from "./providers/index";
import { resolvePublicCred } from "@omniroute/open-sse/utils/publicCreds.ts";

const GOOGLE_BROWSER_PROVIDERS = new Set(["antigravity", "agy"]);

type OAuthRedirectEnv = Record<string, string | undefined>;

function hasValue(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeBaseUrl(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return "";
  return trimmed.replace(/\/+$/, "");
}

function hasCustomGoogleOAuthCredentials(
  providerName: string,
  env: OAuthRedirectEnv | null | undefined = process.env
): boolean {
  if (providerName === "antigravity" || providerName === "agy") {
    // `agy` reuses the antigravity OAuth client + env overrides.
    const clientId = env?.ANTIGRAVITY_OAUTH_CLIENT_ID;
    const clientSecret = env?.ANTIGRAVITY_OAUTH_CLIENT_SECRET;
    return (
      hasValue(clientId) &&
      hasValue(clientSecret) &&
      clientId !== resolvePublicCred("antigravity_id")
    );
  }

  return false;
}

function isLoopbackHostname(hostname: string): boolean {
  return /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/i.test(hostname);
}

/**
 * Google providers default to loopback redirects so the embedded public
 * credentials keep working on out-of-the-box local installs. When operators
 * provide their own Google OAuth client IDs for a remote deployment, prefer the
 * public callback URL documented in .env.example / docs/README so the popup can
 * navigate back to OmniRoute instead of stalling on localhost.
 */
export function resolveBrowserOAuthRedirectUri(
  providerName: string,
  redirectUri: string,
  env: OAuthRedirectEnv | null | undefined = process.env
): string {
  if (!GOOGLE_BROWSER_PROVIDERS.has(providerName)) {
    return redirectUri;
  }

  if (!hasCustomGoogleOAuthCredentials(providerName, env)) {
    return redirectUri;
  }

  const publicBaseUrl =
    normalizeBaseUrl(env.NEXT_PUBLIC_BASE_URL) || normalizeBaseUrl(env.OMNIROUTE_PUBLIC_BASE_URL);

  if (!publicBaseUrl) {
    return redirectUri;
  }

  try {
    const requested = new URL(redirectUri);
    if (!isLoopbackHostname(requested.hostname)) {
      return redirectUri;
    }

    const callbackPath =
      requested.pathname && requested.pathname !== "/" ? requested.pathname : "/callback";
    return `${publicBaseUrl}${callbackPath}${requested.search}`;
  } catch {
    return redirectUri;
  }
}

/**
 * Get provider handler
 */
export function getProvider(name) {
  const provider = PROVIDERS[name];
  if (!provider) {
    throw new Error(`Unknown provider: ${name}`);
  }
  return provider;
}

/**
 * Generate auth data for a provider.
 *
 * Returns `{ supported: false, error }` (no `authUrl`) for providers whose
 * browser-OAuth flow is currently disabled — e.g. windsurf / devin-cli post
 * 2026-05 rebrand, where the legacy PKCE endpoint at app.devin.ai returns 404.
 * Callers (UI / API route) should surface the `error` string and route the
 * user to the import-token flow instead.
 */
export function generateAuthData(providerName, redirectUri) {
  const provider = getProvider(providerName);
  const pkce = generatePKCE(provider.pkceVerifierBytes || 32);
  let codeVerifier = pkce.codeVerifier;
  const { codeChallenge, state } = pkce;

  if (provider.flowType === "import_token") {
    let error: string;
    if (providerName === "windsurf" || providerName === "devin-cli") {
      error =
        "Browser login disabled — paste token from https://windsurf.com/show-auth-token instead. Phase 2 will restore Firebase OAuth via app.devin.ai successor.";
    } else if (providerName === "zed") {
      error =
        "Zed does not use a browser OAuth flow. Use the Zed provider page to import credentials " +
        "directly from the OS keychain (POST /api/providers/zed/import), or paste a token manually " +
        "via POST /api/providers/zed/manual-import for Docker environments.";
    } else {
      error = `Browser login is disabled for ${providerName}. Use the import-token flow instead.`;
    }
    return {
      authUrl: undefined,
      state: undefined,
      codeVerifier: undefined,
      codeChallenge: undefined,
      redirectUri,
      flowType: provider.flowType,
      fixedPort: provider.fixedPort,
      callbackPath: provider.callbackPath || "/callback",
      callbackHost: provider.callbackHost || "localhost",
      supported: false,
      error,
    };
  }

  let authUrl;
  // Capability check (not a bare flowType equality) so a provider can carry
  // flowType "device_code" as its primary/default flow AND still expose a
  // browser PKCE login as an additional method (#7013 grok-cli rework):
  // grokCli keeps flowType "device_code" but sets supportsBrowserPkce so this
  // branch still builds its PKCE authUrl for the "Browser Login" method.
  if (provider.flowType === "authorization_code_pkce" || provider.supportsBrowserPkce) {
    authUrl = provider.buildAuthUrl(provider.config, redirectUri, state, codeChallenge);
  } else if (provider.flowType === "device_code") {
    authUrl = null;
  } else {
    const built = provider.buildAuthUrl(provider.config, redirectUri, state);
    // Some non-PKCE "authorization_code" providers (e.g. zed-hosted) need to
    // override the auto-generated PKCE codeVerifier/redirectUri with their own
    // provider-specific verifier (e.g. an RSA private-key verifier) instead of
    // an unused PKCE code_verifier — they return an object instead of a bare
    // authUrl string. Existing providers all return a plain string, so this is
    // backward compatible.
    if (built && typeof built === "object" && typeof built.authUrl === "string") {
      authUrl = built.authUrl;
      if (typeof built.codeVerifier === "string" && built.codeVerifier) {
        codeVerifier = built.codeVerifier;
      }
      if (typeof built.redirectUri === "string" && built.redirectUri) {
        redirectUri = built.redirectUri;
      }
    } else {
      authUrl = built;
    }
  }

  return {
    authUrl,
    state,
    codeVerifier,
    codeChallenge,
    redirectUri,
    flowType: provider.flowType,
    fixedPort: provider.fixedPort,
    callbackPath: provider.callbackPath || "/callback",
    callbackHost: provider.callbackHost || "localhost",
  };
}

/**
 * Exchange code for tokens
 */
export async function exchangeTokens(providerName, code, redirectUri, codeVerifier, state) {
  const provider = getProvider(providerName);

  const tokens = await provider.exchangeToken(
    provider.config,
    code,
    redirectUri,
    codeVerifier,
    state
  );

  let extra = null;
  if (provider.postExchange) {
    extra = await provider.postExchange(tokens);
  }

  return provider.mapTokens(tokens, extra);
}

/**
 * Finalize tokens obtained out-of-band (e.g. the browser-driven Codex device
 * flow, where the browser performs the auth.openai.com exchange because the
 * server's datacenter IP is blocked). Runs the provider's postExchange +
 * mapTokens — the same tail as exchangeTokens — without an HTTP token exchange.
 */
export async function finalizeTokens(providerName, tokens) {
  const provider = getProvider(providerName);

  let extra = null;
  if (provider.postExchange) {
    extra = await provider.postExchange(tokens);
  }

  return provider.mapTokens(tokens, extra);
}

/**
 * Request device code (for device_code flow)
 */
export async function requestDeviceCode(providerName, codeChallenge, configOverride = null) {
  const provider = getProvider(providerName);
  if (provider.flowType !== "device_code") {
    throw new Error(`Provider ${providerName} does not support device code flow`);
  }
  return await provider.requestDeviceCode(configOverride || provider.config, codeChallenge);
}

/**
 * Poll for token (for device_code flow)
 * @param {string} providerName - Provider name
 * @param {string} deviceCode - Device code from requestDeviceCode
 * @param {string} codeVerifier - PKCE code verifier (optional for some providers)
 * @param {object} extraData - Extra data from device code response (e.g. clientId/clientSecret for Kiro)
 */
export async function pollForToken(providerName, deviceCode, codeVerifier, extraData) {
  const provider = getProvider(providerName);
  if (provider.flowType !== "device_code") {
    throw new Error(`Provider ${providerName} does not support device code flow`);
  }

  const result = await provider.pollToken(provider.config, deviceCode, codeVerifier, extraData);

  if (result.ok) {
    if (result.data.access_token) {
      let extra = null;
      if (provider.postExchange) {
        extra = await provider.postExchange(result.data, extraData || undefined);
      }
      return { success: true, tokens: provider.mapTokens(result.data, extra) };
    } else {
      if (result.data.error === "authorization_pending" || result.data.error === "slow_down") {
        return {
          success: false,
          error: result.data.error,
          errorDescription: result.data.error_description || result.data.message,
          pending: result.data.error === "authorization_pending",
        };
      } else {
        return {
          success: false,
          error: result.data.error || "no_access_token",
          errorDescription:
            result.data.error_description || result.data.message || "No access token received",
        };
      }
    }
  }

  return {
    success: false,
    error: result.data.error,
    errorDescription: result.data.error_description,
  };
}
