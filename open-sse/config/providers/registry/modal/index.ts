import type { RegistryEntry } from "../../shared.ts";

export const modalProvider: RegistryEntry = {
  id: "modal",
  alias: "modal",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.modal.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "google/gemini-2.0-flash", name: "Gemini 2.0 Flash" }],
};
