import type { RegistryEntry } from "../../shared.ts";

export const stepfunProvider: RegistryEntry = {
  id: "stepfun",
  alias: "stepfun",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.stepfun.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: confirmed against platform.stepfun.com. step-3.7-flash
  // (2026-05-28) is the current flagship; step-1v is the legacy 2024 vision model.
  models: [
    { id: "step-3.7-flash", name: "Step 3.7 Flash", contextLength: 262144 },
    { id: "step-3.5-flash", name: "Step 3.5 Flash", contextLength: 262144 },
    { id: "step-3.5-flash-2603", name: "Step 3.5 Flash 2603", contextLength: 262144 },
    { id: "step-1o-turbo-vision", name: "Step 1o Turbo Vision", contextLength: 32768 },
    { id: "step-1v", name: "Step 1V" },
  ],
};
