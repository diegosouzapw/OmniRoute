import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const agnesProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "agnes",
  baseUrl: "https://apihub.agnes-ai.com/v1/chat/completions",
  models: [
    {
      id: "agnes-2.0-flash",
      name: "Agnes 2.0 Flash",
      contextLength: 524288,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      interleavedField: "reasoning_content",
    },
    {
      id: "agnes-1.5-flash",
      name: "Agnes 1.5 Flash",
      contextLength: 262144,
      maxOutputTokens: 65536,
      supportsVision: true,
    },
  ],
});
