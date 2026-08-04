export function normalizeClaudeBaseUrl(value: string): string {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
}

export interface ClaudeDiscoverySnippetInput {
  /** OmniRoute root — Claude Code appends `/v1/messages` itself, so no `/v1` suffix. */
  baseUrl: string;
  /** Rendered verbatim; the caller passes a placeholder, never a real key. */
  apiKeyPlaceholder: string;
  /**
   * Optional `CLAUDE_CODE_AUTO_COMPACT_WINDOW`. Claude Code assumes a 200K window for
   * any model id it does not recognize, so a model with a different real window needs
   * this or auto-compaction fires at the wrong point. Omitted when absent/invalid.
   */
  autoCompactWindow?: number;
}

/**
 * Build the `settings.json` fragment that points Claude Code at this OmniRoute and
 * turns on gateway model discovery. Pure string builder — no key material, no I/O —
 * so the dashboard can render it and a test can assert its exact shape.
 */
export function buildClaudeDiscoverySettingsSnippet(input: ClaudeDiscoverySnippetInput): string {
  const env: Record<string, string> = {
    ANTHROPIC_BASE_URL: normalizeClaudeBaseUrl(input.baseUrl),
    ANTHROPIC_AUTH_TOKEN: input.apiKeyPlaceholder,
    CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY: "1",
  };

  const window = input.autoCompactWindow;
  if (typeof window === "number" && Number.isFinite(window) && window > 0) {
    // Claude Code reads settings env values as strings.
    env.CLAUDE_CODE_AUTO_COMPACT_WINDOW = String(Math.floor(window));
  }

  return JSON.stringify({ env }, null, 2);
}

export function getStoredClaudeAuthValue(
  env: Record<string, unknown> | null | undefined
): string | null {
  if (!env || typeof env !== "object") return null;

  const authValue = env.ANTHROPIC_AUTH_TOKEN ?? env.ANTHROPIC_API_KEY;
  if (typeof authValue !== "string") return null;

  const trimmed = authValue.trim();
  return trimmed.length > 0 ? trimmed : null;
}
