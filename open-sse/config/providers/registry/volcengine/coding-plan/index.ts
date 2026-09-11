import type { RegistryEntry, RegistryModel } from "../../../shared.ts";

/**
 * Volcano Ark Coding Plan models.
 *
 * The Coding Plan subscription (console.volcengine.com/ark/subscription/coding-plan)
 * is served by a DEDICATED endpoint — `/api/coding/v3` — which differs from both the
 * standard pay-per-use API (`/api/v3`) and the Agent Plan API (`/api/plan/v3`). Using
 * the wrong base URL returns HTTP 401 "The API key or AK/SK ... is missing or invalid"
 * even with a valid Coding Plan key. Model IDs below verified live against
 * /api/coding/v3/chat/completions (all return 200).
 */
export const VOLCENGINE_CODING_PLAN_MODELS: RegistryModel[] = [
  {
    id: "doubao-seed-2-1-turbo",
    name: "Doubao Seed 2.1 Turbo (Coding Plan)",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "doubao-seed-2.0-lite",
    name: "Doubao Seed 2.0 Lite (Coding Plan)",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash (Coding Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-5.2",
    name: "GLM 5.2 (Coding Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "kimi-k2.7-code",
    name: "Kimi K2.7 Code (Coding Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "minimax-m3",
    name: "MiniMax M3 (Coding Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro (Coding Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "minimax-m2.7",
    name: "MiniMax M2.7 (Coding Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "kimi-k2.6",
    name: "Kimi K2.6 (Coding Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
];

export const volcengine_coding_planProvider: RegistryEntry = {
  id: "volcengine-coding-plan",
  alias: "vecp",
  format: "openai",
  executor: "default",
  baseUrl: "https://ark.cn-beijing.volces.com/api/coding/v3/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: VOLCENGINE_CODING_PLAN_MODELS,
  modelsUrl: "/models",
};
