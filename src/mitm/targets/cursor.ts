/**
 * Cursor IDE — MITM target descriptor.
 *
 * Hosts: `api2.cursor.sh` (chat backend).
 * Format: OpenAI-compatible Chat Completions on `/v1/chat/completions`.
 */
import type { MitmTarget } from "../types";

export const CURSOR_TARGET: MitmTarget = {
  id: "cursor",
  name: "Cursor IDE",
  icon: "edit_note",
  color: "#0EA5E9",
  hosts: ["api2.cursor.sh"],
  port: 443,
  endpointPatterns: ["/v1/chat/completions"],
  defaultModels: [
    { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", alias: "claude-sonnet-4.5" },
    { id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" },
  ],
  setupTutorial: {
    steps: [
      "Install OmniRoute's root certificate",
      "Enable DNS routing for Cursor",
      "Restart Cursor IDE",
      "Done — Cursor traffic now routes through OmniRoute",
    ],
    detection: { command: "which cursor", platform: "all" },
  },
  handler: () =>
    import("../handlers/cursor").then((m) => ({ default: m.CursorHandler })),
  riskNoticeKey: "providers.riskNotice.oauth",
};
