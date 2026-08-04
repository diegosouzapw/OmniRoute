import type { RegistryEntry } from "../../../shared.ts";

export const gemini_webProvider: RegistryEntry = {
  id: "gemini-web",
  alias: "gweb",
  format: "openai",
  executor: "gemini-web",
  baseUrl: "https://gemini.google.com/app",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro", toolCalling: false },
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash", toolCalling: false },
    { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash-Lite", toolCalling: false },
  ],
};
