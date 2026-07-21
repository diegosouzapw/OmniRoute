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
  authHeader: "cookie",
  models: [
    { id: "glm-4.6", name: "GLM-4.6", toolCalling: false },
    { id: "glm-4.5", name: "GLM-4.5", toolCalling: false },
    { id: "glm-4.5v", name: "GLM-4.5V (Vision)", toolCalling: false },
  ],
};
