import path from "node:path";
import os from "node:os";

let yaml: typeof import("js-yaml") | null = null;
async function loadYaml() {
  if (!yaml) {
    yaml = await import("js-yaml");
  }
  return yaml;
}

const CONFIG_PATH = path.join(os.homedir(), ".continue", "config.yaml");

export async function generateContinueConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): Promise<string> {
  const y = await loadYaml();
  const base = options.baseUrl.replace(/\/+$/, "").replace(/\/v1$/, "");

  const config = {
    models: [
      {
        title: "OmniCode",
        apiKey: options.apiKey,
        apiBase: `${base}/v1`,
      },
    ],
  };

  return y.dump(config, { lineWidth: -1 });
}
