const RETIRED_GITHUB_COPILOT_MODEL_IDS = new Set([
  "gemini-2.5-pro",
  "gemini-3-flash",
  "gemini-3-flash-preview",
]);

export function isRetiredGitHubCopilotModelId(providerId: unknown, modelId: unknown): boolean {
  const provider = typeof providerId === "string" ? providerId.trim().toLowerCase() : "";
  if (provider !== "github" && provider !== "gh") return false;
  if (typeof modelId !== "string") return false;
  return RETIRED_GITHUB_COPILOT_MODEL_IDS.has(modelId.trim().toLowerCase());
}
