import type { RegistryEntry } from "../../shared.ts";

export const devin_cliProvider: RegistryEntry = {
  id: "devin-cli",
  alias: "dv",
  format: "openai",
  executor: "devin-cli",
  baseUrl: "devin://acp/stdio",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  defaultContextLength: 200000,
  models: [
    // Cognition / SWE — default model family recommended for coding tasks
    { id: "swe-1.6-fast", name: "SWE-1.6 Fast" },
    { id: "swe-1.6", name: "SWE-1.6" },
    { id: "swe-1.5-fast", name: "SWE-1.5 Fast" },
    { id: "swe-1.5", name: "SWE-1.5" },
    // Claude Opus 4.7
    { id: "claude-opus-4.7-max", name: "Claude Opus 4.7 Max", contextLength: 200000 },
    { id: "claude-opus-4.7-high", name: "Claude Opus 4.7 High", contextLength: 200000 },
    { id: "claude-opus-4.7-medium", name: "Claude Opus 4.7 Medium", contextLength: 200000 },
    { id: "claude-opus-4.7-low", name: "Claude Opus 4.7 Low", contextLength: 200000 },
    // Claude Sonnet/Opus 4.6
    {
      id: "claude-sonnet-4.6-thinking-1m",
      name: "Claude Sonnet 4.6 Thinking 1M",
      contextLength: 1000000,
    },
    {
      id: "claude-sonnet-4.6-thinking",
      name: "Claude Sonnet 4.6 Thinking",
      contextLength: 200000,
    },
    { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", contextLength: 200000 },
    { id: "claude-opus-4.6-thinking", name: "Claude Opus 4.6 Thinking", contextLength: 200000 },
    { id: "claude-opus-4.6", name: "Claude Opus 4.6", contextLength: 200000 },
    // Claude 4.5
    { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", contextLength: 200000 },
    { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", contextLength: 200000 },
    // GPT-5.5
    { id: "gpt-5.5-xhigh", name: "GPT-5.5 XHigh", contextLength: 200000 },
    { id: "gpt-5.5-high", name: "GPT-5.5 High", contextLength: 200000 },
    { id: "gpt-5.5-medium", name: "GPT-5.5 Medium", contextLength: 200000 },
    { id: "gpt-5.5-low", name: "GPT-5.5 Low", contextLength: 200000 },
    // GPT-5.4
    { id: "gpt-5.4-high", name: "GPT-5.4 High", contextLength: 200000 },
    { id: "gpt-5.4-medium", name: "GPT-5.4 Medium", contextLength: 200000 },
    { id: "gpt-5.4-low", name: "GPT-5.4 Low", contextLength: 200000 },
    // GPT-5.3 Codex
    { id: "gpt-5.3-codex-high", name: "GPT-5.3 Codex High", contextLength: 200000 },
    { id: "gpt-5.3-codex-medium", name: "GPT-5.3 Codex Medium", contextLength: 200000 },
    { id: "gpt-5.3-codex-low", name: "GPT-5.3 Codex Low", contextLength: 200000 },
    // GPT-5.2
    { id: "gpt-5.2-high", name: "GPT-5.2 High", contextLength: 200000 },
    { id: "gpt-5.2-medium", name: "GPT-5.2 Medium", contextLength: 200000 },
    { id: "gpt-5.2-low", name: "GPT-5.2 Low", contextLength: 200000 },
    // Gemini
    { id: "gemini-3.1-pro-high", name: "Gemini 3.1 Pro High", contextLength: 1000000 },
    { id: "gemini-3.1-pro-low", name: "Gemini 3.1 Pro Low", contextLength: 1000000 },
    { id: "gemini-3.0-flash-high", name: "Gemini 3 Flash High", contextLength: 1000000 },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", contextLength: 1000000 },
    // Others
    { id: "deepseek-v4", name: "DeepSeek V4", contextLength: 64000 },
    { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 131000 },
    { id: "glm-5.1", name: "GLM-5.1", contextLength: 128000 },
  ],
};
