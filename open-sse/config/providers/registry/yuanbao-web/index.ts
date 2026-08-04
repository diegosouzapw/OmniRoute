import type { RegistryEntry } from "../../shared.ts";

export const yuanbao_webProvider: RegistryEntry = {
  id: "yuanbao-web",
  alias: "ybw",
  format: "openai",
  executor: "yuanbao-web",
  baseUrl: "https://yuanbao.tencent.com/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "deepseek-v3", name: "DeepSeek V3 (via Yuanbao)", toolCalling: false },
    {
      id: "deepseek-r1",
      name: "DeepSeek R1 (via Yuanbao)",
      supportsReasoning: true,
    },
    { id: "hunyuan", name: "Hunyuan (via Yuanbao)", toolCalling: false },
    {
      id: "hunyuan-t1",
      name: "Hunyuan T1 (via Yuanbao)",
      supportsReasoning: true,
    },
    { id: "deepseek-v3-search", name: "DeepSeek V3 + Web Search (via Yuanbao)", toolCalling: false },
    {
      id: "deepseek-r1-search",
      name: "DeepSeek R1 + Web Search (via Yuanbao)",
      supportsReasoning: true,
    },
    { id: "hunyuan-search", name: "Hunyuan + Web Search (via Yuanbao)", toolCalling: false },
    {
      id: "hunyuan-t1-search",
      name: "Hunyuan T1 + Web Search (via Yuanbao)",
      supportsReasoning: true,
    },
  ],
};
