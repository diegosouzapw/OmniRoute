import type { RegistryEntry } from "../../shared.ts";
import { getAnthropicCompatHeaders } from "../../shared.ts";

export const waferProvider: RegistryEntry = {
  id: "wafer",
  alias: "wafer",
  format: "claude",
  executor: "default",
  baseUrl: "https://pass.wafer.ai/v1/messages",
  authType: "apikey",
  authHeader: "bearer",
  headers: getAnthropicCompatHeaders(),
  models: [
    { id: "DeepSeek-V4-Pro", name: "DeepSeek V4 Pro" },
    { id: "MiniMax-M2.7", name: "MiniMax M2.7" },
    { id: "Qwen3.5-397B-A17B", name: "Qwen3.5 397B A17B" },
    { id: "GLM-5.1", name: "GLM 5.1" },
  ],
};
