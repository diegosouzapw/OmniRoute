import { buildGitLabOAuthEndpoints, resolveGitLabOAuthBaseUrl } from "@/lib/oauth/gitlab";
import { ANTIGRAVITY_RUNTIME_BASE_URLS } from "@omniroute/open-sse/config/antigravityUpstream.ts";
import { getAntigravityContentHeaders } from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { getAntigravityClientProfile } from "@omniroute/open-sse/services/antigravityClientProfile.ts";
import { isGeoBlockedError } from "@omniroute/open-sse/services/errorClassifier.ts";

// Real model-surface probe for antigravity/agy. The previous probe only hit the
// OAuth userinfo endpoint, which is NOT geo-restricted — so "Test Connection"
// stayed green while every model call failed with "User location is not
// supported for the API use." Probe the actual Cloud Code model endpoint
// (streamGenerateContent) with a minimal body:
//   2xx      -> model path reachable (auth ok)
//   400 geo  -> egress location blocked (auth ok — NOT an account problem)
//   401/403  -> token bad
// Mirrors AntigravityExecutor.buildUrl/buildHeaders so the probe exercises the
// exact same surface as real requests.
function buildAntigravityProbe(
  connection: { providerSpecificData?: unknown },
  accessToken: string
) {
  const profile = getAntigravityClientProfile(connection as never);
  return {
    url: `${ANTIGRAVITY_RUNTIME_BASE_URLS[0]}/v1internal:streamGenerateContent?alt=sse`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...getAntigravityContentHeaders(profile, accessToken),
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: "ping" }] }],
      generationConfig: { maxOutputTokens: 1 },
    }),
  };
}

const CLINE_OAUTH_TEST_CONFIG = {
  // Cline does not expose a stable lightweight auth probe. Validate token
  // presence/expiry here; real connectivity is exercised by chat requests.
  checkExpiry: true,
  refreshable: true,
};

// Shared api.x.ai chat probe for apikey `xai` and OAuth `xai-oauth` / alias `xao`.
const XAI_CHAT_OAUTH_TEST_CONFIG = {
  url: "https://api.x.ai/v1/chat/completions",
  method: "POST",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  extraHeaders: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "grok-4.3",
    messages: [{ role: "user", content: "ping" }],
    max_tokens: 1,
    stream: false,
    reasoning: { effort: "high" },
  }),
  refreshable: true,
};

// OAuth provider test endpoints. Extracted from route.ts (#7610) so adding a
// provider entry doesn't grow the frozen route.ts file past its check-file-size
// cap — this module carries no logic of its own beyond the GitLab URL builder.
// Probe request built at test time by provider-specific configs (e.g.
// antigravity), which need dynamic headers (client profile) the static fields
// cannot express.
export interface OAuthTestProbeRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}

export interface OAuthTestConfigEntry {
  url?: string;
  method?: string;
  authHeader?: string;
  authPrefix?: string;
  extraHeaders?: Record<string, string>;
  body?: string;
  acceptStatuses?: number[];
  inconclusiveStatuses?: number[];
  checkExpiry?: boolean;
  refreshable?: boolean;
  getUrl?: (connection: any) => string;
  buildProbe?: (
    connection: any,
    accessToken: string
  ) => OAuthTestProbeRequest | Promise<OAuthTestProbeRequest>;
}

export interface OAuthProbeInconclusiveClassification {
  warning: string;
  diagnosisType: "ok";
  diagnosisCode: "probe_inconclusive";
}

export function classifyOAuthProbeInconclusive(
  config: OAuthTestConfigEntry,
  provider: string,
  status: number,
  bodyText: string
): OAuthProbeInconclusiveClassification | null {
  if (
    !Array.isArray(config.inconclusiveStatuses) ||
    !config.inconclusiveStatuses.includes(status)
  ) {
    return null;
  }

  // Preserve the current upstream geo-block contract. Google's explicit
  // location refusal is an egress/upstream availability failure, not a
  // successful connection-test result.
  if ((provider === "antigravity" || provider === "agy") && isGeoBlockedError(bodyText)) {
    return null;
  }

  return {
    warning: `${provider} probe returned HTTP ${status}; credential validity is inconclusive`,
    diagnosisType: "ok",
    diagnosisCode: "probe_inconclusive",
  };
}

