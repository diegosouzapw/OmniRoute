const CLAUDE_CODE_COMPATIBLE_BASE_BETAS = [
  "claude-code-20250219",
  "interleaved-thinking-2025-05-14",
  "effort-2025-11-24",
];

export const CLAUDE_CODE_COMPATIBLE_REDACT_THINKING_BETA = "redact-thinking-2026-02-12";
export const CLAUDE_CODE_COMPATIBLE_REDACT_THINKING_ENV = "OMNIROUTE_CC_REDACT_THINKING";

function envFlagEnabled(value: string | undefined): boolean {
  return /^(1|true|yes|on)$/i.test(String(value || "").trim());
}

export function resolveClaudeCodeCompatibleAnthropicBeta(
  env: NodeJS.ProcessEnv = process.env
): string {
  const betas = [...CLAUDE_CODE_COMPATIBLE_BASE_BETAS];
  if (envFlagEnabled(env[CLAUDE_CODE_COMPATIBLE_REDACT_THINKING_ENV])) {
    betas.push(CLAUDE_CODE_COMPATIBLE_REDACT_THINKING_BETA);
  }
  return betas.join(",");
}

export const CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA = resolveClaudeCodeCompatibleAnthropicBeta();
