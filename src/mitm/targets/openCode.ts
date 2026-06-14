/**
 * OpenCode — MITM target descriptor.
 *
 * Hosts: `opencode.ai`.
 * Format: OpenAI-compatible Chat Completions on `/v1/chat/completions`.
 */
import type { MitmTarget } from "../types";

export const OPEN_CODE_TARGET: MitmTarget = {
  id: "open-code",
  name: "OpenCode",
  icon: "code",
  color: "#22D3EE",
  hosts: ["opencode.ai"],
  port: 443,
  endpointPatterns: ["/v1/chat/completions"],
  defaultModels: [
    { id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" },
    { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", alias: "claude-3.5-sonnet" },
  ],
  setupTutorial: {
    steps: [
      "Install the OpenCode CLI/IDE",
      "Install OmniRoute's root certificate",
      "Enable DNS routing for OpenCode",
      "Restart OpenCode",
      "Done — OpenCode traffic now routes through OmniRoute",
    ],
    detection: { command: "which opencode", platform: "all" },
  },
  handler: () =>
    import("../handlers/openCode").then((m) => ({ default: m.OpenCodeHandler })),
  riskNoticeKey: "providers.riskNotice.oauth",
};
