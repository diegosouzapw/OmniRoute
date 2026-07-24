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
      id: "glm-5.2",
      name: "GLM-5.2",
      toolCalling: false,
      supportsReasoning: true,
    },
    {
      id: "GLM-5.1",
      name: "GLM-5.1",
      toolCalling: false,
      supportsReasoning: true,
    },
    {
      id: "GLM-5-Turbo",
      name: "GLM-5-Turbo",
      toolCalling: false,
      supportsReasoning: true,
    },
    {
      id: "GLM-5v-Turbo",
      name: "GLM-5V-Turbo",
      toolCalling: false,
      supportsReasoning: true,
      supportsVision: true,
    },
  ],
};
