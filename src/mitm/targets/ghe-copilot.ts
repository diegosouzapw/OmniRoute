/**
 * GitHub Enterprise (GHE) Copilot — MITM target descriptor.
 */
import type { MitmTarget } from "../types";

export const GHE_COPILOT_TARGET: MitmTarget = {
  id: "ghe-copilot",
  name: "GitHub Enterprise Copilot",
  icon: "code",
  color: "#10B981",
  // Hosts will be dynamically matched via the configured gheUrl
  // Empty array means "match via provider config" in the MITM layer
  hosts: [],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions", "/responses"],
  defaultModels: [
    { id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" },
    { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", alias: "claude-3.5-sonnet" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", alias: "gemini-2.0-flash" },
  ],
  setupTutorial: {
    steps: [
      "Configure your GHE Copilot endpoint URL in OmniRoute provider settings",
      "Ensure your GHE instance has Copilot enabled",
      "Sign in to GitHub Enterprise with a Copilot-enabled account",
      "Enable DNS routing for this agent",
      "Restart your IDE (VS Code, JetBrains, etc.)",
      "Done — GHE Copilot now routes via OmniRoute",
    ],
    detection: { command: "code --list-extensions", platform: "all" },
  },
  handler: () =>
    import("../handlers/copilot").then((m) => ({ default: m.CopilotHandler })),
  riskNoticeKey: "providers.riskNotice.oauth",
};