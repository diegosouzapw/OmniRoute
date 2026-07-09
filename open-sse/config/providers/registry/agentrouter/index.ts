import type { RegistryEntry } from "../../shared.ts";

export const agentrouterProvider: RegistryEntry = {
  id: "agentrouter",
  alias: "agentrouter",
  format: "claude",
  executor: "default",
  baseUrl: "https://agentrouter.org/v1/messages",
  authType: "apikey",
  authHeader: "x-api-key",
  defaultContextLength: 128000,
  // No static `headers` here: agentrouter now adopts the DYNAMIC Claude-Code
  // wire image via CC_WIRE_IMAGE_BUILTINS (#6056) — the fingerprint/headers are
  // applied by buildProviderHeaders + applyFingerprint, keeping this entry's
  // own baseUrl + x-api-key auth. A static fingerprint here would drift and
  // trip AgentRouter's WAF ("unauthorized client detected").
  models: [
    { id: "claude-opus-4-6", name: "Claude 4.6 Opus" },
    { id: "claude-haiku-4-5-20251001", name: "Claude 4.5 Haiku" },
    { id: "glm-5.1", name: "GLM 5.1" },
    { id: "deepseek-v3.2", name: "DeepSeek V3.2" },
  ],
  passthroughModels: true,
};
