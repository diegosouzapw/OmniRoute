/**
 * Zed IDE — MITM target descriptor.
 *
 * Hosts: `api.zed.dev`.
 * Format: OpenAI-compatible Chat Completions on `/v1/chat/completions`.
 */
import type { MitmTarget } from "../types";

export const ZED_TARGET: MitmTarget = {
  id: "zed",
  name: "Zed",
  icon: "bolt",
  color: "#EF4444",
  hosts: ["api.zed.dev"],
  port: 443,
  endpointPatterns: ["/v1/chat/completions"],
  defaultModels: [
    { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", alias: "claude-3.5-sonnet" },
    { id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" },
  ],
  setupTutorial: {
    steps: [
      "Install OmniRoute's root certificate",
      "Enable DNS routing for Zed",
      "Restart Zed",
      "Done — Zed traffic now routes through OmniRoute",
    ],
    detection: { command: "which zed", platform: "all" },
  },
  handler: () => import("../handlers/zed").then((m) => ({ default: m.ZedHandler })),
  riskNoticeKey: "providers.riskNotice.oauth",
};