export const OAUTH_TEST_CONFIG: Record<string, OAuthTestConfigEntry> = {
  claude: {
    // Claude doesn't have userinfo, we verify token exists and not expired
    checkExpiry: true,
    refreshable: true,
  },
  codex: {
    // Port of decolua/9router#347: probe the real Codex /responses endpoint instead
    // of relying on `checkExpiry`. Codex OAuth tokens are ChatGPT session tokens
    // (not OpenAI API keys) — api.openai.com/v1/models rejects them with 403.
    // Hitting the actual endpoint with a minimal invalid body returns 400 when
    // auth is accepted (the body is the reason for the failure) and 401/403 when
    // the token is bad. That is a real auth signal — checkExpiry alone could not
    // distinguish a revoked-but-not-yet-expired token from a working one.
    url: "https://chatgpt.com/backend-api/codex/responses",
    method: "POST",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    extraHeaders: {
      "Content-Type": "application/json",
      originator: "codex-cli",
      "User-Agent": "codex-cli/1.0.18 (macOS; arm64)",
    },
    // Minimal invalid body — triggers a fast 400 without consuming quota.
    // #7521: probe with a ChatGPT-account-supported model. "gpt-5.3-codex" is a
    // codex-only id that ChatGPT accounts reject with a 400 for the WRONG reason
    // (unsupported model, not "auth ok, body invalid") — collapsing the auth signal
    // so a bad token looks the same as a good one. "gpt-5.5" is served for
    // ChatGPT sessions; `input: []` still yields the intended 400.
    body: JSON.stringify({ model: "gpt-5.5", input: [], stream: false, store: false }),
    // 400 = bad request, but auth was accepted; only 401/403 means the token is bad.
    acceptStatuses: [400],
    refreshable: true,
  },
  antigravity: {
    // Real model-surface probe (see buildAntigravityProbe above): userinfo-only
    // probing stayed green while the model API was geo-blocked.
    buildProbe: buildAntigravityProbe,
    inconclusiveStatuses: [400],
    refreshable: true,
  },
  // `agy` is a separate connection id that shares the Antigravity backend and the same
  // Google OAuth token lifecycle (tokenRefresh.ts routes it to refreshGoogleToken), but
  // it was missing here — so "Test Connection" fell through to "Provider test not
  // supported", recorded testStatus="error", and painted the home topology node red on a
  // perfectly good account. Probe the same model surface as antigravity.
  agy: {
    buildProbe: buildAntigravityProbe,
    inconclusiveStatuses: [400],
    refreshable: true,
  },
  xai: XAI_CHAT_OAUTH_TEST_CONFIG,
  "xai-oauth": XAI_CHAT_OAUTH_TEST_CONFIG,
  xao: XAI_CHAT_OAUTH_TEST_CONFIG,
  github: {
    url: "https://api.github.com/user",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    extraHeaders: { "User-Agent": "OmniRoute", Accept: "application/vnd.github+json" },
  },
  "gitlab-duo": {
    getUrl: (connection: any) =>
      buildGitLabOAuthEndpoints(resolveGitLabOAuthBaseUrl(connection?.providerSpecificData))
        .directAccessUrl,
    method: "POST",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
  },
  cursor: {
    checkExpiry: true,
  },
  "kimi-coding": {
    checkExpiry: true,
    refreshable: true,
  },
  kilocode: {
    // Kilo OAuth does not expose a stable user-info endpoint in all environments.
    // Validate using token presence/expiry as a lightweight auth check.
    checkExpiry: true,
  },
  "zed-hosted": {
    // Zed Hosted Models uses a long-lived native-app access token with no
    // expiry or refresh token. Validate presence here; real connectivity is
    // exercised by chat requests through the ZedHostedExecutor.
    checkExpiry: true,
  },
  cline: CLINE_OAUTH_TEST_CONFIG,
  // cline API key connections (dual-auth path) use the default live-probe.
  // ClinePass reuses the same WorkOS OAuth flow and token lifecycle as Cline.
  clinepass: CLINE_OAUTH_TEST_CONFIG,
  kiro: {
    checkExpiry: true,
    refreshable: true,
  },
  "amazon-q": {
    checkExpiry: true,
    refreshable: true,
  },
  "codebuddy-cn": {
    // Upstream test endpoint mirrors "tokenExists: true" from the CodeBuddy port —
    // validate auth via token presence + refresh path. Live connectivity is
    // verified through real /v2/chat/completions traffic.
    checkExpiry: true,
    refreshable: true,
  },
  "devin-cli": {
    // Same gap as grok-cli #7610: absent from this table, so "Test Connection"
    // always fell through to "Provider test not supported" and left a working
    // connection showing a red ERR badge. There is no HTTP probe to hit — the
    // executor drives the local `devin` binary over ACP stdio and the binary
    // owns its own credentials (`devin auth login`), so there is no refresh
    // token to rotate either. Validate on token presence/expiry; real
    // connectivity is proven by every chat/completions request.
    checkExpiry: true,
  },
  "devin-desktop": {
    // Devin Desktop authentication is import-only: the copied API key has no
    // refresh token or known expiry. Validate token presence here; real
    // connectivity is exercised by chat requests.
    checkExpiry: true,
    refreshable: false,
  },
  "grok-cli": {
    // #7610: was entirely absent from OAUTH_TEST_CONFIG, so "Test Connection"
    // always fell through to the generic "Provider test not supported" branch
    // below. Grok Build's cli-chat-proxy endpoint doesn't expose a lightweight
    // userinfo probe, and it enforces cli-specific headers (see
    // GrokCliExecutor.buildHeaders) that this shared prober doesn't send — so
    // mirror cline/kilocode's checkExpiry pattern instead of a live probe.
    // Real connectivity is still validated on every chat/completions request.
    checkExpiry: true,
    refreshable: true,
  },
  "ghe-copilot": {
    // GHE Copilot: probe the enterprise user-info endpoint derived from gheUrl
    // (stored in providerSpecificData).
    getUrl: (connection: any) => {
      const gheUrl = connection?.providerSpecificData?.gheUrl || connection?.gheUrl || "";
      const base = gheUrl.replace(/\/+$/, "");
      return `${base}/api/v3/user`;
    },
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    extraHeaders: { "User-Agent": "OmniRoute", Accept: "application/vnd.github+json" },
    refreshable: true,
  },
  // Openference: first-party OAuth gateway — list models to verify the JWT without
  // consuming inference quota. 402 (no active plan) still means auth succeeded.
  openference: {
    url: "https://api.openference.com/v1/models",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
    acceptStatuses: [402],
  },
  of: {
    url: "https://api.openference.com/v1/models",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
    acceptStatuses: [402],
  },
};
