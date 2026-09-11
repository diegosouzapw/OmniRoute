import type { RegistryEntry } from "../../../shared.ts";

// #12107: gemini-business was registered only in the dashboard/connection
// catalog (src/shared/constants/providers/web-cookie.ts) and had no entry in
// this REGISTRY, so `/v1/models` and `/v1/providers/gemini-business/models`
// never published a model under `owned_by: "gemini-business"` and the listing
// came back empty. The model ids below are exactly the ones the executor's
// MODEL_CATEGORY_MAP understands (open-sse/executors/gemini-business.ts); keep
// the two lists in step when a model is added or retired.
//
// `toolCalling: false` / `supportsReasoning: false` are live-behavior statements
// with the same rationale as gemini-web (#9356): the executor posts a single
// prompt to the enterprise StreamGenerate endpoint with a fixed thinking mode
// and returns plain text only — it has no thinking-budget control to drive and
// no native function-calling channel, so agent routers reading /v1/models must
// not select these models for reasoning or native tool work.
export const gemini_businessProvider: RegistryEntry = {
  id: "gemini-business",
  alias: "gembiz",
  format: "openai",
  executor: "gemini-business",
  baseUrl: "https://business.gemini.google/home",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    {
      id: "gemini-3-pro",
      name: "Gemini 3 Pro (Enterprise)",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-3-ultra",
      name: "Gemini 3 Ultra (Enterprise)",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-3-flash",
      name: "Gemini 3 Flash (Enterprise)",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-2.5-pro",
      name: "Gemini 2.5 Pro (Enterprise)",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash (Enterprise)",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-2.5-flash-thinking",
      name: "Gemini 2.5 Flash Thinking (Enterprise)",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-2.0-pro",
      name: "Gemini 2.0 Pro",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-2.0-flash",
      name: "Gemini 2.0 Flash",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-2.0-flash-thinking",
      name: "Gemini 2.0 Flash Thinking",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-3-pro-image",
      name: "Gemini 3 Pro Image",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-2.0-flash-image",
      name: "Gemini 2.0 Flash Image",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "veo-3.1-generate",
      name: "Veo 3.1 Generate",
      toolCalling: false,
      supportsReasoning: false,
    },
  ],
};
