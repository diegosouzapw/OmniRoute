import type { RegistryEntry } from "../../shared.ts";

const NATIVE_CAPABILITIES = {
  targetFormat: "openai-responses",
  toolCalling: true,
  supportsReasoning: true,
  supportsVision: true,
  supportsXHighEffort: true,
} as const;

export const chatgpt_web_codexProvider: RegistryEntry = {
  id: "chatgpt-web-codex",
  alias: "cgpt-codex",
  format: "openai-responses",
  executor: "chatgpt-web-codex",
  baseUrl: "https://chatgpt.com",
  reasoningTransport: "opaque",
  authType: "apikey",
  authHeader: "cookie",
  forceStream: true,
  models: [
    { id: "luna", name: "ChatGPT Web — Luna", ...NATIVE_CAPABILITIES },
    { id: "think", name: "ChatGPT Web — Think", ...NATIVE_CAPABILITIES },
    { id: "instant", name: "ChatGPT Web — Instant", ...NATIVE_CAPABILITIES },
    { id: "medium", name: "ChatGPT Web — Medium", ...NATIVE_CAPABILITIES },
    { id: "high", name: "ChatGPT Web — High", ...NATIVE_CAPABILITIES },
    { id: "extra-high", name: "ChatGPT Web — Extra High", ...NATIVE_CAPABILITIES },
    { id: "pro", name: "ChatGPT Web — Pro", ...NATIVE_CAPABILITIES },
  ],
};
