import { getClaudeCodeVersion } from "@omniroute/open-sse/executors/claudeIdentity.ts";

export function buildClaudeModelsHeaders(input: {
  accessToken?: string | null;
  apiKey?: string | null;
}): Record<string, string> {
  const accessToken = typeof input.accessToken === "string" ? input.accessToken.trim() : "";
  const apiKey = typeof input.apiKey === "string" ? input.apiKey.trim() : "";
  const common = {
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01",
  };
  if (accessToken) {
    const scheme = "Bearer";
    return {
      ...common,
      Authorization: [scheme, accessToken].join(" "),
      "anthropic-beta": "oauth-2025-04-20",
      "User-Agent": `claude-cli/${getClaudeCodeVersion()} (external, cli)`,
    };
  }
  return {
    ...common,
    "x-api-key": apiKey,
  };
}
