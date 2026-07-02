import type { RegistryEntry } from "../../../shared.ts";
import { resolvePublicCred } from "../../../shared.ts";

export const gemini_cliProvider: RegistryEntry = {
  id: "gemini-cli",
  alias: "gemini-cli",
  format: "gemini-cli",
  executor: "gemini-cli",
  baseUrl: "https://cloudcode-pa.googleapis.com/v1internal",
  urlBuilder: (base, model, stream) => {
    const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
    return `${base}:${action}`;
  },
  authType: "apikey",
  authHeader: "x-goog-api-key",
  defaultContextLength: 1048576,
  oauth: {
    clientIdEnv: "GEMINI_CLI_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("gemini_id"),
    clientSecretEnv: "GEMINI_CLI_OAUTH_CLIENT_SECRET",
    clientSecretDefault: resolvePublicCred("gemini_alt"),
  },
  models: [
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    { id: "gemini-2.0-flash-thinking", name: "Gemini 2.0 Flash Thinking" },
    { id: "gemini-2.0-pro-exp-02-05", name: "Gemini 2.0 Pro Experimental" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
    { id: "gemini-3.1-pro-preview-customtools", name: "Gemini 3.1 Pro Preview Custom Tools" },
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
    { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite" },
  ],
};
