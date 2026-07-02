import type { RegistryEntry } from "../../shared.ts";
import {
  GPT_5_5_CODEX_CAPABILITIES,
  GPT_5_4_CODEX_CAPABILITIES,
  getCodexDefaultHeaders,
  resolvePublicCred,
} from "../../shared.ts";

export const codexProvider: RegistryEntry = {
  id: "codex",
  alias: "cx",
  format: "openai-responses",
  executor: "codex",
  baseUrl: "https://chatgpt.com/backend-api/codex/responses",
  authType: "oauth",
  authHeader: "bearer",
  defaultContextLength: 400000,
  headers: getCodexDefaultHeaders(),
  oauth: {
    clientIdEnv: "CODEX_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("codex_id"),
    clientSecretEnv: "CODEX_OAUTH_CLIENT_SECRET",
    clientSecretDefault: "",
    tokenUrl: "https://auth.openai.com/oauth/token",
  },
  models: [
    // gpt-5.5 codex OAuth backend caps context at 400K (not the public-API
    // 1.05M). Public refs : openai/codex#19208, #19319, #19464 ;
    // opencode#24171. max_output_tokens is stripped server-side
    // (litellm#21193, codex#4138) so 128K is informational only.
    {
      id: "gpt-5.5",
      name: "GPT 5.5",
      ...GPT_5_5_CODEX_CAPABILITIES,
      contextLength: 400000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.5-xhigh",
      name: "GPT 5.5 (xHigh)",
      ...GPT_5_5_CODEX_CAPABILITIES,
      contextLength: 400000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.5-high",
      name: "GPT 5.5 (High)",
      ...GPT_5_5_CODEX_CAPABILITIES,
      contextLength: 400000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.5-medium",
      name: "GPT 5.5 (Medium)",
      ...GPT_5_5_CODEX_CAPABILITIES,
      contextLength: 400000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.5-low",
      name: "GPT 5.5 (Low)",
      ...GPT_5_5_CODEX_CAPABILITIES,
      contextLength: 400000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.4",
      name: "GPT 5.4",
      ...GPT_5_4_CODEX_CAPABILITIES,
    },
    {
      id: "gpt-5.4-xhigh",
      name: "GPT 5.4 (xHigh)",
      ...GPT_5_4_CODEX_CAPABILITIES,
    },
    {
      id: "gpt-5.4-high",
      name: "GPT 5.4 (High)",
      ...GPT_5_4_CODEX_CAPABILITIES,
    },
    {
      id: "gpt-5.4-medium",
      name: "GPT 5.4 (Medium)",
      ...GPT_5_4_CODEX_CAPABILITIES,
    },
    {
      id: "gpt-5.4-low",
      name: "GPT 5.4 (Low)",
      ...GPT_5_4_CODEX_CAPABILITIES,
    },
    { id: "gpt-5.4-mini", name: "GPT 5.4 Mini", targetFormat: "openai-responses" },
    { id: "gpt-5.3-codex-spark", name: "GPT 5.3 Codex Spark" },
    {
      id: "gpt-5.3-codex",
      name: "GPT 5.3 Codex",
      targetFormat: "openai-responses",
      supportsReasoning: true,
      supportsXHighEffort: true,
    },
    { id: "gpt-5.2", name: "GPT 5.2" },
  ],
};
