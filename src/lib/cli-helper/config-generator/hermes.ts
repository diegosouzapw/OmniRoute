import path from "node:path";
import os from "node:os";

let yaml: typeof import("js-yaml") | null = null;
async function loadYaml() {
  if (!yaml) {
    yaml = await import("js-yaml");
  }
  return yaml;
}

const CONFIG_PATH = path.join(os.homedir(), ".hermes", "config.yaml");

export async function generateHermesConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): Promise<string> {
  const y = await loadYaml();

  let base = options.baseUrl;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);

  if (!options.model) {
    throw new Error("model is required");
  }
  const model = options.model;

  const config = {
    model: {
      default: model,
      provider: "omniroute",
      base_url: `${base}/v1`,
    },
    providers: {
      omniroute: {
        base_url: `${base}/v1`,
        api_key: options.apiKey,
      },
    },
  };

  return y.dump(config, { lineWidth: -1 });
}
