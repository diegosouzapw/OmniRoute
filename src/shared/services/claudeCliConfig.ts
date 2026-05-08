export function normalizeClaudeBaseUrl(value: string): string {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
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
