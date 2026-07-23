/**
 * GitHub Copilot — MITM target descriptor.
 */
import type { MitmTarget } from "../types";

export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  icon: "code",
  color: "#10B981",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [
    { id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" },
    { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", alias: "claude-3.5-sonnet" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", alias: "gemini-2.0-flash" },
  ],
  setupTutorial: {
    steps: [
      "Install GitHub Copilot extension in VS Code",
      "Sign in to GitHub with a Copilot-enabled account",
      "Enable DNS routing for this agent",
      "Restart VS Code",
      "Done — Copilot now routes via OmniRoute",
    ],
    detection: { command: "code --list-extensions", platform: "all" },
  },
  handler: () =>
    import("../handlers/copilot").then((m) => ({ default: m.CopilotHandler })),
  riskNoticeKey: "providers.riskNotice.oauth",
};
