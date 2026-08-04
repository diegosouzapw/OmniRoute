import type { RegistryEntry } from "../../shared.ts";
import { getCodexCliRsHeaders } from "../../../codexClient.ts";

export const agentrouterProvider: RegistryEntry = {
  id: "agentrouter",
  alias: "agentrouter",
  format: "claude",
  executor: "default",
  baseUrl: "https://agentrouter.org/v1/messages",
  authType: "apikey",
  authHeader: "x-api-key",
  alternateFormats: [
    {
      format: "openai",
      baseUrl: "https://agentrouter.org/v1/chat/completions",
      authHeader: "bearer",
      headers: getCodexCliRsHeaders(),
      label: "OpenAI-compatible (Codex)",
    },
    {
      format: "openai-responses",
      baseUrl: "https://agentrouter.org/v1/responses",
      authHeader: "bearer",
      headers: getCodexCliRsHeaders(),
      label: "OpenAI Responses (Codex)",
    },
  ],
  defaultContextLength: 128000,
  // No static `headers` here: agentrouter now adopts the DYNAMIC Claude-Code
  // wire image via CC_WIRE_IMAGE_BUILTINS (#6056) — the fingerprint/headers are
  // applied by buildProviderHeaders + applyFingerprint, keeping this entry's
  // own baseUrl + x-api-key auth. A static fingerprint here would drift and
  // trip AgentRouter's WAF ("unauthorized client detected").
  models: [
    { id: "claude-opus-4-8", name: "Claude Opus 4.8" },
    { id: "claude-opus-5", name: "Claude Opus 5" },
    { id: "gpt-5.6-sol", name: "GPT-5.6 Sol" },
  ],
  passthroughModels: true,
};
