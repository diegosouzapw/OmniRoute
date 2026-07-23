import type { RegistryEntry } from "../../shared.ts";

export const clova_studioProvider: RegistryEntry = {
  id: "clova-studio",
  alias: "clova",
  format: "openai",
  executor: "default",
  baseUrl: "https://clovastudio.stream.ntruss.com/v1/openai/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // HCX-007 stays first so it remains the provider default (deep-reasoning
    // flagship); HCX-005 is the multimodal option.
    { id: "HCX-007", name: "HCX-007" },
    { id: "HCX-005", name: "HCX-005" },
  ],
};
