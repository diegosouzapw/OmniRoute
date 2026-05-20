import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".cline", "data", "globalState.json");

export function generateClineConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  let base = options.baseUrl;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);

  const config = {
    openAiBaseUrl: `${base}/v1`,
    openAiApiKey: options.apiKey,
  };

  return JSON.stringify(config, null, 2);
}
