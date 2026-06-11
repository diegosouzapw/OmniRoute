import type { RegistryEntry } from "../../shared.ts";
import {
  GPT_5_5_CODEX_CAPABILITIES,
  getGitHubCopilotChatHeaders
} from "../../shared.ts";

export const githubProvider: RegistryEntry = {
  id: "github",
  alias: "gh",
  format: "openai",
  executor: "github",
  baseUrl: "https://api.githubcopilot.com/chat/completions",
  responsesBaseUrl: "https://api.githubcopilot.com/responses",
  authType: "oauth",
  authHeader: "bearer",
  defaultContextLength: 128000,
  headers: getGitHubCopilotChatHeaders(),
  models: [
    { id: "gpt-5-mini", name: "GPT-5 Mini", targetFormat: "openai-responses" },
    { id: "gpt-5.3-codex", name: "GPT-5.3 Codex", targetFormat: "openai-responses" },
    { id: "gpt-5.4-mini", name: "GPT-5.4 Mini", targetFormat: "openai-responses" },
    {
      id: "gpt-5.4",
      name: "GPT-5.4",
      targetFormat: "openai-responses",
      supportsXHighEffort: true,
    },
    { id: "gpt-5.5", name: "GPT-5.5", ...GPT_5_5_CODEX_CAPABILITIES },
    {
      id: "claude-haiku-4.5",
      name: "Claude Haiku 4.5",
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-sonnet-4.5",
      name: "Claude Sonnet 4.5",
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-sonnet-4.6",
      name: "Claude Sonnet 4.6",
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      // #2911: GitHub Copilot's Responses API does not serve Claude/Gemini —
      // route them via chat/completions (provider default) like claude-opus-4.6.
      id: "claude-opus-4-5-20251101",
      name: "Claude Opus 4.5 (Full ID)",
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-opus-4.6",
      name: "Claude Opus 4.6",
      contextLength: 1000000,
      maxOutputTokens: 128000,
    },
    {
      // #2911: Claude on Copilot must use chat/completions, not the Responses API.
      id: "claude-opus-4.7",
      name: "Claude Opus 4.7",
      contextLength: 1000000,
      maxOutputTokens: 128000,
    },
    // #2911: Gemini on Copilot must use chat/completions, not the Responses API.
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash" },
    { id: "oswe-vscode-prime", name: "Raptor Mini", targetFormat: "openai-responses" },
    //{ id: "?", name: "Goldeneye" },
  ],
};
