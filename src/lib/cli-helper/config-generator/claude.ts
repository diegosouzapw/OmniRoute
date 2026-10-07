import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".claude", "settings.json");

export function generateClaudeConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  let base = options.baseUrl;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);
  const model = options.model || "claude-3-5-sonnet-20241022";

  const config = {
    model,
    env: {
      ANTHROPIC_BASE_URL: base,
      ANTHROPIC_AUTH_TOKEN: options.apiKey,
      ANTHROPIC_MODEL: model,
      CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY: "1",
    },
  };

  return JSON.stringify(config, null, 2);
}
