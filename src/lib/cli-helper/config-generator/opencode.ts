import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".config", "opencode", "opencode.json");

export function generateOpencodeConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  let base = options.baseUrl;
  while (base.endsWith("/")) base = base.slice(0, -1);
  if (base.endsWith("/v1")) base = base.slice(0, -3);

  const config = {
    provider: "omniroute",
    baseURL: `${base}/v1`,
    apiKey: options.apiKey,
    model: options.model || "opencode",
  };

  return JSON.stringify(config, null, 2);
}
