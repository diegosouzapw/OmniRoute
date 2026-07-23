/**
 * Named "client identity" header presets for OpenAI-/Anthropic-compatible
 * provider nodes (e.g. mimicking a known CLI's `User-Agent`).
 *
 * This module is intentionally dumb: it only supplies preset header
 * VALUES. It introduces NO new header-merge path — selecting a profile in
 * the compatible-provider UI merges its headers into the SAME
 * `providerSpecificData.customHeaders` field already wired end-to-end
 * (node -> connection -> `DefaultExecutor.buildHeaders()` ->
 * `applyCustomHeaders()` in `open-sse/executors/default.ts`), which already
 * sanitizes via `isForbiddenCustomHeaderName` (`upstreamHeaders.ts`) and is
 * applied AFTER the credential-auth headers are set. Auth/cookie headers
 * therefore always win over anything a profile (or a hand-edited custom
 * header) tries to set — no new precedence logic is needed here.
 */

export interface ClientIdentityProfile {
  readonly id: string;
  readonly label: string;
  readonly headers: Readonly<Record<string, string>>;
}

const DEFAULT_PROFILE: ClientIdentityProfile = Object.freeze({
  id: "default",
  label: "Default",
  headers: Object.freeze({}),
});

const CLAUDE_CLI_PROFILE: ClientIdentityProfile = Object.freeze({
  id: "claude-cli",
  label: "Claude CLI",
  headers: Object.freeze({
    "User-Agent": "claude-cli/2.1.207 (external, cli)",
    "X-App": "cli",
  }),
});

const CODEX_CLI_PROFILE: ClientIdentityProfile = Object.freeze({
  id: "codex-cli",
  label: "Codex CLI",
  headers: Object.freeze({
    "User-Agent": "codex_cli_rs/0.144.1",
    originator: "codex_cli_rs",
  }),
});

const GEMINI_CLI_PROFILE: ClientIdentityProfile = Object.freeze({
  id: "gemini-cli",
  label: "Gemini CLI",
  headers: Object.freeze({
    "User-Agent": "GeminiCLI/0.1.0 (linux; x64)",
  }),
});

/** Ordered so `CLIENT_IDENTITY_PROFILE_OPTIONS` renders "Default" first. */
export const CLIENT_IDENTITY_PROFILES: Readonly<Record<string, ClientIdentityProfile>> =
  Object.freeze({
    default: DEFAULT_PROFILE,
    "claude-cli": CLAUDE_CLI_PROFILE,
    "codex-cli": CODEX_CLI_PROFILE,
    "gemini-cli": GEMINI_CLI_PROFILE,
  });

export const CLIENT_IDENTITY_PROFILE_IDS: readonly string[] = Object.keys(CLIENT_IDENTITY_PROFILES);

export const CLIENT_IDENTITY_PROFILE_OPTIONS: ReadonlyArray<{ value: string; label: string }> =
  CLIENT_IDENTITY_PROFILE_IDS.map((id) => ({
    value: id,
    label: CLIENT_IDENTITY_PROFILES[id].label,
  }));

export function isClientIdentityProfileId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(CLIENT_IDENTITY_PROFILES, value)
  );
}

/**
 * Returns a plain (mutable, unfrozen) copy of the preset's headers so callers
 * can safely spread/merge it into `providerSpecificData.customHeaders`
 * without ever needing to sanitize here — that happens downstream in
 * `applyCustomHeaders()` regardless of where the header entries came from.
 */
export function getClientIdentityProfileHeaders(
  profileId: string | undefined | null
): Record<string, string> {
  if (!isClientIdentityProfileId(profileId)) return {};
  return { ...CLIENT_IDENTITY_PROFILES[profileId].headers };
}
