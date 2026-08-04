import type { RegistryEntry } from "../../../shared.ts";

export const deepseek_webProvider: RegistryEntry = {
  id: "deepseek-web",
  alias: "ds-web",
  format: "openai",
  executor: "deepseek-web",
  baseUrl: "https://chat.deepseek.com/api/v0/chat/completion",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", toolCalling: false },
    { id: "deepseek-v4-pro-think", name: "DeepSeek V4 Pro Think", supportsReasoning: true },
    { id: "deepseek-v4-pro-search", name: "DeepSeek V4 Pro Search", toolCalling: false },
    {
      id: "deepseek-v4-pro-think-search",
      name: "DeepSeek V4 Pro Think+Search",
      supportsReasoning: true,
    },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", toolCalling: false },
    { id: "deepseek-v4-flash-think", name: "DeepSeek V4 Flash Think", supportsReasoning: true },
    { id: "deepseek-v4-flash-search", name: "DeepSeek V4 Flash Search", toolCalling: false },
    {
      id: "deepseek-v4-flash-think-search",
      name: "DeepSeek V4 Flash Think+Search",
      supportsReasoning: true,
    },
    { id: "deepseek-chat", name: "DeepSeek Chat", toolCalling: false },
    { id: "deepseek-reasoner", name: "DeepSeek Reasoner", supportsReasoning: true },
    { id: "DeepSeek-R1", name: "DeepSeek R1", supportsReasoning: true },
    { id: "DeepSeek-R1-Search", name: "DeepSeek R1 Search", supportsReasoning: true },
    { id: "DeepSeek-V3.2", name: "DeepSeek V3.2", toolCalling: false },
    { id: "DeepSeek-Search", name: "DeepSeek Search", toolCalling: false },
  ],
};
