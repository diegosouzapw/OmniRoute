import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * SEA-LION (AI Singapore) — OpenAI-compatible first-party API (api.sea-lion.ai).
 *
 * Free key from sea-lion.ai (Google sign-in, no
 * card); recurring free tier at 10 RPM. /models requires the key, so the free
 * models are pinned rather than discovered.
 */
export const sealionProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "sealion",
  baseUrl: "https://api.sea-lion.ai/v1/chat/completions",
  models: [
    { id: "aisingapore/Llama-SEA-LION-v3.5-70B-R", name: "Llama SEA-LION v3.5 70B R", contextLength: 131072 },
    { id: "aisingapore/Llama-SEA-LION-v3-70B-IT", name: "Llama SEA-LION v3 70B IT", contextLength: 131072 },
    { id: "aisingapore/Gemma-SEA-LION-v4-27B-IT", name: "Gemma SEA-LION v4 27B IT", contextLength: 131072 },
    { id: "aisingapore/Qwen-SEA-LION-v4.5-27B-IT", name: "Qwen SEA-LION v4.5 27B IT", contextLength: 32768 },
    { id: "aisingapore/Qwen-SEA-LION-v4-32B-IT", name: "Qwen SEA-LION v4 32B IT", contextLength: 32768 },
  ],
});
