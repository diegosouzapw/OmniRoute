import type { RegistryEntry } from "../../shared.ts";
import {
  getClaudeCliHeaders,
  mapStainlessOs,
  mapStainlessArch,
  ANTHROPIC_BETA_CLAUDE_OAUTH,
  ANTHROPIC_VERSION_HEADER,
  CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
  CLAUDE_CLI_STAINLESS_RUNTIME_VERSION,
  CLAUDE_CLI_USER_AGENT
} from "../../shared.ts";

export const agentrouterProvider: RegistryEntry = {
  id: "agentrouter",
  alias: "agentrouter",
  format: "claude",
  executor: "default",
  baseUrl: "https://agentrouter.org/v1/messages",
  authType: "apikey",
  authHeader: "x-api-key",
  defaultContextLength: 128000,
  headers: getClaudeCliHeaders(),
  models: [
    { id: "claude-opus-4-6", name: "Claude 4.6 Opus" },
    { id: "claude-haiku-4-5-20251001", name: "Claude 4.5 Haiku" },
    { id: "glm-5.1", name: "GLM 5.1" },
    { id: "deepseek-v3.2", name: "DeepSeek V3.2" },
  ],
  passthroughModels: true,
};
