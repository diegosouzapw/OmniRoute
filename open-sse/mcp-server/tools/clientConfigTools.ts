import { resolveOmniRouteBaseUrl } from "../../../src/shared/utils/resolveOmniRouteBaseUrl.ts";

type ClientConfigTarget = "openclaw" | "hermes";

function normalizeBaseUrl(baseUrl?: string): string {
  const normalized = String(baseUrl || resolveOmniRouteBaseUrl())
    .trim()
    .replace(/\/+$/, "");

  if (normalized.endsWith("/api/v1") || normalized.endsWith("/v1")) {
    return normalized;
  }
  if (normalized.endsWith("/api")) {
    return `${normalized}/v1`;
  }
  return `${normalized}/api/v1`;
}

function modelDisplayName(model: string): string {
  const trimmed = String(model || "").trim();
  if (!trimmed) return "model";
  const parts = trimmed.split("/");
  return parts[parts.length - 1] || trimmed;
}

function buildOpenClawConfig(baseUrl: string, apiKey: string, model: string) {
  return {
    agents: {
      defaults: {
        model: {
          primary: `omniroute/${model}`,
        },
      },
    },
    models: {
      providers: {
        omniroute: {
          baseUrl,
          apiKey,
          api: "openai-completions",
          models: [
            {
              id: model,
              name: modelDisplayName(model),
            },
          ],
        },
      },
    },
  };
}

function buildHermesConfig(baseUrl: string, apiKey: string, model: string) {
  return {
    api_base: baseUrl,
    api_key: apiKey,
    model,
  };
}

export function generateClientConfig(args: {
  target: ClientConfigTarget;
  model: string;
  apiKey?: string;
  baseUrl?: string;
}) {
  const target = args.target;
  const model = String(args.model || "").trim();
  const apiKey = String(args.apiKey || "sk_omniroute").trim() || "sk_omniroute";
  const baseUrl = normalizeBaseUrl(args.baseUrl);
  const usesPlaceholderApiKey = !args.apiKey || !String(args.apiKey).trim();

  const configObject =
    target === "openclaw"
      ? buildOpenClawConfig(baseUrl, apiKey, model)
      : buildHermesConfig(baseUrl, apiKey, model);

  return {
    target,
    format: "json" as const,
    baseUrl,
    model,
    usesPlaceholderApiKey,
    fileHint:
      target === "openclaw"
        ? "OpenClaw settings.json provider block"
        : "Hermes configuration file or environment variables",
    config: JSON.stringify(configObject, null, 2),
  };
}
