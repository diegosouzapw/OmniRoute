/**
 * Claude Code (Anthropic CLI) — MITM target descriptor.
 *
 * Hosts: `api.anthropic.com`.
 * Format: Anthropic Messages API on `/v1/messages`.
 *
 * NOTE: shares the host `api.anthropic.com` with the Kiro target. The DNS-routing
 * tutorial therefore is opt-in: the user explicitly enables interception when
 * they want Claude Code traffic captured.
 */
import type { MitmTarget } from "../types";

export const CLAUDE_CODE_TARGET: MitmTarget = {
  id: "claude-code",
  name: "Claude Code",
  icon: "terminal",
  color: "#D97706",
  hosts: ["api.anthropic.com"],
  port: 443,
  endpointPatterns: ["/v1/messages"],
  defaultModels: [
    { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", alias: "claude-sonnet-4.5" },
    { id: "claude-opus-4.5", name: "Claude Opus 4.5", alias: "claude-opus-4.5" },
  ],
  setupTutorial: {
    steps: [
      "Install Claude Code (Anthropic CLI)",
      "Install OmniRoute's root certificate",
      "Enable DNS routing for Claude Code",
      "Run `claude` — requests are now proxied via OmniRoute",
    ],
    detection: { command: "which claude", platform: "all" },
  },
  handler: () =>
    import("../handlers/claudeCode").then((m) => ({ default: m.ClaudeCodeHandler })),
  riskNoticeKey: "providers.riskNotice.oauth",
};
