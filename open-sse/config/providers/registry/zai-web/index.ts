import type { RegistryEntry } from "../../shared.ts";

export const zai_webProvider: RegistryEntry = {
  id: "zai-web",
  alias: "zw",
  format: "openai",
  executor: "zai-web",
  // Free consumer web chat at chat.z.ai (Zhipu AI) — see
  // `open-sse/executors/zai-web.ts` for the cookie/session wire format.
  // Distinct from the API-key `zai`/`glm` providers (api.z.ai).
  baseUrl: "https://chat.z.ai",
  authType: "apikey",
  authHeader: "bearer",
  // Z.ai's visible "Tools" switch enables its internal VLM/MCP tools. It does
  // not accept caller-supplied OpenAI `tools`, which remains disabled here.
  models: [
    {
      id: "glm-5.3-flash",
      name: "GLM-5.3-Flash",
      toolCalling: false,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
      supportsVision: true,
    },
    {
      id: "glm-5.3",
      name: "GLM-5.3",
      toolCalling: false,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
    },
    {
      id: "glm-5.2",
      name: "GLM-5.2",
      toolCalling: false,
      supportsReasoning: true,
      supportedThinkingEfforts: ["high", "max"],
    },
  ],
};
