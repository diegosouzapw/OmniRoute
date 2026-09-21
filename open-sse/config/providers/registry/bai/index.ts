import type { RegistryEntry } from "../../shared.ts";

export const baiProvider: RegistryEntry = {
  id: "bai",
  alias: "bai",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.b.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://api.b.ai/v1/models",
  models: [],
  passthroughModels: true,
  // #13599: bai resells DeepSeek's `deepseek-reasoner` thinking-mode models, which 400
  // when a prior assistant turn is missing `reasoning_content` on a follow-up request.
  requiresReasoningContentEcho: true,
};
