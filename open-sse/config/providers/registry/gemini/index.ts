import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";

export const geminiProvider: RegistryEntry = {
  id: "gemini",
  alias: "gemini",
  format: "gemini",
  executor: "default",
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  urlBuilder: (base, model, stream) => {
    const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
    return `${base}/${model}:${action}`;
  },
  authType: "apikey",
  authHeader: "x-goog-api-key",
  defaultContextLength: 1048576,
  oauth: {
    clientIdEnv: "GEMINI_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("gemini_id"),
    clientSecretEnv: "GEMINI_OAUTH_CLIENT_SECRET",
    clientSecretDefault: resolvePublicCred("gemini_alt"),
  },
  models: [
    {
      id: "gemini-3.1-pro-preview",
      name: "Gemini 3.1 Pro Preview",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-3-flash-preview",
      name: "Gemini 3 Flash Preview",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-3.1-flash-lite",
      name: "Gemini 3.1 Flash Lite",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-3-flash-lite-preview",
      name: "Gemini 3 Flash Lite Preview",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-3.1-flash-lite-preview",
      name: "Gemini 3.1 Flash Lite Preview",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-3.5-flash",
      name: "Gemini 3.5 Flash",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-3.1-flash-tts-preview",
      name: "Gemini 3.1 Flash TTS",
    },
    {
      id: "gemini-2.5-pro",
      name: "Gemini 2.5 Pro",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-2.5-flash-lite",
      name: "Gemini 2.5 Flash Lite",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-2.0-flash",
      name: "Gemini 2.0 Flash",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-2.0-flash-lite",
      name: "Gemini 2.0 Flash Lite",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-2.0-flash-thinking-exp-01-21",
      name: "Gemini 2.0 Flash Thinking",
      capabilities: {
        supportsReasoning: true,
      },
    },
    {
      id: "gemini-2.0-pro-exp-02-05",
      name: "Gemini 2.0 Pro Experimental",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-1.5-pro",
      name: "Gemini 1.5 Pro",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
    {
      id: "gemini-1.5-flash",
      name: "Gemini 1.5 Flash",
      capabilities: {
        supportsTools: true,
        supportsVision: true,
      },
    },
  ],
};
