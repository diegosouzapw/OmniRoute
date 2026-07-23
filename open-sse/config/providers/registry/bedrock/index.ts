import type { RegistryEntry } from "../../shared.ts";

export const bedrockProvider: RegistryEntry = {
  id: "bedrock",
  alias: "bedrock",
  format: "openai",
  executor: "bedrock",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 200000,
  models: [
    {
      id: "anthropic.claude-sonnet-4-6",
      name: "Claude Sonnet 4.6 (Bedrock)",
      toolCalling: true,
      supportsVision: true,
      contextLength: 1000000,
    },
    {
      id: "anthropic.claude-sonnet-4-5",
      name: "Claude Sonnet 4.5 (Bedrock)",
      toolCalling: true,
      supportsVision: true,
      contextLength: 200000,
    },
    {
      id: "anthropic.claude-opus-4-6",
      name: "Claude Opus 4.6 (Bedrock)",
      toolCalling: true,
      supportsVision: true,
      contextLength: 1000000,
    },
    {
      id: "anthropic.claude-opus-4-7",
      name: "Claude Opus 4.7 (Bedrock)",
      toolCalling: true,
      supportsVision: true,
      contextLength: 1000000,
    },
    {
      id: "anthropic.claude-haiku-4-5",
      name: "Claude Haiku 4.5 (Bedrock)",
      toolCalling: true,
      supportsVision: true,
    },
    { id: "openai.gpt-oss-120b-1:0", name: "GPT-OSS 120B (Bedrock)" },
  ],
  passthroughModels: true,
};
