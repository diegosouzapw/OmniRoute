import { buildGitLabOAuthEndpoints, resolveGitLabOAuthBaseUrl } from "@/lib/oauth/gitlab";

// OAuth provider test endpoints. Extracted from route.ts (#7610) so adding a
// provider entry doesn't grow the frozen route.ts file past its check-file-size
// cap — this module carries no logic of its own beyond the GitLab URL builder.
export const OAUTH_TEST_CONFIG = {
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
    url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
  },
  xai: {
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
  },
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
  qwen: {
    // DashScope (previously portal.qwen.ai) /v1/models might return 404 or auth issues.
    // Use checkExpiry instead — actual connectivity is validated via real requests.
    checkExpiry: true,
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
  cline: {
    // Cline's /api/v1/models endpoint frequently returns stale auth errors even
    // with fresh tokens. Use checkExpiry instead — actual connectivity is validated
    // via real requests.
    checkExpiry: true,
    refreshable: true,
  },
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
  "grok-cli": {
    // #7610: was entirely absent from OAUTH_TEST_CONFIG, so "Test Connection"
    // always fell through to the generic "Provider test not supported" branch
    // below. Grok Build's cli-chat-proxy endpoint doesn't expose a lightweight
    // userinfo probe, and it enforces cli-specific headers (see
    // GrokCliExecutor.buildHeaders) that this shared prober doesn't send — so
    // mirror qwen/cline/kilocode's checkExpiry pattern instead of a live probe.
    // Real connectivity is still validated on every chat/completions request.
    checkExpiry: true,
    refreshable: true,
  },
};
