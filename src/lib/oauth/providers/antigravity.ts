import { ANTIGRAVITY_CONFIG } from "../constants/oauth";
import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import {
  getAntigravityContentHeaders,
  getAntigravityIdeNodeHeaders,
  getAntigravityLoadCodeAssistMetadata,
  getAntigravityOAuthUserAgent,
} from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { extractCodeAssistOnboardTierId } from "@omniroute/open-sse/services/codeAssistSubscription.ts";

const POSTEXCHANGE_TIMEOUT_MS = 8_000;

type AntigravityOAuthConfig = typeof ANTIGRAVITY_CONFIG;
type AntigravityTokenPayload = {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
};
type AntigravityPostExchange = {
  projectId: string;
  tierId: string;
  userInfo: { email?: string };
};

async function fetchFirstOk(endpoints: string[], init: RequestInit, timeoutMs?: number) {
  let lastError: unknown = null;
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

function getPostExchangeHeaders(
  profile: AntigravityClientProfile,
  accessToken: string
): Record<string, string> {
  return profile === "cli"
    ? getAntigravityContentHeaders("cli", accessToken)
    : getAntigravityIdeNodeHeaders(accessToken);
}

function buildAntigravityAuthUrl(
  config: AntigravityOAuthConfig,
  redirectUri: string,
  state: string,
  codeChallenge?: string
): string {
  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: config.scopes.join(" "),
    state,
    access_type: "offline",
    prompt: "consent",
  });
  if (codeChallenge) {
    params.set("code_challenge", codeChallenge);
    params.set("code_challenge_method", "S256");
  }
  return `${config.authorizeUrl}?${params.toString()}`;
}

async function exchangeAntigravityToken(
  config: AntigravityOAuthConfig,
  clientProfile: AntigravityClientProfile,
  code: string,
  redirectUri: string
): Promise<AntigravityTokenPayload> {
  const bodyParams: Record<string, string> = {
    grant_type: "authorization_code",
    client_id: config.clientId,
    code,
    redirect_uri: redirectUri,
  };
  if (config.clientSecret) bodyParams.client_secret = config.clientSecret;

  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "User-Agent": getAntigravityOAuthUserAgent(clientProfile),
    },
    body: new URLSearchParams(bodyParams),
  });
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${await response.text()}`);
  }
  return (await response.json()) as AntigravityTokenPayload;
}

function extractProjectId(data: Record<string, unknown>): string {
  const project = data.cloudaicompanionProject;
  if (typeof project === "string") return project;
  if (!project || typeof project !== "object" || Array.isArray(project)) return "";
  const id = (project as Record<string, unknown>).id;
  return typeof id === "string" ? id : "";
}

async function onboardAntigravityUser(
  config: AntigravityOAuthConfig,
  headers: Record<string, string>,
  tierId: string,
  metadata: Record<string, string>
): Promise<void> {
  for (let i = 0; i < 10; i++) {
    try {
      const response = await fetchFirstOk(
        config.onboardUserEndpoints,
        { method: "POST", headers, body: JSON.stringify({ tier_id: tierId, metadata }) },
        POSTEXCHANGE_TIMEOUT_MS
      );
      const result = (await response.json()) as { done?: boolean };
      if (result.done === true) return;
    } catch {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

async function postExchangeAntigravity(
  config: AntigravityOAuthConfig,
  clientProfile: AntigravityClientProfile,
  tokens: AntigravityTokenPayload
): Promise<AntigravityPostExchange> {
  const headers = getPostExchangeHeaders(clientProfile, tokens.access_token);
  const metadata = getAntigravityLoadCodeAssistMetadata();
  const userInfoResponse = await fetch(`${config.userInfoUrl}?alt=json`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
    signal: AbortSignal.timeout(POSTEXCHANGE_TIMEOUT_MS),
  }).catch(() => null);
  const userInfo = userInfoResponse?.ok
    ? ((await userInfoResponse.json()) as { email?: string })
    : {};

  let projectId = "";
  let tierId = "legacy-tier";
  try {
    const response = await fetchFirstOk(
      config.loadCodeAssistEndpoints,
      { method: "POST", headers, body: JSON.stringify({ metadata }) },
      POSTEXCHANGE_TIMEOUT_MS
    );
    const data = (await response.json()) as Record<string, unknown>;
    projectId = extractProjectId(data);
    tierId = extractCodeAssistOnboardTierId(data);
  } catch (error) {
    console.log("Failed to load code assist:", error);
  }

  if (projectId) {
    void onboardAntigravityUser(config, headers, tierId, metadata).catch(() => {});
  } else if (config.onboardUserEndpoints.length > 0) {
    // Accounts without an existing Cloud Code project need one bounded inline
    // onboarding attempt before loadCodeAssist can discover their project.
    try {
      await fetchFirstOk(
        config.onboardUserEndpoints,
        { method: "POST", headers, body: JSON.stringify({ tier_id: tierId, metadata }) },
        POSTEXCHANGE_TIMEOUT_MS
      );
      const retryResponse = await fetchFirstOk(
        config.loadCodeAssistEndpoints,
        { method: "POST", headers, body: JSON.stringify({ metadata }) },
        POSTEXCHANGE_TIMEOUT_MS
      );
      projectId = extractProjectId((await retryResponse.json()) as Record<string, unknown>);
    } catch {
      // Lazy request-time bootstrap retries if onboarding or discovery is unavailable.
    }
  }
  return { userInfo, projectId, tierId };
}

function mapAntigravityTokens(
  clientProfile: AntigravityClientProfile,
  tokens: AntigravityTokenPayload,
  extra?: AntigravityPostExchange
) {
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    scope: tokens.scope,
    email: extra?.userInfo?.email,
    projectId: extra?.projectId,
    providerSpecificData: {
      clientProfile,
      projectId: extra?.projectId,
      tier: extra?.tierId,
    },
  };
}

export function createAntigravityOAuthProvider(
  config: AntigravityOAuthConfig,
  clientProfile: AntigravityClientProfile
) {
  return {
    config,
    flowType: "authorization_code" as const,
    buildAuthUrl: buildAntigravityAuthUrl,
    exchangeToken: (runtimeConfig, code, redirectUri) =>
      exchangeAntigravityToken(runtimeConfig, clientProfile, code, redirectUri),
    postExchange: (tokens) => postExchangeAntigravity(config, clientProfile, tokens),
    mapTokens: (tokens, extra) => mapAntigravityTokens(clientProfile, tokens, extra),
  };
}

export const antigravity = createAntigravityOAuthProvider(ANTIGRAVITY_CONFIG, "ide");
