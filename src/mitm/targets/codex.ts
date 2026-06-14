/**
 * OpenAI Codex CLI — MITM target descriptor.
 */
import type { MitmTarget } from "../types";

export const CODEX_TARGET: MitmTarget = {
  id: "codex",
  name: "OpenAI Codex",
  icon: "smart_toy",
  color: "#F59E0B",
  hosts: ["chatgpt.com"],
  port: 443,
  endpointPatterns: ["/backend-api/codex/chat/completions", "/v1/chat/completions"],
  defaultModels: [
    { id: "gpt-4.1", name: "GPT-4.1", alias: "gpt-4.1" },
    { id: "gpt-4o-mini", name: "GPT-4o mini", alias: "gpt-4o-mini" },
  ],
  setupTutorial: {
    steps: [
      "Install the OpenAI Codex CLI",
      "Authenticate with your ChatGPT/Plus credentials",
      "Enable DNS routing for this agent",
      "Run `codex` — requests are now proxied via OmniRoute",
    ],
    detection: { command: "which codex", platform: "all" },
  },
  handler: () =>
    import("../handlers/codex").then((m) => ({ default: m.CodexHandler })),
  riskNoticeKey: "providers.riskNotice.oauth",
};
