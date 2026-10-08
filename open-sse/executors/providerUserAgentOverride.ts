import { getClaudeCodeClientVersion } from "../../src/shared/constants/claudeCodeClient.ts";

const CLAUDE_CLI_UA = /^claude-cli\/(\d+)\.(\d+)\.(\d+)/;

function parseVersion(v: string): number[] {
  return v.split(".").map((n) => Number.parseInt(n, 10) || 0);
}

function isOlder(a: number[], b: number[]): boolean {
  for (let i = 0; i < 3; i++) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) < (b[i] ?? 0);
  }
  return false;
}

/**
 * Resolve the `<PROVIDER>_USER_AGENT` env override for a provider.
 * Returns null when there is no override, or when the provider is `claude` and the
 * override is a `claude-cli/X.Y.Z` string older than the pinned Claude Code version:
 * stale `.env` files bootstrapped from an old `.env.example` (#15740) would otherwise
 * pin the wire UA below Anthropic's per-model minimum-version gate. Custom UAs and
 * newer claude-cli versions stay honored.
 */
export function resolveProviderUserAgentOverride(
  providerId: string,
  envValue: string | undefined
): string | null {
  const ua = envValue?.trim();
  if (!ua) return null;
  if (providerId.toLowerCase() !== "claude") return ua;
  const m = ua.match(CLAUDE_CLI_UA);
  if (!m) return ua;
  const pinned = parseVersion(getClaudeCodeClientVersion());
  return isOlder([Number(m[1]), Number(m[2]), Number(m[3])], pinned) ? null : ua;
}
