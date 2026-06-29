import { normalizeCliCompatProviderId } from "../utils/cliCompat";

export { normalizeCliCompatProviderId };

export const IMPLEMENTED_CLI_FINGERPRINT_PROVIDER_IDS = [
  "claude",
  "codex",
  "github",
  "antigravity",
  "qwen",
] as const;

export const CLI_COMPAT_DISPLAY_PROVIDER_IDS = [
  "claude",
  "codex",
  "copilot",
  "antigravity",
  "qwen",
] as const;

/**
 * Known CLI/tool providers that are intentionally not exposed as CLI Fingerprint toggles yet.
 *
 * This setting controls the generic `applyFingerprint()` pipeline (header/body ordering plus
 * optional CLI User-Agent overrides). Do not expose providers here just because they have a
 * CLI Tools card or a provider integration:
 *
 * - Kiro and Cursor already apply their native parity inside custom executors, so a toggle would
 *   be misleading unless it controls additional behavior.
 * - Droid, OpenClaw, Windsurf and Hermes are CLI tool setup guides/settings, not upstream provider
 *   fingerprints handled by OmniRoute.
 * - Cline, Kilo Code, OpenCode and Kimi Coding have real provider/backend integrations, but no
 *   captured `CLI_FINGERPRINTS` entry is wired to `applyFingerprint()` yet.
 *
 * Keep this list as documentation for intentionally omitted candidates. When adding a provider to
 * the visible toggle list, also add a real `CLI_FINGERPRINTS` entry or wire its custom executor.
 */
export const CLI_COMPAT_OMITTED_PROVIDER_IDS = [
  "kiro",
  "cursor",
  "droid",
  "openclaw",
  "windsurf",
  "hermes",
  "cline",
  "kilocode",
  "opencode",
  "kimi-coding",
] as const;

/**
 * Provider IDs toggled in Settings -> CLI Fingerprint.
 *
 * Source of truth:
 * - expose only providers with an implemented `CLI_FINGERPRINTS` entry
 * - keep legacy-compatible display IDs such as `copilot` while persisting normalized provider IDs
 */
export const CLI_COMPAT_PROVIDER_IDS = Array.from(
  new Set([...IMPLEMENTED_CLI_FINGERPRINT_PROVIDER_IDS])
);

export const CLI_COMPAT_TOGGLE_IDS = Array.from(new Set(CLI_COMPAT_DISPLAY_PROVIDER_IDS));

export const CLI_COMPAT_PROVIDER_DISPLAY: Record<
  (typeof CLI_COMPAT_DISPLAY_PROVIDER_IDS)[number],
  { name: string; description: string }
> = {
  claude: {
    name: "Claude Code",
    description: "Anthropic Claude Code CLI",
  },
  codex: {
    name: "OpenAI Codex CLI",
    description: "OpenAI Codex CLI",
  },
  copilot: {
    name: "GitHub Copilot",
    description: "GitHub Copilot CLI compatibility",
  },
  antigravity: {
    name: "Antigravity",
    description: "Google Antigravity IDE compatibility",
  },
  qwen: {
    name: "Qwen Code / Qoder",
    description: "Qwen Code and Qoder CLI compatibility",
  },
};
