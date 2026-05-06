import crypto from "node:crypto";
import { CLAUDE_CONFIG } from "../constants/oauth";
import { CLAUDE_CODE_VERSION } from "@omniroute/open-sse/executors/claudeIdentity.ts";

const BOOTSTRAP_FETCH_TIMEOUT_MS = 10_000;

// Best-effort: failure must not block OAuth — the access token is valid.
async function fetchClaudeBootstrap(accessToken) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), BOOTSTRAP_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch("https://api.anthropic.com/api/claude_cli/bootstrap", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "User-Agent": `claude-cli/${CLAUDE_CODE_VERSION} (external, cli)`,
        "anthropic-beta": "oauth-2025-04-20",
      },
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const acct = data?.oauth_account;
    if (!acct || typeof acct !== "object") return null;
    return {
      account_uuid: acct.account_uuid || null,
      account_email: acct.account_email || null,
      organization_uuid: acct.organization_uuid || null,
      organization_name: acct.organization_name || null,
      organization_type: acct.organization_type || null,
      organization_rate_limit_tier: acct.organization_rate_limit_tier || null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const claude = {
  config: CLAUDE_CONFIG,
  flowType: "authorization_code_pkce",
  buildAuthUrl: (config, _redirectUri, state, codeChallenge) => {
    const params = new URLSearchParams({
      code: "true",
      client_id: config.clientId,
      response_type: "code",
      redirect_uri: config.redirectUri,
      scope: config.scopes.join(" "),
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
      state: state,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },
  exchangeToken: async (config, code, _redirectUri, codeVerifier, state) => {
    let authCode = code;
    let codeState = "";
    if (authCode.includes("#")) {
      const parts = authCode.split("#");
      authCode = parts[0];
      codeState = parts[1] || "";
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code: authCode,
        state: codeState || state,
        grant_type: "authorization_code",
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  // Runs after exchangeToken; result is passed as `extra` to mapTokens.
  postExchange: async (tokens) => {
    if (!tokens?.access_token) return null;
    return await fetchClaudeBootstrap(tokens.access_token);
  },
  mapTokens: (tokens, extra) => {
    const bs = extra || {};
    const providerSpecificData = {
      // Generated once at provisioning; preserved across token refresh.
      cliUserID: crypto.randomBytes(32).toString("hex"),
    };
    if (bs.account_uuid) providerSpecificData.accountUUID = bs.account_uuid;
    if (bs.organization_uuid) providerSpecificData.organizationUUID = bs.organization_uuid;
    if (bs.organization_name) providerSpecificData.organizationName = bs.organization_name;
    if (bs.organization_type) providerSpecificData.organizationType = bs.organization_type;
    if (bs.organization_rate_limit_tier)
      providerSpecificData.organizationRateLimitTier = bs.organization_rate_limit_tier;

    const result = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      scope: tokens.scope,
    };
    if (bs.account_email) {
      result.email = bs.account_email;
      result.displayName = bs.account_email;
    }
    if (Object.keys(providerSpecificData).length > 0) {
      result.providerSpecificData = providerSpecificData;
    }
    return result;
  },
};
