import type { RegistryEntry } from "../../shared.ts";

export const tencent_aistudio_webProvider: RegistryEntry = {
  id: "tencent-aistudio-web",
  alias: "tasw",
  format: "openai",
  executor: "tencent-aistudio-web",
  baseUrl: "https://aistudio.tencent.ai/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    {
      id: "hy3-g",
      name: "HY3-G (via Tencent AI Studio)",
      toolCalling: false,
    },
    {
      id: "hunyuan-default",
      name: "Hunyuan Default (via Tencent AI Studio)",
      toolCalling: false,
    },
    {
      id: "hunyuan-3d",
      name: "Hunyuan 3D (via Tencent AI Studio)",
      toolCalling: false,
    },
  ],
};
