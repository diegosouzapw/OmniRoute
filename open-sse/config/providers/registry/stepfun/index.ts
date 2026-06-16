import type { RegistryEntry } from "../../shared.ts";

export const stepfunProvider: RegistryEntry = {
  id: "stepfun",
  alias: "stepfun",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.stepfun.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "step-1v", name: "Step 1V" }],
};
