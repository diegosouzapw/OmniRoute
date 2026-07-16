import type { RegistryEntry } from "../../shared.ts";
import {
  GPT_5_5_CODEX_CAPABILITIES,
  getGitHubCopilotChatHeaders,
  resolvePublicCred,
} from "../../shared.ts";

export const gheCopilotProvider: RegistryEntry = {
  id: "ghe-copilot",
  alias: "ghe-copilot",
  format: "openai",
  executor: "ghe-copilot",
  // GHE Copilot proxy is streaming-only: it rejects `stream: false` (and an
  // absent stream flag). forceStream makes chatCore send stream:true upstream
  // and drain the SSE back into a single JSON response for non-stream clients.
  forceStream: true,
  baseUrl: "https://api.githubcopilot.com/chat/completions",
  responsesBaseUrl: "https://api.githubcopilot.com/responses",
  authType: "oauth",
  authHeader: "bearer",
  // GHE Copilot requires a custom gheUrl (set per-connection via providerSpecificData).
  // The executor overrides URL building + token refresh to hit the GHE host.
  oauth: {
    clientIdEnv: "GITHUB_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("github_copilot_id"),
  },
  defaultContextLength: 128000,
  headers: getGitHubCopilotChatHeaders(),
  models: [
    {
      id: "claude-fable-5",
      name: "Claude Fable 5",
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-opus-4.8-fast",
      name: "Claude Opus 4.8 (fast mode)",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-4.8",
      name: "Claude Opus 4.8",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-4.7",
      name: "Claude Opus 4.7",
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-sonnet-4.6",
      name: "Claude Sonnet 4.6",
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-opus-4.5",
      name: "Claude Opus 4.5",
      contextLength: 200000,
      maxOutputTokens: 32000,
    },
    {
      id: "claude-sonnet-5",
      name: "Claude Sonnet 5",
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-sonnet-4.5",
      name: "Claude Sonnet 4.5",
      contextLength: 200000,
      maxOutputTokens: 32000,
    },
    {
      id: "claude-haiku-4.5",
      name: "Claude Haiku 4.5",
      contextLength: 200000,
      maxOutputTokens: 32000,
    },
    {
      id: "gemini-3.1-pro-preview",
      name: "Gemini 3.1 Pro",
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
    {
      id: "gemini-3.5-flash",
      name: "Gemini 3.5 Flash",
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
    { id: "gpt-5.5", name: "GPT-5.5", ...GPT_5_5_CODEX_CAPABILITIES, maxOutputTokens: 128000 },
    {
      id: "gpt-5.4",
      name: "GPT-5.4",
      supportsXHighEffort: true,
      contextLength: 1050000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.4-mini",
      name: "GPT-5.4 mini",
      contextLength: 400000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.3-codex",
      name: "GPT-5.3-Codex",
      contextLength: 400000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5-mini",
      name: "GPT-5 mini",
      contextLength: 264000,
      maxOutputTokens: 64000,
    },
    {
      id: "gpt-4o-2024-11-20",
      name: "GPT-4o",
      contextLength: 128000,
      maxOutputTokens: 16384,
    },
    { id: "gpt-4o-mini", name: "GPT-4o mini", contextLength: 128000, maxOutputTokens: 4096 },
    {
      id: "gpt-4-0125-preview",
      name: "GPT 4 Turbo",
      contextLength: 128000,
      maxOutputTokens: 4096,
    },
    {
      id: "kimi-k2.7-code",
      name: "Kimi K2.7 Code",
      contextLength: 256000,
      maxOutputTokens: 32000,
    },
    {
      id: "mai-code-1-flash",
      name: "MAI-Code-1-Flash",
      contextLength: 256000,
      maxOutputTokens: 128000,
    },
    {
      id: "oswe-vscode-prime",
      name: "Raptor mini",
      contextLength: 264000,
      maxOutputTokens: 64000,
    },
  ],
};
