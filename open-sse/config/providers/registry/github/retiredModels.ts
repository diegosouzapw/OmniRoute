const RETIRED_GITHUB_COPILOT_MODEL_IDS = new Set([
  "gemini-2.5-pro",
  "gemini-3-flash",
  "gemini-3-flash-preview",
  // Retired 2026-09-01. Sonnet 4.6 retains an upstream annual-plan exception;
  // its separate local removal is recorded below.
  // https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot/
  "gemini-3.1-pro-preview",
  "claude-opus-4.5",
  "claude-opus-4.6",
  "claude-sonnet-4.5",
  "oswe-vscode-prime",
  // Advance removal requested ahead of the upstream 2026-10-02 retirement.
  // https://github.blog/changelog/2026-09-03-upcoming-deprecation-of-selected-github-copilot-models/
  "gemini-3.5-flash",
  "gemini-3.6-flash",
  "kimi-k2.7-code",
  "claude-opus-4.7",
  // Removed from OmniRoute's curated Copilot catalog by operator choice.
  // These entries do not imply that GitHub has retired the models upstream.
  "claude-sonnet-4.6",
  "claude-fable-5",
  "gemini-3.7-flash",
  "grok-4.5",
  "mai-code-1-flash",
  "mai-code-1-flash-picker",
  "gpt-5-mini",
  "gpt-5.3-codex",
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.4-nano",
  "gpt-5.5",
  "gpt-4",
  "gpt-4-0125-preview",
  "gpt-4o",
  "gpt-4o-2024-11-20",
  "gpt-4o-mini",
]);

export function isRetiredGitHubCopilotModelId(providerId: unknown, modelId: unknown): boolean {
  const provider = typeof providerId === "string" ? providerId.trim().toLowerCase() : "";
  if (provider !== "github" && provider !== "gh") return false;
  if (typeof modelId !== "string") return false;
  return RETIRED_GITHUB_COPILOT_MODEL_IDS.has(modelId.trim().toLowerCase());
}
