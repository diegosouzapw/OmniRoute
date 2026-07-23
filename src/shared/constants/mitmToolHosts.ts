/**
 * Per-tool MITM DNS hosts — the domains redirected to 127.0.0.1 when a tool's MITM DNS
 * routing is enabled. Surfaced in the dashboard so users on locked-down machines (where the
 * automatic hosts-file edit needs admin/sudo) can add the entries manually.
 *
 * This is a CLIENT-SAFE projection of the canonical server-side registry in
 * `src/mitm/targets/`. The MITM target modules pull in node-only handler logic, so the
 * dashboard cannot import them directly — this plain-data map is kept in lock-step with
 * `ALL_TARGETS` by `tests/unit/mitm-tool-hosts.test.ts` (a drift here fails that test).
 */
export const MITM_TOOL_HOSTS: Record<string, string[]> = {
  antigravity: [
    "daily-cloudcode-pa.googleapis.com",
    "cloudcode-pa.googleapis.com",
    "daily-cloudcode-pa.sandbox.googleapis.com",
    "autopush-cloudcode-pa.sandbox.googleapis.com",
  ],
  kiro: ["api.anthropic.com"],
  copilot: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  // GHE Copilot has no fixed host: the enterprise domain is per-connection (gheUrl), so the
  // canonical target declares an empty host list and nothing is added to the hosts file.
  "ghe-copilot": [],
  codex: ["chatgpt.com"],
  cursor: ["api2.cursor.sh"],
  zed: ["api.zed.dev"],
  "claude-code": ["api.anthropic.com"],
  "open-code": ["opencode.ai"],
  trae: ["trae.invalid"],
};

/** Hosts for a tool id, falling back to an empty list for unknown ids. */
export function getMitmToolHosts(toolId: string): string[] {
  return MITM_TOOL_HOSTS[toolId] ?? [];
}
