import type { RegistryEntry } from "../../shared.ts";

export const agnesProvider: RegistryEntry = {
  id: "agnes",
  format: "openai",
  executor: "default",
  baseUrl: "https://apihub.agnes-ai.com/v1/chat/completions",
  modelsUrl: "https://apihub.agnes-ai.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "agnes-2.0-flash",
      name: "Agnes 2.0 Flash",
      contextLength: 262144,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "agnes-2.5-flash",
      name: "Agnes 2.5 Flash",
      contextLength: 524288,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      interleavedField: "reasoning_content",
    },
    {
      // Wiki (2026-09-10) lists agnes-3.0-flash at 512K context / 65,536 max
      // output, same window as 2.5 Flash. Live GET /v1/models includes it.
      id: "agnes-3.0-flash",
      name: "Agnes 3.0 Flash",
      contextLength: 524288,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      interleavedField: "reasoning_content",
    },
  ],
};
