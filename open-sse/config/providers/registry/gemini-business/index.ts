import type { RegistryEntry } from "../../shared.ts";

export const gemini_businessProvider: RegistryEntry = {
  id: "gemini-business",
  alias: "gbiz",
  format: "openai",
  executor: "gemini-business",
  baseUrl: "https://gemini.google.com/app",
  models: [
    { id: "gemini-pro", name: "Gemini Pro" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
  ],
  defaultModel: "gemini-1.5-pro",
  auth: "cookie",
};
