import { ANTIGRAVITY_CONFIG } from "../constants/oauth";
import {
  antigravityNativeOAuthUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { extractCodeAssistOnboardTierId } from "@omniroute/open-sse/services/codeAssistSubscription.ts";

// Bound every Antigravity post-exchange call. Without this an unreachable/slow
// upstream made the `/exchange` request (and therefore the whole OAuth login)
// hang forever — the dashboard "just spins". Mirrors the AbortSignal.timeout
// pattern already used by antigravityProjectBootstrap.ts.
const POSTEXCHANGE_TIMEOUT_MS = 8_000;

async function fetchFirstOk(endpoints: string[], init: RequestInit, timeoutMs?: number) {
  let lastError: unknown = null;
  // One shared deadline for the WHOLE fallback list — a stalled set of endpoints
  // must bound to a single timeout, not timeoutMs × endpoints (that re-introduced
  // a ~40s login wait). A reachable endpoint still returns immediately.
  const signal = timeoutMs ? AbortSignal.timeout(timeoutMs) : init.signal;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { ...init, signal });
      if (response.ok) return response;
      lastError = new Error(`${response.status} ${await response.text()}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No Antigravity endpoints configured");
}

export const antigravity = {
  config: ANTIGRAVITY_CONFIG,
  // NO PKCE. The embedded Antigravity client is a Google "Desktop/native" OAuth client;
  // sending a PKCE code_challenge (combined with the openid scope) pushed Google into the
  // `signin/oauth/firstparty/nativeapp` consent flow that hangs and never redirects back
  // (operator report 2026-06-27). The working 9router flow uses a plain authorization_code
  // grant with client_secret and no code_challenge — match it exactly. The token exchange
  // already sends client_secret (ANTIGRAVITY_OAUTH_CLIENT_SECRET) and omits code_verifier.
  flowType: "authorization_code",
  buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
    const params = new URLSearchParams({
      client_id: config.clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: config.scopes.join(" "),
      state: state,
      access_type: "offline",
      prompt: "consent",
    });
    if (codeChallenge) {
      params.set("code_challenge", codeChallenge);
      params.set("code_challenge_method", "S256");
    }
    return `${config.authorizeUrl}?${params.toString()}`;
  },
  exchangeToken: async (config, code, redirectUri, codeVerifier) => {
    const bodyParams: Record<string, string> = {
      grant_type: "authorization_code",
      client_id: config.clientId,
      code: code,
      redirect_uri: redirectUri,
    };

    if (config.clientSecret) {
      bodyParams.client_secret = config.clientSecret;
    }

    if (codeVerifier) {
      bodyParams.code_verifier = codeVerifier;
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "User-Agent": antigravityNativeOAuthUserAgent(),
      },
      body: new URLSearchParams(bodyParams),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  postExchange: async (tokens) => {
    const headers = getAntigravityHeaders("loadCodeAssist", tokens.access_token);
    const metadata = getAntigravityLoadCodeAssistMetadata();

    // Best-effort + bounded: a slow userinfo endpoint must never hang the login.
    const userInfoRes = await fetch(`${ANTIGRAVITY_CONFIG.userInfoUrl}?alt=json`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
      signal: AbortSignal.timeout(POSTEXCHANGE_TIMEOUT_MS),
    }).catch(() => null);
    const userInfo = userInfoRes?.ok ? await userInfoRes.json() : {};

    let projectId = "";
    let tierId = "legacy-tier";
    try {
      const loadRes = await fetchFirstOk(
        ANTIGRAVITY_CONFIG.loadCodeAssistEndpoints,
        { method: "POST", headers, body: JSON.stringify({ metadata }) },
        POSTEXCHANGE_TIMEOUT_MS
      );
      const data = await loadRes.json();
      projectId = data.cloudaicompanionProject?.id || data.cloudaicompanionProject || "";
      tierId = extractCodeAssistOnboardTierId(data);
    } catch (e) {
      console.log("Failed to load code assist:", e);
    }

    // Fire-and-forget onboarding — it must NOT block the OAuth login response.
    // The previous inline `await` loop (up to 10×5s, each fetch un-timed) made the
    // `/exchange` request hang forever when an upstream was slow/unreachable, so the
    // dashboard "just spun". Onboarding is also performed lazily at request time by
    // antigravityProjectBootstrap.ts, so backgrounding it here is safe. Matches the
    // 9router web flow. (#5180-followup / antigravity login hang)
    if (projectId) {
      const onboardInBackground = async () => {
        for (let i = 0; i < 10; i++) {
          try {
            const onboardRes = await fetchFirstOk(
              ANTIGRAVITY_CONFIG.onboardUserEndpoints,
              { method: "POST", headers, body: JSON.stringify({ tier_id: tierId, metadata }) },
              POSTEXCHANGE_TIMEOUT_MS
            );
            const result = await onboardRes.json();
            if (result.done === true) break;
          } catch {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      };
      void onboardInBackground().catch(() => {});
    }

    return { userInfo, projectId, tierId };
  },
  mapTokens: (tokens, extra) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    scope: tokens.scope,
    email: extra?.userInfo?.email,
    projectId: extra?.projectId,
    providerSpecificData: {
      projectId: extra?.projectId,
      tier: extra?.tierId,
    },
  }),
};
