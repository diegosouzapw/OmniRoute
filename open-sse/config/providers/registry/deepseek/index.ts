import { getAnthropicCompatHeaders, type RegistryEntry } from "../../shared.ts";

export const deepseekProvider: RegistryEntry = {
  id: "deepseek",
  alias: "ds",
  format: "openai-responses",
  executor: "default",
  baseUrl: "https://api.deepseek.com/responses",
  authType: "apikey",
  defaultContextLength: 1_000_000,
  authHeader: "bearer",
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://api.deepseek.com/anthropic/v1/messages",
      authHeader: "x-api-key",
      headers: getAnthropicCompatHeaders(),
      label: "Anthropic-compatible",
    },
  ],
  models: [
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro (0813)",
      contextLength: 1_000_000,
      maxOutputTokens: 384_000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
      toolCalling: true,
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash (0731)",
      contextLength: 1_000_000,
      maxOutputTokens: 384_000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
      toolCalling: true,
    },
    {
      // The multimodal flagship of the Flash line. DeepSeek's current API id is
      // `deepseek-flash`; `deepseek-v4-flash` and the retired
      // `deepseek-v4-flash-vision-exp` route here for compatibility.
      id: "deepseek-v4.1-flash",
      aliases: ["deepseek-flash"],
      name: "DeepSeek V4.1 Flash",
      contextLength: 1_000_000,
      maxOutputTokens: 384_000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
      toolCalling: true,
      supportsVision: true,
    },
  ],
};
