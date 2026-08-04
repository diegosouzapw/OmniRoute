import type { RegistryEntry, RegistryModel } from "../../shared.ts";

/**
 * Cheaper Inference (https://api.cheaperinference.com) — cost-ranked OpenAI-compatible
 * gateway, OmniRoute Open Source Friend.
 *
 * Catalog captured from a live `GET /v1/models` on 2026-07-31 (42 entries: these 39
 * `type:"text"` models plus 3 `type:"image"` models that live in imageRegistry.ts —
 * sending an image model here returns HTTP 400 "Use POST /v1/images/generations").
 * `supportsVision`/`supportsReasoning` mirror each entry's `capabilities` object
 * verbatim; they are not inferred from the model name.
 *
 * The gateway also serves a native `/v1/responses` endpoint (`responsesBaseUrl`).
 * It is stateless and REQUIRES `store:false` — see executors/cheaperinference.ts,
 * which injects it and resolves the URL from the per-model `targetFormat` tag.
 */
export const CHEAPERINFERENCE_MODELS: RegistryModel[] = [
  { id: "aion-labs.aion-2-0", name: "Aion 2.0", supportsReasoning: true, toolCalling: true },
  {
    id: "claude-fable-5",
    name: "Claude Fable 5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-4-7-fast",
    name: "Claude Opus 4.7 Fast",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-4-8-fast",
    name: "Claude Opus 4.8 Fast",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-4.5",
    name: "Claude Opus 4.5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-4.6",
    name: "Claude Opus 4.6",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-4.7",
    name: "Claude Opus 4.7",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-4.8",
    name: "Claude Opus 4.8",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-5",
    name: "Claude Opus 5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-opus-5-fast",
    name: "Claude Opus 5 Fast",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-4.6",
    name: "Claude Sonnet 4.6",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsReasoning: true, toolCalling: true },
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true, toolCalling: true },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "gemini-3-5-flash",
    name: "Gemini 3.5 Flash",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "gemini-3-flash-preview",
    name: "Gemini 3 Flash Preview",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro Preview",
    supportsReasoning: true,
    toolCalling: true,
  },
  { id: "glm-4.5", name: "GLM-4.5", supportsReasoning: true, toolCalling: true },
  { id: "glm-4.5-air", name: "GLM-4.5 Air", supportsReasoning: true, toolCalling: true },
  { id: "glm-4.6", name: "GLM-4.6", supportsReasoning: true, toolCalling: true },
  { id: "glm-4.7", name: "GLM-4.7", supportsReasoning: true, toolCalling: true },
  { id: "glm-5", name: "GLM-5", supportsReasoning: true, toolCalling: true },
  { id: "glm-5.1", name: "GLM-5.1", supportsReasoning: true, toolCalling: true },
  { id: "glm-5.2", name: "GLM-5.2", supportsReasoning: true, toolCalling: true },
  {
    id: "google/gemini-3.5-flash-lite",
    name: "Gemini 3.5 Flash Lite",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  // The GPT-5.x family is tagged for the gateway's native /v1/responses endpoint —
  // that is the surface OpenAI-family clients (Codex-style) expect for tool loops.
  {
    id: "gpt-5.4",
    name: "GPT-5.4",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    targetFormat: "openai-responses",
  },
  {
    id: "gpt-5.4-mini",
    name: "GPT-5.4 Mini",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    targetFormat: "openai-responses",
  },
  {
    id: "gpt-5.5",
    name: "GPT-5.5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    targetFormat: "openai-responses",
  },
  {
    id: "gpt-5.6-luna",
    name: "GPT-5.6 Luna",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    targetFormat: "openai-responses",
  },
  {
    id: "gpt-5.6-sol",
    name: "GPT-5.6 Sol",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    targetFormat: "openai-responses",
  },
  {
    id: "gpt-5.6-terra",
    name: "GPT-5.6 Terra",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    targetFormat: "openai-responses",
  },
  {
    id: "grok-4.5",
    name: "Grok 4.5",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
  },
  { id: "minimax-m2.7", name: "MiniMax M2.7", supportsReasoning: true, toolCalling: true },
];

export const cheaperinferenceProvider: RegistryEntry = {
  id: "cheaperinference",
  alias: "cinf",
  format: "openai",
  executor: "cheaperinference",
  baseUrl: "https://api.cheaperinference.com/v1/chat/completions",
  // The gateway serves a native, STATELESS /v1/responses endpoint alongside
  // /v1/chat/completions. Consumed by CheaperInferenceExecutor.buildUrl for the
  // models tagged targetFormat: "openai-responses" above.
  responsesBaseUrl: "https://api.cheaperinference.com/v1/responses",
  authType: "apikey",
  authHeader: "bearer",
  models: CHEAPERINFERENCE_MODELS,
};
