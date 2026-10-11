import type { RegistryEntry } from "../../shared.ts";

export const stepfunProvider: RegistryEntry = {
  id: "stepfun",
  alias: "stepfun",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.stepfun.com/v1/chat/completions",
  modelsUrl: "https://api.stepfun.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-10-08: step-5-preview verified against the live api.stepfun.ai
  // catalog — 1,024,000 max input tokens, vision + reasoning, efforts
  // low/medium/high, chat/messages/responses. StepFun splits platforms:
  // api.stepfun.com serves platform.stepfun.com (China) keys and
  // api.stepfun.ai serves platform.stepfun.ai (international) keys — a key
  // from one platform 401s against the other. This entry keeps the China
  // endpoint; international keys set the connection's custom base URL to
  // https://api.stepfun.ai/v1 (honored via providerSpecificData.baseUrl).
  models: [
    {
      id: "step-5-preview",
      name: "Step 5 Preview",
      contextLength: 1_024_000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
      supportsVision: true,
      toolCalling: true,
    },
    { id: "step-3.7-flash", name: "Step 3.7 Flash", contextLength: 262144 },
    { id: "step-3.5-flash", name: "Step 3.5 Flash", contextLength: 262144 },
    { id: "step-3.5-flash-2603", name: "Step 3.5 Flash 2603", contextLength: 262144 },
    { id: "step-1o-turbo-vision", name: "Step 1o Turbo Vision", contextLength: 32768 },
    { id: "step-1v", name: "Step 1V" },
  ],
};
