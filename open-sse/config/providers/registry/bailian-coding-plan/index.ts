import type { RegistryEntry } from "../../shared.ts";
import {
  getAnthropicCompatHeaders,
  ANTHROPIC_VERSION_HEADER
} from "../../shared.ts";

export const bailian_coding_planProvider: RegistryEntry = {
  id: "bailian-coding-plan",
  alias: "bcp",
  format: "claude",
  executor: "default",
  baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
  chatPath: "/messages",
  authType: "apikey",
  authHeader: "x-api-key",
  headers: getAnthropicCompatHeaders(),
  models: [
    { id: "qwen3.6-plus", name: "Qwen3.6 Plus(vision)" },
    { id: "qwen3.5-plus", name: "Qwen3.5 Plus(vision)" },
    { id: "qwen3-max-2026-01-23", name: "Qwen3 Max" },
    { id: "kimi-k2.5", name: "Kimi K2.5(vision)" },
    { id: "glm-5", name: "GLM 5" },
    { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
  ],
};
