/**
 * usage/fetcherProviders.ts — the registration list of providers that have a
 * `getUsageForProvider` implementation.
 *
 * Extracted from services/usage.ts (god-file decomposition) so that consumers which only
 * need to know *whether* a provider has a wired fetcher can read the list without pulling
 * in the dispatcher and its ~490-module fetcher graph (DB, sockets, child_process). The
 * provider-plugin manifest (`config/providerPluginManifest.ts`) is one such consumer: it
 * is a JSON-safe config module served over HTTP and must stay a light leaf. Pure data —
 * no imports, no module state — so it cannot introduce a cycle. Behavior-preserving move;
 * `services/usage.ts` re-exports both the value and the derived type, so every existing
 * import path (`services/usage.ts`) keeps working unchanged.
 */

/**
 * Single source of truth for which providers have a `getUsageForProvider`
 * implementation. Consumers like `genericQuotaFetcher.ts` and the provider-plugin
 * manifest reference this so the registration list can't drift from the dispatcher's
 * switch statement.
 *
 * If you add a new provider to the switch in `services/usage.ts`, add it here too.
 */
export const USAGE_FETCHER_PROVIDERS = [
  "github",
  "antigravity",
  "agy",
  "claude",
  "codex",
  "cursor",
  "kiro",
  "amazon-q",
  "kimi-coding",
  "kimi-coding-apikey",
  "qoder",
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "ollama-cloud",
  "minimax",
  "minimax-cn",
  "crof",
  "bailian-coding-plan",
  "qwen-cloud-token-plan",
  "nanogpt",
  "deepseek",
  "moonshot",
  "kimi",
  "opencode",
  "opencode-zen",
  "xiaomi-mimo",
  "xai",
  "xai-oauth",
  "xao",
  "grok-cli",
  "vertex",
  "vertex-partner",
  "codebuddy-cn",
  "openrouter",
  // PromptQL playground credits (data.pro.ql.app getCreditSummary)
  "promptql",
  "pql",
  // Adobe Firefly credit balance (GET firefly.adobe.io/v1/credits/balance).
  // Dispatched since #8006; the registration list was missed at the time, so the
  // manifest and the quota fetchers reported no usage support for either id.
  // Declaring them here is what makes `registerGenericQuotaFetchers` wire a
  // generic fetcher for them and `resolveFreeAccessState` stop returning early —
  // i.e. the balance is now actually fetched, which is the point.
  "adobe-firefly",
  "firefly",
  // HyperAgent billing usage (creditBlocks USD)
  "hyperagent",
  "ha",
  // Firecrawl team credits (GET /v2/team/credit-usage)
  "firecrawl",
  // Volcano Ark Plan subscriptions (agent-plan / coding-plan)
  "volcengine-agent-plan",
  "volcengine-coding-plan",
  // Command Code credits + 5h/weekly windows (GET /alpha/billing/credits)
  "command-code",
  "conol-web",
  "cnl",
  // AgentRouter (New-API) console balance (GET /api/user/self)
  "agentrouter",
  "kilocode",
  // Devin CLI agentic quota (Codeium seat-management GetUserStatus, protobuf)
  "devin-cli",
] as const;

export type UsageFetcherProvider = (typeof USAGE_FETCHER_PROVIDERS)[number];
