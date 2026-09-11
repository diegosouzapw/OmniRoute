import type { RegistryEntry, RegistryModel } from "../../../shared.ts";

/**
 * Volcano Ark Agent Plan models.
 *
 * The Agent Plan subscription (console.volcengine.com/ark/subscription/agent-plan)
 * is served by the Plan API endpoint — `/api/plan/v3` — which differs from both the
 * standard pay-per-use API (`/api/v3`) and the Coding Plan API (`/api/coding/v3`).
 * The Plan API has NO `/models` listing endpoint (returns 404); key validation falls
 * back to a chat probe against the first model. Model IDs below verified live against
 * /api/plan/v3/chat/completions (all return 200).
 */
export const VOLCENGINE_AGENT_PLAN_MODELS: RegistryModel[] = [
  {
    id: "doubao-seed-evolving",
    name: "Doubao Seed Evolving (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "doubao-seed-2-1-turbo-260628",
    name: "Doubao Seed 2.1 Turbo (Agent Plan)",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "doubao-seed-2-0-lite-260215",
    name: "Doubao Seed 2.0 Lite (Agent Plan)",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "doubao-seed-2-0-mini-260215",
    name: "Doubao Seed 2.0 Mini (Agent Plan)",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "deepseek-v4-flash-ga-260731",
    name: "DeepSeek V4 Flash GA (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "kimi-k3",
    name: "Kimi K3 (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "glm-5-2-260617",
    name: "GLM 5.2 (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "kimi-k2.7-code",
    name: "Kimi K2.7 Code (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "minimax-m3",
    name: "MiniMax M3 (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    id: "deepseek-v4-pro-260425",
    name: "DeepSeek V4 Pro (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "minimax-m2.7",
    name: "MiniMax M2.7 (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "kimi-k2.6",
    name: "Kimi K2.6 (Agent Plan)",
    contextLength: 1048576,
    toolCalling: true,
    supportsReasoning: true,
  },
];

export const volcengine_agent_planProvider: RegistryEntry = {
  id: "volcengine-agent-plan",
  alias: "veap",
  format: "openai",
  executor: "default",
  baseUrl: "https://ark.cn-beijing.volces.com/api/plan/v3/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: VOLCENGINE_AGENT_PLAN_MODELS,
};
