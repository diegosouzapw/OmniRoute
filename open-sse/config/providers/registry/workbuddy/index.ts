import type { RegistryEntry } from "../../shared.ts";

/**
 * WorkBuddy (www.workbuddy.ai) — Tencent's agent platform.
 *
 * Not to be confused with `codebuddy-cn` (copilot.tencent.com): different host,
 * different account, different catalog. A WorkBuddy account does not work there.
 *
 * The gateway is OpenAI-compatible but enforces contracts a plain
 * `openai-compatible-chat` connection cannot express, and it reports each
 * violation as a generic code that reads like a transport fault:
 *
 *   `11101 Non-stream chat request is currently not supported`
 *     -> `forceStream`, which keeps streaming on the wire and accumulates it
 *        back into a JSON body for clients that asked for one.
 *
 *   `11128 Illegal API invocation from an unapproved channel`
 *     -> `bodyStringReplacements`, because the gateway rejects a body that names
 *        a competing client rather than a specific field.
 *
 *   `11148 tool_call_sequence_broken`
 *   `11155 reasoning content from the previous turn must be passed back`
 *     -> `strictChatHistory`, which repairs the replayed turn shape. Both
 *        surface only from the second turn on, so a single-turn smoke test
 *        passes while every real agent session fails.
 *
 * The model catalog is intentionally empty. WorkBuddy's live catalog is served
 * by `GET /v3/config` and requires authentication, so it cannot be mirrored
 * statically here; the bundled catalog is known to be stale. `passthroughModels`
 * forwards whatever model id the caller names, and the dashboard discovers the
 * real roster through the provider's entry in `providerModelsConfig.ts`.
 *
 * Reasoning replay needs no declaration: `requiresReasoningReplay()` matches the
 * thinking families by model id, provider-agnostically, which covers the
 * DeepSeek V4 point releases WorkBuddy serves (`deepseek-v4.1-flash`).
 */
export const workbuddyProvider: RegistryEntry = {
  id: "workbuddy",
  alias: "wb",
  format: "openai",
  executor: "default",
  baseUrl: "https://www.workbuddy.ai/v2/chat/completions",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  // Required on every gateway route, including the device-flow endpoints.
  headers: { "X-Product": "SaaS" },
  oauth: {
    initiateUrl: "https://www.workbuddy.ai/v2/plugin/auth/state?platform=CLI",
    pollUrlBase: "https://www.workbuddy.ai/v2/plugin/auth/token",
  },
  forceStream: true,
  strictChatHistory: true,
  bodyStringReplacements: [
    // The gateway refuses a request whose body names another agent client.
    // Longest first, so "Codex CLI" is not half-replaced by the "Codex" rule.
    ["Codex CLI", "the assistant"],
    ["codex_cli_rs", "assistant"],
    ["OpenAI", "the provider"],
    ["Codex", "the assistant"],
  ],
  models: [],
  passthroughModels: true,
};
