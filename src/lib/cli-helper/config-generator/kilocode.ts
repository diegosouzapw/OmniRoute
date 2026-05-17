import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".config", "kilocode", "settings.json");

export function generateKilocodeConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  let base = options.baseUrl;
  while (base.endsWith("/")) base = base.slice(0, -1);
  if (base.endsWith("/v1")) base = base.slice(0, -3);

  const config = {
    apiKey: options.apiKey,
    baseUrl: `${base}/v1`,
  };

  return JSON.stringify(config, null, 2);
}
