import type { RegistryEntry, RegistryModel } from "../../shared.ts";
import { getAnthropicCompatHeaders, ANTHROPIC_VERSION_HEADER } from "../../shared.ts";

export const BAILIAN_CODING_PLAN_MODELS: RegistryModel[] = [
  {
    id: "qwen3.8-max-preview",
    name: "Qwen3.8 Max Preview",
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
    contextLength: 1_000_000,
    maxOutputTokens: 65_536,
  },
  {
    id: "qwen3.7-max",
    name: "Qwen3.7 Max",
    supportsReasoning: true,
    toolCalling: true,
    contextLength: 1_000_000,
    maxOutputTokens: 65_536,
  },
  {
    id: "qwen3.7-plus",
    name: "Qwen3.7 Plus",
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
    contextLength: 1_000_000,
    maxOutputTokens: 65_536,
  },
  {
    id: "qwen3.6-flash",
    name: "Qwen3.6 Flash",
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
    contextLength: 1_000_000,
    maxOutputTokens: 32_768,
  },
  {
    id: "glm-5.2",
    name: "GLM 5.2",
    supportsReasoning: true,
    toolCalling: true,
    contextLength: 1_000_000,
    maxOutputTokens: 16_384,
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    supportsReasoning: true,
    toolCalling: true,
    contextLength: 163_840,
    maxOutputTokens: 32_768,
  },
];

export const bailian_coding_planProvider: RegistryEntry = {
  id: "bailian-coding-plan",
  alias: "bcp",
  format: "claude",
  executor: "default",
  // Token Plan endpoint (the catalog entry is "Alibaba Token Plan"). The former
  // coding-intl.dashscope.aliyuncs.com host only accepts Coding Plan keys and rejects
  // Token Plan keys with 401 invalid_api_key. Verified live 2026-08-14: this host
  // returns 200 for every model below with the same key.
  // Docs: https://www.alibabacloud.com/help/en/model-studio/more-tools
  baseUrl: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/apps/anthropic/v1",
  chatPath: "/messages",
  authType: "apikey",
  authHeader: "x-api-key",
  headers: getAnthropicCompatHeaders(),
  models: BAILIAN_CODING_PLAN_MODELS,
};
