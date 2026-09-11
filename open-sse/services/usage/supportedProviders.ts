/**
 * usage/supportedProviders.ts — registration list of providers whose usage/quota
 * API is accepted by the dashboard and server routes.
 *
 * Extracted from `src/shared/constants/providers.ts` so that light consumers —
 * the provider-plugin manifest (`config/providerPluginManifest.ts`) above all —
 * can read the list without pulling the ~12-module provider registry, and
 * without an open-sse module reaching across the workspace boundary into
 * `src/` (the open-sse typecheck gate forbids open-sse → src imports). Same
 * pattern as `fetcherProviders.ts` (#11903): pure data — no imports, no module
 * state — so it cannot introduce a cycle. `src/shared/constants/providers.ts`
 * re-exports the value, so every existing `@/shared/constants/providers`
 * import path keeps working unchanged.
 *
 * Typed `readonly string[]` (not `as const`): the dashboard/server gates call
 * `USAGE_SUPPORTED_PROVIDERS.includes(providerId)` with a plain `string`, which
 * a literal-tuple type would reject (TS2345).
 */

// Providers that support usage/quota API
export const USAGE_SUPPORTED_PROVIDERS: readonly string[] = [
  "antigravity",
  "agy",
  "kiro",
  "amazon-q",
  "github",
  "codex",
  "claude",
  "cursor",
  "qoder",
  "kimi-coding",
  "kimi-coding-apikey",
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "ollama-cloud",
  "minimax",
  "minimax-cn",
  "crof",
  "nanogpt",
  "deepseek",
  "moonshot",
  "kimi",
  "xiaomi-mimo",
  "xiaomi-mimo-token-plan",
  "vertex",
  "vertex-partner",
  "codebuddy-cn",
  // PromptQL playground credits (getCreditSummary → USD micros)
  "promptql",
  "pql",
  // Adobe Firefly web (cookie/JWT as apikey) — GET firefly.adobe.io/v1/credits/balance
  "adobe-firefly",
  "firefly",
  "hyperagent",
  "ha",
  // xAI OAuth (Grok) weekly quota (id + public alias, same pattern as ha/agy)
  "xai-oauth",
  "xao",
  // Grok Build subscription, billing credits, and auto top-up status
  "grok-cli",
  // Firecrawl team credits (GET /v2/team/credit-usage)
  "firecrawl",
  // Volcano Ark Plan subscriptions (agent-plan / coding-plan)
  "volcengine-agent-plan",
  "volcengine-coding-plan",
  // Command Code credits + 5h/weekly rolling windows
  "command-code",
  "conol-web",
  "cnl",
  // Alibaba Coding Plan triple-window quota (#9603 UI gap — fetcher existed, list entry missing)
  "bailian-coding-plan",
  // Qwen Cloud / Model Studio personal Token Plan (cookie-authenticated console gateway)
  "qwen-cloud-token-plan",
  // AgentRouter (New-API) console balance quota (consoleApiKey + newApiUserId)
  "agentrouter",
  // Kilo Code personal USD balance (GET /api/profile/balance, existing OAuth token)
  "kilocode",
  // OpenRouter key limits + account credits (GET /api/v1/key + /api/v1/credits)
  "openrouter",
  // Devin CLI agentic quota (Codeium seat-management GetUserStatus, protobuf)
  "devin-cli",
];
