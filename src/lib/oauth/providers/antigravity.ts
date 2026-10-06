import { ANTIGRAVITY_CONFIG } from "../constants/oauth";
import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import {
  getAntigravityContentHeaders,
  getAntigravityIdeNodeHeaders,
  getAntigravityLoadCodeAssistMetadata,
  getAntigravityOAuthUserAgent,
} from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { extractCodeAssistOnboardTierId } from "@omniroute/open-sse/services/codeAssistSubscription.ts";
import {
  BUILTIN_ANTIGRAVITY_CLIENT,
  type GoogleOauthClientMarker,
} from "@omniroute/open-sse/services/tokenRefresh/googleClientBinding.ts";

const POSTEXCHANGE_TIMEOUT_MS = 8_000;

/**
 * True when the OAuth config carries operator-provided credentials instead
 * of the embedded desktop client. `ANTIGRAVITY_CONFIG.clientId` resolves
 * env overrides (ANTIGRAVITY_OAUTH_CLIENT_ID) at module load; compare by
 * value against the embedded default client ID.
 */
function isCustomAntigravityClient(config: AntigravityOAuthConfig): boolean {
  return config.clientId !== BUILTIN_ANTIGRAVITY_CLIENT.clientId;
}

type AntigravityOAuthConfig = typeof ANTIGRAVITY_CONFIG;
type AntigravityTokenPayload = {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
};
/**
 * Why no Cloud Code projectId was discovered at connect time (#11284).
 * - "requires_manual_project": Google answered onboardUser with 200 but no
 *   cloudaicompanionProject in the body — the account must bring its own GCP
 *   project (BYOP, #8491). Retrying can never succeed.
 * - "discovery_failed": loadCodeAssist/onboardUser errored, timed out, or
 *   still returned empty after a successful onboarding round-trip.
 */
type AntigravityProjectDiscoveryOutcome = "requires_manual_project" | "discovery_failed";
type AntigravityPostExchange = {
  projectId: string;
  tierId: string;
  userInfo: { email?: string };
  projectDiscoveryOutcome?: AntigravityProjectDiscoveryOutcome;
  /** Literal issuer of the connection's refresh token: "builtin" or "custom:<clientId>". */
  oauthClient?: GoogleOauthClientMarker;
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
  metadata: ReturnType<typeof getAntigravityLoadCodeAssistMetadata>
): Promise<void> {
  // Bounded onboarding: cap retries (was 10) and jitter the delay so a stuck
  // loop cannot look like scripted automation to the upstream (ban-safety).
  const MAX_ONBOARD_RETRIES = 3;
  const BASE_RETRY_MS = 3000;
  const JITTER_MS = 4000;
  for (let i = 0; i < MAX_ONBOARD_RETRIES; i++) {
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
    await new Promise((resolve) => setTimeout(resolve, BASE_RETRY_MS + Math.random() * JITTER_MS));
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
  // #11284: classify WHY discovery fails instead of silently swallowing it.
  let loadFailed = false;
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
    loadFailed = true;
    console.log("Failed to load code assist:", error);
  }

  if (projectId) {
    void onboardAntigravityUser(config, headers, tierId, metadata).catch(() => {});
  } else if (config.onboardUserEndpoints.length > 0) {
    // Accounts without an existing Cloud Code project need one bounded inline
    // onboarding attempt before loadCodeAssist can discover their project.
    let onboardSucceeded = false;
    try {
      const response = await fetchFirstOk(
        config.onboardUserEndpoints,
        { method: "POST", headers, body: JSON.stringify({ tier_id: tierId, metadata }) },
        POSTEXCHANGE_TIMEOUT_MS
      );
      onboardSucceeded = true;
      // The discovery retry ALWAYS runs after an accepted onboarding — the
      // legacy `{done:true}` ack and bare-200 bodies alike can precede async
      // server-side project creation, so skipping it would misreport real
      // successes as failures. Google BYOP (#8491) is only CONCLUDED when the
      // retry also comes back empty: onboarding succeeded but no Cloud Code
      // project exists — the operator must bring their own GCP project.
      const bodyText = await response.text().catch(() => "");
      const retryResponse = await fetchFirstOk(
        config.loadCodeAssistEndpoints,
        { method: "POST", headers, body: JSON.stringify({ metadata }) },
        POSTEXCHANGE_TIMEOUT_MS
      );
      projectId = extractProjectId((await retryResponse.json()) as Record<string, unknown>);
      // Prefer the id straight from the onboarding response when discovery
      // lags behind server-side project creation.
      if (!projectId && bodyText) {
        projectId = extractProjectId(
          (await new Response(bodyText).json().catch(() => ({}))) as Record<string, unknown>
        );
      }
    } catch (error) {
      console.log("[oauth] antigravity inline onboarding/discovery failed:", error);
    }
    if (!projectId) {
      return {
        userInfo,
        projectId,
        tierId,
        projectDiscoveryOutcome: onboardSucceeded ? "requires_manual_project" : "discovery_failed",
      };
    }
  } else if (loadFailed) {
    // No onboarding path configured and discovery hard-failed — do not report
    // this account as healthy-with-no-project (#11284).
    return { userInfo, projectId, tierId, projectDiscoveryOutcome: "discovery_failed" };
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
    // #11284: let the OAuth route reject connects that ended without a Cloud
    // Code project instead of persisting a dead "active" row.
    projectDiscoveryOutcome: extra?.projectDiscoveryOutcome,
    providerSpecificData: {
      clientProfile,
      projectId: extra?.projectId,
      tier: extra?.tierId,
      // Which OAuth client issued this connection's refresh token. The token
      // refresh must present the same client Google saw at authorize time;
      // switching the operator's custom client via env afterwards must not
      // retroactively move existing connections (401 unauthorized_client).
      oauthClient: extra?.oauthClient,
      // The Antigravity backend ships new models frequently (e.g. Gemini 3.7
      // Flash tiers appeared upstream weeks before the pinned catalog knew
      // them). Default new connections into the 24h model auto-sync (#488) so
      // live discovery lands in the synced catalog and /v1/models stays
      // current without code changes. Operator-controlled per connection.
      autoSync: true,
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
    postExchange: (tokens) =>
      postExchangeAntigravity(config, clientProfile, tokens).then((extra) => ({
        ...extra,
        // Record the LITERAL client id that issued the refresh token we
        // just received (custom:<id> / builtin), so refreshes keep
        // presenting that same client even after the operator rotates the
        // env-level custom client later on. Compare by value against the
        // embedded default: `config` may be the very same object as
        // ANTIGRAVITY_CONFIG when no runtime override exists.
        oauthClient: isCustomAntigravityClient(config)
          ? `custom:${config.clientId}`
          : "builtin",
      })),
    mapTokens: (tokens, extra) => mapAntigravityTokens(clientProfile, tokens, extra),
  };
}

export const antigravity = createAntigravityOAuthProvider(ANTIGRAVITY_CONFIG, "ide");
