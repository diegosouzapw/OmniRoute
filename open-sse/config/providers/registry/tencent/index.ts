import type { RegistryEntry } from "../../shared.ts";

export const tencentProvider: RegistryEntry = {
  id: "tencent",
  alias: "tencent",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.hunyuan.cloud.tencent.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  modelsUrl: "https://api.hunyuan.cloud.tencent.com/v1/models",
  models: [
    {
      id: "hy3-preview",
      name: "Hunyuan 3 295B (Hy3 Preview)",
      contextLength: 262144,
      maxOutputTokens: 131072,
      supportsReasoning: true,
    },
    { id: "hunyuan-turbos-latest", name: "Hunyuan TurboS Latest", contextLength: 200000 },
    { id: "hunyuan-t1-latest", name: "Hunyuan T1 Latest", contextLength: 256000 },
    { id: "hunyuan-pro", name: "Hunyuan Pro" },
    { id: "hunyuan-vision", name: "Hunyuan Vision" },
    { id: "hunyuan-functioncall", name: "Hunyuan FunctionCall" },
    { id: "hunyuan-lite", name: "Hunyuan Lite" },
  ],
};
