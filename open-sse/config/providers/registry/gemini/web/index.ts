import type { RegistryEntry } from "../../../shared.ts";

export const gemini_webProvider: RegistryEntry = {
  id: "gemini-web",
  alias: "gweb",
  format: "openai",
  executor: "gemini-web",
  baseUrl: "https://gemini.google.com/app",
  authType: "apikey",
  authHeader: "cookie",
  // #9356: `supportsReasoning: false` is a live-behavior statement, not a guess
  // about the underlying Gemini model. The executor drives the gemini.google.com
  // web UI by typing a prompt, so it has no thinking-budget control to set and
  // never surfaces `reasoning_content` — agent routers reading /v1/models must
  // not select these for reasoning work. `toolCalling: false` is the matching
  // statement for native function calling; the prompt-emulation shim (#7286)
  // stays available and is advertised separately as `toolCalling: "emulated"`
  // on the provider constant (src/shared/constants/providers/web-cookie.ts).
  models: [
    {
      id: "gemini-3.1-pro",
      name: "Gemini 3.1 Pro",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-3.7-flash",
      name: "Gemini 3.7 Flash",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-3.1-flash-lite",
      name: "Gemini 3.1 Flash-Lite",
      toolCalling: false,
      supportsReasoning: false,
    },
  ],
};
